import { orm, IOrm } from '../index'
import { Queryable } from './query'
import { ExpressionActions } from './expressionActions'

export class Respository<TEntity, TQuery> {
	public name
	public stage
	private orm
	constructor (name: string, stage:string, Orm?:IOrm) {
		this.name = name
		this.stage = stage
		this.orm = Orm !== undefined ? Orm : orm
	}

	/**  */
	insert(entity: TEntity, context: any): Promise<number>
	/**  */
	insert(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any): Promise<number>
	public async insert (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any = {}): Promise<number> {
		let expression = `${this.name}.insert()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage, context)
	}

	/**  */
	bulkInsert(entity:TEntity, context:any): Promise<number[]>
	/**  */
	bulkInsert(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any): Promise<number[]>
	public async bulkInsert (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any = {}): Promise<number[]> {
		let expression = `${this.name}.bulkInsert()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage, context)
	}

	/**  */
	update(entity:TEntity, context:any): Promise<void>
	/**  */
	update(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any): Promise<void>
	public async update (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown, context: any = {}): Promise<void> {
		let expression = `${this.name}.update()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage, context)
	}

	public async updateAll (data:any,
		map: (value: TEntity) => unknown,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<number> {
		let expression = `${this.name}.updateAll(${map.toString()})`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.filter(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage, context)
	}

	/**  */
	merge(entity:TEntity, context:any): Promise<void>
	/**  */
	merge(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any): Promise<void>
	public async merge (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown, context: any = {}): Promise<void> {
		let expression = `${this.name}.merge()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage, context)
	}

	/**  */
	delete(entity:TEntity, context:any): Promise<void>
	/**  */
	delete(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown, context:any): Promise<void>
	public async delete (entity: TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown, context: any = {}): Promise<void> {
		let expression = `${this.name}.delete()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, entity, this.stage, context)
	}

	public async deleteAll (data:any,
		map: (value: TEntity) => unknown,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<number> {
		let expression = `${this.name}.deleteAll(${map.toString()})`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.filter(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage, context)
	}

	public async execute (expresion: string, data?: any, context: any = {}): Promise<any> {
		return await this.orm.execute(`${this.name}${expresion}`, data, this.stage, context)
	}

	public async list (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<TEntity[]> {
		let expression = `${this.name}`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage, context) as TEntity[]
	}

	public async distinct (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<any[]> {
		let expression = `${this.name}.distinct()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.execute(expression, data, this.stage, context)
	}

	public async first (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<TEntity|null> {
		let expression = `${this.name}.first()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		const result = await this.orm.execute(expression, data, this.stage, context)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	public async last (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<TEntity|null> {
		let expression = `${this.name}.last()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		const result = await this.orm.execute(expression, data, this.stage, context)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	public async take (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		context: any = {}
	): Promise<TEntity|null> {
		let expression = `${this.name}.take()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		const result = await this.orm.execute(expression, data, this.stage, context)
		if (result.length >= 1) {
			return result[0] as TEntity
		} else {
			return null
		}
	}

	// public async list (data: any,
	// map?: (value: TEntity) => unknown,
	// filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
	// include?: (value: TQuery, index: number, array: TQuery[]) => unknown,
	// having?: (value: TQuery, index: number, array: TQuery[]) => unknown,
	// sort?: (value: TQuery, index: number, array: TQuery[]) => unknown,
	// page?: {page:number, records: number }
	// ): Promise<TEntity[]> {
	// let expression = `${this.name}.take()`
	// if (map !== undefined) {
	// expression = `${expression}.map(${map.toString()})`
	// }
	// if (filter !== undefined) {
	// expression = `${expression}.filter(${filter.toString()})`
	// }
	// if (include !== undefined) {
	// expression = `${expression}.include(${include.toString()})`
	// }
	// if (having !== undefined) {
	// expression = `${expression}.having(${having.toString()})`
	// }
	// if (sort !== undefined) {
	// expression = `${expression}.sort(${sort.toString()})`
	// }
	// if (page !== undefined) {
	// expression = `${expression}.page(${page.toString()})`
	// }
	// return await this.orm.execute(expression, data, this.stage) as TEntity[]
	// }

	public query (): Queryable<TQuery> {
		return new Queryable<TQuery>(new ExpressionActions(this.name, this.orm, this.stage), '')
	}
}
