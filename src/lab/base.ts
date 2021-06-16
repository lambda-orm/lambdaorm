



interface Entity<T> {
    //  /**
    //  * Reverses the elements in an array in place.
    //  * This method mutates the array and returns a reference to the same array.
    //  */
    // reverse(): T[];
    // /**
    //  * Returns a copy of a section of an array.
    //  * For both start and end, a negative index can be used to indicate an offset from the end of the array.
    //  * For example, -2 refers to the second to last element of the array.
    //  * @param start The beginning index of the specified portion of the array.
    //  * If start is undefined, then the slice begins at index 0.
    //  * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
    //  * If end is undefined, then the slice extends to the end of the array.
    //  */
    // slice(start?: number, end?: number): T[];
    // /**
    //  * Sorts an array in place.
    //  * This method mutates the array and returns a reference to the same array.
    //  * @param compareFn Function used to determine the order of the elements. It is expected to return
    //  * a negative value if first argument is less than second argument, zero if they're equal and a positive
    //  * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
    //  * ```ts
    //  * [11,2,22,1].sort((a, b) => a - b)
    //  * ```
    //  */
    // sort(compareFn?: (a: T, b: T) => number): this;
    // /**
    //  * Determines whether the specified callback function returns true for any element of an array.
    //  * @param predicate A function that accepts up to three arguments. The some method calls
    //  * the predicate function for each element in the array until the predicate returns a value
    //  * which is coercible to the Boolean value true, or until the end of the array.
    //  * @param thisArg An object to which the this keyword can refer in the predicate function.
    //  * If thisArg is omitted, undefined is used as the this value.
    //  */
    // some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    // /**
    //  * Calls a defined callback function on each element of an array, and returns an array that contains the results.
    //  * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
    //  * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    // /**
    //  * Returns the elements of an array that meet the condition specified in a callback function.
    //  * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
    //  * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    // /**
    //  * Returns the elements of an array that meet the condition specified in a callback function.
    //  * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
    //  * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
    //  */
    // filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
    // /**
    //  * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    //  * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
    //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    //  */
    // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    // reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    // /**
    //  * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
    //  * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
    //  * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
    //  */
    // reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    // map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    // map(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): Entity<T>;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Entity<U>;
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
    having(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
    sort(predicate: (value: T, index: number, array: T[]) => unknown, ...args: any): this;
    insert(value: T): Entity<T>;
    update(value: T): Entity<T>;
    delete(): Entity<T>;
    includes(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): Entity<T>;
    include(...args:string[]):Entity<T>;
    skip(offset:number): Entity<T>;
    take(count:number): Entity<T>;
}

// general
function as(value:any,name:any):any{}
function desc(value:any):any{}
function asc(value:any,name:any):any{}
function between(value:any,from:any,to:any):boolean{return false}
function includes(value:any,list:any):boolean{return false}
// numeric
function abs(value:number):number{return 0}
function acos(value:number):number{return 0}
function asin(value:number):number{return 0}
function atan(value:number):number{return 0}
function atan2(a:number,b:number):number{return 0}
function ceil(value:number):number{return 0}
function cos(value:number):number{return 0}
function cosh(value:number):number{return 0}
function exp(value:number):number{return 0}
function floor(value:number):number{return 0}
function ln(value:number):number{return 0}
function log(a:number,b:number):number{return 0}
function nanvl(value:number,_default:number):number{return 0}
function remainder(a:number,b:number):number{return 0}
function round(value:number):number{return 0}
function sign(value:number):number{return 0}
function sin(value:number):number{return 0}
function sinh(value:number):number{return 0}
function tan(value:number):number{return 0}
function tanh(value:number):number{return 0}
function trunc(value:number):number{return 0}
// string:
function chr(value:string):string{return ""}
function initcap(value:string):string{return ""}  
function lower(value:string):string{return ""}  
function lpad(value:string):string{return ""}  
function ltrim(value:string):string{return ""}   
function regExpReplace(value:string,expression:string):string{return ""}  
function regExpSubstr(value:string,expression:string):string{return ""}  
function replace(value:string,source:string,target:string):string{return ""}  
function rpad(value:string,count:number):string{return ""}  
function strim(value:string,count:number):string{return ""}  
function substr(value:string,from:number,count:number):string{return ""}    
function trim(value:string):string{return ""}   
function upper(value:string):string{return ""}  
function concat(...values:string[]):string{return ""}  
// function length(value:string):number{return 0}   
// null:
function nvl(value:any,_default:any):any{}
function nvl2(value:any,a:any,b:any):any{}
function isNull(value:any):boolean{return false}
function isNotNull(value:any):boolean{return false}
//  group:  
function avg(value:any):any{}
function count(value:any):any{}
function first(value:any):any{}
function last(value:any):any{}
function max(value:any):any{}
function min(value:any):any{}
function sum(value:any):any{}
//   datetime:
//   # TODO
//   convert:
//   # TODO
