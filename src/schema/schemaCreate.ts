import {SchemaAction} from './schemaAction'

export class SchemaCreate extends SchemaAction
{   
    public sql(dialect:string):string
    {
        return this.orm.language(dialect).schema.create(dialect,this.schema);
    }
}