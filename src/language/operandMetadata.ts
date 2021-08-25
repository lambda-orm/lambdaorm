export class OperandMetadata
{
    public libraries:any
    public operators:any
    public functions:any  
    constructor(){
        this.libraries={}; 
        this.operators={};
        this.functions={};        
    }
    addLibrary(library:any):void
    {
        this.libraries[library.name] =library;
        for(const name in library.operators){
            let operator= library.operators[name];
            for(const operands in operator){
                let metadata = operator[operands];
                if(!this.operators[name])this.operators[name]= {}; 
                this.operators[name][operands] = metadata;
            }
        }
        for(const name in library.functions){
            let metadata = library.functions[name];
            this.functions[name] = metadata; 
        }
    }
    getOperatorMetadata(name:string,operands:number):any
    {
        try{          
            if(this.operators[name]){
                let operator = this.operators[name];
                if(operator[operands])
                    return operator[operands];
            }
            return null
        }            
        catch(error){
            throw 'error with operator: '+name;
        }
    } 
    getFunctionMetadata(name:string):any
    {
        try{
            if(this.functions[name])
                return this.functions[name];
            return null
        }
        catch(error){
            throw 'error with function: '+name;
        }
    }
}


