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
    compile(node,scheme,language){
        let _scheme =  this._schemes[scheme];
        return this._languages[language].compile(node,_scheme);
    }
    sentence(operand,language,variant){
        return this._languages[language].sentence(operand,variant);
    } 
    run(cnx,operand,context){
        try{
            let scheme =  this._schemes[cnx.scheme];
            return this._languages[cnx.language].run(operand,context,scheme,cnx);
        }catch(error){
            throw 'eval: '+Operand.name+' error: '+error.toString(); 
        }
    }
}       
