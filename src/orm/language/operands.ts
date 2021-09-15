import {Context,Entity,Property,Parameter} from './../model/index'
import {Helper} from '../helper'
import {OperandMetadata} from './operandMetadata'
const SqlString = require('sqlstring')

export abstract class Operand
{
    public name: string
    public type:string
    public id?: string
    public parent?:Operand
    public index?:number
    public level?:number
    public children:Operand[] 
    constructor(name:string,children:Operand[]=[],type:string='any'){
        this.name = name
        this.children  = children
        this.type  = type
        this.id = undefined
        this.parent = undefined
        this.index = 0
        this.level = 0
    }
    public clone(){
        let obj:any= this
        let children = []
        if(obj.children){
            for(const k in obj.children){
                let p = obj.children[k]
                let child = p && typeof p == "object"?JSON.parse(JSON.stringify(p)):p
                children.push(child)
            }
        }
        return new obj.constructor(obj.name,children)
    }
    public set(value:any){}
    public abstract eval():any
}
export class Constant extends Operand
{    
    constructor(name:string){
      super(name,[],Helper.getType(name))
    }
    public eval():any
    {
        switch (this.type) {
            case 'string':
                return  SqlString.escape(this.name)
            case 'boolean':
                return  this.name == 'true'?true:false
            case 'number':
                return parseFloat(this.name)      
            default:
                return SqlString.escape(this.name)
        }
    }     
}
export class Variable extends Operand
{
    public context?: Context
    public number?:number   
    constructor(name:string,type:string='any'){
        super(name,[],type)  
        this.context  = undefined
        this.number  = undefined
    }
    public set(value:any){
        if(this.context)
          this.context.set(this.name,value)
    }
    public eval():any
    {
        return this.context?this.context.get(this.name):null
    }
}
export class Field extends Operand
{    
    public entity:string
    public mapping:string 
    constructor(entity:string,name:string,type:string,mapping:string){
        super(name,[],type)
        this.entity = entity
        this.mapping  = mapping  
    }
    public clone(){
        return new Field(this.entity,this.name,this.type,this.mapping)
    }
    public eval():any
    {
        //TODO:implement
        throw 'NotImplemented' 
    }
} 
export class KeyValue extends Operand
{
    public mapping?:string
    public eval():any
    {
        return this.children[0].eval()
    } 
}
export class List extends Operand
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children,'array')
    }
    public eval():any
    {
        let values = []
        for(let i=0;i<this.children.length;i++){
            values.push(this.children[i].eval())    
        }
        return values
    } 
}
export class Obj extends Operand
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children,'object')
    }
    public eval():any
    {
        let obj:{[k: string]: any} = {}
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].eval()
            obj[this.children[i].name]=value
        }
        return obj
    }
} 
export class Operator extends Operand
{
    public metadata?:OperandMetadata
    public eval():any
    {
        if(this.metadata){
            let operMetadata = this.metadata.getOperatorMetadata(this.name,this.children.length)
            if(operMetadata.custom)                   
                return operMetadata.custom(this.name,this.children,operMetadata['customFunction']).eval() 
            else{
                let args= []
                for(let i=0;i<this.children.length;i++){
                    args.push(this.children[i].eval()) 
                }
                return operMetadata.function(...args) 
            } 
        }else{
            throw `Function ${this.name} not implemented`
        }
    }
}
export class FunctionRef extends Operand
{
    public metadata?:OperandMetadata
    public eval():any
    {
        if(this.metadata){
            let funcMetadata = this.metadata.getFunctionMetadata(this.name)
            if(funcMetadata.custom)                 
                return new funcMetadata.custom(this.name,this.children).eval() 
            else{
                let args= []
                for(let i=0;i<this.children.length;i++){
                    args.push(this.children[i].eval()) 
                }
                return funcMetadata.function(...args) 
            }
        }else{
            throw `Function ${this.name} not implemented`
        }     
    }
}
export class ChildFunction extends FunctionRef 
{
    public context?: Context
}
export class ArrowFunction extends FunctionRef 
{
    public context?: Context
}
export class Block extends Operand
{
    public eval():any
    {
        for(let i=0;i<this.children.length;i++){
            this.children[i].eval()    
        }
    }
}
export class From extends Operand
{
    public eval():any
    {
        throw 'NotImplemented' 
    }
}
export class Join extends Operand
{
    public eval():any
    {
        throw 'NotImplemented' 
    }
}
export class Map extends ArrowFunction {}
export class Distinct extends ArrowFunction {}
export class Filter extends ArrowFunction {}
export class GroupBy extends ArrowFunction {}
export class Having extends ArrowFunction {}
export class Sort extends ArrowFunction {}
export class Page extends ChildFunction {}
export class Insert extends ArrowFunction 
{
    public autoincrement?:string
    public clause:string
    constructor(name:string,children:Operand[]=[],clause:string,autoincrement?:string){
        super(name,children)
        this.autoincrement = autoincrement
        this.clause=clause
    }
}
export class Update extends ArrowFunction{}
export class Delete extends ArrowFunction {}
export class Sentence extends Operand 
{
    public columns:Property[]
    public parameters:Parameter[]
    public entity:string
    public autoincrement?:Property
    public alias:string
    public clause:string
    constructor(name:string,children:Operand[]=[],entity:string,alias:string,autoincrement?:Property,columns:Property[]=[],parameters:Parameter[]=[]){
        super(name,children)
        this.entity=entity
        this.autoincrement=autoincrement
        this.alias=alias
        this.columns=columns
        this.parameters=parameters
        this.clause=''
        this.initialize()
    }
    public getIncludes():SentenceInclude[]
    {
        return this.children.filter(p=> p instanceof SentenceInclude) as SentenceInclude[]
    } 
    private initialize(){
        let map =  this.children.find(p=> p.name=='map')   
        let filter = this.children.find(p=> p.name=='filter') 
        let groupBy = this.children.find(p=> p.name=='groupBy')
        let having = this.children.find(p=> p.name=='having') 
        let sort = this.children.find(p=> p.name=='sort') 
        let insert = this.children.find(p=> p instanceof Insert) as Insert|undefined
        let update = this.children.find(p=> p instanceof Update) as Update|undefined
        let _delete = this.children.find(p=> p instanceof Delete) as Delete|undefined

        let variables:Variable[]=[]
        if(map){
            this.clause='select'
            this.loadVariables(map,variables)
        }else if(insert){
            this.clause='insert'
            this.loadVariables(insert,variables)
        }else if(update){
            this.clause='update'
            this.loadVariables(update,variables)
        }else if(_delete){
            this.clause='delete'           
            this.loadVariables(_delete,variables)
        }
        if(filter)this.loadVariables(filter,variables)
        if(groupBy)this.loadVariables(groupBy,variables)
        if(having)this.loadVariables(having,variables)
        if(sort)this.loadVariables(sort,variables)
        for(let i=0;i<variables.length;i++ ){
            variables[i].number = i+1
        }        
    }
    private loadVariables(operand:Operand,variables:Variable[])
    {        
        if(operand instanceof Variable)
            variables.push(operand)
        for(let i=0;i<operand.children.length;i++ )
            this.loadVariables(operand.children[i],variables)
    }
    public eval():any
    {
        throw 'NotImplemented' 
    }
}
export class SentenceInclude extends Operand
{
    public relation:any
    public variable:string
    constructor(name:string,children:Operand[]=[],relation:any,variable:string){
        super(name,children)
        this.relation=relation
        this.variable=variable
    }
    public eval():any
    {
        throw 'NotImplemented' 
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
        super(name,children)
        this.dialect=dialect
        this.sentence=sentence
        this.entity=entity
        this.autoincrement=autoincrement
        this.columns=columns
        this.parameters=parameters
    }
    public eval():any
    {
        throw 'NotImplemented' 
    }
}
export class Include extends Operand
{
    public relation:any
    public variable:string
    constructor(name:string,children:Operand[]=[],relation:any,variable:string){
        super(name,children)
        this.relation=relation
        this.variable=variable
    }
    public eval():any
    {
        throw 'NotImplemented' 
    }
}

