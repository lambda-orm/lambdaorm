
export default class Library
{
    public name:string
    public language:string
    public enums:any
    public operators:any
    public functions:any

    constructor(name:string,language:string){
        this.name = name;
        this.language = language;
        this.enums={};
        this.operators={};
        this.functions={};
    }    
    addEnum(key:string,source:any){        
        this.enums[key] =source;
    }
    addFunction(name:string,source:any,custom:any=null,isArrowFunction:boolean=false){      
        let metadata = this.getMetadata(source);
        metadata['lib'] =this.name;
        metadata['language '] =this.language;  
        metadata['isArrowFunction'] =isArrowFunction;        
        this.functions[name]={'function':source,'metadata':metadata,'custom':custom}; 
    }
    addOperator(name:string,source:any,custom:any=null,customFunction:any=null){
        if(!this.operators[name])this.operators[name]= {}
        let metadata = this.getMetadata(source);
        let operands = metadata['args'].length;  
        metadata['lib'] =this.name;
        metadata['language '] =this.language; 
        this.operators[name][operands]={'function':source,'metadata':metadata,'custom':custom,'customFunction':customFunction};
    }
    getMetadata(source:any){        
        let args=[];
        let _args = this.getArgs(source);
        for(const k in _args){
            const p = _args[k];
            let data = p.split('=');             
            let arg = {'name':data[0]
                  ,'default':data.length>1?data[1]:null
                  }
            args.push(arg)
        }
        return {
            'originalName': source.name,
            'signature': '('+_args.toString()+')',
            'doc':null,
            'args': args
        }
    }
    getArgs(source){
        let args = f => f.toString ().replace (/[\r\n\s]+/g, ' ').
              match (/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/).
              slice (1,3).
              join ('').
              split (/\s*,\s*/);
        return args(source);      
    }
}