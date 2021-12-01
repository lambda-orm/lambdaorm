import { IOrm } from './../index'

export class ExpressionActions {
	private orm
	private name
	private datastore
	constructor (name: string, orm:IOrm, datastore:string) {
		this.name = name
		this.datastore = datastore
		this.orm = orm
	}

	public async execute (expresion: string, data:any, context:any): Promise<any> {
		return await this.orm.execute(`${this.name}${expresion}`, data, this.datastore, context)
	}

	public complete (expresion: string): string {
		return this.orm.complete(`${this.name}${expresion}`)
	}

	public async model (expresion: string): Promise<any> {
		return await this.orm.model(`${this.name}${expresion}`)
	}

	public async parameters (expresion: string): Promise<any> {
		return await this.orm.parameters(`${this.name}${expresion}`)
	}

	public async metadata (expresion: string): Promise<any> {
		return await this.orm.metadata(`${this.name}${expresion}`)
	}

	public async sentence (expresion: string): Promise<string> {
		return await this.orm.sentence(`${this.name}${expresion}`, this.datastore)
	}
}
