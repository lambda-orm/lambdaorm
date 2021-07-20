import {Node} from './../parser/index'
import {SchemaHelper}  from '../manager/schemaHelper'
import {IExecutor,Operand,Context,Delta } from './../model/index'

export abstract class OperandExecutor
{
    public abstract execute(operand:Operand,context:Context,executor?:IExecutor):Promise<any>;
}


export abstract class OperandManager
{   
    public abstract build(node:Node,dialect:string,scheme?:SchemaHelper):Operand
    // public abstract schemaSql(schema:SchemaHelper,delta:Delta,variant:string):string
    public abstract sql(operand:Operand):string
    public abstract model(operand:Operand):any
    // public abstract execute(operand:Operand,context:Context,executor?:IExecutor):Promise<any>
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

export abstract class SchemaBuilder
{
    public abstract create(delta:Delta,dialect:string,schema:SchemaHelper):string;
}



// export abstract class Language
// {
//     public name:string
//     public libraries:any
//     public dialects:any
    
//     protected schemaBuilder:SchemaBuilder
//     protected operandManager?:OperandManager
//     protected operandExecutor?:OperandExecutor
    
//     protected operators?:any;
//     protected functions:any;

//     constructor(name:string){
//         this.name = name;
//         this.libraries={};
//         this.dialects={};
//     } 
//     public get schema():SchemaBuilder|undefined
//     {
//         return this.schemaBuilder;
//     }
//     public get operand():OperandManager|undefined
//     {
//         return this.operandManager;
//     }
//     public get executor():OperandExecutor|undefined
//     {
//         return this.operandExecutor;
//     }
    

//     // public abstract addLibrary(library:any):void
//     // public abstract compile(node:Node,scheme?:SchemaHelper,variant?:string):Operand
//     // public abstract schemaSql(schema:SchemaHelper,delta:Delta,variant:string):string
//     // public abstract sql(operand:Operand):string
//     // public abstract model(operand:Operand):any
//     // public abstract execute(operand:Operand,context:Context,executor?:IExecutor):Promise<any>
//     // public deserialize(serialized:any,language:string){
//     //     let operand = this._deserialize(serialized,language);
//     //     return this.setParent(operand);
//     // }
//     // public serialize(value:Operand):any
//     // {
//     //     return this._serialize(value);
//     // }
//     // protected setParent(operand:Operand,index:number=0,parent?:Operand){        
//     //     try{
//     //         if(parent){
//     //             operand.id = parent.id +'.'+index;
//     //             operand.parent = parent;
//     //             operand.index = index;
//     //             operand.level = parent.level?parent.level+1:0;
//     //         }  
//     //         else{
//     //             operand.id = '0';
//     //             operand.parent = undefined;
//     //             operand.index = 0;
//     //             operand.level = 0;
//     //         }
//     //         for(let i = 0;i< operand.children.length;i++){
//     //             const p = operand.children[i];
//     //             this.setParent(p,i,operand); 
//     //         }          
//     //         return operand;
//     //     }
//     //     catch(error){
//     //         throw 'set parent: '+operand.name+' error: '+error.toString();
//     //     }
//     // }
//     // protected _serialize(operand:Operand):any
//     // {
//     //     let children = []                
//     //     for(const k in operand.children){
//     //         children.push(this._serialize(operand.children[k]));
//     //     }
//     //     if(children.length == 0) return {n:operand.name,t:operand.constructor.name};     
//     //     return {n:operand.name,t:operand.constructor.name,c:children}; 
//     // }
//     // protected abstract _deserialize(serialized:any,language:string):Operand
// }