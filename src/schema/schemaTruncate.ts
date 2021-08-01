import {SchemaActionDDL} from './schemaActionDDL'

export class SchemaTruncate extends SchemaActionDDL
{   
    public sql(dialect:string):string
    {
        return this.orm.language(dialect).schema.truncate(dialect,this.schema);
    }
}