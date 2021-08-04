export interface ConnectionConfig {
    name:string
    dialect:string 
    schema:string
    connection:any
    min?:number
    max?:number
}