import { ConnectionConfig } from './..'
import { MySqlConnection, MySqlConnectionPool } from './mysql'

export class MariadbConnectionPool extends MySqlConnectionPool {
	private static mariadb:any
	private pool:any
	constructor (config:ConnectionConfig) {
		super(config)
		if (!MariadbConnectionPool.mariadb) { MariadbConnectionPool.mariadb = require('mysql2') }

		const _config = { ...config.connection, ...{ waitForConnections: true, connectionLimit: 10, queueLimit: 0 } }
		this.pool = MariadbConnectionPool.mariadb.createPool(_config)
	}
}
export class MariaDbConnection extends MySqlConnection {

}
