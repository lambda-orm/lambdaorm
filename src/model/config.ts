export interface Config
{
    schemas: ConfigSchemas
    state: ConfigState
    conections:ConfigConnections
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
export interface ConfigConnections
{
    sourceType:string
}
export interface Namespace
{
    name: string
    connection:string
    schema:string
}