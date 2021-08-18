import {Node} from './../parser'
import {Operand,Context,Delta  } from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'
import {ILanguage} from './iLanguage'
import {Executor}  from '../connection'

export class LanguageManager
{   
    private languages:any
    public dialects:any
    constructor(){
        this.languages={};
        this.dialects={};
    } 
    public add(language:ILanguage){
        this.languages[language.name] =language;
        for(const name in language.dialects)
            this.dialects[name]= {name:name,language:language.name};         
    }
    public get(dialect:string):ILanguage 
    {
        let info =  this.dialects[dialect];
        return this.languages[info.language] as ILanguage
    }
    public build(dialect:string,node:Node,_schema:SchemaHelper): Operand
    {
        let _node = this.solveSimplification(node); 
        return this.get(dialect).operand.build(_node,dialect,_schema);
    }
    public sentence(dialect:string,operand:Operand):any
    {
        return this.get(dialect).operand.sentence(operand);
    }
    public model(dialect:string,operand:Operand):any
    {
        return this.get(dialect).operand.model(operand);
    }
    public deserialize(dialect:string,serialized:any)
    {
        return this.get(dialect).operand.deserialize(serialized);
    }
    public serialize(dialect:string,operand:Operand):any
    {
        return this.get(dialect).operand.serialize(operand);
    }
    public async execute(dialect:string,operand:Operand,context:Context,executor:Executor):Promise<any>
    {
        return await this.get(dialect).executor.execute(operand,context,executor);
    }
    public sync(dialect:string,delta:Delta,schema:SchemaHelper):any[]
    {       
       return this.get(dialect).schema.sync(delta,dialect,schema);
    }
    public drop(dialect:string,schema:SchemaHelper):string[]
    {
        return this.get(dialect).schema.drop(dialect,schema);
    }
    public truncate(dialect:string,schema:SchemaHelper):string[]
    {
        return this.get(dialect).schema.truncate(dialect,schema);
    }
  

    
    protected solveSimplification(node:Node):Node
    {        
        if(node.type=='var' && node.children.length== 0){
            //Example: Products => Products.map(p=>p)            
            let arrowVariable = new Node('p','var');
            let allFields = new Node('p','var');
            return new Node('map','arrow',[node,arrowVariable,allFields]);
        } 
        return node;
    }
}