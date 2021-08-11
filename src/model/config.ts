
export interface Config
{
    schemas: ConfigSchemas
    state: ConfigState
    namespaces:Namespace[]
}
export interface ConfigSchemas
{
    sourceType: string
    path?:string
}
export interface ConfigState
{
    sourceType: string
    path?:string
}
export interface Namespace
{
    name: string
    dialect: string
    connectionSource?:'env'|'direct'
    connection:any
    schema:string
}