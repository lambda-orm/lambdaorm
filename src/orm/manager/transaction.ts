import {IOrm,Database,Context} from '../model'
import {Transaction } from './../connection'

export class TransactionManager 
{    
    private orm:IOrm
    private database:Database
    private transaction:Transaction
    constructor(orm:IOrm,database:string,transaction:Transaction){
        this.orm=orm;
        this.transaction=transaction;
        this.database=this.orm.database.get(database);
    }    
    public async execute(expression:string,context:any):Promise<any>
    {
        let _context = new Context(context);
        let operand = await this.orm.query(expression,this.database.dialect,this.database.schema);
        return await this.orm.language.execute(this.database.dialect,operand,_context,this.transaction);
    }
    public async executeSentence(sentence:any):Promise<any>
    {
        return await this.transaction.execute(sentence);
    }
}