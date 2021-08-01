import {SchemaActionDDL} from './schemaActionDDL'

export class SchemaCreate extends SchemaActionDDL
{   
    public sql(dialect:string):string
    {
        return this.orm.language(dialect).schema.create(dialect,this.schema);
    }
}