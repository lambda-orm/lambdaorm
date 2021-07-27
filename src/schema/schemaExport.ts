
export interface SchemaExportEntityExpression
{
    entity:string
    expression:string
}
export interface SchemaExportExpression
{
    entities:SchemaExportEntityExpression[]
}

export interface SchemaExportEntitySentence
{
    entity:string
    sentence:string
}
export interface SchemaExportSentence
{
    entities:SchemaExportEntitySentence[]
}

export interface SchemaExportEntity
{
    entity:string
    rows:any[]
}
export interface SchemaExport
{
    entities:SchemaExportEntity[]
}