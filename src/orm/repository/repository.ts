import { orm } from '../../orm'
import { Queryable, ModifyClauses } from './query'
import { IExpressionActions } from './expressionActions'

export class Respository<TEntity, TQuery> implements IExpressionActions {
	public name
	public database
	private orm
	constructor (name: string, database:string) {
		this.name = name
		this.database = database
		this.orm = orm
	}

	// save(entity: TEntity, include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<TEntity>
	// save(entities: TEntity[], include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<TEntity[]>
	// public async save (entity: TEntity | TEntity[], include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<TEntity | TEntity[]> {
	// let expression = '.insert()'
	// if (include !== undefined) {
	// expression = `${expression}.includes(${include.toString()})`
	// }
	// return await this.execute(expression, entity)
	// }

	// insert(entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<TEntity>
	// insert(entities: TEntity[], include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<TEntity[]>
	// public async insert (entity: TEntity | TEntity[], include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<TEntity | TEntity[]> {
	// let expression = '.insert()'
	// if (include !== undefined) {
	// expression = `${expression}.includes(${include.toString()})`
	// }
	// return await this.execute(expression, entity)
	// }

	// update(entity: TEntity, include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<TEntity>
	// update(entities: TEntity[], include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<TEntity[]>
	// public async update (entity: TEntity | TEntity[], include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<TEntity | TEntity[]> {
	// let expression = '.update()'
	// if (include !== undefined) {
	// expression = `${expression}.includes(${include.toString()})`
	// }
	// return await this.execute(expression, entity)
	// }

	// delete(entity: TEntity, include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<void>
	// delete(entities: TEntity[], include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<void>
	// public async delete (entity: TEntity | TEntity[], include?: (value: TEntity, index: number, array: TEntity[]) => unknown): Promise<void> {
	// let expression = '.delete()'
	// if (include !== undefined) {
	// expression = `${expression}.includes(${include.toString()})`
	// }
	// return await this.execute(expression, entity)
	// }

	public get query (): Queryable<TQuery> {
		return new Queryable<TQuery>(this, '')
	}

	public get insert (): ModifyClauses<TQuery> {
		return new ModifyClauses(this, '.insert()')
	}

	public get update (): ModifyClauses<TQuery> {
		return new ModifyClauses(this, '.update()')
	}

	public get delete (): ModifyClauses<TQuery> {
		return new ModifyClauses(this, '.delete()')
	}

	public async execute (expresion: string, data?: any): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).execute(this.database, data)
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
