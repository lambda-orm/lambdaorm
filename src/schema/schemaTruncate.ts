import {SchemaActionDDL} from './schemaActionDDL'

export class SchemaTruncate extends SchemaActionDDL
{   
    public sentence(dialect:string):string[]
    {
        return this.orm.language(dialect).schema.truncate(dialect,this.schema);
    }
}