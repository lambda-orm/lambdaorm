import {Operand,Context,Parameter } from './../../model'
import {IOperandExecutor} from '../'
import {Executor}  from '../../connection'
import {SqlSentenceInclude,SqlQuery} from './operands'
import {SqlLanguage} from './language'
import {Helper} from './../../helper'
import {SqlDialectMetadata } from './dialectMetadata'

export class SqlExecutor implements IOperandExecutor
{
    private language:SqlLanguage
    constructor(language:SqlLanguage){
        this.language=language;
    }
    public async execute(operand:Operand,context:Context,executor:Executor):Promise<any>
    {   
        let query:SqlQuery = operand as SqlQuery
        let metadata = this.language.metadata(query.dialect) 
        return await this._execute(query,context,metadata,executor);
    }
    protected async _execute(query:SqlQuery,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    {          
        let result:any;    
        switch(query.name){
            case 'select': result= await this.select(query,context,metadata,executor);break;
            case 'insert': result=  await this.insert(query,context,metadata,executor);break;
            case 'update': result=  await this.update(query,context,metadata,executor);break;
            case 'delete': result=  await this.delete(query,context,metadata,executor);break;
            case 'bulkInsert': result=  await this.bulkInsert(query,context,metadata,executor);break;
            default:  throw `sentence ${query.name} not implemented`;
        }
        return result;
    }
    protected async select(query:SqlQuery,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    {           
        let mainResult = await executor.select(query.sentence,this.params(query.parameters,metadata,context));
        if(mainResult.length>0){
            for(const p in query.children){
                let include = query.children[p] as SqlSentenceInclude;
                if(!context.contains(include.variable)){
                    let ids:any[] = [];
                    for(let i=0;i< mainResult.length;i++){
                        let id = mainResult[i][include.relation.from];
                        if(!ids.includes(id))
                        ids.push(id)
                    }
                    context.set(include.variable,ids);
                }                
                let includeResult= await this._execute(include.children[0] as SqlQuery,context,metadata,executor);
                for(let i=0;i< mainResult.length;i++){
                    let element = mainResult[i];
                    let relationId = element[include.relation.from];
                    element[include.name] = (include.relation.type== 'manyToOne')
                                                            ?includeResult.filter((p:any) => p[include.relation.to] == relationId)
                                                            :includeResult.find((p:any) => p[include.relation.to] == relationId)
                }          
            }
        }
        return mainResult;
    }
    protected async insert(query:SqlQuery,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<number>
    {        
        // before insert the relationships of the type oneToOne and oneToMany
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                if(include.relation.type== 'oneToOne' || include.relation.type== 'oneToMany'){  
                    let relationContext = new Context(relation,context);
                    let relationId= await this._execute(include.children[0] as SqlQuery,relationContext,metadata,executor);
                    context.set(include.relation.from,relationId);
                }
            }
        }        
        //insert main entity
        let insertId = await executor.insert(query.sentence,this.params(query.parameters,metadata,context));
        if(query.autoincrement)
           context.set(query.autoincrement.name,insertId); 
        // after insert the relationships of the type oneToOne and manyToOne          
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                if(include.relation.type== 'manyToOne'){
                    let parentId = context.get(include.relation.from);
                    let childPropertyName = include.relation.to;
                    for(let i=0;i< relation.length;i++){
                        let child = relation[i];
                        child[childPropertyName]=parentId;
                        let childContext = new Context(child,context);
                        let childId= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
                    }       
                }
            }
        }        
        return insertId;
    }
    protected async bulkInsert(query:SqlQuery,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<number[]>
    { 
        // before insert the relationships of the type oneToOne and oneToMany
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            if(include.relation.type== 'oneToOne' || include.relation.type== 'oneToMany'){               
                let allChilds:any[]=[];
                for(let i=0;i<context.data.length;i++){                        
                    let item = context.data[i];                        
                    let child = item[include.relation.name];
                    if(child)
                        allChilds.push(child);
                }
                let childContext = new Context(allChilds,context);
                let allChildsId= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
                for(let i=0;i<context.data.length;i++){
                    let item = context.data[i];
                    if(item[include.relation.name])
                        item[include.relation.from]=allChildsId[i];
                }                            
            }
        }        
        //insert main entity
        let fieldId:string|undefined = query.autoincrement?query.autoincrement.mapping:undefined;
        let ids = await executor.bulkInsert(query.sentence,this.rows(query,metadata,context.data),query.parameters,fieldId);
        if(query.autoincrement){
            for(let i=0;i<context.data.length;i++){
                context.data[i][query.autoincrement.name]=ids[i];
            }
        }
        // after insert the relationships of the type oneToOne and manyToOne          
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            if(include.relation.type== 'manyToOne'){
                let allChilds:any[]=[];
                for(let i=0;i<context.data.length;i++){
                    let item = context.data[i];
                    let parentId = item[include.relation.from];
                    let childPropertyName = include.relation.to;
                    let childs = item[include.relation.name];
                    if(childs){
                        for(let j=0;j< childs.length;j++){
                            let child = childs[j];
                            child[childPropertyName]=parentId;
                            allChilds.push(child);
                        }
                    }
                }
                let childContext = new Context(allChilds,context);
                let allChildsId= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
            }
        }      
        return ids;
    }
    protected async update(query:SqlQuery,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    { 
        let changeCount = await executor.update(query.sentence,this.params(query.parameters,metadata,context));
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                switch(include.relation.type){
                    case 'manyToOne':                        
                        for(let i=0;i< relation.length;i++){
                            let child = relation[i];
                            let childContext = new Context(child,context);
                            let includeResult= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
                        }
                        break;
                    case "oneToOne":
                    case "oneToMany":    
                        let childContext = new Context(relation,context);
                        let includeResult= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
                        break;
                } 
            }                   
        }        
        return changeCount; 
    }
    protected async delete(query:SqlQuery,context:Context,metadata:SqlDialectMetadata,executor:Executor):Promise<any>
    { 
        //before remove relations entities
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let relation = context.get(include.relation.name);
            if(relation){
                switch(include.relation.type){
                    case 'manyToOne':                        
                        for(let i=0;i< relation.length;i++){
                            let child = relation[i];
                            let childContext = new Context(child,context);
                            let includeResult= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
                        }
                        break;
                    case "oneToOne":
                    case "oneToMany":    
                        let childContext = new Context(relation,context);
                        let includeResult= await this._execute(include.children[0] as SqlQuery,childContext,metadata,executor);
                        break;
                } 
            }                   
        }
        //remove main entity 
        let changeCount = await executor.delete(query.sentence,this.params(query.parameters,metadata,context));
        return changeCount;  
    }
    protected  params(parameters:Parameter[],metadata:SqlDialectMetadata,context:Context):Parameter[]
    {   
        for(const p in parameters){
            let parameter = parameters[p];
            parameter.value= context.get(parameter.name);
        }
        return parameters;
    }
    protected rows(query:SqlQuery,metadata:SqlDialectMetadata,array:any[]){
        let rows:any[]=[];
        let datetimeFormat= metadata.format('datetime');
        for(let i=0;i<array.length;i++){
            const item = array[i];
            let row:any[]=[];
            for(let j=0;j<query.parameters.length;j++){
                let parameter = query.parameters[j];
                let value = item[parameter.name];
                if(parameter.type == 'datetime' && value!==null)
                    value=Helper.dateFormat(value,datetimeFormat);
                // if(typeof value == 'string')
                //     value = Helper.escape(value);                
                row.push(value=== undefined?null:value);
            }
            rows.push(row);
        }
        return rows;
    }
}