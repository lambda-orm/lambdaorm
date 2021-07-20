import {Node} from './../parser'
import {Operand,IOperandManager } from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'

export abstract class OperandManager implements IOperandManager
{   
    public abstract build(node:Node,dialect:string,scheme?:SchemaHelper):Operand
    public abstract sql(operand:Operand):string
    public abstract model(operand:Operand):any
    public deserialize(serialized:any){
        let operand = this._deserialize(serialized);
        return this.setParent(operand);
    }
    public serialize(value:Operand):any
    {
        return this._serialize(value);
    }
    protected setParent(operand:Operand,index:number=0,parent?:Operand){        
        try{
            if(parent){
                operand.id = parent.id +'.'+index;
                operand.parent = parent;
                operand.index = index;
                operand.level = parent.level?parent.level+1:0;
            }  
            else{
                operand.id = '0';
                operand.parent = undefined;
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
    protected _serialize(operand:Operand):any
    {
        let children = []                
        for(const k in operand.children){
            children.push(this._serialize(operand.children[k]));
        }
        if(children.length == 0) return {n:operand.name,t:operand.constructor.name};     
        return {n:operand.name,t:operand.constructor.name,c:children}; 
    }
    protected abstract _deserialize(serialized:any):Operand

    
}