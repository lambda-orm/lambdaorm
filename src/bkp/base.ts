// // interface Entity<T> {
// //     map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Entity<U>;
// //     filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
// //     having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
// //     sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): this;
// //     insert(value: T): Entity<T>;
// //     update(value: T): Entity<T>;
// //     delete(): Entity<T>;
// //     includes(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
// //     include(...args:string[]):Entity<T>;
// //     skip(offset:number): Entity<T>;
// //     take(count:number): Entity<T>;
// // }



// export abstract class SelectFunctions<T> {
//     constructor(){}
//     public sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): this{throw 'NotImplemented'}
//     public skip(offset:number): Entity<T>{throw 'NotImplemented'}
//     public take(count:number): Entity<T>{throw 'NotImplemented'}
// }

// export abstract class ModifyFunctions<T>  {
//     constructor(){}
//     public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>{throw 'NotImplemented'}
//     public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>{throw 'NotImplemented'}
// }

// export abstract class Entity<T> extends SelectFunctions<T> {
 
//     constructor(){super()}
//     public filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>{throw 'NotImplemented'}
//     public include(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>{throw 'NotImplemented'}
//     public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): SelectFunctions<U>{throw 'NotImplemented'}   
//     public having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>{throw 'NotImplemented'}
//     public insert(value: T): ModifyFunctions<T>{throw 'NotImplemented'}
//     public update(value:Object): ModifyFunctions<T>{throw 'NotImplemented'}
//     public delete(): ModifyFunctions<T>{throw 'NotImplemented'}
//     // public include(...args:string[]):Entity<T>{throw 'NotImplemented'}
// }


// // general
// export function as(value:any,name:any):any{throw 'NotImplemented'}
// export function desc(value:any):any{throw 'NotImplemented'}
// export function asc(value:any,name:any):any{throw 'NotImplemented'}
// export function between(value:any,from:any,to:any):boolean{throw 'NotImplemented'}
// export function includes(value:any,list:any):boolean{throw 'NotImplemented'}
// // numeric
// export function abs(value:number):number{throw 'NotImplemented'}
// export function acos(value:number):number{throw 'NotImplemented'}
// export function asin(value:number):number{throw 'NotImplemented'}
// export function atan(value:number):number{throw 'NotImplemented'}
// export function atan2(a:number,b:number):number{throw 'NotImplemented'}
// export function ceil(value:number):number{throw 'NotImplemented'}
// export function cos(value:number):number{throw 'NotImplemented'}
// export function cosh(value:number):number{throw 'NotImplemented'}
// export function exp(value:number):number{throw 'NotImplemented'}
// export function floor(value:number):number{throw 'NotImplemented'}
// export function ln(value:number):number{throw 'NotImplemented'}
// export function log(a:number,b:number):number{throw 'NotImplemented'}
// export function nanvl(value:number,_default:number):number{throw 'NotImplemented'}
// export function remainder(a:number,b:number):number{throw 'NotImplemented'}
// export function round(value:number):number{throw 'NotImplemented'}
// export function sign(value:number):number{throw 'NotImplemented'}
// export function sin(value:number):number{throw 'NotImplemented'}
// export function sinh(value:number):number{throw 'NotImplemented'}
// export function tan(value:number):number{throw 'NotImplemented'}
// export function tanh(value:number):number{throw 'NotImplemented'}
// export function trunc(value:number):number{throw 'NotImplemented'}
// // string:
// export function chr(value:string):string{throw 'NotImplemented'}
// export function initcap(value:string):string{throw 'NotImplemented'}  
// export function lower(value:string):string{throw 'NotImplemented'}  
// export function lpad(value:string):string{throw 'NotImplemented'}  
// export function ltrim(value:string):string{throw 'NotImplemented'}   
// export function regExpReplace(value:string,expression:string):string{throw 'NotImplemented'}  
// export function regExpSubstr(value:string,expression:string):string{throw 'NotImplemented'}  
// export function replace(value:string,source:string,target:string):string{throw 'NotImplemented'}  
// export function rpad(value:string,count:number):string{throw 'NotImplemented'}  
// export function strim(value:string,count:number):string{throw 'NotImplemented'}  
// export function substr(value:string,from:number,count:number):string{throw 'NotImplemented'}    
// export function trim(value:string):string{throw 'NotImplemented'}   
// export function upper(value:string):string{throw 'NotImplemented'}  
// export function concat(...values:string[]):string{throw 'NotImplemented'}  
// // function length(value:string):number{throw 'NotImplemented'}   
// // null:
// export function nvl(value:any,_default:any):any{throw 'NotImplemented';}
// export function nvl2(value:any,a:any,b:any):any{throw 'NotImplemented';}
// export function isNull(value:any):boolean{throw 'NotImplemented';}
// export function isNotNull(value:any):boolean{throw 'NotImplemented';}
// //  group:  
// export function avg(value:any):any{throw 'NotImplemented';}
// export function count(value:any):any{throw 'NotImplemented';}
// export function first(value:any):any{throw 'NotImplemented';}
// export function last(value:any):any{throw 'NotImplemented';}
// export function max(value:any):any{throw 'NotImplemented';}
// export function min(value:any):any{throw 'NotImplemented';}
// export function sum(value:any):any{throw 'NotImplemented';}
// //   datetime:
// //   # TODO
// //   convert:
// //   # TODO



// // interface Entity<T> {
// //     //  /**
// //     //  * Reverses the elements in an array in place.
// //     //  * This method mutates the array and returns a reference to the same array.
// //     //  */
// //     // reverse(): T[];
// //     // /**
// //     //  * Returns a copy of a section of an array.
// //     //  * For both start and end, a negative index can be used to indicate an offset from the end of the array.
// //     //  * For example, -2 refers to the second to last element of the array.
// //     //  * @param start The beginning index of the specified portion of the array.
// //     //  * If start is undefined, then the slice begins at index 0.
// //     //  * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
// //     //  * If end is undefined, then the slice extends to the end of the array.
// //     //  */
// //     // slice(start?: number, end?: number): T[];
// //     // /**
// //     //  * Sorts an array in place.
// //     //  * This method mutates the array and returns a reference to the same array.
// //     //  * @param compareFn Function used to determine the order of the elements. It is expected to return
// //     //  * a negative value if first argument is less than second argument, zero if they're equal and a positive
// //     //  * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
// //     //  * ```ts
// //     //  * [11,2,22,1].sort((a, b) => a - b)
// //     //  * ```
// //     //  */
// //     // sort(compareFn?: (a: T, b: T) => number): this;
// //     // /**
// //     //  * Determines whether the specified callback function returns true for any element of an array.
// //     //  * @param predicate A function that accepts up to three arguments. The some method calls
// //     //  * the predicate function for each element in the array until the predicate returns a value
// //     //  * which is coercible to the Boolean value true, or until the end of the array.
// //     //  * @param thisArg An object to which the this keyword can refer in the predicate function.
// //     //  * If thisArg is omitted, undefined is used as the this value.
// //     //  */
// //     // some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
// //     // /**
// //     //  * Calls a defined callback function on each element of an array, and returns an array that contains the results.
// //     //  * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
// //     //  * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
// //     //  */
// //     // map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
// //     // /**
// //     //  * Returns the elements of an array that meet the condition specified in a callback function.
// //     //  * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
// //     //  * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
// //     //  */
// //     // filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
// //     // /**
// //     //  * Returns the elements of an array that meet the condition specified in a callback function.
// //     //  * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
// //     //  * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
// //     //  */
// //     // filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
// //     // /**
// //     //  * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
// //     //  * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
// //     //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
// //     //  */
// //     // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
// //     // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
// //     // /**
// //     //  * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
// //     //  * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
// //     //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
// //     //  */
// //     // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
// //     // map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
// //     // map(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): Entity<T>;
// // }