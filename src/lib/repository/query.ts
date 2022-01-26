/* eslint-disable @typescript-eslint/ban-types */
import { ExpressionActions } from './expressionActions'

export class QueryAction {
	protected actions
	protected expression
	constructor (actions:ExpressionActions, expression: string) {
		this.actions = actions
		this.expression = expression
	}

	public async execute (data: any): Promise<any> {
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

export class PageClauses extends QueryAction {
	/**  */
	page (page:number, records:number): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.page(${page},${records})`)
	}
}
export class MapClauses<T> extends PageClauses {
	/**  */
	sort (predicate: (value: T, index: number, array: T[]) => unknown): PageClauses {
		return new PageClauses(this.actions, `${this.expression}.sort(${predicate.toString()})`)
	}
}
export class Map2Clauses<T> extends QueryAction {
	/**  */
	sort (predicate: (value: T, index: number, array: T[]) => unknown): PageClauses {
		return new PageClauses(this.actions, `${this.expression}.sort(${predicate.toString()})`)
	}
}
// class ModifyFilterClauses<T> extends QueryAction {
// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
// return new QueryAction(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }
// }
// class ModifyIncludeClauses<T> extends QueryAction {
// /**  */
// filter (predicate: (value: T, index: number, array: T[]) => unknown): ModifyFilterClauses<T> {
// return new ModifyFilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
// }
// }
// export class ModifyClauses<T> extends QueryAction {
// /**  */
// filter (predicate: (value: T, index: number, array: T[]) => unknown): ModifyFilterClauses<T> {
// return new ModifyFilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
// }

// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): ModifyIncludeClauses<T> {
// return new ModifyIncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }
// }

// export class ModifyAllClauses<T> extends QueryAction {
// /**  */
// include (predicate: (value: T, index: number, array: T[]) => unknown): ModifyIncludeClauses<T> {
// return new ModifyIncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
// }
// }

export class HavingClauses<T> extends MapClauses<T> {
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
export class FilterIncludeClauses<T> extends HavingClauses<T> {
	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}
}
export class IncludeClauses<T> extends HavingClauses<T> {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): FilterIncludeClauses<T> {
		return new FilterIncludeClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}
}
export class FilterClauses<T> extends HavingClauses<T> {
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

	// /**  */
	// insert(): ModifyClauses<T>
	// /**  */
	// insert(predicate: (value:T|Object) => unknown): ModifyClauses<T>
	// insert (predicate?: (value:T|Object) => unknown): ModifyClauses<T> {
	// if (predicate === undefined) {
	// return new ModifyClauses(this.actions, `${this.expression}.insert()`)
	// } else {
	// return new ModifyClauses(this.actions, `${this.expression}.insert(${predicate.toString()})`)
	// }
	// }

	// /**  */
	// update(): ModifyClauses<T>
	// /**  */
	// update(predicate: (value:T|Object) => unknown): ModifyClauses<T>
	// update (predicate?: (value:T|Object) => unknown): ModifyClauses<T> {
	// if (predicate === undefined) {
	// return new ModifyClauses(this.actions, `${this.expression}.update()`)
	// } else {
	// return new ModifyClauses(this.actions, `${this.expression}.update(${predicate.toString()})`)
	// }
	// }

	// /**  */
	// updateAll(): ModifyClauses<T>
	// /**  */
	// updateAll(predicate: (value:T) => unknown): ModifyClauses<T>
	// public updateAll (predicate?:(value:T) => unknown): ModifyAllClauses<T> {
	// if (predicate === undefined) {
	// return new ModifyAllClauses(this.actions, `${this.expression}.updateAll()`)
	// } else {
	// return new ModifyAllClauses(this.actions, `${this.expression}.updateAll(${predicate.toString()})`)
	// }
	// }

	// /**  */
	// merge(): ModifyClauses<T>
	// /**  */
	// merge(predicate: (value:T) => unknown): ModifyClauses<T>
	// merge (predicate?: (value:T)=> unknown): ModifyClauses<T> {
	// if (predicate === undefined) {
	// return new ModifyClauses(this.actions, `${this.expression}.merge()`)
	// } else {
	// return new ModifyClauses(this.actions, `${this.expression}.merge(${predicate.toString()})`)
	// }
	// }

	// /**  */
	// delete(): ModifyClauses<T>
	// /**  */
	// delete(predicate: (value:T) => unknown): ModifyClauses<T>
	// delete (predicate?: (value:T) => unknown): ModifyClauses<T> {
	// if (predicate === undefined) {
	// return new ModifyClauses(this.actions, `${this.expression}.delete()`)
	// } else {
	// return new ModifyClauses(this.actions, `${this.expression}.delete(${predicate.toString()})`)
	// }
	// }

	// /**  */
	// deleteAll(): ModifyClauses<T>
	// /**  */
	// deleteAll(predicate: (value:T) => unknown): ModifyClauses<T>
	// public deleteAll (predicate?: (value: T) => unknown): ModifyAllClauses<T> {
	// if (predicate === undefined) {
	// return new ModifyAllClauses(this.actions, `${this.expression}.deleteAll()`)
	// } else {
	// return new ModifyAllClauses(this.actions, `${this.expression}.deleteAll(${predicate.toString()})`)
	// }
	// }

// bulkInsert (predicate?: (value:T) => unknown): ModifyClauses<T> {
// if (predicate === undefined) {
// return new ModifyClauses(this.actions, `${this.expression}.bulkInsert()`)
// } else {
// return new ModifyClauses(this.actions, `${this.expression}.bulkInsert(${predicate.toString()})`)
// }
// }
}
