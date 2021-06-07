import {Node,Context,Operand} from '../../base'
import Connection  from './../../connection/base'
import Language from '../language'
import SqlScheme from './scheme'
import { SqlConstant,SqlVariable,SqlField,SqlKeyValue,SqlArray,SqlObject,SqlOperator,SqlFunctionRef,SqlArrowFunction,SqlBlock,
SqlSentence,SqlFrom,SqlJoin,SqlMap,SqlFilter,SqlGroupBy,SqlHaving,SqlSort,SqlInsert,SqlInsertFrom,SqlUpdate,SqlUpdateFrom,SqlDelete,
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
    public compile(node:Node,scheme?:any,variant?:string):Operand
    {
        try{
            let context = {aliases:{},current:null};
            let sqlScheme = new SqlScheme(scheme);
            let operand = this.nodeToOperand(node,sqlScheme,context);
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
    public run(operand:Operand,context:any,connection?:Connection):any
    {          
        return this.execute(operand as SqlQuery,context,connection);
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
    protected execute(query:SqlQuery,context:Context,connection?:Connection):any
    {           
        let mainResult = this.executeQuery(query,context,connection);
        for(const p in query.children){
            let include = query.children[p] as SqlSentenceInclude;
            if(!context.contains(include.variable)){
                let ids = [];
                for(let i=0;i< mainResult.length;i++){
                    let id = mainResult[i][include.relation.from];
                    if(!ids.includes(id))
                    ids.push(id)
                }
                context.set(include.variable,ids);
            }
            let includeResult= this.execute(include.children[0] as SqlQuery,context,connection);
            for(let i=0;i< mainResult.length;i++){
                let element = mainResult[i];
                let relationId = element[include.relation.from];
                mainResult[i][include.relation.name] = (include.relation.type== 'manyToOne')
                                                        ?includeResult.filter(p => p[include.relation.to.property] == relationId)
                                                        :includeResult.find(p => p[include.relation.to.property] == relationId)
                                                        
            }            
        }
        return mainResult;
    }
    protected executeQuery(query:SqlQuery,context:Context,connection?:Connection):any[]
    {   
        let params=[];
        for(const p in query.variables)
            params.push(context.get(p));

        let records = connection.query(query.sentence,params);

        let list =[];
        for(let i=0;i< records.length;i++){
            let record = records[i];
            let obj={};
            for(let j=0;j< record.length;j++){
                let value = record[j];
                let name = query.columns[j];
                obj[name]= value;                
            }
            list.push(obj);
        }
        return list;
    }
    protected _serialize(operand:Operand){
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
    protected createOperand(node:Node,children:Operand[],scheme:SqlScheme,context:any):Operand
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
                            let field= scheme.field(context.current.entity,parts[1]);
                            if(field){
                                return new SqlField(context.current.alias+'.'+field); 
                            }else{
                                let relationInfo= scheme.getRelation(context.current.entity,parts[1]);
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
                        let info = scheme.getRelation(context.current.entity,relation);                        
                        let relationAlias=context.current.joins[relation];
                        let relationField = info.relationScheme.properties[propertyName].field; 
                        if(relationField){
                            return new SqlField(relationAlias+'.'+relationField);
                        }else{
                            let relationName = info.relationScheme.relations[propertyName];
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
                case 'insertFrom': return new SqlInsertFrom(node.name,children);
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
    protected createClause(clause:Node,scheme:SqlScheme,context:any):Operand
    {        
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],scheme,context);
        return this.createArrowFunction(clause,[child]);
    }
    protected createMapClause(clause:Node,scheme:SqlScheme,context:any):Operand
    {
        if(clause.children.length==3){
            context.current.arrowVar = clause.children[1].name;
            let fields = clause.children[2];
            let child =null;
            if(fields.children.length==0 && fields.name == context.current.arrowVar){
                let fields = this.createNodeFields(context.current.entity,'p',scheme)
                child = this.nodeToOperand(fields,scheme,context);
            }else{
                child = this.nodeToOperand(clause.children[2],scheme,context);
            }  
            return this.createArrowFunction(clause,[child]);
        }else{
            context.current.arrowVar = 'p';
            let fields = this.createNodeFields(context.current.entity,'p',scheme)
            let child = this.nodeToOperand(fields,scheme,context);
            return this.createArrowFunction(clause, [child]);
        }
    }
    protected createNodeFields(entityName:string,arrowVar:string,scheme:SqlScheme):any
    {
        let obj = new Node('obj', 'obj', []);
        let entity=scheme.getEntity(entityName);
        for(let name in entity.properties){
            let field = new Node(arrowVar+'.'+name, 'var', []);
            let keyVal = new Node(name, 'keyVal', [field])
            obj.children.push(keyVal);
        }
        return obj;
    }
    protected addIncludes(node:Node,scheme:SqlScheme,context:any):any
    {
        let child:SqlSentence,relation:any,relationName:string;        
        let sentence = this.nodeToOperand(node.children[0],scheme,context) as SqlSentence;
        let mainEntity=scheme.getEntity(sentence.entity);
        // children.push(main);
        for (let i=1; i< node.children.length;i++) {
            let p = node.children[i]; 
            if(p.type =='arrow'){
                let current = p;
                while (current) {
                    if(current.type == 'var'){
                        relationName=current.name;
                        relation = mainEntity.relations[relationName];                            
                        current.name = relation.to.entity;
                        break;
                    }
                    if (current.children.length > 0)
                        current = current.children[0];
                    else
                        break;
                }
                child = this.nodeToOperand(p, scheme, context) as SqlSentence;
            }else if (p.type == 'var') {
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []);
                relationName=p.name;
                relation = mainEntity.relations[relationName];
                p.name = relation.to.entity;
                let map = new Node('map','arrow',[p,varArrow,varAll]);
                child = this.nodeToOperand(map, scheme, context) as SqlSentence;
            }else if (p.type == 'childFunc' && p.name == 'includes') {
                let current = p;
                while (current) {
                    if (current.type == 'var') {
                        relationName=current.name;
                        relation = mainEntity.relations[relationName];
                        current.name = relation.to.entity;
                        break;
                    }
                    if (current.children.length > 0)
                        current = current.children[0];
                    else
                        break;
                }
                child= this.addIncludes(p, scheme, context);
            }else{
                throw 'Error to add include node '+p.type+':'+p.name; 
            }            
            let toEntity=scheme.getEntity(relation.to.entity);
            
            let toField = toEntity.properties[relation.to.property].field;

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
            let include = new SqlSentenceInclude(relationName,[child],relation,variableName);
            sentence.includes.push(include);
        }
        return sentence;
    }
    protected createSentence(node:Node,scheme:SqlScheme,context:any):SqlSentence
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
            operand = this.createClause(clause,scheme,context);
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
                let tableName = scheme.table(clause.name);
                operand =new SqlFrom(tableName+'.'+context.current.alias);
                children.push(operand);
            }
            if(sentence['map'] || sentence['first']){
                let clause = sentence['first']?sentence['first']:sentence['map'];
                operand = this.createMapClause(clause,scheme,context);
                context.current.fields = this.fieldsInSelect(operand);
                context.current.groupByFields = this.groupByFields(operand);
                children.push(operand); 
            }else{
                let varEntity = new Node(context.current.entity, 'var', []);
                let varArrow = new Node('p', 'var', []);
                let varAll = new Node('p', 'var', []);               
                let clause = new Node('map','arrow',[varEntity,varArrow,varAll]);
                operand = this.createMapClause(clause,scheme,context);
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
                operand = this.createClause(clause,scheme,context);
                children.push(operand); 
            }
            if(sentence['sort'] ){
                let clause = sentence['sort'];
                operand = this.createClause(clause,scheme,context);
                children.push(operand); 
            }
        }
        for(const key in context.current.joins){

            let info = scheme.getRelation(context.current.entity,key);

            let relatedAlias = info.previousRelation!=''?context.current.joins[info.previousRelation]:context.current.alias;   
            let relatedFieldName = info.previousScheme.properties[info.relationData.from].field;
            let relationTable = info.relationScheme.name;
            let relationAlias =context.current.joins[key];;
            let relationFieldName = info.relationScheme.properties[info.relationData.to.property].field;

            let relatedField = new SqlField(relatedAlias+'.'+relatedFieldName);
            let relationField = new SqlField(relationAlias+'.'+relationFieldName); 
            let equal = new SqlOperator('==',[relationField,relatedField])
            operand = new SqlJoin(relationTable+'.'+relationAlias,[equal]);
            children.push(operand);   
        }
        return new SqlSentence('sentence',children,context.current.entity,context.current.alias,context.current.fields);
    }
    protected nodeToOperand(node:Node,scheme:SqlScheme,context:any):Operand
    {

        if (node.type == 'childFunc' && node.name == 'includes'){
            return this.addIncludes(node,scheme,context);
        }else if(node.type == 'arrow'){
            return this.createSentence(node,scheme,context);
        }else{
            let children = [];
            if(node.children){
                for(const k in node.children){
                    let p = node.children[k];
                    let child = this.nodeToOperand(p,scheme,context);
                    children.push(child);
                }
            }
            return this.createOperand(node,children,scheme,context);
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
        //TODO: hay que resolver si es un obj, un array o un campo y obtener los nombres de los fields que se crean,
        // para poder utilizarlos en el order by.
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
