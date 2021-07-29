import {SchemaAction} from './schemaAction'

export class SchemaDrop extends SchemaAction
{   
    public sql(dialect:string):string
    {
        return this.orm.language(dialect).schema.drop(dialect,this.schema);
    }
}