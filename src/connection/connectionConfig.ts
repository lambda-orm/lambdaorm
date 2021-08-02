export interface ConnectionConfig {
    name:string
    dialect:string 
    schema:string
    connectionString:any
    min?:number
    max?:number
}