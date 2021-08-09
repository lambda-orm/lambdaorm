import {Property,Operand,Parameter} from './../../model'
import {Helper} from '../../helper'
import {Node,Model} from './../../parser/index'
import {OperandManager} from '../'
import { SqlConstant,SqlVariable,SqlField,SqlKeyValue,SqlArray,SqlObject,SqlOperator,SqlFunctionRef,SqlArrowFunction,SqlBlock,
SqlSentence,SqlFrom,SqlJoin,SqlMap,SqlFilter,SqlGroupBy,SqlHaving,SqlSort,SqlInsert,SqlUpdate,SqlDelete,
SqlSentenceInclude,SqlQuery,SqlInclude } from './operands'
import {SchemaHelper} from '../../schema/schemaHelper'
import {SqlDialectMetadata} from './dialectMetadata'
import {SqlLanguage} from './language'


class SqlEntityContext
{    
    public parent?:SqlEntityContext
    public entity:string
    public alias:string
    public metadata:any
    public children:SqlEntityContext[]
    public joins:any
    public fields:Property[]
    public groupByFields:string[]
    public arrowVar:string
    
    constructor(parent?:SqlEntityContext){        
        this.parent=parent
        if(parent)parent.children.push(this)        
        this.entity=''
        this.alias=''
        this.arrowVar=''
        this.children=[]
        this.joins={}
        this.fields=[]
        this.groupByFields=[]
    }
} 
class SqlContext
{
    public aliases:any
    public current:SqlEntityContext 
    constructor(current:SqlEntityContext){
        this.current = current
        this.aliases={}
    }
}
export class SqlOperandManager extends OperandManager
{   
    private language:SqlLanguage
    private languageModel:Model
    constructor(language:SqlLanguage,languageModel:Model){
        super();
        this.language=language;
        this.languageModel= languageModel; 
    }
    public build(node:Node,dialect:string,schema:SchemaHelper):Operand
    {
        try{
            let operand = this.nodeToOperand(node,schema,new SqlContext(new SqlEntityContext()));
            operand = this.reduce(operand);
            let metadata = this.language.dialects[dialect] as SqlDialectMetadata 
            let sqlSquery = this.createQuery(operand as SqlSentence,metadata);            
            return this.setParent(sqlSquery);
        } 
        catch(error){
            console.error(error);
            throw error; 
        }
    }
    public sentence(operand:Operand):string
    {          
        let query= operand as SqlQuery
        let mainQuery = query.sentence+';';
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let includemainQuery= this.sentence(include.children[0]);
            mainQuery= mainQuery+'\n'+includemainQuery
        }
        return mainQuery;
    }
    public model(operand:Operand):any
    {
        let query= operand as SqlQuery
        let result:any = {}
        for(let i=0;i<query.columns.length;i++){
            let column = query.columns[i]
            result[column.name]=column.type
        }       
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            let childsSchema = this.model(include.children[0]);
            if(include.relation.type == 'manyToOne'){
                result[include.name] = [childsSchema]
            }else{
                result[include.name]= childsSchema;
            }
        }
        return result;
    }
    protected reduce(operand:Operand):Operand
    {
        return operand
    }
    protected createQuery(sqlSentence:SqlSentence,metadata:SqlDialectMetadata):SqlQuery
    { 
       let children=[];
       let includes = sqlSentence.getIncludes();       
       for(const p in includes){          
          let include =  includes[p] as SqlSentenceInclude;
          let query = this.createQuery(include.children[0] as SqlSentence,metadata);
          let sqlInclude = new SqlInclude(include.name,[query],include.relation,include.variable); 
          children.push(sqlInclude);            
       }
       let sentence = sqlSentence.build(metadata);
       return new SqlQuery(sqlSentence.name,children,metadata.name,sentence,sqlSentence.entity,sqlSentence.autoincrement,sqlSentence.columns,sqlSentence.parameters);
    }   
    protected _serialize(operand:Operand):any
    {
        let children = [];    
        if(operand instanceof SqlQuery){
            let query = operand as SqlQuery;
            for(const k in query.children){
                children.push(this._serialize(query.children[k]));
            }
            return {n:query.name,t:query.constructor.name,c:children,s:query.sentence,f:query.columns,p:query.parameters,e:query.entity,a:query.autoincrement};
        }else if(operand instanceof SqlInclude){
            let include = operand as SqlInclude;
            for(const k in include.children){
                children.push(this._serialize(include.children[k]));
            }
            return {n:include.name,t:include.constructor.name,c:children,r:include.relation,v:include.variable}; 
        }
    }
    protected _deserialize(serialized:any):Operand
    {
        throw 'NotImplemented';
    }
    protected nodeToOperand(node:Node,schema:SchemaHelper,context:SqlContext):Operand
    {
        let operand:Operand;
        if(node.type == 'arrow' || node.type == 'childFunc' ){
            operand = this.createSentence(node,schema,context);
        }else{
            let children:Operand[] = [];
            if(node.children){
                for(const i in node.children){
                    let p = node.children[i];
                    let child = this.nodeToOperand(p,schema,context);

                    children.push(child);
                }
            }
            operand= this.createOperand(node,children,schema,context);
            for(let i=0;i<children.length;i++ ){  
                const child = children[i];
                child.parent = operand;
                child.index = i;
            } 
        }
        return operand;
    }    
    protected createOperand(node:Node,children:Operand[],schema:SchemaHelper,context:SqlContext):Operand
    {
        switch(node.type){
            case 'const':
                return new SqlConstant(node.name);
            case 'var':
                let parts = node.name.split('.');
                if(parts[0] == context.current.arrowVar){
                    if(parts.length == 1){
                        // TODO, aqui se deberia retornar el array de fields 
                        return new SqlField(context.current.entity,'*','any',context.current.alias+'.*'); 
                    }
                    else if(parts.length == 2){
                        let _field = context.current.fields.find(p=> p.name == parts[1]);
                        if(_field){ 
                            return new SqlField(context.current.entity,_field.name,_field.type,_field.name);                          
                        }else{                            
                            if(schema.existsProperty(context.current.entity,parts[1])){
                                let property= schema.getProperty(context.current.entity,parts[1]);
                                return new SqlField(context.current.entity,property.name,property.type,context.current.alias+'.'+property.mapping); 
                            }else{
                                let relationInfo= schema.getRelation(context.current.entity,parts[1]);
                                if(relationInfo){
                                    let relation =  this.addJoins(parts,parts.length,context); 
                                    let relationAlias=context.current.joins[relation];
                                    // TODO, aqui se deberia retornar el array de fields 
                                    return new SqlField(relation,'*','any',relationAlias+'.*'); 
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
                        let property = info.relationSchema.property[propertyName]; 
                        if(property){
                            return new SqlField(info.relationSchema.name,property.name,property.type,relationAlias+'.'+property.mapping);
                        }else{
                            let relationName = info.relationSchema.relation[propertyName];
                            if(relationName){
                                let relation2 =  this.addJoins(parts,parts.length,context);
                                let relationAlias2=context.current.joins[relation2];
                                // TODO, aqui se deberia retornar el array de fields                                
                                return new SqlField(relation2,'*','any',relationAlias2+'.*');
                            }else{
                                throw 'Property '+propertyName+' not fount in '+relation;
                            } 
                        }
                    }
                }
                else
                    return new  SqlVariable(node.name);                           
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
    protected createSentence(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentence
    {
        context.current = new SqlEntityContext(context.current)
        let createInclude:any;
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
        context.current.metadata=schema.getEntity(context.current.entity);
        context.current.alias = this.createAlias(context,context.current.entity);
        let autoincrement =  schema.getAutoincrement(context.current.entity);
        let name:string = "";           
        let children:Operand[]= [];
        let operand= null;

        if(sentence['filter'] ){
            let clause = sentence['filter'];
            operand = this.createClause(clause,schema,context);
            children.push(operand);
        }
        if(sentence['from']){
            let tableName = context.current.metadata.mapping;// schema.entityMapping(clause.name);
            operand =new SqlFrom(tableName+'.'+context.current.alias);
            children.push(operand);
        }
        if(sentence['deleteAll']){
            // Only the DeleteAll can be an unfiltered delete.
            // this is done for security to avoid deleting all records if the filter is forgotten
            name='delete';
            let clause = sentence['deleteAll'];
            operand =new SqlDelete(context.current.metadata.mapping+'.'+context.current.alias);
            children.push(operand);
        }else if(sentence['delete']){
            name='delete';
            createInclude= this.createDeleteInclude;
            let clause = sentence['delete'];
            this.createFilterIfNotExists(clause,children,schema,context);
            operand =new SqlDelete(context.current.metadata.mapping+'.'+context.current.alias);
            children.push(operand);             
        }else if (sentence['insert']){
            name='insert';
            createInclude= this.createInsertInclude;
            let clause = sentence['insert'] as Node;           
            operand= this.createInsertClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            children.push(operand);
        }else if (sentence['bulkInsert']){
            name='bulkInsert';
            createInclude= this.createBulkInsertInclude;
            let clause = sentence['bulkInsert'] as Node;           
            operand= this.createInsertClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            children.push(operand);  
        }else if (sentence['updateAll']){
            // Only the updateAll can be an unfiltered update.
            // this is done for security to avoid updated all records if the filter is forgotten
            name='update';
            let clause = sentence['updateAll'] as Node;
            operand= this.createUpdateClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            children.push(operand);            
        }else if (sentence['update']){
            name='update';
            createInclude= this.createUpdateInclude;
            let clause = sentence['update'] as Node;           
            operand= this.createUpdateClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            this.createFilterIfNotExists(clause,children,schema,context);
            children.push(operand);            
        }else{
            name='select';
            createInclude= this.createSelectInclude;
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
        if(sentence['include']){
            if(createInclude===undefined)
               throw 'Include not implemented!!!';

            let clause = sentence['include'];                
            context.current.arrowVar = clause.children[1].name; 
            let body = clause.children[2];                
            if (body.type == 'array'){
                for (let i=0; i< body.children.length;i++) {
                    let include = createInclude.bind(this)(body.children[i],schema,context)
                    children.push(include);
                }
            }
            else{
                let include = createInclude.bind(this)(body,schema,context)
                children.push(include);    
            }
        }
        for(const key in context.current.joins){

            let info = schema.getRelation(context.current.entity,key);

            let relatedAlias = info.previousRelation!=''?context.current.joins[info.previousRelation]:context.current.alias;   
            let relatedProperty = info.previousSchema.property[info.relationData.from];
            let relationTable = info.relationSchema.name;
            let relationAlias =context.current.joins[key];;
            let relationProperty = info.relationSchema.property[info.relationData.to];

            let relatedField = new SqlField(info.previousSchema.name,info.relationData.from,relatedProperty.type,relatedAlias+'.'+relatedProperty.mapping);
            let relationField = new SqlField(info.relationSchema.name,info.relationData.to,relationProperty.type,relationAlias+'.'+relationProperty.mapping); 
            let equal = new SqlOperator('==',[relationField,relatedField])
            operand = new SqlJoin(relationTable+'.'+relationAlias,[equal]);
            children.push(operand);   
        }
        
        for(let i=0;i<children.length;i++)this.solveTypes(children[i],context);        
        let parameters = this.parametersInSentence(children);
        let sqlSentence = new SqlSentence(name,children,context.current.entity,context.current.alias,autoincrement,context.current.fields,parameters);
        context.current = context.current.parent?context.current.parent as SqlEntityContext:new SqlEntityContext()
        return sqlSentence   
    }    
    // protected createArrowFunction(node:Node,children:Operand[]):Operand
    // {      
    //     switch(node.name){
    //         // case 'map': 
    //         // case 'first':  return new SqlMap(node.name,children);
    //         case 'filter': return new SqlFilter(node.name,children);
    //         case 'having': return new SqlHaving(node.name,children);
    //         case 'sort':   return new SqlSort(node.name,children);
    //         // case 'insert': return new SqlInsert(node.name,children,'insert');
    //         // case 'update': return new SqlUpdate(node.name,children);  
    //         // case 'delete': return new SqlDelete(node.name,children);
    //         default: throw'arrow function : '+node.name+' not supported'; 
    //     } 
    // }
    protected createClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {        
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],schema,context);
        switch(clause.name){
            // case 'map': 
            // case 'first':  return new SqlMap(node.name,children);
            case 'filter': return new SqlFilter(clause.name,[child]);
            case 'having': return new SqlHaving(clause.name,[child]);
            case 'sort':   return new SqlSort(clause.name,[child]);
            // case 'insert': return new SqlInsert(node.name,children,'insert');
            // case 'update': return new SqlUpdate(node.name,children);  
            // case 'delete': return new SqlDelete(node.name,children);
            default: throw 'clause : '+clause.name+' not supported'; 
        } 
        // return this.createArrowFunction(clause,[child]);
    }
    protected createMapClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {
        if(clause.children.length==3){
            context.current.arrowVar = clause.children[1].name;
            let fields = clause.children[2];
            let child =null;
            if(fields.children.length==0 && fields.name == context.current.arrowVar){
                let fields = this.createNodeFields(context.current.entity,schema,'p')
                child = this.nodeToOperand(fields,schema,context);
            }else{
                child = this.nodeToOperand(clause.children[2],schema,context);
            }
            return new SqlMap(clause.name,[child]);  
            // return this.createArrowFunction(clause,[child]);
        }else{
            context.current.arrowVar = 'p';
            let fields = this.createNodeFields(context.current.entity,schema,'p')
            let child = this.nodeToOperand(fields,schema,context);           
            return new SqlMap(clause.name,[child]);
            // return this.createArrowFunction(clause, [child]);
        }
    }
    protected createInsertClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {   
        let autoincremente:Property|undefined = schema.getAutoincrement(context.current.entity);
        if(clause.children.length== 1){
            let fields = this.createNodeFields(context.current.entity,schema,undefined,false,true)
            let child = this.nodeToOperand(fields,schema,context);
            return new SqlInsert(context.current.metadata.mapping,[child],clause.name,autoincremente);
        }else if(clause.children.length== 2){
            let child = this.nodeToOperand(clause.children[1],schema,context);
            return new SqlInsert(context.current.metadata.mapping,[child],clause.name,autoincremente);
        }
        // }else if(clause.children.length== 3){
        //     context.current.arrowVar = clause.children[1].name;                    
        //     let child = this.nodeToOperand(clause.children[2],schema,context);           
        //     return new SqlInsert(context.current.metadata.mapping,[child]);
        // } 

        // if(operand.children.length== 0){
        //     //Orders.insert() 
        //     let fields = this.createNodeFields(context.current.entity,schema,undefined,false,true)
        //     let child = this.nodeToOperand(fields,schema,context);
        //     operand.children.push(child);
        // }
        // else if(operand.children[0] instanceof SqlVariable){
        //      //Orders.insert(entity)
        //     let fields = this.createNodeFields(context.current.entity,schema,operand.children[0].name,false,true)
        //     operand.children[0] = this.nodeToOperand(fields,schema,context);
        // }
        throw 'Sentence Insert incorrect!!!';
    }
    protected createUpdateClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {      
        if(clause.children.length== 1){
            //Orders.update()
            // In the case that the mapping is not defined, it assumes that the context will be the entity to update
            let fields = this.createNodeFields(context.current.entity,schema,undefined,false,true)
            let child = this.nodeToOperand(fields,schema,context);
            return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);

        }else if(clause.children.length== 2){
            let child:Operand;
            if(clause.children[1].type == 'var'){
                //Orders.update(entity) 
                // In the case that a mapping was not defined but a variable is passed, it is assumed that this variable will be the entity to update
                let fields = this.createNodeFields(context.current.entity,schema,clause.children[1].name,true);
                child = this.nodeToOperand(fields,schema,context);
            }else if(clause.children[1].type == 'obj'){
                //Orders.update({name:'test'}) 
                child = this.nodeToOperand(clause.children[1],schema,context);
            }
            else{
                throw 'Args incorrect in Sentence Update'; 
            }
            return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);
        }
        // else if(clause.children.length== 3){
        //     context.current.arrowVar = clause.children[1].name;                    
        //     let child = this.nodeToOperand(clause.children[2],schema,context);           
        //     return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);
        // }
        throw 'Sentence Update incorrect!!!';
    }    
    /**
     * In the case that a filter is not defined, it is assumed that it will be filtered by the PK
     * @param clause 
     * @param children 
     * @param schema 
     * @param context 
     */
    protected createFilterIfNotExists(clause:Node,children:Operand[],schema:SchemaHelper,context:SqlContext)
    {       
        if(!children.some(p=> p.name=='filter')){ 
            let filter:Operand; 
            if(clause.children.length== 1 )
                //Orders.delete() 
                filter = this.createFilter(context.current.entity,schema,context);
            else if(clause.children.length== 2 && clause.children[1].type == 'var')
                //Orders.delete(entity)
                filter = this.createFilter(context.current.entity,schema,context,clause.children[1].name);    
            else
                throw 'Sentence without filter is wrong!!!';
            children.push(filter);
        }        
    }
    protected createFilter(entityName:string,schema:SchemaHelper,context:SqlContext,parent?:string):any
    {
        let condition = undefined;
        let entity=schema.getEntity(entityName);
        for(let i in entity.primaryKey){ 
            let name = entity.primaryKey[i]; 
            let field = entity.property[name];
            let sqlField = new SqlField(entityName,name,field.type,parent?parent + '.' + field.mapping:field.mapping);
            let variable = new SqlVariable(name);
            let equal =new SqlOperator('==', [sqlField,variable]);
            condition =condition?new SqlOperator('&&', [condition,equal]):equal;
        }
        if(condition){
            return new SqlFilter('filter',[condition]);
        }
        throw 'Create Filter incorrect!!!';
    }
    protected createSelectInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if(node.type =='arrow'){
            //resuelve el siguiente caso  .includes(details.map(p=>p))     
            let current = node;
            while (current) {
                if(current.type == 'var'){
                    //p.details
                    let parts = current.name.split('.');
                    relationName=parts[1];
                    relation = context.current.metadata.relation[relationName];                            
                    current.name = relation.entity;
                    break;
                }
                if (current.children.length > 0)
                    current = current.children[0];
                else
                    break;
            }
            child = this.createSentence(node, schema, context);
        } else if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en .include(p=> p.details.map(p=>p))      
            let varArrow = new Node('p', 'var', []);
            let varAll = new Node('p', 'var', []);
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('map','arrow',[node,varArrow,varAll]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        } 
        let toEntity=schema.getEntity(relation.entity);
        let toField = toEntity.property[relation.to];
        let fieldRelation = new SqlField(relation.entity,relation.to,toField.type,child.alias + '.' + toField.mapping);
        let variableName = 'list_'+relation.to;        
        let varRelation = new SqlVariable(variableName);
        let filterInclude =new SqlFunctionRef('includes', [fieldRelation,varRelation]);
        let childFilter= child.children.find(p=> p.name == 'filter');
        if(!childFilter){
            let childFilter = new SqlFilter('filter',[filterInclude]);
            child.children.push(childFilter);
        }else{
            childFilter.children[0] =new SqlOperator('&&', [childFilter.children[0],filterInclude]);
        }
        child.parameters.push({name:variableName,type:'array'});
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }
    protected createInsertInclude(node:Node,schema:SchemaHelper,context:SqlContext,clause:string='insert'):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en Details.insert()      
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node(clause,'childFunc',[node]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        } 
        let variableName = relation.to;
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }
    protected createBulkInsertInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
       return this.createInsertInclude(node,schema,context,'bulkInsert');
    }
    protected createUpdateInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details)  
            // entones agregar map(p=>p) a la variable convirtiendolo en Details.update()      
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('update','childFunc',[node]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        } 
        let variableName = relation.to;
        return new SqlSentenceInclude(relationName,[child],relation,variableName);
    }
    protected createDeleteInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    {   
        let child:SqlSentence,relation:any,relationName:string="";
        if (node.type == 'var') {
            // resuelve el caso que solo esta la variable que representa la relacion , ejemplo: .include(p=> p.details) 
            let parts = node.name.split('.');
            relationName=parts[1];
            relation = context.current.metadata.relation[relationName];
            node.name = relation.entity;
            let map = new Node('delete','childFunc',[node]);
            child = this.createSentence(map, schema, context);
        }else{
            throw 'Error to add include node '+node.type+':'+node.name; 
        }
        return new SqlSentenceInclude(relationName,[child],relation,relation.to);
    }
    protected createNodeFields(entityName:string,schema:SchemaHelper,parent?:string,excludePrimaryKey:boolean=false,excludeAutoincrement:boolean=false):any
    {
        let obj = new Node('obj', 'obj', []);
        let entity=schema.getEntity(entityName);
        for(let name in entity.property){
            let property = entity.property[name];
            if((!property.autoincrement || !excludeAutoincrement) && (!entity.primaryKey.includes(property.name) || !excludePrimaryKey) ){
                let field = new Node(parent?parent+'.'+name:name, 'var', []);
                let keyVal = new Node(name, 'keyVal', [field])
                obj.children.push(keyVal);
            }
        }
        return obj;
    } 
    protected addJoins(parts:string[],to:number,context:SqlContext):string
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
    protected createAlias(context:SqlContext,name:string,relation?:string):string
    {
        let c= name.charAt(0).toLowerCase();
        let alias = c;
        for(let i=1;context.aliases[alias];i++)alias=alias+i;
        context.aliases[alias] = relation?relation:name;
        return alias;        
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
    protected fieldsInSelect(operand:Operand):Property[]
    {       
        let fields:Property[] = [];
        if(operand.children.length==1){
            if(operand.children[0] instanceof SqlObject){
                let obj = operand.children[0];
                for(let p in obj.children){
                    let keyVal = obj.children[p];
                    if(keyVal.children[0] instanceof SqlField){
                        let _field = keyVal.children[0] as SqlField
                        let field = {name:keyVal.name,type:_field.type};
                        fields.push(field);
                    }else{
                        let field = {name:keyVal.name,type:'any'};
                        fields.push(field); 
                    }                  
                }    
            }else if(operand.children[0] instanceof SqlArray){
                let array = operand.children[0];
                for(let i=0;i< array.children.length;i++){
                    let element = array.children[i];
                    if(element instanceof SqlField){
                        let parts =element.name.split('.');
                        let _field = element as SqlField                        
                        let field = {name:parts[parts.length-1],type:_field.type};
                        fields.push(field);
                    }else{
                        let field = {name:'field'+i,type:'any'};
                        fields.push(field);
                    } 
                }    
            }else if(operand.children[0] instanceof SqlField){
                let parts =operand.children[0].name.split('.');
                let _field = operand.children[0]  as SqlField 
                let field = {name:parts[parts.length-1],type:_field.type};
                fields.push(field);
            }
            else{
                let field = {name:'field0',type:'any'};
                fields.push(field);
            }  
        }
        return fields;
    }
    /**
    * change name of property by mapping and return fields for clause update or insert
    * @param operand clause update or update
    * @param context current sqlContext
    * @returns fields to execute query
    */
    protected fieldsInModify(operand:Operand,context:SqlContext):Property[]
    {       
        let fields:Property[] = [];
        if(operand.children.length==1){
            if(operand.children[0] instanceof SqlObject){
                let obj = operand.children[0];
                for(let p in obj.children){
                    let keyVal = obj.children[p] as SqlKeyValue;
                    let property =context.current.metadata.property[keyVal.name];
                    let field = {name:keyVal.name,type:property.type};
                    keyVal.field = new SqlField(context.current.entity,property.name,property.type,property.mapping);                    
                    fields.push(field);                  
                }    
            } 
        }
        return fields;
    }
    protected parametersInSentence(children:Operand[]):Parameter[]
    {
        let map =  children.find(p=> p.name=='map');   
        let first = children.find(p=> p.name=='first');
        let select = map?map:first; 
        let filter = children.find(p=> p.name=='filter'); 
        let groupBy = children.find(p=> p.name=='groupBy');
        let having = children.find(p=> p.name=='having'); 
        let sort = children.find(p=> p.name=='sort'); 
        let insert = children.find(p=> p instanceof SqlInsert) as SqlInsert|undefined;
        let update = children.find(p=> p instanceof SqlUpdate) as SqlUpdate|undefined;
        let _delete = children.find(p=> p instanceof SqlDelete) as SqlDelete|undefined;

        let parameters:Parameter[]=[];
        if(select)this.loadParameters(select,parameters);
        if(insert)this.loadParameters(insert,parameters);
        if(update)this.loadParameters(update,parameters);
        if(_delete)this.loadParameters(_delete,parameters);
        if(filter)this.loadParameters(filter,parameters);
        if(groupBy)this.loadParameters(groupBy,parameters);
        if(having)this.loadParameters(having,parameters);
        if(sort)this.loadParameters(sort,parameters);
        return parameters;
    }
    protected loadParameters(operand:Operand,parameters:Parameter[])
    {        
        if(operand instanceof SqlVariable)
            parameters.push({name:operand.name,type:operand.type});
        for(let i=0;i<operand.children.length;i++ )
            this.loadParameters(operand.children[i],parameters);
    }

    //TODO: determinar el tipo de la variable de acuerdo a la expression.
    //si se usa en un operador con que se esta comparando.
    //si se usa en una funcion que tipo corresponde de acuerdo en la posicion que esta ocupando.
    //let type = this.solveType(operand,childNumber);
    protected solveTypes(operand:Operand,context:SqlContext):string
    {        
        if(operand instanceof SqlConstant || operand instanceof SqlField || operand instanceof SqlVariable)return operand.type;
        if(operand instanceof SqlUpdate || operand instanceof SqlInsert){
            if(operand.children.length==1){
                if(operand.children[0] instanceof SqlObject){
                    let obj = operand.children[0];
                    for(let p in obj.children){
                        let keyVal = obj.children[p] as SqlKeyValue;
                        let property =context.current.metadata.property[keyVal.name];
                        if(keyVal.children[0].type== 'any')
                            keyVal.children[0].type=property.type;
                    }    
                } 
            }
        }
        if(operand instanceof SqlOperator || operand instanceof SqlFunctionRef){
            let tType='any';
            // get metadata of operand
            const metadata = operand instanceof SqlOperator?
                                this.languageModel.getOperator(operand.name,operand.children.length):
                                this.languageModel.getFunction(operand.name);


            //recorre todos los parametros 
            for(let i=0;i<metadata.params.length;i++ ){  
                const param = metadata.params[i];
                const child = operand.children[i]; 
                //en el caso que el pametro tenga un tipo defido y el hijo no, asigna al hijo el tipo del parametro
                if(param.type != 'T' && param.type != 'any' && child.type == 'any'){
                    child.type = param.type;
                }
                //en el caso que el pametro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
                else if(param.type == 'T' && child.type != 'any'){
                    tType=child.type;
                }
                //en el caso que el pametro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
                // en caso de lograrlo determina que T es el tipo de hijo
                else if(param.type == 'T' && child.type == 'any'){
                    const childType = this.solveTypes(child,context);
                    if(childType!='any'){
                        tType = childType;
                        break;
                    }
                }
            }
            // en el caso que se haya podido resolver T 
            if(tType != 'any'){
                //en el caso que el operando sea T asigna el tipo correspondiente al operando
                if(metadata.return =='T' && operand.type == 'any')
                    operand.type = tType;
                //busca los parametros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
                for(let i=0;i<metadata.params.length;i++ ){  
                    const param = metadata.params[i];
                    const child = operand.children[i];
                    if(param.type == 'T' && child.type == 'any'){
                        child.type=tType;
                    }      
                }
            }
        }        
        // recorre todos los hijos para resolver el tipo
        for(let i=0;i<operand.children.length;i++ )  
            this.solveTypes(operand.children[i],context);
        
        return operand.type; 
    }
}