import { IOrm } from './../model'
import { Sentence } from './../language'

/**
 * Expression Manager
 */
export class Expression {
	private orm:IOrm
	public expression:string
	constructor (orm:IOrm, expression:string) {
		this.orm = orm
		this.expression = expression
	}

	/**
	 * Complete expression
	 * @param schema Schema name
	 * @returns Expression complete
	 */
	public complete (schema:string):string {
		if (!this.expression) throw new Error('Expression not defined')
		return this.orm.complete(this.expression, schema)
	}

	/**
	 * Get model of expression
	 * @param schema Schema name
	 * @returns Model of expression
	 */
	public async model (schema:string):Promise<any> {
		const operand = await this.orm.build(this.expression, schema)
		return this.orm.language.model(operand as Sentence)
	}

	/**
	 * Get parameters of expression
	 * @param schema  Schema name
	 * @returns Parameters of expression
	 */
	public async parameters (schema:string):Promise<any> {
		const operand = await this.orm.build(this.expression, schema)
		return this.orm.language.parameters(operand as Sentence)
	}

	/**
	 * Get sentence of expression
	 * @param dialect Dialect name
	 * @param schema Schema name
	 * @returns Sentence of expression
	 */
	public async sentence (dialect:string, schema:string):Promise<string> {
		const query = await this.orm.query(this.expression, dialect, schema)
		return this.orm.language.sentence(dialect, query)
	}

	/**
	 * Get metadata of expression
	 * @param schema Schema name
	 * @returns metadata of expression
	 */
	public async metadata (schema:string):Promise<any> {
		const operand = await this.orm.build(this.expression, schema)
		return this.orm.language.serialize(operand)
	}

	/**
	 * Execute expression
	 * @param context Context with variables
	 * @param database Database name
	 * @returns Result of execution
	 */
	public async execute (context: any = {}, database?: string) {
		return await this.orm.execute(this.expression, context, database)
	}
}
