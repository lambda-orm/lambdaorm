export interface ConnectionConfig {
    name:string
    dialect:string 
    schema:string
    host:string
    port:number
    user:string
    password:string    
    database:string
    max?:number
    min?:number
}