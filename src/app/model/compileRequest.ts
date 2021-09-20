export default interface CompileRequest {
    expression: string
    schema: string
    dialect: 'mysql'| 'mssql'| 'oracle' | 'postgres' | 'nomgo'
}
