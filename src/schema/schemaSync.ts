import {Delta,IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {SchemaActionDDL} from './schemaActionDDL'

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
    public sentence(dialect:string):string
    {
        return this.orm.language(dialect).schema.sync(this.delta,dialect,this.schema);
    }
}