/* eslint-disable @typescript-eslint/ban-types */
import { ExpressionActions } from './expressionActions'
import { MetadataConstraint, MetadataModel, MetadataParameter, MetadataSentence, Metadata } from '../model'
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

	public async sentence ():Promise<MetadataSentence> {
		return this.actions.sentence(this.expression)
	}

	public async metadata ():Promise<Metadata> {
		return this.actions.metadata(this.expression)
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
}
