import { IOrm, Context, Query } from '../model'
import { QueryExecutor } from './../manager/queryExecutor'

export class Transaction {
	private orm:IOrm
	private queryExecutor:QueryExecutor
	constructor (orm: IOrm, queryExecutor: QueryExecutor) {
		this.orm = orm
		this.queryExecutor = queryExecutor
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async lambda (lambda:Function, context:any):Promise<any> {
		return await this.expression(this.orm.lambda(lambda).expression, context)
	}

	public async expression (expression:string, context:any):Promise<any> {
		const query = await this.orm.query(expression, this.queryExecutor.database.name)
		return await this.execute(query, context)
	}

	public async execute (query: Query, context: any = {}): Promise<any> {
		const _context = new Context(context)
		return await this.queryExecutor.execute(query, _context)
	}
}
