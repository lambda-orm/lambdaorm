import { orm, IOrm } from './../index'
import { Queryable, ModifyClauses, ModifyAllClauses } from './query'
import { IExpressionActions } from './expressionActions'

export class Respository<TQuery> implements IExpressionActions {
	public name
	public database
	private orm
	constructor (name: string, database?:string, Orm?:IOrm) {
		this.name = name
		this.database = database
		this.orm = Orm !== undefined ? Orm : orm
	}

	public query (): Queryable<TQuery> {
		return new Queryable<TQuery>(this, '')
	}

	/**  */
	insert(): ModifyClauses<TQuery>
	/**  */
	insert(predicate: (value:TQuery) => unknown): ModifyClauses<TQuery>
	public insert (predicate?: (value:TQuery) => unknown): ModifyClauses<TQuery> {
		if (predicate === undefined) {
			return new ModifyClauses(this, '.insert()')
		} else {
			return new ModifyClauses(this, `.insert(${predicate.toString()})`)
		}
	}

	/**  */
	update(): ModifyClauses<TQuery>
	/**  */
	update(predicate: (value:TQuery) => unknown): ModifyClauses<TQuery>
	public update (predicate?: (value:TQuery) => unknown): ModifyClauses<TQuery> {
		if (predicate === undefined) {
			return new ModifyClauses(this, '.update()')
		} else {
			return new ModifyClauses(this, `.update(${predicate.toString()})`)
		}
	}

	/**  */
	updateAll(): ModifyClauses<TQuery>
	/**  */
	updateAll(predicate:(value:TQuery) => unknown): ModifyClauses<TQuery>
	public updateAll (predicate?: (value: TQuery) => unknown): ModifyAllClauses<TQuery> {
		if (predicate === undefined) {
			return new ModifyClauses(this, '.updateAll()')
		} else {
			return new ModifyClauses(this, `.updateAll(${predicate.toString()})`)
		}
	}

	/**  */
	merge(): ModifyClauses<TQuery>
	/**  */
	merge(predicate: (value:TQuery) => unknown): ModifyClauses<TQuery>
	public merge (predicate?: (value:TQuery) => unknown): ModifyClauses<TQuery> {
		if (predicate === undefined) {
			return new ModifyClauses(this, '.merge()')
		} else {
			return new ModifyClauses(this, `.merge(${predicate.toString()})`)
		}
	}

	/**  */
	delete(): ModifyClauses<TQuery>
	/**  */
	delete(predicate:(value:TQuery) => unknown): ModifyClauses<TQuery>
	public delete (predicate?: (value:TQuery) => unknown): ModifyClauses<TQuery> {
		if (predicate === undefined) {
			return new ModifyClauses(this, '.delete()')
		} else {
			return new ModifyClauses(this, `.delete(${predicate.toString()})`)
		}
	}

	/**  */
	deleteAll(): ModifyClauses<TQuery>
	/**  */
	deleteAll(predicate:(value:TQuery) => unknown): ModifyClauses<TQuery>
	public deleteAll (predicate?: (value: TQuery) => unknown): ModifyAllClauses<TQuery> {
		if (predicate === undefined) {
			return new ModifyClauses(this, '.deleteAll()')
		} else {
			return new ModifyClauses(this, `.deleteAll(${predicate.toString()})`)
		}
	}

	public async execute (expresion: string, data?: any): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).execute(data, this.database)
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
