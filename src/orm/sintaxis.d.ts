// // declare function s<T>(someObject: T | null | undefined, defaultValue?: T | null | undefined) : T
declare abstract class PageClauses<T> {
    /**  */
    public page(page:number,records:number):void
}  
declare abstract class MapClauses<T> extends PageClauses<T>  {
    /**  */
    public sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): PageClauses<T>
}
declare abstract class Map2Clauses<T> {
    /**  */
    public sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any):void
}
declare abstract class ModifyFilterClauses<T>  {
    /**  */
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): void
}
declare abstract class ModifyIncludeClauses<T>  {
    /**  */
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyFilterClauses<T>
}
declare abstract class ModifyClauses<T>  {
    /**  */
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyFilterClauses<T>
    /**  */
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyIncludeClauses<T>
}

declare abstract class ModifyAllClauses<T>  {
    /**  */
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): ModifyIncludeClauses<T>
}




declare abstract class HavingClauses<T> extends MapClauses<T>  {
    /**  */
    public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U> 
    /**  */
    public first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>
    /**  */
    public last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>  
    /**  */
    public take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U>  
    /**  */
    public distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U> 
}
declare abstract class FilterIncludeClauses<T> extends HavingClauses<T>  {  
    /**  */  
    public having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
}
declare abstract class IncludeClauses<T> extends HavingClauses<T>  {
    /**  */
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterIncludeClauses<T>
    /**  */
    public having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>    
}
declare abstract class FilterClauses<T> extends HavingClauses<T>  {    
    /**  */
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
    /**  */
    public having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
}
declare abstract class Entity<T> extends MapClauses<T> {
    /**  */
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): FilterClauses<T>
    /**  */
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): IncludeClauses<T>
    /**  */
    public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U> 
    /**  */
    public first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U> 
    /**  */
    public last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U> 
    /**  */
    public take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Map2Clauses<U> 
    /**  */
    public distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): MapClauses<U> 
    /**  */  
    public having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): HavingClauses<T>
    /**  */
    public insert(value?: T|Object): ModifyClauses<T>
    /**  */
    public update(value?:T|Object): ModifyClauses<T>
    /**  */
    public updateAll(value?:T|Object): ModifyAllClauses<T>
    /**  */
    public delete(value?: T|Object): ModifyClauses<T>
    /**  */   
    public deleteAll(value?:T|Object): ModifyAllClauses<T>
     /**  */
    public sync(value?:T|Object): ModifyClauses<T>
    // public include(...args:string[]):Entity<T>
    /**  */
    public bulkInsert(value?:T|Object): ModifyAllClauses<T>
}

declare abstract class RelationMapClauses<T>  {
    /**  */
    public sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): void
}
declare abstract class RelationIncludeClauses<T> {
    /**  */
    public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>  
    /**  */
    public first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>  
    /**  */
    public last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>  
    /**  */
    public take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T> 
    /**  */
    public distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>      
}
declare abstract class Relation<T>  {
    /**  */
    public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>
    /**  */
    public first<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>  
    /**  */
    public last<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T>  
    /**  */
    public take<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T> 
    /**  */  
    public distinct<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): RelationMapClauses<T> 
    /**  */  
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): RelationIncludeClauses<T>
    /**  */
    public update(callbackfn: (value: T,item: T, index: number, array: T[]) => T|Object, hisArg?:T|Object):void
    /**  */
    public insert(callbackfn: (value: T,item: T, index: number, array: T[]) => T|Object, hisArg?:T|Object):void
    // public update(value:T|Object):void
}
declare abstract class OneToMany<T> extends Relation<T> { }
declare abstract class OneToOne<T> extends Relation<T> { }
declare abstract class ManyToOne<T> extends Relation<T> { }

// general
/**  */
declare function as(value:any,name:any):any
/**  */
declare function desc(value:any):void
/**  */
declare function asc(value:any):void
/**  */
declare function between(value:any,from:any,to:any):boolean
/**  */
declare function includes(value:any,list:any[]):boolean
// numeric -------------------------------------------------------------------
/** Get the absolute value */
declare function abs(value:number):number
/** Get the arc cosine */
declare function acos(value:number):number
/** Get the arc sine */
declare function asin(value:number):number
/** Get the arc tangent */
declare function atan(value:number):number
/** Get the arc tangent of x and y */
declare function atan2(x:number,y:number):number
/** Get the smallest following integer */
declare function ceil(value:number):number
/** Get the cosine */
declare function cos(value:number):number
/** Get hyperbolic cosine */
declare function cosh(value:number):number
/** Raise e to the nth power */
declare function exp(value:number):number
/** Get the largest preceding integer */
declare function floor(value:number):number
/** Get natural logarithm of num */
declare function ln(value:number):number
/** Get logarithm, base num1, of num2 */
declare function log(num1:number,num2:number):number
/** Get remainder */
declare function remainder(n1:number,n2:number):number
/** Get rounded value  */
declare function round(value:number,decimals:number):number
/** Get sign of exp */
declare function sign(value:number):number
/** Get sine  */
declare function sin(value:number):number
/** Get hyperbolic sine  */
declare function sinh(value:number):number
/** Get tangent */
declare function tan(value:number):number
/** Get hyperbolic tangent */
declare function tanh(value:number):number
/** runcate num  */
declare function trunc(value:number,decimals:number):number
// string:---------------------------------------------------------
/** Get character from ASCII code */
declare function chr(value:string):string
/**  Capitalize words */
declare function initcap(value:string):string 
/** Lowercase string */ 
declare function lower(value:string):string  
/** Pad the left-side of string */
declare function lpad(value:string,len:number,pad:string):string 
/** Remove leading chars */ 
declare function ltrim(value:string):string   
// /**  */
// declare function regExpReplace(value:string,expression:string):string  
// /**  */
// declare function regExpSubstr(value:string,expression:string):string  
/** The replace() method searches a string for a specified value and returns a new string where the specified values are replaced. */
declare function replace(value:string,source:string,target:string):string 
/** Pad the right-side of string */ 
declare function rpad(value:string,len:number,pad:string):string  
/** Remove trailing spaces */
declare function rtrim(value:string):string  
/** Get a substring of string */
declare function substr(value:string,from:number,count:number):string  
/** Remove characters */  
declare function trim(value:string):string 
/** Uppercase string */  
declare function upper(value:string):string  
/** String concatenation */
declare function concat(...values:string[]):string  
// function length(value:string):number  

// datetime:
/** Get the current time */
declare function curtime():Date
/** Get the current date */
declare function today():Date
/** Get the current datetime */
declare function now():Date
/**  */
declare function time(value:any):Date
/**  */
declare function date(value:any):Date
/**  */
declare function datetime(value:any):Date
/**  */
declare function year(value:Date):number
/**  */
declare function month(value:Date):number
/**  */
declare function day(value:Date):number
/**  */
declare function weekday(value:Date):number
/**  */
declare function hours(value:Date):number
/**  */
declare function minutes(value:Date):number
/**  */
declare function seconds(value:Date):number
/**  */
declare function addYear(date:Date,value:number):Date
/**  */
declare function addMonth(date:Date,value:number):Date
/**  */
declare function addDay(date:Date,value:number):Date
/**  */
declare function addHours(date:Date,value:number):Date
/**  */
declare function addMinutes(date:Date,value:number):Date
/**  */
declare function addSeconds(date:Date,value:number):Date
/**  */
declare function addTime(date:Date,value:number):Date
/**  */
declare function dateDiff(date:Date,date2:Date):Date
/**  */
declare function timeDiff(time:Date,time2:Date):Date
// convert:
/**  */
declare function toString(value:any):string
/**  */
declare function toDate(value:any):Date
/**  */
declare function toDatetime(value:any):string
/**  */
declare function toTime(value:any):string
/**  */
declare function toJson(value:any):any
/**  */
declare function toNumber(value:any):number
// metadata:
/**  */
declare function user():string
/**  */
declare function source():string
// null:
/**  */
declare function nvl(value:any,_default:any):any
/**  */
declare function nvl2(value:any,a:any,b:any):any
/**  */
declare function isNull(value:any):boolean
/**  */
declare function isNotNull(value:any):boolean
//  group:  
/**  */
declare function avg(value:any):any
/**  */
declare function count(value:any):any
/**  */
declare function first(value:any):any
/**  */
declare function last(value:any):any
/**  */
declare function max(value:any):any
/**  */
declare function min(value:any):any
/**  */
declare function sum(value:any):any



// // declare module "SomeModule" {
// //     declare global {

// //         function as(value:any,name:any):any
// //         function desc(value:any):any
// //         function asc(value:any,name:any):any
// //     }
// // }