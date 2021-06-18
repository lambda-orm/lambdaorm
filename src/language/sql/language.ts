import Node from './../../base/node'
import Context from './../../base/context'
import Operand from './../../base/operand'
import Connection  from './../../connection/base'
import Language from '../language'
import Schema from '../../base/schema'
import { SqlConstant,SqlVariable,SqlField,SqlKeyValue,SqlArray,SqlObject,SqlOperator,SqlFunctionRef,SqlArrowFunction,SqlBlock,
SqlSentence,SqlFrom,SqlJoin,SqlMap,SqlFilter,SqlGroupBy,SqlHaving,SqlSort,SqlInsert,SqlUpdate,SqlUpdateFrom,SqlDelete,
SqlSentenceInclude,SqlQuery,SqlInclude } from './operands'
import SqlLanguageVariant from './variant'


export default class SqlLanguage extends Language
{
    private _variants:any
    constructor(){
        super('sql');
        this._variants={};
    }
    public addLibrary(library:any):void
    {
        this._libraries[library.name] =library;

        for(const p in library.variants){
            let data =  library.variants[p];
            let variant = new SqlLanguageVariant(data.variant);
            variant.addVariant(data);
            this._variants[data.variant] =variant 
        }
    }    
    public compile(node:Node,schema:Schema,variant:string):Operand
    {
        try{
            let context = {aliases:{},current:null};
            let operand = this.nodeToOperand(node,schema,context);
            operand = this.reduce(operand);
            let metadata = this._variants[variant];
            let sqlSquery = this.createQuery(operand as SqlSentence,metadata);            
            return this.setParent(sqlSquery);
        } 
        catch(error){
            console.error(error);
            throw error; 
        }
    }
    public async run(operand:Operand,context:any,connection:Connection)
    {          
        return await this.execute(operand as SqlQuery,context,connection);
    }
    protected reduce(operand:Operand):Operand
    {
        return operand
    }
    protected createQuery(sqlSentence:SqlSentence,metadata:SqlLanguageVariant):SqlQuery
    {       
       let children=[];
       for(const p in sqlSentence.includes){          
          let include =  sqlSentence.includes[p];
          let query = this.createQuery(include.children[0] as SqlSentence,metadata);
          let sqlInclude = new SqlInclude(include.name,[query],include.relation,include.variable); 
          children.push(sqlInclude);            
       }
       let sentence = sqlSentence.build(metadata);
       return new SqlQuery(sqlSentence.name,children,sentence,sqlSentence.columns,sqlSentence.variables);
    }
    protected async execute(query:SqlQuery,context:Context,connection:Connection)
    {           
        let mainResult = await this.executeQuery(query,context,connection);
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
            let includeResult= await this.execute(include.children[0] as SqlQuery,context,connection);
            for(let i=0;i< mainResult.length;i++){
                let element = mainResult[i];
                let relationId = element[include.relation.from];
                element[include.name] = (include.relation.type== 'manyToOne')
                                                        ?includeResult.filter((p:any) => p[include.relation.to.property] == relationId)
                                                        :includeResult.find((p:any) => p[include.relation.to.property] == relationId)
                                                        
            }            
        }
        return mainResult;
    }
    protected async executeQuery(query:SqlQuery,context:Context,connection:Connection)
    {   
        let params=[];
        for(const p in query.variables){
            let variable = query.variables[p];
            params.push(context.get(variable));
        }  
        return await connection.query(query.sentence,params);
    }
    protected _serialize(operand:Operand):any
    {
        let children = [];    
        if(operand instanceof SqlQuery){
            let query = operand as SqlQuery;
            for(const k in query.children){
                children.push(this._serialize(query.children[k]));
            }
            return {'n':query.name,'t':query.constructor.name,'c':children,'s':query.sentence,'cols':query.columns,'v':query.variables};
        }else if(operand instanceof SqlInclude){
            let include = operand as SqlInclude;
            for(const k in include.children){
                children.push(this._serialize(include.children[k]));
            }
            return {'n':include.name,'t':include.constructor.name,'c':children,'r':include.relation,'v':include.variable}; 
        }
    }
    protected _deserialize(serialized:any,language:string):Operand
    {
        throw 'NotImplemented';
    }
    protected createAlias(context:any,name:string,relation?:string):string
    {
        let c= name.charAt(0).toLowerCase();
        let alias = c;
        for(let i=1;context.aliases[alias];i++)alias=alias+i;
        context.aliases[alias] = relation?relation:name;
        return alias;        
    }    
    protected createOperand(node:Node,children:Operand[],schema:Schema,context:any):Operand
    {
        switch(node.type){
            case 'const':
                return new SqlConstant(node.name,children);
            case 'var':
                let parts = node.name.split('.');
                if(parts[0] == context.current.arrowVar){
                    if(parts.length == 1){
                        return new SqlField(context.current.alias+'.*'); 
                    }
                    else if(parts.length == 2){
                        if(context.current.fields.includes(parts[1])){
                            return new SqlField(parts[1]); 
                        }else{
                            let field= schema.propertyMapping(context.current.entity,parts[1]);
                            if(field){
                                return new SqlField(context.current.alias+'.'+field); 
                            }else{
                                let relationInfo= schema.getRelation(context.current.entity,parts[1]);
                                if(relationInfo){
                                    let relation =  this.addJoins(parts,parts.length,context); 
                                    let relationAlias=context.current.joins[relation];
                                    return new SqlField(relationAlias+'.*'); 
                                }else{
                                    throw 'Property '+parts[1]+' not fount in '+context.current.entity;
                                }

                            }                            
                        } 
                    }else{
                        let propertyName = parts[parts.length-1];
                        let relation =  this.addJoins(parts,parts.length-1,context); 
                        let info = schema.getRelation(context.current.entity,relation);                        
                        let relationAlias=context.current.joins[relation];
                        let relationField = info.relationSchema.property[propertyName].mapping; 
                        if(relationField){
                            return new SqlField(relationAlias+'.'+relationField);
                        }else{
                            let relationName = info.relationSchema.relation[propertyName];
                            if(relationName){
                                let relation2 =  this.addJoins(parts,parts.length,context);
                                let relationAlias2=context.current.joins[relation2];                               
                                return new SqlField(relationAlias2+'.*');
                            }else{
                                throw 'Property '+propertyName+' not fount in '+relation;
                            } 
                        }
                    }
                }
                else
                    return new  SqlVariable(node.name,children);                           
            case 'keyVal':
                return new SqlKeyValue(node.name,children);
            case 'array':
                return new SqlArray(node.name,children);
            case 'obj':
                return new SqlObject(node.name,children);
            case 'oper':
                return new SqlOperator(node.name,children);
            case 'funcRef':
                return new SqlFunctionRef(node.name,children);
            case 'block':
                return  new SqlBlock(node.name,children);
            default:
                throw 'node name: '+node.name +' type: '+node.type+' not supported';
        }
    }    
    protected createArrowFunction(node:Node,children:Operand[]):Operand
    {
        try{
            switch(node.name){
                case 'map': 
                case 'first': 
                    return new SqlMap(node.name,children);
                case 'filter': 
                    return new SqlFilter(node.name,children);
                case 'having': 
                    return new SqlHaving(node.name,children);
                case 'sort': 
                    return new SqlSort(node.name,children);
                case 'insert': return new SqlInsert(node.name,children);
                // case 'insertFrom': return new SqlInsertFrom(node.name,children);
                case 'update': return new SqlUpdate(node.name,children);
                case 'updateFrom': return new SqlUpdateFrom(node.name,children);
                case 'delete': return new SqlDelete(node.name,children);
                default:
                    throw'arrow function : '+node.name+' not supported'; 
            }            
        } 
        catch(error){
            throw'cretae arrow function: '+node.name+' error: '+error.toString(); 
        }
    }
    protected createClause(clause:Node,schema:Schema,context:any):Operand
    {        
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],schema,context);
        return this.createArrowFunction(clause,[child]);
    }
    protected createMapClause(clause:Node,schema:Schema,context:any):Operand
    {
        if(clause.children.length==3){
            context.current.arrowVar = clause.children[1].name;
            let fields = clause.children[2];
            let child =null;
            if(fields.children.length==0 && fields.name == context.current.arrowVar){
                let fields = this.createNodeFields(context.current.entity,'p',schema)
                child = this.nodeToOperand(fields,schema,context);
            }else{
                child = this.nodeToOperand(clause.children[2],schema,context);
            }  
            return this.createArrowFunction(clause,[child]);
        }else{
            context.current.arrowVar = 'p';
            let fields = this.createNodeFields(context.current.entity,'p',schema)
            let child = this.nodeToOperand(fields,schema,context);
            return this.createArrowFunction(clause, [child]);
        }
    }
    protected createNodeFields(entityName:string,arrowVar:string,schema:Schema):any
    {
        let obj = new Node('obj', 'obj', []);
        let entity=schema.getEntity(entityName);
        for(let name in entity.property){
            let field = new Node(arrowVar+'.'+name, 'var', []);
            let keyVal = new Node(name, 'keyVal', [field])
            obj.children.push(keyVal);
        }
        return obj;
    }

    protected createSentenceInclude(node:Node,mainEntity:any,schema:Schema,context:any):SqlSentenceInclude
    {   let child:SqlSentence,relation:any,relationName:string=""; 

        let p = node
        if (p.type == 'var') {
        // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
        // entones agregar map(p=>p) a la variable convirtiendolo en .include(p=> p.details.map(p=>p))      
            let varArrow = new Node('p', 'var', []);
            let varAll = new Node('p', 'var', []);
            let parts = p.name.split('.');
            relationName=parts[1];
            relation = mainEntity.relation[relationName];
            p.name = relation.to.entity;
            let map = new Node('map','arrow',[p,varArrow,varAll]);
            child = this.nodeToOperand(map, schema, context) as SqlSentence;
        }else{
            throw 'Error to add include node '+p.type+':'+p.name; 
        } 
        let toEntity=schema.getEntity(relation.to.entity);
        let toField = toEntity.property[relation.to.property].mapping;
        let fieldRelation = new SqlField(child.alias + '.' + toField);
        let variableName = 'list_'+relation.to.property;
        let varRelation = new SqlVariable(variableName);
        let filterInclude =new SqlFunctionRef('in', [fieldRelation,varRelation]);
        let childFilter= child.children.find(p=> p.name == 'filter');
        if(!childFilter){
            let childFilter = new SqlFilter('filter',[filterInclude]);
            child.children.push(childFilter);
        }else{
            childFilter.children[0] =new SqlOperator('&&', [childFilter.children[0],filterInclude]);
        }
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }

    protected addInclude(node:Node,schema:Schema,context:any):any
    {
        try{
                   
            let sentence = this.nodeToOperand(node.children[0],schema,context) as SqlSentence;
            let mainEntity=schema.getEntity(sentence.entity);

            context.current.arrowVar = node.children[1].name; 
            let p = node.children[2];
            if (p.type == 'var') {
                let include = this.createSentenceInclude(p,mainEntity,schema,context)
                sentence.includes.push(include);
            }else if (p.type == 'array') {
                for (let i=0; i< p.children.length;i++) {
                    let include = this.createSentenceInclude(p.children[i],mainEntity,schema,context)
                    sentence.includes.push(include);
                }
            }else{
                throw 'Error to add include node '+p.type+':'+p.name; 
            }             
            return sentence;
        } 
        catch(error){
            console.error(error);
            throw error; 
        }


        // for (let i=1; i< node.children.length;i++) {
        //     let p = node.children[i];
        //     if(p.type =='arrow'){
        //     //resuelve el siguiente caso  .includes(details.map(p=>p))     
        //         let current = p;
        //         while (current) {
        //             if(current.type == 'var'){
        //                 relationName=current.name;
        //                 relation = mainEntity.relation[relationName];                            
        //                 current.name = relation.to.entity;
        //                 break;
        //             }
        //             if (current.children.length > 0)
        //                 current = current.children[0];
        //             else
        //                 break;
        //         }
        //         child = this.nodeToOperand(p, schema, context) as SqlSentence;
        //     }else if (p.type == 'var') {
        //     // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .includes(details)  
        //     // entones agregar map(p=>p) a la variable convirtiendolo en .includes(details.map(p=>p))      
        //         let varArrow = new Node('p', 'var', []);
        //         let varAll = new Node('p', 'var', []);
        //         relationName=p.name;
        //         relation = mainEntity.relation[relationName];
        //         p.name = relation.to.entity;
        //         let map = new Node('map','arrow',[p,varArrow,varAll]);
        //         child = this.nodeToOperand(map, schema, context) as SqlSentence;
        //     }else if (i==1 && p.type == 'arrow' && p.name == 'include') {
        //     // resuelve cuando una variable dento de un includes a su vez tiene otra , ejemplo:  
        //     // entones agregar map(p=>p) a la variable convirtiendolo en .includes(details.map(p=>p).includes(product))       
        //         let varRelation = p.children[0];
        //         let varArrow = new Node('p', 'var', []);
        //         let varAll = new Node('p', 'var', []);
        //         relationName=varRelation.name;
        //         relation = mainEntity.relation[relationName];
        //         varRelation.name = relation.to.entity;
        //         let map = new Node('map','arrow',[varRelation,varArrow,varAll]);
        //         p.children[0] = map;
        //         child = this.addInclude(p, schema, context) as SqlSentence;
        //     }else if (p.type == 'arrow' && p.name == 'include') {
        //     //resuelve el siguiente caso  .includes(details.map(p=>p).includes(product)))      
        //         let current = p;
        //         while (current) {
        //             if (current.type == 'var') {
        //                 relationName=current.name;
        //                 relation = mainEntity.relation[relationName];
        //                 current.name = relation.to.entity;
        //                 break;
        //             }
        //             if (current.children.length > 0)
        //                 current = current.children[0];
        //             else
        //                 break;
        //         }
        //         child= this.addInclude(p, schema, context);
        //     }else{
        //         throw 'Error to add include node '+p.type+':'+p.name; 
        //     }            
        //     let toEntity=schema.getEntity(relation.to.entity);
        //     let toField = toEntity.property[relation.to.property].mapping;
        //     let fieldRelation = new SqlField(child.alias + '.' + toField);
        //     let variableName = 'list_'+relation.to.property;
        //     let varRelation = new SqlVariable(variableName);
        //     let filterInclude =new SqlFunctionRef('in', [fieldRelation,varRelation]);
        //     let childFilter= child.children.find(p=> p.name == 'filter');
        //     if(!childFilter){
        //         let childFilter = new SqlFilter('filter',[filterInclude]);
        //         child.children.push(childFilter);
        //     }else{
        //         childFilter.children[0] =new SqlOperator('&&', [childFilter.children[0],filterInclude]);
        //     }
        //     let include = new SqlSentenceInclude(relationName,[child],relation,variableName);
        //     sentence.includes.push(include);
        // }
        // return sentence;
    }
    protected createSentence(node:Node,schema:Schema,context:any):SqlSentence
    {
        context.current = {parent:context.current,children:[],joins:{},fields:[],groupByFields:[]};
        if(context.parent)
            context.parent.children.push(context.current);            

        let sentence:any = {}; 
        let current = node;
        while(current){
            let name =current.type == 'var'?'from':current.name;
            sentence[name] =  current;
            if(current.children.length > 0)
                current = current.children[0]
            else
                break;  
        }            
        context.current.entity=sentence.from.name;
        context.current.alias = this.createAlias(context,context.current.entity);            
        let children = [];
        let operand= null;

        if(sentence['filter'] ){
            let clause = sentence['filter'];
            operand = this.createClause(clause,schema,context);
            children.push(operand); 
        }

        if(sentence['delete']){
            //TODO
        }else if (sentence['insert']){
            //TODO
        }else if (sentence['update']){
            //TODO 
        }else{
            if(sentence['from']){
                let clause = sentence['from'];
                let tableName = schema.entityMapping(clause.name);
                operand =new SqlFrom(tableName+'.'+context.current.alias);
                children.push(operand);
            }
            if(sentence['map'] || sentence['first']){
                let clause = sentence['first']?sentence['first']:sentence['map'];
                operand = this.createMapClause(clause,schema,context);
                context.current.fields = this.fieldsInSelect(operand);
                context.current.groupByFields = this.groupByFields(operand);
                children.push(operand); 
            }else{
                let varEntity = new Node(context.current.entity, 'var', []);
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []);               
                let clause = new Node('map','arrow',[varEntity,varArrow,varAll]);
                operand = this.createMapClause(clause,schema,context);
                context.current.fields = this.fieldsInSelect(operand);
                context.current.groupByFields = this.groupByFields(operand);
                children.push(operand); 
            }
            if(context.current.groupByFields.length>0){
                let fields = [];
                for(let i=0;i<context.current.groupByFields.length;i++){
                    fields.push( this.clone(context.current.groupByFields[i]));
                }
                if(fields.length==1){
                    operand = new SqlGroupBy('groupBy',fields);
                }else{
                    let array:Operand = new SqlArray('array',fields);
                    operand = new SqlGroupBy('groupBy',[array]);
                } 
                children.push(operand); 
            }
            if(sentence['having']){
                let clause = sentence['having'];
                operand = this.createClause(clause,schema,context);
                children.push(operand); 
            }
            if(sentence['sort'] ){
                let clause = sentence['sort'];
                operand = this.createClause(clause,schema,context);
                children.push(operand); 
            }
        }
        for(const key in context.current.joins){

            let info = schema.getRelation(context.current.entity,key);

            let relatedAlias = info.previousRelation!=''?context.current.joins[info.previousRelation]:context.current.alias;   
            let relatedFieldName = info.previousSchema.property[info.relationData.from].mapping;
            let relationTable = info.relationSchema.name;
            let relationAlias =context.current.joins[key];;
            let relationFieldName = info.relationSchema.property[info.relationData.to.property].mapping;

            let relatedField = new SqlField(relatedAlias+'.'+relatedFieldName);
            let relationField = new SqlField(relationAlias+'.'+relationFieldName); 
            let equal = new SqlOperator('==',[relationField,relatedField])
            operand = new SqlJoin(relationTable+'.'+relationAlias,[equal]);
            children.push(operand);   
        }
        return new SqlSentence('sentence',children,context.current.entity,context.current.alias,context.current.fields);
    }
    protected nodeToOperand(node:Node,schema:Schema,context:any):Operand
    {
        if (node.type == 'arrow' && node.name == 'include'){
            return this.addInclude(node,schema,context);
        }else if(node.type == 'arrow'){
            return this.createSentence(node,schema,context);
        }else{
            let children = [];
            if(node.children){
                for(const k in node.children){
                    let p = node.children[k];
                    let child = this.nodeToOperand(p,schema,context);
                    children.push(child);
                }
            }
            return this.createOperand(node,children,schema,context);
        }
    }
    protected addJoins(parts:string[],to:number,context:any):string
    {
        let relation = '';
        for(let i=1;i<to;i++){
            relation= (i>1?relation+'.':'')+parts[i];
            if(!context.current.joins[relation]){
                context.current.joins[relation] = this.createAlias(context,parts[i],relation);
            }
        }
        return relation;
    }    
    protected groupByFields(operand:Operand):string[]
    {
        let data = {fields:[],groupBy:false};
        this._groupByFields(operand,data);
        return data.groupBy?data.fields:[]; 
    }
    protected _groupByFields(operand:Operand,data:any):void
    {
        if(operand instanceof SqlField){
            data.fields.push(operand);
        }else if(operand instanceof SqlFunctionRef && ['avg','count','first','last','max','min','sum'].indexOf(operand.name)>-1){
            data.groupBy = true;
        }else if(!(operand instanceof SqlSentence)){
            for(const k in operand.children){
                let p = operand.children[k];
                this._groupByFields(p,data);
            }
        }
    }
    protected clone(obj:any):any
    {
        let children = [];
        if(obj.children){
            for(const k in obj.children){
                let p = obj.children[k];
                let child = this.clone(p);
                children.push(child);
            }
        }
        return new obj.constructor(obj.name,children);
    } 
    protected fieldsInSelect(operand:Operand)
    {       
        let fields = [];
        if(operand.children.length==1){
            if(operand.children[0] instanceof SqlObject){
                let obj = operand.children[0];
                for(let p in obj.children){
                    let keyVal = obj.children[p];
                    fields.push(keyVal.name); 
                }    
            }else if(operand.children[0] instanceof SqlArray){
                let array = operand.children[0];
                for(let i=0;i< array.children.length;i++){
                    let element = array.children[i];
                    if(element instanceof SqlField){
                        let parts =element.name.split('.');
                        fields.push(parts[parts.length-1]);
                    }else{
                        fields.push('field'+i);
                    } 
                }    
            }else if(operand.children[0] instanceof SqlField){
                let parts =operand.children[0].name.split('.');
                fields.push(parts[parts.length-1]);
            }
            else{
                fields.push('field0');
            }  
        }
        return fields;
        
    }
}
