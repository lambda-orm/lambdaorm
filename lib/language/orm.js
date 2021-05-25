const {Context,Language,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("../base");


class OrmConstant extends Constant
{   
    build(metadata){
        switch (this._type) {
            case 'string':
                return  '\''+this._name+'\''; 
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
        let template = metadata.others('variable');
        template =template.replace('{name}',this._name);
        template =template.replace('{number}',this._number);
        return template;
    }
}

class OrmField extends Variable
{
    constructor(name,language,children=[],entity){
        super(name,language,children);        
        this._entity  = entity;
        this._enityAlias  = null;
    }
    get enityAlias(){
        return this._enityAlias;
    }
    set enityAlias(value){
        this._enityAlias=value;
    } 
    build(metadata){
        let template = metadata.others('field');
        let fieldName = metadata.fielName(this._entity,this._name);
        template =template.replace('{enityAlias}',this._enityAlias);
        template =template.replace('{name}',fieldName);
        return template;
    }
}

class OrmFrom extends Variable
{
    constructor(name,language,children=[]){
        super(name,language,children);
        this._alias  = null;
    }
    get alias(){
        return this._alias;
    }
    set alias(value){
        this._alias=value;
    }
    build(metadata){
        let template = metadata.others('from');       
        template =template.replace('{name}',_name); 
        template =template.replace('{alias}',this._alias);
        return template; 
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
            text +=  ((i>0?',':'')+(this.children[i].build(metadata)+';'));              
        }
        return text;
    } 
}
class OrmObject extends Object
{
    build(metadata){       
        let dic= {}
        for(let i=0;i<this._children.length;i++){
            let value = this.children[i].build(metadata);
            dic[this._children[i].name]=value;
        }
        return dic;
    }
} 
class OrmBlock extends Block
{
    build(metadata){
        let text = ''
        for(let i=0;i<this._children.length;i++){
            text += (this.children[i].build(metadata)+';');    
        }
    } 
}
class OrmOperator extends Operator
{
    constructor(name,language,children=[]){
        super(name,language,children);
    }    
    build(metadata){ 
        let template = metadata.operator(this._name,this._children.length);
        for(let i=0;i<this._children.length;i++){
            template = template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template;  
    }
}                             
class OrmFunctionRef extends FunctionRef
{
    constructor(name,language,children=[]){
        super(name,language,children); 
    }    
    build(metadata){       
        let template = metadata.functions(this._name);
        for(let i=0;i<this._children.length;i++){
            template =template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template; 
    }
}
class OrmArrowFunction extends ArrowFunction 
{
    constructor(name,language,children=[]){
        super(name,language,children); 
    }    
    build(){       
        let template = metadata.functions(this._name);
        for(let i=0;i<this._children.length;i++){
            template =template.replace('{'+i+'}',this.children[i].build(metadata));
        }
        return template; 
    }
}

class OrmSentence extends FunctionRef 
{
    constructor(name,language,children=[]){
        super(name,language,children);
    }    
    build(metadata){   

        let form = getClause('from',metadata);
        let map = getClause('map',metadata);
        let first = getClause('first',metadata);
        let filter = getClause('filter',metadata);
        let having = getClause('having',metadata);
        let reverse = getClause('reverse',metadata);
        let sort = getClause('sort',metadata);
        let insert = getClause('insert',metadata);
        let insertfrom = getClause('insertfrom',metadata);
        let update = getClause('update',metadata);
        let _delete = getClause('delete',metadata);

        let text = '';
        if(map || first){
            if(insertfrom) text = insertfrom+' ';
            text = first?first:map;
            text = text + form + ' ';
        }else if(update){
            text = update;
        }else if(_delete){
            text = _delete;
        }         
        text = text + (filter?filter+' ':'');
        text = text + (having?having+' ':'');
        text = text + (sort?sort+' ':'');
        
        return '('+ text + ')';
    }
    getClause(name,metadata){
        let child = this._children.find(p=> p.name==name);
        if(!child)return null;
        return child.build(metadata);
    }
}


class OrmMap extends OrmArrowFunction {

    build(){  

        let previous = this._children[0].build();
        let expression = this._children[2].build();
        let text = previous + this._template.replace('{0}',expression);
        return text;
        // for(let i=0;i<this._children.length;i++){
        //     text += (this.children[i].build()+';'); 
        // }
        // return this._template.replace('{0}',text); 
    }
}
class OrmFilter extends OrmArrowFunction {

    build(){       
        let text = '';
        let previous = this._children[0].build();
        let expression = this._children[2].build();

        text = previous + this._template.replace('{0}',expression);
        return text;

        // if(this._children[0] instanceof OrmVariable){

        // }
        // for(let i=0;i<this._children.length;i++){
        //     text += (this.children[i].build()+';'); 
        // }
        // return this._template.replace('{0}',text); 
    }

}
class OrmHaving extends OrmArrowFunction {}
class OrmSort extends OrmArrowFunction {

    build(){
        let previous = this._children[0].build();
        let expression = this._children[2].build();
        let text = previous + this._template.replace('{0}',expression);
        return text;

        // let text = '';
        // for(let i=0;i<this._children.length;i++){
        //     text += (this.children[i].build()+';'); 
        // }
        // return this._template.replace('{0}',text); 
    }
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
    
    createOperand(node,children,entity,alias){
        switch(node.type){
            case 'const':
                    return new OrmConstant(node.name,this._name,children);
                case 'var':
                    let root = node.name.split('.')[0];
                    if(root == alias)
                        return new OrmField(node.name,this._name,children,entity,'');
                    else
                        return new  OrmVariable(node.name,this._name,children,this._others['variable']);                           
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
                case 'reverse': 
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
    nodeToOperand(node,entity=null,alias=null){

        if(node.type == 'arrow'){
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
            let entity =sentence.from.name;
            let children = [];
            let operand= null;
            for(const key in sentence){
                let clause = sentence[key];
                if(key=='from'){
                    operand =new OrmFrom(clause.name,this._name,[]);
                }
                else{                    
                    let alias = clause.children[1];
                    let child = this.nodeToOperand(clause.children[2],entity,alias.name);
                    operand = this.createArrowFunction(clause,[child]);
                }
                children.push(operand);
            }
            return new OrmSentence('sentence',this._name,children,null);

        }else{
            let children = [];
            if(node.children){
                for(const k in node.children){
                    let p = node.children[k];
                    let child = this.nodeToOperand(p,entity,alias);
                    children.push(child);
                }
            }
            return this.createOperand(node,children,entity,alias);
        }
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
    eval(operand,context,scheme,cnx){          
        let metadata = this._variants[cnx.variant];
        metadata.scheme = scheme;  
        let sentence = operand.build(metadata);
        console.log(sentence);
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