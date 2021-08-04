import {SchemaActionDDL} from './schemaActionDDL'

export class SchemaDrop extends SchemaActionDDL
{   
    public sentence(dialect:string):any[]
    {
        return this.orm.language(dialect).schema.drop(dialect,this.schema);
    }
}