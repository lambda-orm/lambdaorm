
export interface Config
{
    schemas: ConfigSchemas
    state: ConfigState
    databases:Database[]
}
export interface ConfigSchemas
{
    path:string
}
export interface ConfigState
{
    path:string
}
export interface Database
{
    name: string
    dialect: string
    connectionSource?:'env'|'direct'
    connection:any
    schema:string
}