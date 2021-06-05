import {Node,Context,Operand} from '../base'

export default abstract class Language
{
    protected _name:string
    protected _libraries:any
    protected operators?:any;
    protected functions:any;

    constructor(name:string){
        this._name = name;
        this._libraries={};
    }
    get name(){
        return this._name;
    }
    public abstract addLibrary(library:any):void
    public abstract compile(node:Node,scheme:any):Operand
    public abstract sentence(operand:Operand,variant:string):any
    public abstract run(operand:Operand,context:any,scheme?:any,cnx?:any):any

    protected setParent(operand:Operand,index:number=0,parent:Operand=null){        
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
    serialize(value:Operand):string{
        let json =this._serialize(value);
        return json? JSON.stringify(json):null;
    }
    _serialize(operand:Operand){
        let children = []                
        for(const k in operand.children){
            children.push(this._serialize(operand.children[k]));
        }
        if(children.length == 0) return {'n':operand.name,'t':operand.constructor.name};     
        return {'n':operand.name,'t':operand.constructor.name,'c':children}; 
    }
    deserialize(serialized:any,language:string){
        let operand = this._deserialize(serialized,language);
        return this.setParent(operand);
    }
    protected abstract _deserialize(serialized:any,language:string):Operand
    
}