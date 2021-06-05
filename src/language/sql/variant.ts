
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

