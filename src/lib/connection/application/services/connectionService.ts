// import { ConnectionConfig, ConnectionError } from '../../domain'
// import { Connection } from '../ports/connection'
// import { ConnectionPool } from '../ports/connectionPool'

// export class ConnectionService {
// private dialectsPool:any
// private pools:any
// constructor () {
// this.dialectsPool = {}
// this.pools = {}
// }

// // public addDialect (dialect:string, classConnectionPool:new () => ConnectionPool) {
// public addDialect (dialect:string, classConnectionPool:any) {
// this.dialectsPool[dialect] = classConnectionPool
// }

// public load (config:ConnectionConfig):void {
// const DialectPool = this.dialectsPool[config.dialect]
// if (DialectPool === undefined) {
// throw new ConnectionError(`Connection to ${config.name} whit dialect ${config.dialect} not supported`)
// }
// const pool = new DialectPool(config) as ConnectionPool
// this.pools[config.name] = pool
// }

// protected pool (name:string):ConnectionPool {
// const pool = this.pools[name] as ConnectionPool
// if (!pool) {
// throw new ConnectionError(`connection ${name} not found`)
// }
// return pool
// }

// public async end ():Promise<void> {
// for (const k in this.pools) {
// const pool = this.pools[k] as ConnectionPool
// await pool.end()
// }
// }

// public get (name:string):ConnectionConfig {
// return this.pool(name).config
// }

// public async acquire (name:string):Promise<Connection> {
// const pool = this.pools[name] as ConnectionPool
// if (!pool) { throw new ConnectionError(`connection ${name} not found`) }

// return this.pool(name).acquire()
// }

// public async release (connection:Connection):Promise<void> {
// await this.pool(connection.config.name).release(connection)
// }
// }
