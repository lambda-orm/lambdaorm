/* eslint-disable @typescript-eslint/ban-types */
import { ExpressionActions } from './actions'
import { MetadataConstraint, MetadataModel, MetadataParameter, Metadata } from '../../sentence/domain'
import { QueryInfo } from '../../query/domain'
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
export class FilterAction<T> extends QueryAction {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}
}
export class IncludeAction<T> extends QueryAction {
	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.include(${predicate.toString()})`)
	}
}
export class ModificableClauses<T> extends QueryAction {
	/**  */
	filter (predicate: (value: T, index: number, array: T[]) => unknown): QueryAction {
		return new QueryAction(this.actions, `${this.expression}.filter(${predicate.toString()})`)
	}

	/**  */
	include (predicate: (value: T, index: number, array: T[]) => unknown): FilterAction<T> {
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
	updateAll (predicate: (value: T, index: number, array: T[]) => unknown): IncludeAction<T> {
		return new IncludeAction(this.actions, `${this.expression}.updateAll(${predicate.toString()})`)
	}

	/**  */
	delete (): ModificableClauses<T> {
		return new ModificableClauses(this.actions, `${this.expression}.delete()`)
	}

	/**  */
	deleteAll (): IncludeAction<T> {
		return new IncludeAction(this.actions, `${this.expression}.deleteAll()`)
	}
}

// interface PageClauses<T> {
// /**  */
// page(page:number, records:number):void
// }
// interface MapClauses<T> extends PageClauses<T> {
// /**  */
// sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): PageClauses<T>
// }
// interface Map2Clauses<T> {
// /**  */
// sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any):void
// }
export interface ModifyFilterClauses<T> {
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): void
}
export interface ModifyIncludeClauses<T> {
	/**  */
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyFilterClauses<T>
}
export interface ModifyClauses<T> {
	/**  */
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyFilterClauses<T>
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyIncludeClauses<T>
}

export interface ModifyAllClauses<T> {
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyIncludeClauses<T>
}

// interface HavingClauses<T> extends MapClauses<T> {
// /**  */
// map<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
// /**  */
// first<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
// /**  */
// last<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
// /**  */
// distinct<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
// }
// interface FilterIncludeClauses<T> extends HavingClauses<T> {
// /**  */
// having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
// }
// interface IncludeClauses<T> extends HavingClauses<T> {
// /**  */
// filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterIncludeClauses<T>
// /**  */
// having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
// }
// interface FilterClauses<T> extends HavingClauses<T> {
// /**  */
// include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
// /**  */
// having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
// }
// interface Queryable<T> extends MapClauses<T> {
// /**  */
// filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterClauses<T>
// /**  */
// include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
// /**  */
// map<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
// /**  */
// first<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
// /**  */
// last<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
// /**  */
// distinct<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
// /**  */
// having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
// /**  */
// insert(predicate?:(value:T) => unknown): ModifyClauses<T>
// /**  */
// update(predicate?:(value:T) => unknown): ModifyClauses<T>
// /**  */
// updateAll(predicate?:(value:T) => unknown): ModifyAllClauses<T>
// /**  */
// delete(predicate?:(value:T) => unknown): ModifyClauses<T>
// /**  */
// deleteAll(predicate?:(value:T) => unknown): ModifyAllClauses<T>
// /**  */
// sync(predicate?:(value:T) => unknown): ModifyClauses<T>
// // include(...args:string[]):Entity<T>
// /**  */
// bulkInsert(predicate?:(value:T) => unknown): ModifyAllClauses<T>
// }

export interface RelationMapClauses<T> {
	/**  */
	sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): void
	/**  */
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterClauses<T>
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
}
export interface RelationIncludeClauses<T> {
	/**  */
	map<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	first<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	last<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	distinct<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
}
export interface IRelation<T> {
	/**  */
	map<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	first<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	last<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	distinct<U>(predicate: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): RelationIncludeClauses<T>
	/**  */
	update(predicate?:(value:T) => unknown):void
	// update(predicate: (value: T, item: T, index: number, array: T[]) => T|Object, hisArg?:T|Object):void
	/**  */
	insert(predicate?:(value:T) => unknown): void
	// insert(predicate: (value: T, item: T, index: number, array: T[]) => T|Object, hisArg?:T|Object):void
	// update(value:T|Object):void
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterClauses<T>

}
export type OneToMany<T> = IRelation<T>
export type OneToOne<T> = IRelation<T>
export type ManyToOne<T> = IRelation<T>

// general
/**  */
export declare function as(value:any, name:any):any
/**  */
export declare function desc(value:any):void
/**  */
export declare function asc(value:any):void
/**  */
export declare function between(value:any, from:any, to:any):boolean
/**  */
export declare function includes(value: any, list: any[]): boolean
/**  */
export declare function distinct(value:any):any
// numeric -------------------------------------------------------------------
/** Get the absolute value */
export declare function abs(value:number):number
/** Get the arc cosine */
export declare function acos(value:number):number
/** Get the arc sine */
export declare function asin(value:number):number
/** Get the arc tangent */
export declare function atan(value:number):number
/** Get the arc tangent of x and y */
export declare function atan2(x:number, y:number):number
/** Get the smallest following integer */
export declare function ceil(value:number):number
/** Get the cosine */
export declare function cos(value:number):number
/** Get hyperbolic cosine */
export declare function cosh(value:number):number
/** Raise e to the nth power */
export declare function exp(value:number):number
/** Get the largest preceding integer */
export declare function floor(value:number):number
/** Get natural logarithm of num */
export declare function ln(value:number):number
/** Get logarithm, base num1, of num2 */
export declare function log(num1:number, num2:number):number
/** Get remainder */
export declare function remainder(n1:number, n2:number):number
/** Get rounded value  */
export declare function round(value:number, decimals:number):number
/** Get sign of exp */
export declare function sign(value:number):number
/** Get sine  */
export declare function sin(value:number):number
/** Get hyperbolic sine  */
export declare function sinh(value:number):number
/** Get tangent */
export declare function tan(value:number):number
/** Get hyperbolic tangent */
export declare function tanh(value:number):number
/** Truncate num  */
export declare function trunc(value:number, decimals:number):number
// string:---------------------------------------------------------
/** Get character from ASCII code */
export declare function chr(value:string):string
/**  Capitalize words */
// declare function initcap(value:string):string
/** Lowercase string */
export declare function lower(value:string):string
/** Pad the left-side of string */
export declare function lpad(value:string, len:number, pad:string):string
/** Remove leading chars */
export declare function ltrim(value:string):string
// /**  */
// declare function regExpReplace(value:string,expression:string):string
// /**  */
// declare function regExpSubstr(value:string,expression:string):string
/** The replace() method searches a string for a specified value and returns a new string where the specified values are replaced. */
export declare function replace(value:string, source:string, target:string):string
/** Pad the right-side of string */
export declare function rpad(value:string, len:number, pad:string):string
/** Remove trailing spaces */
export declare function rtrim(value:string):string
/** Get a substring of string */
export declare function substr(value:string, from:number, count:number):string
/** Get a substring of string */
export declare function substring(value:string, from:number, count:number):string
/** Remove characters */
export declare function trim(value:string):string
/** Uppercase string */
export declare function upper(value:string):string
/** String concatenation */
export declare function concat(...values:string[]):string
// function length(value:string):number

// dateTime:
/** Get the current time */
export declare function curTime():Date
/** Get the current date */
export declare function today():Date
/** Get the current dateTime */
export declare function now():Date
/**  */
export declare function time(value:any):Date
/**  */
export declare function date(value:any):Date
/**  */
export declare function dateTime(value:any):Date
/**  */
export declare function year(value:Date):number
/**  */
export declare function month(value:Date):number
/**  */
export declare function day(value:Date):number
/**  */
export declare function weekday(value:Date):number
/**  */
export declare function hours(value:Date):number
/**  */
export declare function minutes(value:Date):number
/**  */
export declare function seconds(value:Date):number
/**  */
export declare function addYear(date:Date, value:number):Date
/**  */
export declare function addMonth(date:Date, value:number):Date
/**  */
export declare function addDay(date:Date, value:number):Date
/**  */
export declare function addHours(date:Date, value:number):Date
/**  */
export declare function addMinutes(date:Date, value:number):Date
/**  */
export declare function addSeconds(date:Date, value:number):Date
/**  */
export declare function addTime(date:Date, value:number):Date
/**  */
export declare function dateDiff(date:Date, date2:Date):Date
/**  */
export declare function timeDiff(time:Date, time2:Date):Date
// convert:
/**  */
export declare function toString(value:any):string
/**  */
export declare function toDate(value:any):Date
/**  */
export declare function toDateTime(value:any):string
/**  */
export declare function toTime(value:any):string
/**  */
export declare function toJson(value:any):any
/**  */
export declare function toNumber(value:any):number
// metadata:
/**  */
export declare function user():string
/**  */
export declare function source():string
// null:
/**  */
export declare function nvl(value:any, _default:any):any
/**  */
export declare function nvl2(value:any, a:any, b:any):any
/**  */
export declare function isNull(value:any):boolean
/**  */
export declare function isNotNull(value:any):boolean
//  group:
/**  */
export declare function avg(value:any):any
/**  */
export declare function count(value:any):any
/**  */
export declare function first(value:any):any
/**  */
export declare function last(value:any):any
/**  */
export declare function max(value:any):any
/**  */
export declare function min(value:any):any
/**  */
export declare function sum(value:any):any

// declare function test2(fn:(a:string)=>string):(a:string)=>string
// declare function test2(arr:[string, number]):(a:string)=>string
