
import { Connection, ConnectionConfig, ConnectionPool } from '..'
import { MySqlConnection } from './MySQL'

export class MariaDBConnectionPool extends ConnectionPool {
	private static lib:any
	private pool:any
	constructor (config:ConnectionConfig) {
		super(config)
		if (!MariaDBConnectionPool.lib) {
			MariaDBConnectionPool.lib = require('mysql2/promise')
		}
	}

	public async init (): Promise<void> {
		const casts = {
			typeCast: function (field:any, next:any) {
				if (field.type === 'DECIMAL') {
					const value = field.string()
					return (value === null) ? null : Number(value)
				}
				return next()
			}
		}
		this.pool = MariaDBConnectionPool.lib.createPool({ ...this.config.connection, ...casts })
	}

	public async acquire (): Promise<Connection> {
		if (this.pool === undefined) {
			await this.init()
		}
		const cnx = await this.pool.getConnection()
		return new MySqlConnection(cnx, this)
	}

	public async release (connection:Connection):Promise<void> {
		await connection.cnx.release()
	}

	public async end (): Promise<void> {
		if (this.pool !== undefined) {
			this.pool.end()
		}
	}
}
