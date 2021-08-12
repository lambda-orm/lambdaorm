
export interface Config
{
    schemasPath?: string
    statePath?: string
    databases?:Database[]
}
export interface Database
{
    name: string
    dialect: string
    connectionSource?:'env'|'direct'
    connection:any
    schema:string
}