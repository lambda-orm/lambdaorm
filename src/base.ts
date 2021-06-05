
class Node
{
    
    public name: any
    public type: string
    public children: Node[]
    public id?:string
    public parent?: Node
    public index?: number
    public level?:number

    constructor(name:any,type:string,children:Node[]=[]){ 
        this.name = name;
        this.type = type;         
        this.children  = children;
        this.parent = null;
        this.index = null;
    }    
}
class Model
{
    public operators: any
    public enums: any
    public functions: any

    constructor(){
        this.operators={};
        this.enums={};
        this.functions={};
    } 
    addEnum(key,source){
        this.enums[key]=source;
    }
    isEnum(name:string){    
        let names = name.split('.');
        return !!this.enums[names[0]];
    }
    getEnumValue(name:string,option:string){ 
        return this.enums[name][option];
    }
    getEnum(name:string){ 
        return this.enums[name];
    }  
    addOperator(name:string,operands:number,metadata:any){
        if(!this.operators[name])this.operators[name]= {}; 
        this.operators[name][operands] = metadata;
    }
    load(data:any){
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
class Context
{
    protected _data: any
    protected _parent: any 

    constructor(data:any,parent=null){
        this._data = data;
        this._parent= parent;
    }
    newContext(){        
        return new Context({},this)
    }
    getContext(variable:string){
        if(this._data[variable] || this._parent == null)return this._data
        let _context =this._parent.getContext(variable);
        return  _context?_context:this._data;
    }
    get(name:string){
        let names=name.split('.');
        let value = this.getContext(names[0]); 
        for(let n in names){
            if(value[n]) return null;
            value=value[n];
        }
        return value;
    }
    set(name:string,value:any){
        let names=name.split('.') ;       
        let level = names.length -1;
        let list = this.getContext(names[0]);
        for(let i=0;i<names.length;i++){ 
            const p = names[i];
            if(i == level)
                list[p]=value;
            else                    
                list=list[p];
        }
    }
    init(name,value){
        this._data[name]=value; 
    } 
}
class Operand
{
    public name: string
    public id: string
    public parent?:Operand
    public index?:number
    public level?:number
    public children?:Operand[]

    constructor(name:string,children:Operand[]=[]){
        this.name = name;
        this.children  = children;        
        this.id = null;
        this.parent = null;
        this.index = 0;
        this.level = 0;
    }    
    eval():any{
        throw 'Not implemented';
    }
    set(value:any){}
    build(metadata:any):any{}
}

export {
    Node,
    Operand,
    Model,
    Context  
}