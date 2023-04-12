/* eslint-disable @typescript-eslint/ban-types */
import { ExpressionActions } from './actions'
import { MetadataConstraint, MetadataModel, MetadataParameter, QueryInfo, Metadata } from '../../domain/model'
export class QueryAction {
	protected actions
	protected expression
	constructor (actions:ExpressionActions, expression: string) {
		this.actions = actions
		this.expression = expression
	}

	public async execute (data: any): Promise<any> {
		return this.actions.execute(this.expression, data)
	}

	public normalize ():string {
		return this.actions.normalize(this.expression)
	}

	public async model ():Promise<MetadataModel[]> {
		return this.actions.model(this.expression)
	}

	public async constraints ():Promise<MetadataConstraint> {
		return this.actions.constraints(this.expression)
	}

	public async parameters ():Promise<MetadataParameter[]> {
		return this.actions.parameters(this.expression)
	}

	public async sentence ():Promise<QueryInfo> {
		return this.actions.getInfo(this.expression)
	}

	public async metadata ():Promise<Metadata> {
		return this.actions.metadata(this.expression)
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

class Filter<T> extends QueryAction {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}
}

class Include<T> extends QueryAction {
	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}
}

class ModificableClauses<T> extends QueryAction {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): Filter<T> {
		return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}
}

export class Queryable<T> extends HavingClauses<T> {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): FilterClauses<T> {
		return new FilterClauses(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): IncludeClauses<T> {
		return new IncludeClauses(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}

	/**  */
	having (predicate: (value: T, index: number, array: T[]) => unknown): HavingClauses<T> {
		return new HavingClauses(this.actions, `${this.expression}.having(${predicate.toString()})`)
	}

	/**  */
	insert (value?: T): ModificableClauses<T> {
		return new ModificableClauses(this.actions, `${this.expression}.insert(${value !== undefined ? JSON.stringify(value) : ''})`)
	}

	/**  */
	bulkInsert (value?: T): ModificableClauses<T> {
		return new ModificableClauses(this.actions, `${this.expression}.bulkInsert(${value !== undefined ? JSON.stringify(value) : ''})`)
	}

	/**  */
	update (predicate: (value: T, index: number, array: T[]) => unknown): ModificableClauses<T> {
		return new ModificableClauses(this.actions, `${this.expression}.update(${predicate.toString()})`)
	}

	/**  */
	updateAll (predicate: (value: T, index: number, array: T[]) => unknown): Include<T> {
		return new Include(this.actions, `${this.expression}.updateAll(${predicate.toString()})`)
	}

	/**  */
	delete (): ModificableClauses<T> {
		return new ModificableClauses(this.actions, `${this.expression}.delete()`)
	}

	/**  */
	deleteAll (): Include<T> {
		return new Include(this.actions, `${this.expression}.deleteAll()`)
	}
}
