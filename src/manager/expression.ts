import {IOrm} from './../model'
import {Transaction} from './../connection'
import {NodeExpression} from './nodeExpression'
import {Query,Sentence}  from './../language'

export class Expression
{
    private orm:IOrm
    public expression:string    
    constructor(orm:IOrm,expression:string)
    {     
        this.orm =  orm; 
        this.expression= expression;
    }
    public parse():NodeExpression 
    {
       if(!this.expression)throw 'Expression not defined';
       let node = this.orm.node.parse(this.expression);
       return new NodeExpression(this.orm.node,node);
    }
    public complete(schemaName:string):string
    {
       if(!this.expression)throw 'Expression not defined';
       return this.orm.complete(this.expression,schemaName);
    }
    public async model(schemaName:string):Promise<any>
    {
        let operand = await this.orm.build(this.expression,schemaName);
        return this.orm.language.model(operand as Sentence);
    }
    public async sentence(dialect:string,schemaName:string):Promise<string>
    {
        let query = await this.orm.query(this.expression,dialect,schemaName);
        return this.orm.language.sentence(dialect,query);
    }
    public async serialize(dialect:string,schemaName:string):Promise<string>
    {
        let query = await this.orm.query(this.expression,dialect,schemaName);
        return this.orm.language.serialize(dialect,query);
    }  
    public async execute(context:any,database:string,transaction?:Transaction)
    {  
        let _database= this.orm.database.get(database);
        let query = await this.orm.query(this.expression,_database.dialect,_database.schema);
        return await this.orm.execute(query,context,database,transaction);
    }  
    
}


