import {SchemaActionDDL} from './schemaActionDDL'

export class SchemaDrop extends SchemaActionDDL
{   
    public sql(dialect:string):string
    {
        return this.orm.language(dialect).schema.drop(dialect,this.schema);
    }
}