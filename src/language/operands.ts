import {Operand,Context,Entity,Property,Parameter} from './../model/index'
import {Helper} from '../helper'

export class Constant extends Operand
{    
    constructor(name:string){
      super(name,[],Helper.getType(name));
    }
}
export class Variable extends Operand
{
    public context?: Context
    public number?:number   
    constructor(name:string,type:string='any'){
        super(name,[],type);  
        this.context  = undefined;
        this.number  = undefined;
    }
    set(value:any){
        if(this.context)
          this.context.set(this.name,value);
    }
}
export class Field extends Operand
{    
    public entity:string
    public mapping:string 
    constructor(entity:string,name:string,type:string,mapping:string){
        super(name,[],type);
        this.entity = entity;
        this.mapping  = mapping;  
    }
    clone(){
        return new Field(this.entity,this.name,this.type,this.mapping);
    }
} 
export class KeyValue extends Operand
{
    public mapping?:string
}
export class Array extends Operand
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children,'array');
    } 
}
export class Obj extends Operand
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children,'object');
    }
} 
export class Operator extends Operand
{
    //protected function:any
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
        //this.function = _function;
    }
}                             
export class FunctionRef extends Operand
{
    //protected function:any
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
        //this.function = _function;
    }
}
export class ChildFunction extends FunctionRef 
{
    public context?: Context
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
        this.context = undefined;
    } 
}
export class ArrowFunction extends FunctionRef 
{
    public context?: Context
    constructor(name:string,children:Operand[]=[]){
        super(name,children); 
        this.context = undefined;
    } 
}
export class Block extends Operand{}
export class From extends Operand{}
export class Join extends Operand{}
export class Map extends ArrowFunction {}
export class Filter extends ArrowFunction {}
export class GroupBy extends ArrowFunction {}
export class Having extends ArrowFunction {}
export class Sort extends ArrowFunction {}
export class Insert extends ArrowFunction 
{
    public autoincrement?:string
    public clause:string
    constructor(name:string,children:Operand[]=[],clause:string,autoincrement?:string){
        super(name,children);
        this.autoincrement = autoincrement;
        this.clause=clause;
    }
}
export  class Update extends ArrowFunction{}
export class Delete extends ArrowFunction {}
export class Sentence extends FunctionRef 
{
    public columns:Property[]
    public parameters:Parameter[]
    public entity:string
    public autoincrement?:Property
    public alias:string
    public clause:string
    constructor(name:string,children:Operand[]=[],entity:string,alias:string,autoincrement?:Property,columns:Property[]=[],parameters:Parameter[]=[]){
        super(name,children);
        this.entity=entity;
        this.autoincrement=autoincrement;
        this.alias=alias;
        this.columns=columns;
        this.parameters=parameters;
        this.clause='';
        this.initialize();
    }
    public getIncludes():SentenceInclude[]
    {
        return this.children.filter(p=> p instanceof SentenceInclude) as SentenceInclude[];
    } 
    private initialize(){
        let map =  this.children.find(p=> p.name=='map');   
        let filter = this.children.find(p=> p.name=='filter'); 
        let groupBy = this.children.find(p=> p.name=='groupBy');
        let having = this.children.find(p=> p.name=='having'); 
        let sort = this.children.find(p=> p.name=='sort'); 
        let insert = this.children.find(p=> p instanceof Insert) as Insert|undefined;
        let update = this.children.find(p=> p instanceof Update) as Update|undefined;
        let _delete = this.children.find(p=> p instanceof Delete) as Delete|undefined;

        let variables:Variable[]=[];
        if(map){
            this.clause='select';
            this.loadVariables(map,variables)
        }else if(insert){
            this.clause='insert';
            this.loadVariables(insert,variables);
        }else if(update){
            this.clause='update';
            this.loadVariables(update,variables);
        }else if(_delete){
            this.clause='delete';           
            this.loadVariables(_delete,variables);
        }
        if(filter)this.loadVariables(filter,variables);
        if(groupBy)this.loadVariables(groupBy,variables);
        if(having)this.loadVariables(having,variables);
        if(sort)this.loadVariables(sort,variables);
        for(let i=0;i<variables.length;i++ ){
            variables[i].number = i+1;
        }        
    }
    private loadVariables(operand:Operand,variables:Variable[])
    {        
        if(operand instanceof Variable)
            variables.push(operand);
        for(let i=0;i<operand.children.length;i++ )
            this.loadVariables(operand.children[i],variables);
    }
}
export class SentenceInclude extends Operand
{
    public relation:any
    public variable:string
    constructor(name:string,children:Operand[]=[],relation:any,variable:string){
        super(name,children);
        this.relation=relation;
        this.variable=variable;
    }
}
export class Query extends Operand
{
    public sentence:string
    public dialect:string
    public entity:string
    public autoincrement?:Property
    public columns:Property[]
    public parameters:Parameter[]
    constructor(name:string,children:Operand[]=[],dialect:string,sentence:string,entity:string,autoincrement?:Property,columns:Property[]=[],parameters:Parameter[]=[]){
        super(name,children);
        this.dialect=dialect;
        this.sentence=sentence;
        this.entity=entity;
        this.autoincrement=autoincrement;
        this.columns=columns;
        this.parameters=parameters;
    }
}
export class Include extends Operand
{
    public relation:any
    public variable:string
    constructor(name:string,children:Operand[]=[],relation:any,variable:string){
        super(name,children);
        this.relation=relation;
        this.variable=variable;
    }
}

