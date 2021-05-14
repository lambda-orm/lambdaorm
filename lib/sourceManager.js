
module.exports = class SourceManager
{
    constructor(model){
        this._model=model;
        this._libraries={};
    }    
    get model(){
        return this._model;
    }
    get libraries(){
        return this._libraries;
    }
    addLibrary(library){
        this._libraries[library.name] =library;
        for(const name in library.enums){
            this._model.addEnum(name,library.enums[name]);
        }
        for(const name in library.operators){
            let operator= library.operators[name];
            for(const cardinality in operator){
                let data = operator[cardinality];
                this._model.addOperator(name,cardinality,data.metadata);
            }
        }
        for(const name in library.functions){
            let data = library.functions[name];
            this._model.addFunction(name,data.metadata);
        }
    } 
}       
