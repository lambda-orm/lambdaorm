import {Node,Model} from '../node/index'
import {Operand,Context,Delta,IOrm} from './../model'
import {SchemaHelper}  from '../schema/schemaHelper'
import {ILanguage} from './iLanguage'
import {Executor}  from '../connection'
import {OperandManager}  from './operandManager'
import {Query,Sentence}  from './operands'
import {CompleteExpressionManager}  from './completeExpressionManager'

export class LanguageManager
{   
    private languages:any
    public dialects:any
    private orm:IOrm    
    private completeExpression:CompleteExpressionManager
    private operandManager:OperandManager
    constructor(orm:IOrm,languageModel:Model){
        this.orm=orm;
        this.completeExpression= new CompleteExpressionManager();
        this.operandManager= new OperandManager(languageModel);
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
    public hadQuery(dialect:string){
        return this.get(dialect).hadQuery; 
    }
    public build(node:Node,schema:SchemaHelper): Operand
    {
        let _node = this.complete(node,schema);
        return this.operandManager.build(_node,schema);
    }
    public complete(node:Node,schema:SchemaHelper): Node
    {
        let completeNode= this.completeExpression.completeNode(node,schema);
        this.orm.node.setParent(completeNode);
        return completeNode; 
    }
    public model(sentence:Sentence):any
    {
        return this.operandManager.model(sentence);
    }
    public query(dialect:string,sentence:Sentence): Query
    {       
        return this.get(dialect).query.build(sentence,dialect);
    }
    public sentence(dialect:string,operand:Query):any
    {
        return this.get(dialect).query.sentence(operand);
    }
    public serialize(operand:Operand):any
    {
        return this.operandManager.serialize(operand);
    }
    public deserialize(serialized:any)
    {
        return this.operandManager.deserialize(serialized);
    }
    public serializeQuery(dialect:string,operand:Operand):any
    {
        return this.get(dialect).query.serialize(operand);
    }
    public deserializeQuery(dialect:string,serialized:any)
    {
        return this.get(dialect).query.deserialize(serialized);
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
}