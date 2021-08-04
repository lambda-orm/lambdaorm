import {Delta,IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {SchemaActionDDL} from './schemaActionDDL'
import {ExecutionSyncResult} from './executionSyncResult'
import {ITransaction} from '../connection'

export class SchemaSync extends SchemaActionDDL
{
    protected delta:Delta;
    constructor(orm:IOrm,schema:SchemaHelper,delta:Delta){
        super(orm,schema);
        this.delta= delta;
    }
    public serialize():Delta
    {
        return this.delta;
    }
    public sentence(dialect:string):any[]
    {
        return this.orm.language(dialect).schema.sync(this.delta,dialect,this.schema);
    }
    public async execute(connection?:string|ITransaction):Promise<ExecutionSyncResult>
    {
       let result= await super.execute(connection);
       return {result:result.result,sentences:result.sentences,delta:this.delta};
    }
}