import {IOrm,Database,Context} from '../model'
import * as c from './../connection/transaction'

export class Transaction 
{    
    private orm:IOrm
    private database:Database
    private transaction:c.Transaction
    constructor(orm:IOrm,database:Database,transaction:c.Transaction){
        this.orm=orm
        this.database=database
        this.transaction=transaction
    }    
    public async execute(expression:string,context:any):Promise<any>
    {
        let _context = new Context(context)
        let operand = await this.orm.query(expression,this.database.dialect,this.database.schema)
        return await this.orm.language.execute(this.database.dialect,operand,_context,this.transaction)
    }
    public async executeSentence(sentence:any):Promise<any>
    {
        return await this.transaction.execute(sentence)
    }
}
