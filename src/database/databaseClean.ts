import {Delta,IOrm,Namespace,Schema} from '../model/index'
import {SchemaDrop} from '../schema'
import {ITransaction,ExecutionResult} from '../connection'

export class DatabaseClean 
{
    protected orm:IOrm
    protected namespace:Namespace
    constructor(orm:IOrm,namespace:Namespace){
        this.orm= orm;
        this.namespace= namespace;
    }    
    public async sentence():Promise<any[]>
    {
        let connection = this.orm.connection.get(this.namespace.name);
        return (await this.schemaDrop()).sentence(connection.dialect);
    }
    public async execute(transaction?:ITransaction,tryAllCan:boolean=false):Promise<ExecutionResult>
    {
        let result= await (await this.schemaDrop()).execute(this.namespace.name,transaction,tryAllCan);
        await this.orm.database.removeState(this.namespace.name);
        return result;
    }
    protected async schemaDrop():Promise<SchemaDrop>
    {   
        let state = await this.orm.database.getState(this.namespace.name);
        return this.orm.schema.drop(state.schema);              
    }
}