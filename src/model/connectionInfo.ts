export default interface ConnectionInfo {
    name:string
    dialect:string // "mysql"| "mssql"| "oracle" | "postgres" | "nomgo"
    schema:string
    host:string
    port:number
    user:string
    password:string    
    database:string
}