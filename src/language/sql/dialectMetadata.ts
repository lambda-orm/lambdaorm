
export class SqlDialectMetadata
{
    public name:string
    private _operators?:any={}
    private _functions?:any={}
    private _others?:any={}
    private _arrows?:any={}
    private _ddl?:any={}
    private _types?:any={}
    constructor(name:string){
        this.name = name;
        this._operators={};
        this._functions={};
        this._others={};
        this._arrows={};
        this._ddl={};
        this._types={};
    }
    public operator(name:string,operands:number):string
    {
        return this._operators[name][operands];
    }
    public function(name:string):any
    {
        return this._functions[name];
    }
    public arrow(name:string):string
    {
        return this._arrows[name];
    }
    public other(name:string):string
    {
        return this._others[name];
    }
    public ddl(name:string):string
    {
        return this._ddl[name];
    }
    public type(name:string):string
    {
        return this._types[name];
    }
    public add(dialect:any):void
    {
        for(const type in dialect.operators){
            let operands = type == 'ternary'?3:type=='binary'?2:1;
            for(const name in dialect.operators[type]){
                let template= dialect.operators[type][name];
                if(!this._operators[name])this._operators[name]= {}; 
                this._operators[name][operands] = template;
            }
        }
        for(const type in dialect.functions){
            let list = dialect.functions[type];            
            for(const name in list){
                this._functions[name] = {type:type,template:list[name]}
            } 
        }
        for(const name in dialect.others){
            let template = dialect.others[name];
            this._others[name] = template; 
        }
        for(const name in dialect.arrows){
            let template = dialect.arrows[name];
            this._arrows[name] = template; 
        }
        for(const name in dialect.ddl){
            let template = dialect.ddl[name];
            this._ddl[name] = template; 
        }
        for(const name in dialect.types){
            let template = dialect.types[name];
            this._types[name] = template; 
        }
    }
    public getOperatorMetadata(name:string,operands:number):string|null
    {
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
    public getFunctionMetadata(name:string):string|null
    {
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

