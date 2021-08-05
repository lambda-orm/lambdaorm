export interface ConnectionConfig {
    name:string
    dialect:string 
    connection:any
    min?:number
    max?:number
}