import {Property,Operand,Parameter} from './../../model'
import {Helper} from '../../helper'
import {Node,Model} from '../../node/index'
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
    public groupByFields:SqlField[]
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
            let metadata = this.language.metadata(dialect);
            let sqlSquery = this.createQuery(operand as SqlSentence,metadata);            
            return this.setParent(sqlSquery);
        } 
        catch(error){
            console.error(error);
            throw error; 
        }
    }
    public sentence(operand:Operand):any
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
    public reduce(operand:Operand):Operand
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
        let sentence:any = this.getSentence(node);
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
        if (sentence['insert']){
            name='insert';
            createInclude= this.createInclude;
            let clause = sentence['insert'] as Node;           
            operand= this.createInsertClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            children.push(operand);
        }else if (sentence['bulkInsert']){
            name='bulkInsert';
            createInclude= this.createInclude;
            let clause = sentence['bulkInsert'] as Node;           
            operand= this.createInsertClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            children.push(operand);  
        }
        else if (sentence['update']){
            name='update';
            createInclude= this.createInclude;
            let clause = sentence['update'] as Node;           
            operand= this.createUpdateClause(clause,schema,context);
            context.current.fields = this.fieldsInModify(operand,context);
            children.push(operand);            
        }else if(sentence['delete']){
            name='delete';
            createInclude= this.createInclude;
            let clause = sentence['delete'];
            operand =new SqlDelete(context.current.metadata.mapping+'.'+context.current.alias);
            children.push(operand);             
        }else if(sentence['map'] ){
            name='select';
            createInclude= this.createSelectInclude;
            let clause = sentence['map'];
            operand = this.createMapClause(clause,schema,context);
            context.current.fields = this.fieldsInSelect(operand);
            context.current.groupByFields = this.groupByFields(operand);
            children.push(operand); 
            
            if(context.current.groupByFields.length>0){
                let fields = [];
                for(let i=0;i<context.current.groupByFields.length;i++){
                    let groupByField = context.current.groupByFields[i].clone();
                    fields.push(groupByField);
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
            if (body.type == 'array')
                for (let i=0; i< body.children.length;i++) 
                    children.push(createInclude.bind(this)(body.children[i],schema,context));
            else
                children.push(createInclude.bind(this)(body,schema,context));
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
    protected createClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {        
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],schema,context);
        switch(clause.name){
            case 'filter': return new SqlFilter(clause.name,[child]);
            case 'having': return new SqlHaving(clause.name,[child]);
            case 'sort':   return new SqlSort(clause.name,[child]);
            // case 'limit': ;
            // case 'offset': ;
            default: throw 'clause : '+clause.name+' not supported'; 
        }
    }
    protected createMapClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {
        if(clause.children.length==3){
            context.current.arrowVar = clause.children[1].name;
            let child = this.nodeToOperand(clause.children[2],schema,context);
            return new SqlMap(clause.name,[child]); 
        }
        throw 'Sentence Map incorrect!!!';
    }
    protected createInsertClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    {  
        if(clause.children.length== 2){
            if(clause.children[1].type == 'obj'){
                let autoincremente:Property|undefined = schema.getAutoincrement(context.current.entity);
                let child = this.nodeToOperand(clause.children[1],schema,context);
                return new SqlInsert(context.current.metadata.mapping,[child],clause.name,autoincremente);
            }
            else
                throw 'Args incorrect in Sentence Insert'; 
        }
        throw 'Sentence Insert incorrect!!!';       
    }
    protected createUpdateClause(clause:Node,schema:SchemaHelper,context:SqlContext):Operand
    { 
        if(clause.children.length== 2){
            if(clause.children[1].type == 'obj'){
                //Example: Orders.update({name:'test'}) 
                let child = this.nodeToOperand(clause.children[1],schema,context);
                return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);
            }
            else
                throw 'Args incorrect in Sentence Update';
        }
        else if(clause.children.length== 3){
            //Example: Orders.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
            context.current.arrowVar = clause.children[1].name;                    
            let child = this.nodeToOperand(clause.children[2],schema,context);           
            return new SqlUpdate(context.current.metadata.mapping+'.'+context.current.alias,[child]);
        }
        throw 'Sentence Update incorrect!!!';
    }
    protected createSelectInclude(node:Node,schema:SchemaHelper,context:SqlContext,clause:string='map'):SqlSentenceInclude
    {  
        let relation:any
        let current = node;
        while (current) {
            if(current.type == 'var'){
                //p.details
                let parts = current.name.split('.');
                let relationName=parts[1];
                relation = context.current.metadata.relation[relationName];                            
                current.name = relation.entity;
                break;
            }
            if (current.children.length > 0)
                current = current.children[0];
            else
                break;
        }
        let child = this.createSentence(node, schema, context);
        let variableName = 'list_'+relation.to;
        return new SqlSentenceInclude(relation.name,[child],relation,variableName);
    }    
    protected createInclude(node:Node,schema:SchemaHelper,context:SqlContext):SqlSentenceInclude
    { 
        let child:SqlSentence,relation:any,relationName:string="";
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
        return new SqlSentenceInclude(relationName,[child],relation,relation.to); 
    }
    protected getSentence(node:Node):any
    {
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
        return sentence; 
    }
    protected addJoins(parts:string[],to:number,context:SqlContext):string
    {
        let relation = '';
        for(let i=1;i<to;i++){
            relation= (i>1?relation+'.':'')+parts[i];
            if(!context.current.joins[relation])
                context.current.joins[relation] = this.createAlias(context,parts[i],relation);
        }
        return relation;
    }    
    protected groupByFields(operand:Operand):SqlField[]
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
        let filter = children.find(p=> p.name=='filter'); 
        let groupBy = children.find(p=> p.name=='groupBy');
        let having = children.find(p=> p.name=='having'); 
        let sort = children.find(p=> p.name=='sort'); 
        let insert = children.find(p=> p instanceof SqlInsert) as SqlInsert|undefined;
        let update = children.find(p=> p instanceof SqlUpdate) as SqlUpdate|undefined;
        let _delete = children.find(p=> p instanceof SqlDelete) as SqlDelete|undefined;

        let parameters:Parameter[]=[];
        if(map)this.loadParameters(map,parameters);
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
        if(operand instanceof SqlVariable){
            let type:string;
            if(operand.type=='')type='any';
            else if(operand.type=='T[]')type='array';
            else type=operand.type;

            parameters.push({name:operand.name,type:type});
        }           
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