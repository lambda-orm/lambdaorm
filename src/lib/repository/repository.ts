import { orm, IOrm } from '../index'
import { Queryable } from './query'
import { ExpressionActions } from './expressionActions'

export class Respository<TEntity, TQuery> {
	public name
	public stage
	private orm
	constructor (name: string, stage?:string, Orm?:IOrm) {
		this.name = name
		this.stage = stage
		this.orm = Orm !== undefined ? Orm : orm
	}

	/**  */
	insert(entity: TEntity): Promise<number>
	/**  */
	insert(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>
	public async insert (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number> {
		let expression = `${this.name}.insert()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage)
	}

	/**  */
	bulkInsert(entity:TEntity): Promise<number[]>
	/**  */
	bulkInsert(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number[]>
	public async bulkInsert (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number[]> {
		let expression = `${this.name}.bulkInsert()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage)
	}

	/**  */
	update(entity:TEntity): Promise<void>
	/**  */
	update(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void>
	public async update (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void> {
		let expression = `${this.name}.update()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage)
	}

	public async updateAll (data:any,
		map: (value: TEntity) => unknown,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<number> {
		let expression = `${this.name}.updateAll(${map.toString()})`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.filter(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage)
	}

	/**  */
	merge(entity:TEntity): Promise<void>
	/**  */
	merge(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void>
	public async merge (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void> {
		let expression = `${this.name}.merge()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage)
	}

	/**  */
	delete(entity:TEntity): Promise<void>
	/**  */
	delete(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void>
	public async delete (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void> {
		let expression = `${this.name}.delete()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage)
	}

	public async deleteAll (data:any,
		map: (value: TEntity) => unknown,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<number> {
		let expression = `${this.name}.deleteAll(${map.toString()})`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.filter(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage)
	}

	public async execute (expresion: string, data?: any): Promise<any> {
		return await this.orm.execute(`${this.name}${expresion}`, data, this.stage)
	}

	public async list (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity[]> {
		let expression = `${this.name}`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage) as TEntity[]
	}

	public async distinct (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<any[]> {
		let expression = `${this.name}.distinct()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage)
	}

	public async first (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity|null> {
		let expression = `${this.name}.first()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		const result = await this.orm.execute(expression, data, this.stage)
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
		let expression = `${this.name}.last()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		const result = await this.orm.execute(expression, data, this.stage)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	public async take (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity|null> {
		let expression = `${this.name}.take()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		const result = await this.orm.execute(expression, data, this.stage)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	public query (): Queryable<TQuery> {
		return new Queryable<TQuery>(new ExpressionActions(this.name, this.orm, this.stage), '')
	}
}
