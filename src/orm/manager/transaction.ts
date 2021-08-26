import {IOrm} from '../model'
import {Transaction } from './../connection'

export class TransactionManager 
{    
    private orm:IOrm
    private database:string
    private transaction:Transaction
    constructor(orm:IOrm,database:string,transaction:Transaction){
        this.orm=orm;
        this.transaction=transaction;
        this.database=database;
    }    
    public async execute(expression:string,context:any):Promise<any>
    {
        return await this.orm.execute(expression,context,this.database,this.transaction);
    }
}