import { OrmH3lp } from '../../../shared/application'
import { ConnectionConfig, ConnectionError } from '../../domain'
import { ConnectionPool } from '../ports/connectionPool'

export class DialectPoolService {
	private dialectsPool:any
	constructor (private readonly helper:OrmH3lp) {
		this.dialectsPool = {}
	}

	public add (dialect:string, classConnectionPool:any):void {
		this.dialectsPool[dialect] = classConnectionPool
	}

	public create (config:ConnectionConfig):ConnectionPool {
		const DialectPool = this.dialectsPool[config.dialect]
		if (DialectPool === undefined) {
			throw new ConnectionError(`Connection to ${config.name} whit dialect ${config.dialect} not supported`)
		}
		return new DialectPool(config, this.helper) as ConnectionPool
	}
}
