import {IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {ITransaction,ConnectionConfig } from '../connection'

export abstract class SchemaActionDDL
{    
    protected orm:IOrm 
    protected schema:SchemaHelper   
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm;
        this.schema=schema;
    }
    public abstract sql(dialect:string):string;
    public async execute(connection?:string|ITransaction):Promise<any>
    {       
        let config:ConnectionConfig; 
        if( typeof connection === "string"){
            config=this.orm.connection.get(connection);
        }else{
            let transaction = connection as ITransaction;
            if(transaction)
                config=this.orm.connection.get(transaction.connectionName);
            else
                throw `connection no valid`; 
        }
        const sql = this.sql(config.dialect);
        return await this.orm.executeSql(sql,connection);
    }
}