import {Delta,IOrm,Database,Schema} from '../model/index'
import {SchemaDrop} from '../schema'
import {Transaction,ExecutionResult} from '../connection'

export class DatabaseClean 
{
    protected orm:IOrm
    protected database:Database
    constructor(orm:IOrm,database:Database){
        this.orm= orm;
        this.database= database;
    }    
    public async sentence():Promise<any[]>
    {
        let connection = this.orm.connection.get(this.database.name);
        return (await this.schemaDrop()).sentence(connection.dialect);
    }
    public async execute(tryAllCan:boolean=false):Promise<ExecutionResult>
    {
        let result= await (await this.schemaDrop()).execute(this.database.name,tryAllCan);
        await this.orm.database.removeState(this.database.name);
        return result;
    }
    protected async schemaDrop():Promise<SchemaDrop>
    {   
        let state = await this.orm.database.getState(this.database.name);
        return this.orm.schema.drop(state.schema);              
    }
}