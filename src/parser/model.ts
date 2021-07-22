export class Model
{
    public operators: any
    public enums: any
    public functions: any
    
    constructor(){
        this.operators={};
        this.enums={};
        this.functions={};
    } 
    addEnum(key:string,source:any):void
    {
        this.enums[key]=source;
    }
    isEnum(name:string):boolean
    {    
        let names = name.split('.');
        return !!this.enums[names[0]];
    }
    getEnumValue(name:string,option:string):any
    { 
        return this.enums[name][option];
    }
    getEnum(name:string):any
    { 
        return this.enums[name];
    }  
    addOperator(name:string,operands:number,metadata:any):void
    {
        if(!this.operators[name])this.operators[name]= {}; 
        this.operators[name][operands] = metadata;
    }
    load(data:any):void
    {
        for(const name in data.enums){
            this.addEnum(name,data.enums[name]);
        }
        for(const type in data.operators){
            let count = type == 'ternary'?3:type=='binary'?2:1;
            for(const name in data.operators[type]){
                let metadata= data.operators[type][name];
                this.addOperator(name,count,metadata);
            }
        }
    }
    // addFunction(name,metadata){
    //     this.functions[name] = metadata; 
    // } 
    // getOperatorMetadata(name,operands){
    //     try{          
    //         if(this._operators[name]){
    //             let operator = this._operators[name];
    //             if(operator[operands])
    //                 return operator[operands];
    //         }
    //         return null
    //     }            
    //     catch(error){
    //         throw 'error with operator: '+name;
    //     }
    // } 
    // getFunctionMetadata(name){
    //     try{
    //         if(this._functions[name])
    //             return this._functions[name];
    //         return null
    //     }
    //     catch(error){
    //         throw 'error with function: '+name;
    //     }
    // }
}