
export default class SqlLanguageVariant 
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
    public operator(name:string,operands:number):any
    {
        return this._operators[name][operands];
    }
    public function(name:string):any
    {
        return this._functions[name];
    }
    public arrow(name:string):any
    {
        return this._arrows[name];
    }
    public other(name:string):any
    {
        return this._others[name];
    }
    public addVariant(variant:any):void
    {
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
    public getOperatorMetadata(name:string,operands:number):any
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
    public getFunctionMetadata(name:string):any
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

