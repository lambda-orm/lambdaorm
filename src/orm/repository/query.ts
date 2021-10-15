import { IExpressionActions } from './expressionActions'

class QueryAction {
	protected actions
	protected expression
	constructor (actions:IExpressionActions, expression: string) {
		this.actions = actions
		this.expression = expression
	}

	public async execute (data?: any): Promise<any> {
		return await this.actions.execute(this.expression, data)
	}

	public complete ():string {
		return this.actions.complete(this.expression)
	}

	public async model ():Promise<any> {
		return await this.actions.model(this.expression)
	}

	public async parameters ():Promise<any> {
		return await this.actions.parameters(this.expression)
	}

	public async sentence ():Promise<string> {
		return await this.actions.sentence(this.expression)
	}

	public async metadata ():Promise<any> {
		return await this.actions.metadata(this.expression)
	}
}

class PageClauses extends QueryAction {
	/**  */
	page (page:number, records:number): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.page(${page},${records})`)
	}
}
class MapClauses<T> extends PageClauses {
	/**  */
	sort (predicate: (value: T, index: number, array: T[]) => unknown): PageClauses {
		return new PageClauses(this.actions, `${this.expression}.sort(${predicate.toString()})`)
	}
}
class Map2Clauses<T> extends QueryAction {
	/**  */
	sort (predicate: (value: T, index: number, array: T[]) => unknown): PageClauses {
		return new PageClauses(this.actions, `${this.expression}.sort(${predicate.toString()})`)
	}
}
class ModifyFilterClauses<T> extends QueryAction {
/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}
}
class ModifyIncludeClauses<T> extends QueryAction {
/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): ModifyFilterClauses<T> {
		return new ModifyFilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}
}
export class ModifyClauses<T> extends QueryAction {
/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): ModifyFilterClauses<T> {
		return new ModifyFilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): ModifyIncludeClauses<T> {
		return new ModifyIncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}
}

// class ModifyAllClauses<T> extends QueryAction {
// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): ModifyIncludeClauses<T> {
// return new ModifyIncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }
// }

class HavingClauses<T> extends MapClauses<T> {
	/**  */
	map<U> (predicate: (value: T, index: number, array: T[]) => U): MapClauses<U> {
		return new MapClauses(this.actions, `${this.expression}.map(${predicate.toString()})`)
	}

	/**  */
	first<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
		return new Map2Clauses(this.actions, `${this.expression}.first(${predicate.toString()})`)
	}

	/**  */
	last<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
		return new Map2Clauses(this.actions, `${this.expression}.last(${predicate.toString()})`)
	}

	/**  */
	take<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
		return new Map2Clauses(this.actions, `${this.expression}.take(${predicate.toString()})`)
	}

	/**  */
	distinct<U> (predicate: (value: T, index: number, array: T[]) => U): MapClauses<U> {
		return new MapClauses(this.actions, `${this.expression}.distinct(${predicate.toString()})`)
	}
}
class FilterIncludeClauses<T> extends HavingClauses<T> {
	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}
}
class IncludeClauses<T> extends HavingClauses<T> {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): FilterIncludeClauses<T> {
		return new FilterIncludeClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}
}
class FilterClauses<T> extends HavingClauses<T> {
	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): IncludeClauses<T> {
		return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}

	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}
}
export class Queryable<T> extends MapClauses<T> {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): FilterClauses<T> {
		return new FilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): IncludeClauses<T> {
		return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}

	/**  */
	map<U> (predicate: (value: T, index: number, array: T[]) => U): MapClauses<U> {
		return new MapClauses(this.actions, `${this.expression}.map(${predicate.toString()})`)
	}

	/**  */
	first<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
		return new Map2Clauses(this.actions, `${this.expression}.first(${predicate.toString()})`)
	}

	/**  */
	last<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
		return new Map2Clauses(this.actions, `${this.expression}.last(${predicate.toString()})`)
	}

	/**  */
	take<U> (predicate: (value: T, index: number, array: T[]) => U): Map2Clauses<U> {
		return new Map2Clauses(this.actions, `${this.expression}.take(${predicate.toString()})`)
	}

	/**  */
	distinct<U> (predicate: (value: T, index: number, array: T[]) => U): MapClauses<U> {
		return new MapClauses(this.actions, `${this.expression}.distinct(${predicate.toString()})`)
	}

	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}

	/**  */
	insert (): ModifyClauses<T> {
		return new ModifyClauses(this.actions, `${this.expression}.insert()`)
	}

	update (): ModifyClauses<T> {
		return new ModifyClauses(this.actions, `${this.expression}.update()`)
	}

	delete (): ModifyClauses<T> {
		return new ModifyClauses(this.actions, `${this.expression}.delete()`)
	}

	bulkInsert (): ModifyClauses<T> {
		return new ModifyClauses(this.actions, `${this.expression}.bulkInsert()`)
	}

	// include(...args:string[]):Entity<T>

	// /**  */
	// insert (value?: T): ModifyClauses<T> {
	// if (value === undefined) {
	// return new ModifyClauses(this.actions, `${this.expression}.insert()`)
	// } else {
	// return new ModifyClauses(this.actions, `${this.expression}.insert(${value})`)
	// }
	// }

// /**  */
// update(value?:T|Object): ModifyClauses<T>
// /**  */
// updateAll(value?:T|Object): ModifyAllClauses<T>
// /**  */
// delete(value?: T|Object): ModifyClauses<T>
// /**  */
// deleteAll(value?:T|Object): ModifyAllClauses<T>
// /**  */
// sync(value?:T|Object): ModifyClauses<T>
// // include(...args:string[]):Entity<T>
// /**  */
// bulkInsert(value?:T|Object): ModifyAllClauses<T>
}

interface RelationMapClauses<T> {
	/**  */
	sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): void
}
interface RelationIncludeClauses<T> {
	/**  */
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
}
interface Relation<T> {
	/**  */
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): RelationIncludeClauses<T>
	/**  */
	update(callbackfn: (value: T, item: T, index: number, array: T[]) => T, hisArg?:T):void
	/**  */
	insert(callbackfn: (value: T, item: T, index: number, array: T[]) => T, hisArg?:T):void
	// update(value:T|Object):void
}
export type OneToMany<T> = Relation<T>
export type OneToOne<T> = Relation<T>
export type ManyToOne<T> = Relation<T>
