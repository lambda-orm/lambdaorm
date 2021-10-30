import { IOrm } from './../index'

export class ExpressionActions {
	private orm
	private name
	private database
	constructor (name: string, orm:IOrm, database?:string) {
		this.name = name
		this.database = database
		this.orm = orm
	}

	public async execute (expresion: string, data:any): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).execute(data, this.database)
	}

	public complete (expresion: string): string {
		return this.orm.expression(`${this.name}${expresion}`).complete(this.database)
	}

	public async model (expresion: string): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).model(this.database)
	}

	public async parameters (expresion: string): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).parameters(this.database)
	}

	public async metadata (expresion: string): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).metadata(this.database)
	}

	public async sentence (expresion: string): Promise<string> {
		return await this.orm.expression(`${this.name}${expresion}`).sentence(this.database)
	}
}
