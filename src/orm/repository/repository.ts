import { orm, IOrm } from './../index'
import { Queryable } from './query'
import { ExpressionActions } from './expressionActions'

export class Respository<TEntity, TQuery> {
	public name
	public database
	private orm
	constructor (name: string, database?:string, Orm?:IOrm) {
		this.name = name
		this.database = database
		this.orm = Orm !== undefined ? Orm : orm
	}

	/**  */
	insert(entity:TEntity): Promise<number>
	/**  */
	insert(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number>
	public async insert (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<number> {
		let expression = `${this.name}.insert()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(entity, this.database)
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
		return await this.orm.expression(expression).execute(entity, this.database)
	}

	/**  */
	update(entity:TEntity): Promise<void>
	/**  */
	update(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void>
	public async update (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void> {
		let expression = `${this.name}.update()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(entity, this.database)
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
		return await this.orm.expression(expression).execute(data, this.database)
	}

	/**  */
	merge(entity:TEntity): Promise<void>
	/**  */
	merge(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void>
	public async merge (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void> {
		let expression = `${this.name}.merge()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(entity, this.database)
	}

	/**  */
	delete(entity:TEntity): Promise<void>
	/**  */
	delete(entity:TEntity, include: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void>
	public async delete (entity:TEntity, include?: (value: TQuery, index: number, array: TQuery[]) => unknown): Promise<void> {
		let expression = `${this.name}.delete()`
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(entity, this.database)
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
		return await this.orm.expression(expression).execute(data, this.database)
	}

	public async execute (expresion: string, data?: any): Promise<any> {
		return await this.orm.expression(`${this.name}${expresion}`).execute(data, this.database)
	}

	public async get (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity> {
		let expression = `${this.name}`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(data, this.database) as TEntity
	}

	public async distinct (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity> {
		let expression = `${this.name}.distinct()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(data, this.database) as TEntity
	}

	public async first (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity> {
		let expression = `${this.name}.first()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(data, this.database) as TEntity
	}

	public async last (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity> {
		let expression = `${this.name}.last()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(data, this.database) as TEntity
	}

	public async take (data: any,
		filter?: (value: TQuery, index: number, array: TQuery[]) => unknown,
		include?: (value: TQuery, index: number, array: TQuery[]) => unknown
	): Promise<TEntity> {
		let expression = `${this.name}.take()`
		if (filter !== undefined) {
			expression = `${expression}.filter(${filter.toString()})`
		}
		if (include !== undefined) {
			expression = `${expression}.include(${include.toString()})`
		}
		return await this.orm.expression(expression).execute(data, this.database) as TEntity
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
	// return await this.orm.expression(expression).execute(data, this.database) as TEntity[]
	// }

	public query (): Queryable<TQuery> {
		return new Queryable<TQuery>(new ExpressionActions(this.name, this.orm, this.database), '')
	}
}
