
export interface Config
{
    schemas: ConfigSchemas
    state: ConfigState
    databases:Database[]
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
export interface Database
{
    name: string
    dialect: string
    connectionSource?:'env'|'direct'
    connection:any
    schema:string
}