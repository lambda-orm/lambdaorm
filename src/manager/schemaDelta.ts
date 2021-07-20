import {Delta,IOrm} from './../model/index'
import {SchemaHelper} from './schemaHelper'

export class SchemaDelta
{
    private delta:Delta;
    private orm:IOrm 
    private schema:SchemaHelper   
    constructor(orm:IOrm,schema:SchemaHelper,delta:Delta){
        this.orm=orm;
        this.schema=schema;
        this.delta = delta;
    }
    public serialize():Delta
    {
        return this.delta;
    }
    public sql(dialect:string):string
    {
        return this.orm.dialect.schemaSql(this.schema,this.delta,dialect);
    }
}