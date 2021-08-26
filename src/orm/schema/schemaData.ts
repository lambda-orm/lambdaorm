
export interface SchemaEntityExpression
{
    entity:string
    expression:string
}
export interface SchemaExpression
{
    entities:SchemaEntityExpression[]
}

export interface SchemaEntitySentence
{
    entity:string
    sentence:string
}
export interface SchemaSentence
{
    entities:SchemaEntitySentence[]
}

export interface SchemaDataEntity
{
    entity:string
    rows:any[]
}
export interface SchemaData
{
    entities:SchemaDataEntity[]
}

