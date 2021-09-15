import {Context,Parameter } from './../../model'
import {IOperandExecutor} from '../'
import {Executor}  from '../../connection'
import {SentenceInclude,Query} from './../operands'
import {SqlLanguage} from './language'
import {Operand} from './../operands'
import {SqlDialectMetadata } from './dialectMetadata'

export class SqlExecutor implements IOperandExecutor
{
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        this.language=language
    }
    public async execute(operand:Operand,context:Context,executor:Executor):Promise<any>
    {   
        let query:Query = operand as Query
        let metadata = this.language.metadata(query.dialect) 
        return await this._execute(query,context,metadata,executor)
    }
    protected async _execute(query:Query,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    {          
        let result:any    
        switch(query.name){
            case 'select': result= await this.select(query,context,metadata,executor);break
            case 'insert': result=  await this.insert(query,context,metadata,executor);break
            case 'update': result=  await this.update(query,context,metadata,executor);break
            case 'delete': result=  await this.delete(query,context,metadata,executor);break
            case 'bulkInsert': result=  await this.bulkInsert(query,context,metadata,executor);break
            default:  throw `sentence ${query.name} not implemented`
        }
        return result
    }
    protected async select(query:Query,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    {           
        let mainResult = await executor.select(query.sentence,this.params(query.parameters,metadata,context))
        if(mainResult.length>0){
            for(const p in query.children){
                let include = query.children[p] as SentenceInclude
                if(!context.contains(include.variable)){
                    let ids:any[] = []
                    for(let i=0;i< mainResult.length;i++){
                        let id = mainResult[i][include.relation.from]
                        if(!ids.includes(id))
                        ids.push(id)
                    }
                    context.set(include.variable,ids)
                }                
                let includeResult= await this._execute(include.children[0] as Query,context,metadata,executor)
                for(let i=0;i< mainResult.length;i++){
                    let element = mainResult[i]
                    let relationId = element[include.relation.from]
                    element[include.name] = (include.relation.type== 'manyToOne')
                                                            ?includeResult.filter((p:any) => p[include.relation.to] == relationId)
                                                            :includeResult.find((p:any) => p[include.relation.to] == relationId)
                }          
            }
        }
        return mainResult
    }
    protected async insert(query:Query,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<number>
    {        
        // before insert the relationships of the type oneToOne and oneToMany
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude
            let relation = context.get(include.relation.name)
            if(relation){
                if(include.relation.type== 'oneToOne' || include.relation.type== 'oneToMany'){  
                    let relationContext = new Context(relation,context)
                    let relationId= await this._execute(include.children[0] as Query,relationContext,metadata,executor)
                    context.set(include.relation.from,relationId)
                }
            }
        }        
        //insert main entity
        let insertId = await executor.insert(query.sentence,this.params(query.parameters,metadata,context))
        if(query.autoincrement)
           context.set(query.autoincrement.name,insertId) 
        // after insert the relationships of the type oneToOne and manyToOne          
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude
            let relation = context.get(include.relation.name)
            if(relation){
                if(include.relation.type== 'manyToOne'){
                    let parentId = context.get(include.relation.from)
                    let childPropertyName = include.relation.to
                    for(let i=0;i< relation.length;i++){
                        let child = relation[i]
                        child[childPropertyName]=parentId
                        let childContext = new Context(child,context)
                        let childId= await this._execute(include.children[0] as Query,childContext,metadata,executor)
                    }       
                }
            }
        }        
        return insertId
    }
    protected async bulkInsert(query:Query,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<number[]>
    { 
        // before insert the relationships of the type oneToOne and oneToMany
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude
            if(include.relation.type== 'oneToOne' || include.relation.type== 'oneToMany'){               
                let allChilds:any[]=[]
                for(let i=0;i<context.data.length;i++){                        
                    let item = context.data[i]                        
                    let child = item[include.relation.name]
                    if(child)
                        allChilds.push(child)
                }
                let childContext = new Context(allChilds,context)
                let allChildsId= await this._execute(include.children[0] as Query,childContext,metadata,executor)
                for(let i=0;i<context.data.length;i++){
                    let item = context.data[i]
                    if(item[include.relation.name])
                        item[include.relation.from]=allChildsId[i]
                }                            
            }
        }        
        //insert main entity
        let fieldId:string|undefined = query.autoincrement?query.autoincrement.mapping:undefined
        let ids = await executor.bulkInsert(query.sentence,this.rows(query,metadata,context.data),query.parameters,fieldId)
        if(query.autoincrement){
            for(let i=0;i<context.data.length;i++){
                context.data[i][query.autoincrement.name]=ids[i]
            }
        }
        // after insert the relationships of the type oneToOne and manyToOne          
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude
            if(include.relation.type== 'manyToOne'){
                let allChilds:any[]=[]
                for(let i=0;i<context.data.length;i++){
                    let item = context.data[i]
                    let parentId = item[include.relation.from]
                    let childPropertyName = include.relation.to
                    let childs = item[include.relation.name]
                    if(childs){
                        for(let j=0;j< childs.length;j++){
                            let child = childs[j]
                            child[childPropertyName]=parentId
                            allChilds.push(child)
                        }
                    }
                }
                let childContext = new Context(allChilds,context)
                let allChildsId= await this._execute(include.children[0] as Query,childContext,metadata,executor)
            }
        }      
        return ids
    }
    protected async update(query:Query,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    {         
        let changeCount = await executor.update(query.sentence,this.params(query.parameters,metadata,context))
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude
            let relation = context.get(include.relation.name)
            if(relation){
                switch(include.relation.type){
                    case 'manyToOne':                        
                        for(let i=0;i< relation.length;i++){
                            let child = relation[i]
                            let childContext = new Context(child,context)
                            let includeResult= await this._execute(include.children[0] as Query,childContext,metadata,executor)
                        }
                        break
                    case "oneToOne":
                    case "oneToMany":    
                        let childContext = new Context(relation,context)
                        let includeResult= await this._execute(include.children[0] as Query,childContext,metadata,executor)
                        break
                } 
            }                   
        }        
        return changeCount 
    }
    protected async delete(query:Query,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    { 
        //before remove relations entities
        for(const p in query.children){
            let include = query.children[p] as SentenceInclude
            let relation = context.get(include.relation.name)
            if(relation){
                switch(include.relation.type){
                    case 'manyToOne':                        
                        for(let i=0;i< relation.length;i++){
                            let child = relation[i]
                            let childContext = new Context(child,context)
                            let includeResult= await this._execute(include.children[0] as Query,childContext,metadata,executor)
                        }
                        break
                    case "oneToOne":
                    case "oneToMany":    
                        let childContext = new Context(relation,context)
                        let includeResult= await this._execute(include.children[0] as Query,childContext,metadata,executor)
                        break
                } 
            }                   
        }
        //remove main entity 
        let changeCount = await executor.delete(query.sentence,this.params(query.parameters,metadata,context))
        return changeCount  
    }
    protected params(parameters:Parameter[],metadata:SqlDialectMetadata,context:Context):Parameter[]
    {   
        for(const p in parameters){
            let parameter = parameters[p]
            let value = context.get(parameter.name)
            if(value!==null){
                if(parameter.type == 'datetime')
                    value=metadata.solveDateTime(value)
                else if(parameter.type == 'date')
                    value=metadata.solveDate(value) 
                else if(parameter.type == 'time')
                    value=metadata.solveTime(value)       
            }
            parameter.value= value=== undefined?null:value
        }
        return parameters
    }
    protected rows(query:Query,metadata:SqlDialectMetadata,array:any[]){
        let rows:any[]=[]
        for(let i=0;i<array.length;i++){
            const item = array[i]
            let row:any[]=[]
            for(let j=0;j<query.parameters.length;j++){
                let parameter = query.parameters[j]
                let value = item[parameter.name]
                if(value!==null){
                    if(parameter.type == 'datetime')
                        value=metadata.solveDateTime(value)
                    else if(parameter.type == 'date')
                        value=metadata.solveDate(value) 
                    else if(parameter.type == 'time')
                        value=metadata.solveTime(value)      
                }
                // if(typeof value == 'string')
                //     value = Helper.escape(value)                
                row.push(value=== undefined?null:value)
            }
            rows.push(row)
        }
        return rows
    }
}