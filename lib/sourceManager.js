const {Operand,Constant,Operator} = require("./base.js");

module.exports = class SourceManager
{
    constructor(){
        this._languages={};
        this._schemes={};

    }
    get languages(){
        return this._languages;
    }
    addLanguage(value){
        this._languages[value.name] =value;
    }
    addLibrary(value){
        this._languages[value.language].addLibrary(value);        
    }
    addScheme(value){
        this._schemes[value.name] =value;
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
    compile(node,language){
        let operand = this._languages[language].nodeToOperand(node);
        operand = this._languages[language].reduce(operand);
        operand =this.setParent(operand);
        return operand;
    } 
    eval(cnx,operand,context){
        try{
            let scheme =  this._schemes[cnx.scheme];
            return this._languages[cnx.language].eval(operand,context,scheme,cnx);
        }catch(error){
            throw 'eval: '+Operand.name+' error: '+error.toString(); 
        }
    }
}       
