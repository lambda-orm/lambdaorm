const {Node,Model,Library,Context,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("./base.js");
const {DefaultLanguage} = require("./language/default.js");

module.exports = class SourceManager
{
    constructor(){
        this._languages={};
        this._libraries={};
        this._languages['default'] = new DefaultLanguage();
    }
    get languages(){
        return this._languages;
    }    
    get libraries(){
        return this._libraries;
    }
    addLibrary(library){
        this._libraries[library.name] =library;
        this._languages[library.language].addLibrary(library);        
    }
    nodeToOperand(node,language='default'){
        return this._languages[language].nodeToOperand(node);
    } 
    reduce(operand,language='default'){
        if(operand instanceof Operator){        
            let allConstants=true;              
            for(const k in operand.children){
                const p = operand.children[k];
                if( !(p instanceof Constant)){
                    allConstants=false;
                    break;
                }
            }
            if(allConstants){
                let value = operand.eval();                
                let constant= new Constant(value);
                constant.parent = operand.parent;
                constant.index = operand.index;
                return constant;
            }
            else{
                for(let i = 0;i< operand.children.length;i++){
                   const p = operand.children[i];
                   operand.children[i]=this.reduce(p,language);
                }
            }
        }
        return operand;
    } 
    setParent(operand,index=0,parent=null){        
        try{
            if(parent){
                operand.id = parent.id +'.'+index;
                operand.parent = parent;
                operand.index = index;
                operand.level = parent.level +1;
            }  
            else{
                operand.id = '0';
                operand.parent = null;
                operand.index = 0;
                operand.level = 0;
            }
            for(let i = 0;i< operand.children.length;i++){
                const p = operand.children[i];
                this.setParent(p,i,operand); 
            }          
            return operand;
        }
        catch(error){
            throw 'set parent: '+operand.name+' error: '+error.toString();
        }
    }
    serialize(operand){
        let children = []                
        for(const k in operand.children){
            children.push(this.serialize(operand.children[k]));
        }
        if(children.length == 0) return {'n':operand.name,'l':operand.language,'t':operand.constructor.name};     
        return {'n':operand.name,'l':operand.language,'t':operand.constructor.name,'c':children}; 
    }
    deserialize(serialized){
        let operand = this._deserialize(serialized);
        return this.setParent(operand);
    }
    _deserialize(serialized){
        let children = []
        if(serialized.c)
            for(const k in serialized.c){
                const p = operand.children[k];
                children.push(this._deserialize(p));
            }
        return this._languages[serialized['l']].createOperand(serialized['n'],serialized['t'],children)
    }
    compile(node,language='default'){
        let operand =this.nodeToOperand(node,language);
        operand =this.reduce(operand,language);
        operand =this.setParent(operand);
        return operand;
    } 
    eval(operand,context,language='default'){
        try{
            return this._languages[language].eval(operand,context);
        }catch(error){
            throw 'eval: '+Operand.name+' error: '+error.toString(); 
        }
    }
}       
