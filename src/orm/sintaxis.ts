/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
// // export declare function s<T>(someObject: T | null | undefined, defaultValue?: T | null | undefined) : T
export interface PageClauses<T> {
	/**  */
	page(page:number, records:number):void
}
export interface MapClauses<T> extends PageClauses<T> {
	/**  */
	sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): PageClauses<T>
}
export interface Map2Clauses<T> {
	/**  */
	sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any):void
}
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

export interface HavingClauses<T> extends MapClauses<T> {
	/**  */
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
	/**  */
	first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
	/**  */
	last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
	/**  */
	take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
	/**  */
	distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
}
export interface FilterIncludeClauses<T> extends HavingClauses<T> {
	/**  */
	having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
}
export interface IncludeClauses<T> extends HavingClauses<T> {
	/**  */
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterIncludeClauses<T>
	/**  */
	having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
}
export interface FilterClauses<T> extends HavingClauses<T> {
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
	/**  */
	having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
}
export interface Entity<T> extends MapClauses<T> {
	/**  */
	filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterClauses<T>
	/**  */
	include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
	/**  */
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
	/**  */
	first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
	/**  */
	last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
	/**  */
	take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
	/**  */
	distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U>
	/**  */
	having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
	/**  */
	insert(value?: T|Object): ModifyClauses<T>
	/**  */
	update(value?:T|Object): ModifyClauses<T>
	/**  */
	updateAll(value?:T|Object): ModifyAllClauses<T>
	/**  */
	delete(value?: T|Object): ModifyClauses<T>
	/**  */
	deleteAll(value?:T|Object): ModifyAllClauses<T>
	/**  */
	sync(value?:T|Object): ModifyClauses<T>
	// include(...args:string[]):Entity<T>
	/**  */
	bulkInsert(value?:T|Object): ModifyAllClauses<T>
}

export interface RelationMapClauses<T> {
	/**  */
	sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): void
}
export interface RelationIncludeClauses<T> {
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
export interface Relation<T> {
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
	update(callbackfn: (value: T, item: T, index: number, array: T[]) => T|Object, hisArg?:T|Object):void
	/**  */
	insert(callbackfn: (value: T, item: T, index: number, array: T[]) => T|Object, hisArg?:T|Object):void
	// update(value:T|Object):void
}
export type OneToMany<T> = Relation<T>
export type OneToOne<T> = Relation<T>
export type ManyToOne<T> = Relation<T>

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
export declare function includes(value:any, list:any[]):boolean
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
/** runcate num  */
export declare function trunc(value:number, decimals:number):number
// string:---------------------------------------------------------
/** Get character from ASCII code */
export declare function chr(value:string):string
/**  Capitalize words */
export declare function initcap(value:string):string
/** Lowercase string */
export declare function lower(value:string):string
/** Pad the left-side of string */
export declare function lpad(value:string, len:number, pad:string):string
/** Remove leading chars */
export declare function ltrim(value:string):string
// /**  */
// export declare function regExpReplace(value:string,expression:string):string
// /**  */
// export declare function regExpSubstr(value:string,expression:string):string
/** The replace() method searches a string for a specified value and returns a new string where the specified values are replaced. */
export declare function replace(value:string, source:string, target:string):string
/** Pad the right-side of string */
export declare function rpad(value:string, len:number, pad:string):string
/** Remove trailing spaces */
export declare function rtrim(value:string):string
/** Get a substring of string */
export declare function substr(value:string, from:number, count:number):string
/** Remove characters */
export declare function trim(value:string):string
/** Uppercase string */
export declare function upper(value:string):string
/** String concatenation */
export declare function concat(...values:string[]):string
// function length(value:string):number

// datetime:
/** Get the current time */
export declare function curtime():Date
/** Get the current date */
export declare function today():Date
/** Get the current datetime */
export declare function now():Date
/**  */
export declare function time(value:any):Date
/**  */
export declare function date(value:any):Date
/**  */
export declare function datetime(value:any):Date
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
export declare function toDatetime(value:any):string
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
