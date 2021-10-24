import { IOrm, Database, Context, Query } from '../model'
import * as c from './../connection/transaction'

export class Transaction {
	private orm:IOrm
	private database:Database
	private transaction:c.Transaction
	constructor (orm:IOrm, database:Database, transaction:c.Transaction) {
		this.orm = orm
		this.database = database
		this.transaction = transaction
	}

	public async expression (expression:string, context:any):Promise<any> {
		const _context = new Context(context)
		const operand = await this.orm.query(expression, this.database.dialect, this.database.schema)
		return await this.orm.language.execute(this.database.dialect, operand, _context, this.transaction)
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async lambda (lambda:Function, context:any):Promise<any> {
		return await this.expression(this.orm.lambda(lambda).expression, context)
	}

	public async execute (query:Query):Promise<any> {
		return await this.transaction.execute(query)
	}
}
