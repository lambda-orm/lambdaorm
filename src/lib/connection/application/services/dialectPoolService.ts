
import { ConnectionConfig, ConnectionError } from '../../domain'
import { ConnectionPool } from '../ports/connectionPool'

export class DialectPoolService {
	private dialectsPool:any = {}

	// public addDialect (dialect:string, classConnectionPool:new () => ConnectionPool) {
	public add (dialect:string, classConnectionPool:any):void {
		this.dialectsPool[dialect] = classConnectionPool
	}

	public create (config:ConnectionConfig):ConnectionPool {
		const DialectPool = this.dialectsPool[config.dialect]
		if (DialectPool === undefined) {
			throw new ConnectionError(`Connection to ${config.name} whit dialect ${config.dialect} not supported`)
		}
		return new DialectPool(config) as ConnectionPool
	}
}
