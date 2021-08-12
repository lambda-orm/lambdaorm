import {Delta,IOrm,Namespace,Schema} from '../model/index'
import {SchemaSync,ExecutionSyncResult} from '../schema'
import {ITransaction} from '../connection'

export class DatabaseSync 
{
    protected orm:IOrm
    protected namespace:Namespace
    constructor(orm:IOrm,namespace:Namespace){
        this.orm= orm;
        this.namespace= namespace;
    }
    public async serialize():Promise<Delta>
    {
        let current = this.orm.schema.get(this.namespace.schema) as Schema;
        return (await this.schemaSync(current)).serialize();
    }
    public async sentence():Promise<any[]>
    {
        let current = this.orm.schema.get(this.namespace.schema) as Schema;
        let connection = this.orm.connection.get(this.namespace.name);
        return (await this.schemaSync(current)).sentence(connection.dialect);
    }
    public async execute(transaction?:ITransaction):Promise<ExecutionSyncResult>
    {
       let current = this.orm.schema.get(this.namespace.schema) as Schema;
       let result= await (await this.schemaSync(current)).execute(this.namespace.name,transaction );
       await this.orm.database.updateSchemaState(this.namespace.name,current);
       return result;
    }
    protected async schemaSync(current:Schema):Promise<SchemaSync>
    {           
        let state = await this.orm.database.getState(this.namespace.name);        
        return this.orm.schema.sync(current,state.schema);                    
    }
}