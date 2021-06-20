// // declare function s<T>(someObject: T | null | undefined, defaultValue?: T | null | undefined) : T;



declare abstract class SelectFunctions<T> {
    public sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): this
    public skip(offset:number): Entity<T>
    public take(count:number): Entity<T>
}

declare abstract class ModifyFunctions<T>  {
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>
}

declare abstract class Entity<T> extends SelectFunctions<T> {
    public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>
    public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>
    public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): SelectFunctions<U>   
    public having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>
    public insert(value: T): ModifyFunctions<T>
    public update(value:Object): ModifyFunctions<T>
    public delete(): ModifyFunctions<T>
    // public include(...args:string[]):Entity<T>
}
// general
declare function as(value:any,name:any):any
declare function desc(value:any):any
declare function asc(value:any,name:any):any
declare function between(value:any,from:any,to:any):boolean
declare function includes(value:any,list:any):boolean
// numeric
declare function abs(value:number):number
declare function acos(value:number):number
declare function asin(value:number):number
declare function atan(value:number):number
declare function atan2(a:number,b:number):number
declare function ceil(value:number):number
declare function cos(value:number):number
declare function cosh(value:number):number
declare function exp(value:number):number
declare function floor(value:number):number
declare function ln(value:number):number
declare function log(value:number):number
declare function round(value:number,decimals:number):number
declare function sign(value:number):number
declare function sin(value:number):number
declare function sinh(value:number):number
declare function tan(value:number):number
declare function tanh(value:number):number
declare function trunc(value:number):number
// string:
declare function chr(value:string):string
declare function initcap(value:string):string  
declare function lower(value:string):string  
declare function lpad(value:string):string  
declare function ltrim(value:string):string   
declare function regExpReplace(value:string,expression:string):string  
declare function regExpSubstr(value:string,expression:string):string  
declare function replace(value:string,source:string,target:string):string  
declare function rpad(value:string,count:number):string  
declare function strim(value:string,count:number):string  
declare function substr(value:string,from:number,count:number):string    
declare function trim(value:string):string   
declare function upper(value:string):string  
declare function concat(...values:string[]):string  
// function length(value:string):number   
// null:
declare function nvl(value:any,_default:any):any
declare function nvl2(value:any,a:any,b:any):any
declare function isNull(value:any):boolean
declare function isNotNull(value:any):boolean
//  group:  
declare function avg(value:any):any
declare function count(value:any):any
declare function first(value:any):any
declare function last(value:any):any
declare function max(value:any):any
declare function min(value:any):any
declare function sum(value:any):any


// // declare module "SomeModule" {
// //     declare global {

// //         function as(value:any,name:any):any
// //         function desc(value:any):any
// //         function asc(value:any,name:any):any
// //     }
// // }