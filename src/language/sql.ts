import {Node,Context,Language,Operand,Constant,Variable,KeyValue,Array,Obj,Operator,FunctionRef,ArrowFunction,Block} from '../base'


class SqlConstant extends Constant
{   
    build(metadata:SqlLanguageVariant){ 
        switch (this.type) {
            case 'string':
                return  '\''+this.name+'\'';
            case 'boolean':
                return metadata.other(this.name)     
            default:
                return this.name;
        }
    }
}
class SqlVariable extends Variable
{
    public _number?:number    
    constructor(name:string,children:Operand[]=[]){
        super(name,children);
        this._number  = null; 
    }    
    
    build(metadata:any){
        let text = metadata.other('variable');
        text =text.replace('{name}',this.name);
        text =text.replace('{number}',this._number);
        return text;
    }
}

class SqlField extends Operand
{
    build(metadata:SqlLanguageVariant){ 
        let parts = this.name.split('.');
        if(parts.length == 1){
            let name = parts[0];
            return metadata.other('column').replace('{name}',name);
        }else{
            let aliasEntity = parts[0];
            let name = parts[1];
            let text = metadata.other('field');
            text =text.replace('{enityAlias}',aliasEntity);
            text =text.replace('{name}',name);
            return text;
        }       
    }
}

class SqlKeyValue extends KeyValue
{
    build(metadata):any
    {
        return this.children[0].build(metadata);
    }
}
class SqlArray extends Array
{
    build(metadata:SqlLanguageVariant){ 
        let text = ''
        for(let i=0;i<this.children.length;i++){
            text += (i>0?', ':'')+this.children[i].build(metadata);              
        }
        return text;
    } 
}
class SqlObject extends Obj
{
    build(metadata:SqlLanguageVariant){       
        let text= '';
        let template = metadata.function('as').template;
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].build(metadata);
            let fieldText = template.replace('{value}',value);
            fieldText = fieldText.replace('{alias}',this.children[i].name);
            text += (i>0?', ':'')+fieldText;
        }
        return text;
    }
} 
class SqlBlock extends Block
{
    build(metadata:SqlLanguageVariant){ 
        let text = ''
        for(let i=0;i<this.children.length;i++){
            text += (this.children[i].build(metadata)+'\n;');    
        }
        return text;
    } 
}
class SqlOperator extends Operator
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children);
    }    
    build(metadata:SqlLanguageVariant){ 
        let text = metadata.operator(this.name,this.children.length);
        for(let i=0;i<this.children.length;i++){
            text = text.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return text;  
    }
}                             
class SqlFunctionRef extends FunctionRef
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
    }    
    build(metadata:SqlLanguageVariant){       
        let funcData = metadata.function(this.name);
        let text= '';
        if(funcData.type == 'multiple'){
            let template = funcData.template;
            text = this.children[0].build(metadata);    
            for(let i=1;i<this.children.length;i++){
                text =template.replace('{acumulated}',text);
                text = text.replace('{value}',this.children[i].build(metadata));
            }
        }else{
            text = funcData.template;
            for(let i=0;i<this.children.length;i++){
                text =text.replace('{'+i+'}',this.children[i].build(metadata));
            }
        }
        return text;
    }
}

class SqlCompose extends FunctionRef
{
    build(metadata:SqlLanguageVariant){
        let text = ''
        for(let i=0;i<this.children.length;i++){
            text += (this.children[i].build(metadata).trim()+'\n;\n');    
        }        
        return text;
    } 
}

class SqlSentence extends FunctionRef 
{
    public fields:string[]
    public entity:string
    public alias:string

    constructor(name:string,children:Operand[]=[],entity:string,alias:string,fields:string[]){
        super(name,children);
        this.entity=entity;
        this.alias=alias;
        this.fields=fields;
    }    
    build(metadata:SqlLanguageVariant){   

        let map =  this.children.find(p=> p.name=='map');   
        let first = this.children.find(p=> p.name=='first'); 
        let filter = this.children.find(p=> p.name=='filter'); 
        let groupBy = this.children.find(p=> p.name=='groupBy');
        let having = this.children.find(p=> p.name=='having'); 
        let sort = this.children.find(p=> p.name=='sort'); 
        let insert = this.children.find(p=> p.name=='insert'); 
        let insertFrom = this.children.find(p=> p.name=='insertFrom');
        let update = this.children.find(p=> p.name=='update');
        let _delete = this.children.find(p=> p.name=='delete');

        let text = '';
        if(map || first){
            // if(insertFrom) text = insertFrom+' ';
            let from = this.children.find(p=> p instanceof SqlFrom);
            let joins = this.children.filter(p=> p instanceof SqlJoin).sort((a,b)=> a.name>b.name?1:a.name==b.name?0:-1);

            let select = first?first:map;
            text = select.build(metadata) + '\n' + this.solveFrom(from,metadata)+ '\n' +  this.solveJoins(joins,metadata);
            // this._fields= select.fields(metadata);
           
        }else if(update){
            text = update.build(metadata);
        }else if(_delete){
            text = _delete.build(metadata);
        }         
        text = text + (filter?filter.build(metadata)+'\n':'');
        text = text + (groupBy?groupBy.build(metadata)+'\n':'');        
        text = text + (having?having.build(metadata)+'\n':'');
        text = text + (sort?sort.build(metadata)+'\n':'');
        
        return text;
    }
    solveJoins(joins,metadata){
        let text = '';
        
        let template = metadata.other('join');
        for(let i=0;i<joins.length;i++){
            let join = joins[i];
            let parts = join.name.split('.');
            let joinText  = template.replace('{name}',parts[0]);         
            joinText =joinText.replace('{alias}',parts[1]);
            joinText =joinText.replace('{relation}',join.children[0].build(metadata)).trim();           
            text= text + joinText+'\n';
        }
        return text;
    }
    solveFrom(from,metadata){
        let template = metadata.other('from');
        let parts = from.name.split('.');
        template =template.replace('{name}',parts[0]); 
        template =template.replace('{alias}',parts[1]);
        return template.trim();
    }   
}
class SqlFrom extends Operand{}
class SqlJoin extends Operand{}

class SqlArrowFunction extends ArrowFunction 
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
    }    
    build(metadata:SqlLanguageVariant){       
        let template = metadata.arrow(this.name);
        for(let i=0;i<this.children.length;i++){
            template =template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template.trim(); 
    }
}
class SqlMap extends SqlArrowFunction {}
class SqlFilter extends SqlArrowFunction {}
class SqlGroupBy extends SqlArrowFunction {}
class SqlHaving extends SqlArrowFunction {}
class SqlSort extends SqlArrowFunction {}
class SqlInsert extends SqlArrowFunction {}
class SqlInsertFrom extends SqlArrowFunction {}
class SqlUpdate extends SqlArrowFunction {}
class SqlUpdateFrom extends SqlArrowFunction {}
class SqlDelete extends SqlArrowFunction {}


class SqlLanguageVariant 
{
    public name:string
    private _operators?:any={}
    private _functions?:any={}
    private _others?:any={}
    private _arrows?:any={}

    constructor(name:string){
        this.name = name;
        this._operators={};
        this._functions={};
        this._others={};
        this._arrows={};
    }
    operator(name,operands){
        return this._operators[name][operands];
    }
    function(name){
        return this._functions[name];
    }
    arrow(name){
        return this._arrows[name];
    }
    other(name){
        return this._others[name];
    }
    addVariant(variant){
        for(const type in variant.operators){
            let operands = type == 'ternary'?3:type=='binary'?2:1;
            for(const name in variant.operators[type]){
                let template= variant.operators[type][name];
                if(!this._operators[name])this._operators[name]= {}; 
                this._operators[name][operands] = template;
            }
        }
        for(const type in variant.functions){
            let list = variant.functions[type];            
            for(const name in list){
                this._functions[name] = {type:type,template:list[name]}
            } 
        }
        for(const name in variant.others){
            let template = variant.others[name];
            this._others[name] = template; 
        }
        for(const name in variant.arrows){
            let template = variant.arrows[name];
            this._arrows[name] = template; 
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


class SqlScheme
{
    private _scheme:any

    constructor(scheme:any){
        this._scheme = scheme;
    }
    field(entityName,name){
        let entity =this.getEntity(entityName);
        if(!entity)return null;
        return entity.properties[name];
    }
    table(entityName){
        let entity =this.getEntity(entityName);
        return entity?entity.name:null;
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
            if(!relationData)
                throw 'relation '+part+' not found in '+previousScheme.name;
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

class SqlLanguage extends Language
{
    private _variants:any

    constructor(){
        super('sql');
        this._variants={};
    }
    addLibrary(library){
        this._libraries[library.name] =library;

        for(const p in library.variants){
            let data =  library.variants[p];
            let variant = new SqlLanguageVariant(data.variant);
            variant.addVariant(data);
            this._variants[data.variant] =variant 
        }
    }
    addJoins(parts,to,context){
        let relation = '';
        for(let i=1;i<to;i++){
            relation= (i>1?relation+'.':'')+parts[i];
            if(!context.current.joins[relation]){
                context.current.joins[relation] = this.createAlias(context,parts[i],relation);
            }
        }
        return relation;
    }
    createAlias(context,name,relation=null){
        let c= name.charAt(0).toLowerCase();
        let alias = c;
        for(let i=1;context.aliases[alias];i++)alias=alias+i;
        context.aliases[alias] = relation?relation:name;
        return alias;        
    }    
    createOperand(node,children,scheme,context){
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
                        let relationField = info.relationScheme.properties[propertyName]; 
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
    createArrowFunction(node,children){
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
    createClause(clause:Node,scheme:SqlScheme,context:any){
        context.current.arrowVar = clause.children[1].name;                    
        let child = this.nodeToOperand(clause.children[2],scheme,context);
        return this.createArrowFunction(clause,[child]);
    }
    nodeToOperand(node:Node,scheme:SqlScheme,context:any){

        if (node.type == 'childFunc' && node.name == 'includes'){
            let children = []
            let main = this.nodeToOperand(node.children[0],scheme,context) as SqlSentence;
            let mainEntity=scheme.getEntity(main.entity);
            children.push(main);
            for (let i=1; i< node.children.length;i++) {
                let p = node.children[i];
                let child = this.nodeToOperand(p, scheme, context) as SqlSentence;;

                let relation = mainEntity.relations[child.entity];
                let parts = relation.to.split('.');
                let toEntity=scheme.getEntity(parts[0]);
                let toField = toEntity.properties[parts[1]];
                let childFrom = child.children.find(p => p instanceof SqlFrom);
                child.entity= parts[0];
                childFrom.name= parts[0]+'.'+child.alias;
                let childFilter= child.children.find(p=> p.name == 'filter');
                if(!childFilter){
                   let fieldRelation = new SqlField(child.alias + '.' + toField);
                   let varRelation = new SqlVariable('ids',);
                   let filterInclude =new SqlFunctionRef('in', [fieldRelation,varRelation]);
                   let childFilter = new SqlFilter('filter',[filterInclude]);
                   child.children.push(childFilter);
                }else{
                    //TODO: pendiente generar AND {0} IN ({1}) para el caso que el child tenga un filtro
                } 
                children.push(child);
            }
            return new SqlCompose('compose',children);

        }else if(node.type == 'arrow'){
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
                  current=null;  
            }            
            context.current.entity=sentence.from.name;
            context.current.alias = this.createAlias(context,context.current.entity);            
            let children = [];
            let operand= null;

            if(sentence['from']){
                let clause = sentence['from'];
                let tableName = scheme.table(clause.name);
                operand =new SqlFrom(tableName+'.'+context.current.alias);
                children.push(operand);
            }
            if(sentence['filter'] ){
                let clause = sentence['filter'];
                operand = this.createClause(clause,scheme,context);
                children.push(operand); 
            }
            if(sentence['map'] || sentence['first']){
                let clause = sentence['first']?sentence['first']:sentence['map'];
                operand = this.createClause(clause,scheme,context);
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
            for(const key in context.current.joins){

                let info = scheme.getRelation(context.current.entity,key);
 
                let relatedAlias = info.previousRelation!=''?context.current.joins[info.previousRelation]:context.current.alias;   
                let relatedFieldName = info.previousScheme.properties[info.relationData.from];
                let relationTable = info.relationScheme.name;
                let relationAlias =context.current.joins[key];;
                let relationFieldName = info.relationScheme.properties[info.relationData.to.split('.')[1]];

                let relatedField = new SqlField(relatedAlias+'.'+relatedFieldName);
                let relationField = new SqlField(relationAlias+'.'+relationFieldName); 
                let equal = new SqlOperator('==',[relationField,relatedField])
                operand = new SqlJoin(relationTable+'.'+relationAlias,[equal]);
                children.push(operand);   
            }
            return new SqlSentence('sentence',children,context.current.entity,context.current.alias,context.current.fields);

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
    groupByFields(operand){
        let data = {fields:[],groupBy:false};
        this._groupByFields(operand,data);
        return data.groupBy?data.fields:[]; 
    }
    _groupByFields(operand,data){
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
    clone(obj){
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
    
    fieldsInSelect(operand){
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
    reduce(operand){
        //TODO
        return operand;
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
    compile(node,scheme){
        try{
            let context = {aliases:{},current:null};
            let sqlScheme = new SqlScheme(scheme);
            let operand = this.nodeToOperand(node,sqlScheme,context);
            operand = this.reduce(operand);
            operand =this.setParent(operand);
            return operand;
        } 
        catch(error){
            console.error(error);
            throw error; 
        }
    }
    sentence(operand,variant){
        try{
            let _variant = this._variants[variant];
            return operand.build(_variant);
        } 
        catch(error){
            console.error(error);
            throw error; 
        }
    }
    run(operand:Operand,context:any,scheme:any,cnx:any){          
        let sentence = this.sentence(operand,cnx.variant);
        return this.execute(sentence,context,cnx);
    }
}

export  {   
    SqlKeyValue,
    SqlArray,
    SqlObject,
    SqlOperator,
    SqlFunctionRef,
    SqlArrowFunction,
    SqlBlock,
    SqlLanguage
}