import { IOrm } from './../index'

export class ExpressionActions {
	private orm
	private name
	private datastore
	constructor (name: string, orm:IOrm, datastore?:string) {
		this.name = name
		this.datastore = datastore
		this.orm = orm
	}

	public async execute (expresion: string, data:any): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).execute(data, this.datastore)
	}

	public complete (expresion: string): string {
		return this.orm.expression(`${this.name}${expresion}`).complete()
	}

	public async model (expresion: string): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).model()
	}

	public async parameters (expresion: string): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).parameters()
	}

	public async metadata (expresion: string): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).metadata()
	}

	public async sentence (expresion: string): Promise<string> {
		return await this.orm.expression(`${this.name}${expresion}`).sentence()
	}
}
