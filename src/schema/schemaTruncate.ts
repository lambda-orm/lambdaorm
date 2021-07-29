import {SchemaAction} from './schemaAction'

export class SchemaTruncate extends SchemaAction
{   
    public sql(dialect:string):string
    {
        return this.orm.language(dialect).schema.truncate(dialect,this.schema);
    }
}