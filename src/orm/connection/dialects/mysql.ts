
/* eslint-disable no-tabs */

import { Connection, ConnectionConfig, ConnectionPool } from './..'
import { Parameter, Query } from '../../model'

const DECIMAL = 0
const TINY = 1
// const SHORT = 2
const LONG = 3
const FLOAT = 4
const DOUBLE = 5
// const NULL = 6
const TIMESTAMP = 7
const LONGLONG = 8
const INT24 = 9
const DATE = 10
const TIME = 11
const DATETIME = 12
// const YEAR = 13
const NEWDATE = 14
// const VARCHAR = 15
const BIT = 16
// const JSON = 245
const NEWDECIMAL = 246
// const ENUM = 247
// const SET = 248
// const TINY_BLOB = 249
// const MEDIUM_BLOB = 250
// const LONG_BLOB = 251
// const BLOB = 252
// const VAR_STRING = 253
// const STRING = 254
// const GEOMETRY = 255

export class MySqlConnectionPool extends ConnectionPool {
	private static mysql:any
	private pool:any
	constructor (config:ConnectionConfig) {
		super(config)
		if (!MySqlConnectionPool.mysql) {
			MySqlConnectionPool.mysql = require('mysql2/promise')
		}
	}

	public async init (): Promise<void> {
		// https://github.com/sidorares/node-mysql2/issues/795
		// https:// stackoverflow.com/questions/64774472/how-do-i-determine-the-column-type-name-from-the-columntype-integer-value-in-mys
		const casts = {
			typeCast: function (field:any, next:any) {
				if (field.type === 'DECIMAL') {
					const value = field.string()
					return (value === null) ? null : Number(value)
				}
				return next()
			}
		}
		this.pool = MySqlConnectionPool.mysql.createPool({ ...this.config.connection, ...casts })
	}

	// private async getConnection (): Promise<void> {
	// // eslint-disable-next-line @typescript-eslint/no-this-alias
	// const me = this
	// return new Promise<void>((resolve, reject) => {
	// me.pool.getConnection(function (err:any, cnn:any) {
	// if (err) {
	// reject(err)
	// }
	// resolve(cnn)
	// })
	// })
	// }

	public async acquire (): Promise<Connection> {
		if (this.pool === undefined) {
			await this.init()
		}
		const cnx = await this.pool.getConnection()
		// const cnx = await this.getConnection()
		return new MySqlConnection(cnx, this)
	}

	public async release (connection: Connection): Promise<void> {
		// if (this.pool !== undefined) {
		// this.pool.releaseConnection(connection.cnx)
		// }
		await connection.cnx.release()
	}

	public async end (): Promise<void> {
		if (this.pool !== undefined) {
			this.pool.end()
		}
	}
}

export class MySqlConnection extends Connection {
	public async select (query:Query, params:Parameter[]):Promise<any> {
		return await this._execute(query, params)
	}

	public async insert (query:Query, params:Parameter[]):Promise<number> {
		const result = await this._execute(query, params)
		return result.insertId
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async bulkInsert (query:Query, array:any[], params:Parameter[]):Promise<number[]> {
		try {
			if (!array || array.length === 0) {
				return []
			}
			// https://github.com/sidorares/node-mysql2/issues/830
			const result = await this.cnx.query(query.sentence, [array])

			// TODO: verificar https://github.com/sidorares/node-mysql2/issues/435
			const start = result[0].insertId
			const end = result[0].insertId + (result[0].affectedRows - 1)
			const lastInsertedIds:number[] = []
			for (let i = start; i <= end; i++)lastInsertedIds.push(i)
			return lastInsertedIds
		} catch (error:any) {
			throw new Error(`sentence: ${query.sentence} error: ${error.message}`)
		}
	}

	public async update (query:Query, params:Parameter[]):Promise<number> {
		const result = await this._execute(query, params)
		return result.affectedRows
	}

	public async delete (query:Query, params:Parameter[]):Promise<number> {
		const result = await this._execute(query, params)
		return result.affectedRows
	}

	public async execute (query:Query):Promise<any> {
		return await this.cnx.query(query.sentence)
	}

	public async executeSentence (sentence: any):Promise<any> {
		return await this.cnx.query(sentence)
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

	protected async _execute (query:Query, params:Parameter[] = []) {
		// Solve array parameters , example IN(?) where ? is array[]
		// https://github.com/sidorares/node-mysql2/issues/476
		let useExecute = true
		let result:any
		const values:any[] = []
		// en el caso de haber un array con elementos string no se esta pudiendo resolver el IN(,,,) con execute
		// por este motivo se esta usando query en este caso.
		// TODO: ver como se puede resolver este caso para usar execute siempre.
		for (let i = 0; i < params.length; i++) {
			if (params[i].type === 'array') { useExecute = false }
		}
		for (let i = 0; i < params.length; i++) { values.push(params[i].value) }

		if (useExecute) {
			result = await this.cnx.execute(query.sentence, values)
		} else {
			result = await this.cnx.query(query.sentence, values)
		}

		const rows = result[0]
		const cols = result[1]
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i]
			for (let j = 0; j < cols.length; j++) {
				const col = cols[j]
				const value = row[col.name]
				if (value !== null) {
					switch (col.columnType) {
					case TINY:
						// Boolean
						// https://www.javatpoint.com/mysql-boolean#:~:text=MySQL%20does%20not%20contain%20built,to%200%20and%201%20value.
						row[col.name] = value === 1
						break
					case DECIMAL:
					case LONG:
					case FLOAT:
					case DOUBLE:
					case LONGLONG:
					case INT24:
					case NEWDECIMAL:
						row[col.name] = Number(value)
						break
					case DATETIME:
					case DATE:
					case TIME:
					case NEWDATE:
					case TIMESTAMP:
						row[col.name] = new Date(value)
						break
					case BIT:
						row[col.name] = Boolean(value)
						break
					}
				}
			}
		}
		return rows

		// const TINY = 1
		// const SHORT = 2
		// const NULL = 6
		// const YEAR = 13
		// const VARCHAR = 15
		// const JSON = 245
		// const ENUM = 247
		// const SET = 248
		// const TINY_BLOB = 249
		// const MEDIUM_BLOB = 250
		// const LONG_BLOB = 251
		// const BLOB = 252
		// const VAR_STRING = 253
		// const STRING = 254
		// const GEOMETRY = 255

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
