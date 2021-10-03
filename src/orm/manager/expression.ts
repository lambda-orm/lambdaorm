import { IOrm } from './../model'
import { Sentence, Operand } from './../language'

export class Expression {
	private orm:IOrm
	public expression:string
	constructor (orm:IOrm, expression:string) {
		this.orm = orm
		this.expression = expression
	}

	public complete (schemaName:string):string {
		if (!this.expression) throw new Error('Expression not defined')
		return this.orm.complete(this.expression, schemaName)
	}

	public async model (schemaName:string):Promise<any> {
		const operand = await this.orm.build(this.expression, schemaName)
		return this.orm.language.model(operand as Sentence)
	}

	public async sentence (dialect:string, schemaName:string):Promise<string> {
		const query = await this.orm.query(this.expression, dialect, schemaName)
		return this.orm.language.sentence(dialect, query)
	}

	public async serialize (schemaName:string):Promise<any> {
		const operand = await this.orm.build(this.expression, schemaName)
		return this.orm.language.serialize(operand)
	}

	public async deserialize (serialized:any):Promise<Operand> {
		return this.orm.language.deserialize(serialized)
	}

	public async execute (context:any, database:string) {
		return await this.orm.execute(this.expression, context, database)
	}
}
