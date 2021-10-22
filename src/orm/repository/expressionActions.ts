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
		return this.orm.expression(`${this.name}${expresion}`).execute(data, this.database)
	}

	public complete (expresion: string): string {
		const db = this.orm.database.get(this.database)
		return this.orm.expression(`${this.name}${expresion}`).complete(db.schema)
	}

	public async model (expresion: string): Promise<any> {
		const db = this.orm.database.get(this.database)
		return await this.orm.expression(`${this.name}${expresion}`).model(db.schema)
	}

	public async parameters (expresion: string): Promise<any> {
		const db = this.orm.database.get(this.database)
		return await this.orm.expression(`${this.name}${expresion}`).parameters(db.schema)
	}

	public async metadata (expresion: string): Promise<any> {
		const db = this.orm.database.get(this.database)
		return await this.orm.expression(`${this.name}${expresion}`).metadata(db.schema)
	}

	public async sentence (expresion: string): Promise<string> {
		const db = this.orm.database.get(this.database)
		return await this.orm.expression(`${this.name}${expresion}`).sentence(db.dialect, db.schema)
	}
}
