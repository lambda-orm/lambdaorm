const {Context,Language,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("../base");


class OrmConstant extends Constant
{   
    build(metadata){
        switch (this._type) {
            case 'string':
                return  '\''+this._name+'\'';
            case 'boolean':
                return metadata.other(this._name)     
            default:
                return this._name;
        }
    }
}
class OrmVariable extends Variable
{
    constructor(name,language,children=[]){
        super(name,language,children);
        this._number  = null; 
    }    
    get number(){
        return this._number;
    }
    set number(value){
        this._number=value;
    }
    build(metadata){
        let text = metadata.other('variable');
        text =text.replace('{name}',this._name);
        text =text.replace('{number}',this._number);
        return text;
    }
}

class OrmField extends Operand
{
    build(metadata){
        let parts = this._name.split('.');
        if(parts.length == 1){
            let name = parts[0];
            return metadata.other('column').replace('{name}',name);
        }else{
            let aliasEntity = parts[0];
            let name = parts[1];
            let entity = this._children[0].name;
            let fieldName;
            if (this._children.length==1){
                fieldName = metadata.field(entity,name);
            }else{
                let relation = this._children[1].name;
                let info =  metadata.getRelation(entity,relation);
                fieldName =info.relationScheme.properties[name];
            }        
            let text = metadata.other('field');
            text =text.replace('{enityAlias}',aliasEntity);
            text =text.replace('{name}',fieldName);
            return text;
        }       
    }
}

class OrmKeyValue extends KeyValue
{
    build(metadata){
        return this.children[0].build(metadata);
    }
}
class OrmArray extends Array
{
    build(metadata){
        let text = ''
        for(let i=0;i<this._children.length;i++){
            text += (i>0?', ':'')+this._children[i].build(metadata);              
        }
        return text;
    } 
}
class OrmObject extends Object
{
    build(metadata){       
        let text= '';
        let template = metadata.function('as').template;
        for(let i=0;i<this._children.length;i++){
            let value = this.children[i].build(metadata);
            let fieldText = template.replace('{value}',value);
            fieldText = fieldText.replace('{alias}',this._children[i].name);
            text += (i>0?', ':'')+fieldText;
        }
        return text;
    }
} 
class OrmBlock extends Block
{
    build(metadata){
        let text = ''
        for(let i=0;i<this._children.length;i++){
            text += (this.children[i].build(metadata)+';');    
        }
        return text;
    } 
}
class OrmOperator extends Operator
{
    constructor(name,language,children=[]){
        super(name,language,children);
    }    
    build(metadata){
        let text = metadata.operator(this._name,this._children.length);
        for(let i=0;i<this._children.length;i++){
            text = text.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return text;  
    }
}                             
class OrmFunctionRef extends FunctionRef
{
    constructor(name,language,children=[]){
        super(name,language,children); 
    }    
    build(metadata){       
        let funcData = metadata.function(this._name);
        let text= '';
        if(funcData.type == 'multiple'){
            let template = funcData.template;
            text = this._children[0].build(metadata);    
            for(let i=1;i<this._children.length;i++){
                text =template.replace('{acumulated}',text);
                text = text.replace('{value}',this.children[i].build(metadata));
            }
        }else{
            text = funcData.template;
            for(let i=0;i<this._children.length;i++){
                text =text.replace('{'+i+'}',this.children[i].build(metadata));
            }
        }
        return text;
    }
}


class OrmSentence extends FunctionRef 
{
    constructor(name,language,children=[]){
        super(name,language,children);
        this._fields=null;
    }    
    build(metadata){   

        let map =  this._children.find(p=> p.name=='map');   
        let first = this._children.find(p=> p.name=='first'); 
        let filter = this._children.find(p=> p.name=='filter'); 
        let groupBy = this._children.find(p=> p.name=='groupBy');
        let having = this._children.find(p=> p.name=='having'); 
        let sort = this._children.find(p=> p.name=='sort'); 
        let insert = this._children.find(p=> p.name=='insert'); 
        let insertFrom = this._children.find(p=> p.name=='insertFrom');
        let update = this._children.find(p=> p.name=='update');
        let _delete = this._children.find(p=> p.name=='delete');

        let text = '';
        if(map || first){
            // if(insertFrom) text = insertFrom+' ';
            let from = this._children.find(p=> p instanceof OrmFrom);
            let joins = this._children.filter(p=> p instanceof OrmJoin);
            let aliases = this.getAliases(from,joins); 

            let select = first?first:map;
            text = select.build(metadata) + '\r\n' + this.solveFromAndJoins(from,joins,aliases,metadata);
            // this._fields= select.fields(metadata);
           
        }else if(update){
            text = update;
        }else if(_delete){
            text = _delete;
        }         
        text = text + (filter?filter.build(metadata)+'\r\n':'');
        text = text + (groupBy?groupBy.build(metadata)+'\r\n':'');        
        text = text + (having?having.build(metadata)+'\r\n':'');
        text = text + (sort?sort.build(metadata)+'\r\n':'');
        
        return text;
    }
    solveFromAndJoins(from,joins,aliases,metadata){
        let text = this.solveFrom(from,metadata)+'\r\n';
        joins = joins.sort(p=> p.name);
        for(let i=0;i<joins.length;i++){
            let join = joins[i];
            text= text + this.solveJoin(from,join,aliases,metadata)+'\r\n';
        }
        return text;
    }
    getAliases(from,joins){
        let aliases = {};
        aliases[from.name] = from.children[0].name;
        for(let i=0;i<joins.length;i++){
            let join = joins[i];
            aliases[join.name] = join.children[0].name;
        }
        return aliases;
    }
    solveFrom(from,metadata){
        let template = metadata.other('from');
        let name =metadata.entity(from.name);       
        template =template.replace('{name}',name); 
        template =template.replace('{alias}',from.children[0].name);
        return template;
    }
    solveJoin(from,join,aliases,metadata){

        let info =  metadata.getRelation(from.name,join.name);

        let relatedAlias = info.previousRelation!=''?aliases[info.previousRelation]:aliases[from.name];
        let relatedField = info.previousScheme.properties[info.relationData.from];  

        let relationTable = info.relationScheme.name;
        let relationAlias =aliases[join.name];
        let relationField = info.relationScheme.properties[info.relationData.to.split('.')[1]];
             

        let text = metadata.other('join');           
        text =text.replace('{name}',relationTable); 
        text =text.replace('{alias}',relationAlias);
        text =text.replace('{alias}',relationAlias);
        text =text.replace('{field}',relationField);
        text =text.replace('{relatedAlias}',relatedAlias);
        text =text.replace('{relatedField}',relatedField);
        return text;
    }
        
}

class OrmAlias extends Operand{}
class OrmName extends Operand{}
class OrmFrom extends Operand{}
class OrmJoin extends Operand {}

class OrmArrowFunction extends ArrowFunction 
{
    constructor(name,language,children=[]){
        super(name,language,children); 
    }    
    build(metadata){       
        let template = metadata.function(this._name).template;
        for(let i=0;i<this._children.length;i++){
            template =template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template; 
    }
}
class OrmMap extends OrmArrowFunction {}
class OrmFilter extends OrmArrowFunction {}
class OrmGroupBy extends OrmArrowFunction {}
class OrmHaving extends OrmArrowFunction {}
class OrmSort extends OrmArrowFunction 
{
    // build(metadata){       
    //     let template = metadata.function(this._name).template;
    //     for(let i=0;i<this._children.length;i++){
    //         template =template.replace('{'+i+'}',this.children[i].build(metadata));
    //     }
    //     return template; 
    // }
}
class OrmInsert extends OrmArrowFunction {}
class OrmInsertFrom extends OrmArrowFunction {}
class OrmUpdate extends OrmArrowFunction {}
class OrmUpdateFrom extends OrmArrowFunction {}
class OrmDelete extends OrmArrowFunction {}


class OrmLanguageVariant 
{
    constructor(name){
        this._name = name;
        this._operators={};
        this._functions={};
        this._others={};
    }
    get operators(){return this._operators;}
    get functions(){return this._functions;}
    get others(){return this._others;}

    addVariant(variant){
        for(const type in variant.operators){
            let operands = type == 'ternary'?3:type=='binary'?2:1;
            for(const name in variant.operators[type]){
                let template= variant.operators[type][name];
                if(!this._operators[name])this._operators[name]= {}; 
                this._operators[name][operands] = template;
            }
        }
        for(const name in variant.functions){
            let template = variant.functions[name];
            this._functions[name] = template; 
        }
        for(const name in variant.others){
            let template = variant.others[name];
            this._others[name] = template; 
        }
    }
    getOperatorMetadata(name,operands){
        try{          
            if(this._operators[name]){
                let operator = this._operators[name];
                if(operator[operands])
                    return operator[operands];
            }
            return null
        }            
        catch(error){
            throw 'error with operator: '+name;
        }
    } 
    getFunctionMetadata(name){
        try{
            if(this._functions[name])
                return this._functions[name];
            return null
        }
        catch(error){
            throw 'error with function: '+name;
        }
    }
}

class OrmMetadata
{
    constructor(variant,scheme){
        this._scheme = scheme;
        this._operators=variant.operators;
        this._others=variant.others;
        let functions= {}
        for(const type in variant.functions){
            let list = variant.functions[type];            
            for(const name in list){
                functions[name] = {type:type,template:list[name]}
            } 
        }
        this._functions =functions; 
    }
    operator(name,operands){
        return this._operators[name][operands];
    }
    function(name){
        return this._functions[name];
    }
    other(name){
        return this._others[name];
    }
    field(entityName,name){
        let entity =this.getEntity(entityName);
        if(!entity)return name;
        let propertyName =entity.properties[name];
        return propertyName?propertyName:name
    }
    entity(name){
        let entity =this.getEntity(name);
        return entity?entity.name:name;
    }
    getEntity(name){
        if(!this._scheme)return null;
        return this._scheme.entity[name];
    }
    getRelation(entity,relation){
        let previousEntity,previousScheme,relationData,relationEntity,relationScheme;
        let parts = relation.split('.');   
        for(let i=0;i<parts.length;i++){
            let part = parts[i];
            if(i==0){
                previousEntity = entity;
                previousScheme =this.getEntity(previousEntity);
            }else{
                previousEntity = relationEntity;
                previousScheme =relationScheme
            }                      
            relationData= previousScheme.relations[part];
            relationEntity = relationData.to.split('.')[0];
            relationScheme = this.getEntity(relationEntity);
        }

        return {
            previousRelation: parts.length>1?parts.slice(0,parts.length-1).join('.'):'',
            previousScheme: previousScheme,
            relationScheme: relationScheme,
            relationData: relationData
        };

    }
}


class OrmLanguage extends Language
{
    constructor(){
        super('orm');
        this._variants={};
    }
    addLibrary(library){
        this._libraries[library.name] =library;

        for(const p in library.variants){
            let data =  library.variants[p];
            let variant = new OrmLanguageVariant(data.variant);
            variant.addVariant(data);
            this._variants[data.variant] =variant 
        }
    }
    createAlias(context,name,relation=null){
        let c= name.charAt(0).toLowerCase();
        let alias = c;
        for(let i=1;context.aliases[alias];i++)alias=alias+i;
        context.aliases[alias] = relation?relation:name;
        return alias;        
    }    
    createOperand(node,children,context){
        switch(node.type){
            case 'const':
                return new OrmConstant(node.name,this._name,children);
            case 'var':
                let parts = node.name.split('.');
                if(parts[0] == context.current.arrowVar){
                    if(parts.length > 2){
                        let relation = '';
                        for(let i=1;i<parts.length-1;i++){
                            relation= (i>1?relation+'.':'')+parts[i];
                            if(!context.current.joins[relation]){
                                context.current.joins[relation] = this.createAlias(context,parts[i],relation);;
                            }
                        }
                        let entity = new OrmName(context.current.entity,this._name);
                        let ormRelation = new OrmName(relation,this._name);
                        let relationAlias=context.current.joins[relation]; 
                        return new OrmField(relationAlias+'.'+parts[parts.length-1],this._name,[entity,ormRelation]);
                    }
                    else{
                        let fieldName = parts[1];
                        let entity = new OrmName(context.current.entity,this._name);
                        if(context.current.fields.includes(fieldName)){
                            return new OrmField(fieldName,this._name,[entity]); 
                        }else{
                            return new OrmField(context.current.alias+'.'+fieldName,this._name,[entity]); 
                        }    
                    }
                }
                else
                    return new  OrmVariable(node.name,this._name,children);                           
            case 'keyVal':
                return new OrmKeyValue(node.name,this._name,children);
            case 'array':
                return new OrmArray(node.name,this._name,children);
            case 'obj':
                return new OrmObject(node.name,this._name,children);
            case 'oper':
                return new OrmOperator(node.name,this._name,children);
            case 'funcRef':
                return new OrmFunctionRef(node.name,this._name,children);
            case 'block':
                return  new OrmBlock(node.name,this._name,children);
            default:
                throw 'node name: '+node.name +' type: '+node.type+' not supported';
        }
    }    
    createArrowFunction(node,children){
        try{
            switch(node.name){
                case 'map': 
                case 'first': 
                    return new OrmMap(node.name,this._name,children);
                case 'filter': 
                    return new OrmFilter(node.name,this._name,children);
                case 'having': 
                    return new OrmHaving(node.name,this._name,children);
                case 'sort': 
                    return new OrmSort(node.name,this._name,children);
                case 'insert': return new OrmInsert(node.name,this._name,children);
                case 'insertFrom': return new OrmInsertFrom(node.name,this._name,children);
                case 'update': return new OrmUpdate(node.name,this._name,children);
                case 'updateFrom': return new OrmUpdateFrom(node.name,this._name,children);
                case 'delete': return new OrmDelete(node.name,this._name,children);
                default:
                    throw'arrow function : '+node.name+' not supported'; 
            }            
        } 
        catch(error){
            throw'cretae arrow function: '+node.name+' error: '+error.toString(); 
        }
    }
    createClause(clause,context){
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],context);
        return this.createArrowFunction(clause,[child]);
    }
    nodeToOperand(node,context){

        if(node.type == 'arrow'){
            context.current = {parent:context.current,children:[],joins:{},fields:[],groupByFields:[]};
            if(context.parent)
               context.parent.children.push(context.current);            

            let sentence = {}; 
            let current = node;
            while(current){
                let name =current.type == 'var'?'from':current.name;

                sentence[name] =  current;
                if(current.children.length > 0)
                   current = current.children[0]
                else
                  current=null;  
            }            
            context.current.entity=sentence.from.name;
            context.current.alias = this.createAlias(context,context.current.entity);            
            let children = [];
            let operand= null;

            if(sentence['from']){
                let clause = sentence['from'];
                let alias = new OrmAlias(context.current.alias,this._name);
                operand =new OrmFrom(clause.name,this._name,[alias]);
                children.push(operand);
            }
            if(sentence['filter'] ){
                let clause = sentence['filter'];
                operand = this.createClause(clause,context);
                children.push(operand); 
            }
            if(sentence['map'] || sentence['first']){
                let clause = sentence['first']?sentence['first']:sentence['map'];
                operand = this.createClause(clause,context);
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
                    operand = new OrmGroupBy('groupBy',this._name,fields);
                }else{
                    let array = new OrmArray('array',this._name,fields);
                    operand = new OrmGroupBy('groupBy',this._name,array);
                } 
                children.push(operand); 
            }
            if(sentence['having']){
                let clause = sentence['having'];
                operand = this.createClause(clause,context);
                children.push(operand); 
            }
            if(sentence['sort'] ){
                let clause = sentence['sort'];
                operand = this.createClause(clause,context);
                children.push(operand); 
            }            
            // for(const key in sentence){
            //     let clause = sentence[key];
            //     context.current.arrowVar = clause.children[1].name;                    
            //     let child = this.nodeToOperand(clause.children[2],context);
            //     operand = this.createArrowFunction(clause,[child]);
            //     children.push(operand);
            // }
            for(const key in context.current.joins){                
                let alias = new OrmAlias(context.current.joins[key],this._name);
                let entity = new OrmName(context.current.entity,this._name);
                let entityAlias = new OrmAlias(context.current.alias,this._name);                
                let operand = new OrmJoin(key,this._name,[alias,entity,entityAlias]);
                children.push(operand);
            }
            return new OrmSentence('sentence',this._name,children,null);

        }else{
            let children = [];
            if(node.children){
                for(const k in node.children){
                    let p = node.children[k];
                    let child = this.nodeToOperand(p,context);
                    children.push(child);
                }
            }
            return this.createOperand(node,children,context);
        }
    }
    groupByFields(operand){
        let data = {fields:[],groupBy:false};
        this._groupByFields(operand,data);
        return data.groupBy?data.fields:[]; 
    }
    _groupByFields(operand,data){
        if(operand instanceof OrmField){
            data.fields.push(operand);
        }else if(operand instanceof OrmFunctionRef && ['sum','count'].includes(operand.name)){
            data.groupBy = true;
        }else if(!(operand instanceof OrmSentence)){
            for(const k in operand.children){
                let p = operand.children[k];
                this._groupByFields(p,data);
            }
        }
    }
    clone(obj){
        let children = [];
        if(obj.children){
            for(const k in obj.children){
                let p = obj.children[k];
                let child = this.clone(p);
                children.push(child);
            }
        }
        return new obj.constructor(obj.name,this._name,children);
    } 
    
    fieldsInSelect(operand){
        //TODO: hay que resolver si es un obj, un array o un campo y obtener los nombres de los fields que se crean,
        // para poder utilizarlos en el order by.
        let fields = [];
        if(operand.children.length==1){
            if(operand.children[0] instanceof OrmObject){
                let obj = operand.children[0];
                for(let p in obj.children){
                    let keyVal = obj.children[p];
                    fields.push(keyVal.name); 
                }    
            }else if(operand.children[0] instanceof OrmArray){
                let array = operand.children[0];
                for(let i=0;i< array.children.length;i++){
                    let element = array.children[i];
                    if(element instanceof OrmField){
                        let parts =element.name.split('.');
                        fields.push(parts[parts.length-1]);
                    }else{
                        fields.push('field'+i);
                    } 
                }    
            }else if(operand.children[0] instanceof OrmField){
                let parts =operand.children[0].name.split('.');
                fields.push(parts[parts.length-1]);
            }
            else{
                fields.push('field0');
            }  
        }
        return fields;
        
    }
    reduce(operand){
        //TODO
        return operand;
    } 

    build(operand,metadata){

        if( operand.prototype instanceof ArrowFunction){

        }
    }

    setContext(operand,context){
        let current = context;
        if( operand.prototype instanceof ArrowFunction){
            let childContext=current.newContext();
            operand.context = childContext;
            current = childContext;
        }
        else if(operand.prototype instanceof Variable){
            operand.context = current;
        }       
        for(const k in operand.children){
            const p = operand.children[k];
            this.setContext(p,current);
        } 
    }
    
    execute(sentence,context,cnx){
        //TODO
        return [];
    }
    compile(node){
        let context = {aliases:{},current:null};
        let operand = this.nodeToOperand(node,context);
        operand = this.reduce(operand);
        operand =this.setParent(operand);
        return operand;
    }
    sentence(operand,scheme,variant){
        let _variant = this._variants[variant];
        let metadata = new OrmMetadata(_variant,scheme);  
        return operand.build(metadata);
    }
    run(operand,context,scheme,cnx){          
        let sentence = this.sentence(operand,scheme,cnx.variant);
        return this.execute(sentence,context,cnx);
    }
}


module.exports = {   
    OrmKeyValue: OrmKeyValue,
    OrmArray: OrmArray,
    OrmObject: OrmObject,
    OrmOperator: OrmOperator,
    OrmFunctionRef: OrmFunctionRef,
    OrmArrowFunction: OrmArrowFunction,
    OrmBlock: OrmBlock,
    OrmLanguage: OrmLanguage
}