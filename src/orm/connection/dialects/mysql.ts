import { Connection, ConnectionConfig, ConnectionPool } from './..'
import { Parameter } from '../../model'
import util from 'util'
// import { promisify } from 'util'

// import * as mysql from 'mysql2/promise'
export class MySqlConnectionPool extends ConnectionPool {
private static mysql:any
private pool:any
constructor (config:ConnectionConfig) {
	super(config)
	if (!MySqlConnectionPool.mysql) { MySqlConnectionPool.mysql = require('mysql2/promise') }

	const _config = { ...config.connection, ...{ waitForConnections: true, connectionLimit: 10, queueLimit: 0 } }
	this.pool = MySqlConnectionPool.mysql.createPool(_config)
}

public async acquire ():Promise<Connection> {
	const cnx = await util.promisify(this.pool.getConnection)
	// await cnx.connect()
	return new MySqlConnection(cnx, this)
	// let cnx = await this.pool.getConnection();
	// const cnx = await new Promise((resolve, reject) => {
	//     this.pool.getConnection((error:any, connection:any) => {
	//       if (error) {
	//         reject(error);
	//       } else {
	//         resolve(connection);
	//       }
	//     });
	// });
	// const cnx = await MySqlConnectionPool.mysql.createConnection(this.config.connection)
	// await cnx.connect()
	// return new MySqlConnection(cnx, this)
}

public async release (connection:Connection):Promise<void> {
	// await connection.cnx.end()
	await connection.cnx.release()
	// this.pool.releaseConnection(connection.cnx);
}
}

export class MySqlConnection extends Connection {
	public async select (sql:string, params:Parameter[]):Promise<any> {
		return await this._execute(sql, params)
	}

	public async insert (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.insertId
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async bulkInsert (sql:string, array:any[], parameters:Parameter[], fieldId?:string):Promise<number[]> {
		try {
			if (!array || array.length === 0) {
				return []
			}
			// https://github.com/sidorares/node-mysql2/issues/830
			const result = await this.cnx.query(sql, [array])

			// TODO: verificar https://github.com/sidorares/node-mysql2/issues/435
			const start = result[0].insertId
			const end = result[0].insertId + (result[0].affectedRows - 1)
			const lastInsertedIds:number[] = []
			for (let i = start; i <= end; i++)lastInsertedIds.push(i)
			return lastInsertedIds
		} catch (error:any) {
			throw new Error(`sentence: ${sql} error: ${error.message}`)
		}
	}

	public async update (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.affectedRows
	}

	public async delete (sql:string, params:Parameter[]):Promise<number> {
		const result = await this._execute(sql, params)
		return result.affectedRows
	}

	public async execute (sql:string):Promise<any> {
		return await this.cnx.query(sql)
	}

	public async beginTransaction ():Promise<void> {
		await this.cnx.beginTransaction()
		this.inTransaction = true
	}

	public async commit ():Promise<void> {
		await this.cnx.commit()
		this.inTransaction = false
	}

	public async rollback ():Promise<void> {
		await this.cnx.rollback()
		this.inTransaction = false
	}

	protected async _execute (sql:string, params:Parameter[] = []) {
		// Solve array parameters , example IN(?) where ? is array[]
		// https://github.com/sidorares/node-mysql2/issues/476
		let useExecute = true
		const values:any[] = []
		// en el caso de haber un array con elementos string no se esta pudiendo resolver el IN(,,,) con execute
		// por este motivo se esta usando query en este caso.
		// TODO: ver como se puede resolver este caso para usar execute siempre.
		for (let i = 0; i < params.length; i++) {
			if (params[i].type === 'array') { useExecute = false }
		}
		for (let i = 0; i < params.length; i++) { values.push(params[i].value) }

		if (useExecute) {
			const result = await this.cnx.execute(sql, values)
			return result[0]
		} else {
			const result = await this.cnx.query(sql, values)
			return result[0]
		}
		// for(let i=0;i<params.length;i++){
		//     let param = params[i];
		//     if(param.type=='array')
		//         if(param.value.length>0)
		//             if(typeof param.value[0] == 'string')
		//                 useExecute=false;
		// }
		// for(let i=0;i<params.length;i++){
		//     let param = params[i];
		//     if(param.type=='array')
		//         if(useExecute)
		//             values.push(param.value.join(','));
		//         else
		//             values.push(param.value);
		//     else
		//       values.push(param.value);
		// }
		// if(useExecute){
		//     let result = await this.cnx.execute(sql,values);
		//     return result[0];
		// }else{
		//     let result = await this.cnx.query(sql,values);
		//     return result[0];
		// }
	}
}
