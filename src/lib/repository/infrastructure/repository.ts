// TODO: solve
import { orm as _orm } from '../../'
import { IOrm } from '../../orm/application'
import { ExpressionActionsImpl } from '../domain'
import { IRepository, Queryable } from 'lambdaorm-base'

export class Repository<TEntity, TQuery> implements IRepository<TEntity, TQuery> {
	// eslint-disable-next-line no-useless-constructor
	constructor (public readonly name: string, public stage?:string, private readonly orm:IOrm = _orm) {}
	bulkMerge(entities: TEntity[]): Promise<any[]>
	bulkMerge(entities: TEntity[], include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]>
	bulkMerge(entities: TEntity[], include?: ((value: TQuery, index: number, array: TQuery[]) => unknown) | undefined): Promise<any[]>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	bulkMerge (entities: unknown, include?: unknown): Promise<any[]> {
		throw new Error('Method not implemented.')
	}

	protected async _execute (
		head: string,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		data: any = {}
	): Promise<any> {
		let expression = `${head}`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return this.orm.execute(expression, data, { stage: this.stage })
	}

	public async execute (expression: string, data?: any): Promise<any> {
		return this.orm.execute(`${this.name}${expression}`, data, { stage: this.stage })
	}

	/**  */
	insert(entity: TEntity): Promise<any>
	/**  */
	insert(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any>
	public async insert (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any> {
		return this._execute(`${this.name}.insert()`, undefined, include, entity)
	}

	/**  */
	bulkInsert(entities:TEntity[]): Promise<any[]>
	/**  */
	bulkInsert(entities:TEntity[], include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]>
	public async bulkInsert (entities: TEntity[], include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<any[]> {
		return this._execute(`${this.name}.bulkInsert()`, undefined, include, entities)
	}

	/**  */
	update(entity:TEntity): Promise<number>
	/**  */
	update(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>
	public async update (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number> {
		return this._execute(`${this.name}.update()`, undefined, include, entity)
	}

	public async updateAll (data:any,
		map: (value: TEntity) => unknown,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<number> {
		return this._execute(`${this.name}.updateAll(${map.toString()})`, filter, include, data)
	}

	/**  */
	merge(entity:TEntity): Promise<number>
	/**  */
	merge(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>
	public async merge (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number> {
		return this._execute(`${this.name}.merge()`, undefined, include, entity)
	}

	/**  */
	delete(entity:TEntity): Promise<number>
	/**  */
	delete(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>
	public async delete (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number> {
		return this._execute(`${this.name}.delete()`, undefined, include, entity)
	}

	public async deleteAll (data:any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<number> {
		return this._execute(`${this.name}.deleteAll()`, filter, include, data)
	}

	public async list (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity[]> {
		return this._execute(`${this.name}`, filter, include, data)
	}

	public async distinct (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<any[]> {
		return this._execute(`${this.name}.distinct()`, filter, include, data)
	}

	public async first (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity | null> {
		const result = await this._execute(`${this.name}.first()`, filter, include, data)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	public async last (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity|null> {
		const result = await this._execute(`${this.name}.last()`, filter, include, data)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	public query (): Queryable<TQuery> {
		return new Queryable<TQuery>(new ExpressionActionsImpl(this.name, this.orm, this.stage), '')
	}
}
