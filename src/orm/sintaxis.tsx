/* eslint-disable @typescript-eslint/no-unused-vars */
// <reference path="sintaxis.d.ts" />

// general
export function as (value:any, name:any):any { throw new Error('NotImplemented') }
export function desc (value:any):any { throw new Error('NotImplemented') }
export function asc (value:any, name:any):any { throw new Error('NotImplemented') }
export function between (value:any, from:any, to:any):boolean { throw new Error('NotImplemented') }
export function includes (value:any, list:any):boolean { throw new Error('NotImplemented') }
// numeric
export function abs (value:number):number { throw new Error('NotImplemented') }
export function acos (value:number):number { throw new Error('NotImplemented') }
export function asin (value:number):number { throw new Error('NotImplemented') }
export function atan (value:number):number { throw new Error('NotImplemented') }
export function atan2 (x:number, y:number):number { throw new Error('NotImplemented') }
export function ceil (value:number):number { throw new Error('NotImplemented') }
export function cos (value:number):number { throw new Error('NotImplemented') }
export function cosh (value:number):number { throw new Error('NotImplemented') }
export function exp (value:number):number { throw new Error('NotImplemented') }
export function floor (value:number):number { throw new Error('NotImplemented') }
export function ln (value:number):number { throw new Error('NotImplemented') }
export function log (num1:number, num2:number):number { throw new Error('NotImplemented') }
export function remainder (n1:number, n2:number):number { throw new Error('NotImplemented') }
export function round (value:number, decimals:number):number { throw new Error('NotImplemented') }
export function sign (value:number):number { throw new Error('NotImplemented') }
export function sin (value:number):number { throw new Error('NotImplemented') }
export function sinh (value:number):number { throw new Error('NotImplemented') }
export function tan (value:number):number { throw new Error('NotImplemented') }
export function tanh (value:number):number { throw new Error('NotImplemented') }
export function trunc (value:number):number { throw new Error('NotImplemented') }
// string:
export function chr (value:string):string { throw new Error('NotImplemented') }
export function initcap (value:string):string { throw new Error('NotImplemented') }
export function lower (value:string):string { throw new Error('NotImplemented') }
export function lpad (value:string, len:number, pad:string):string { throw new Error('NotImplemented') }
export function ltrim (value:string):string { throw new Error('NotImplemented') }
export function regExpReplace (value:string, expression:string):string { throw new Error('NotImplemented') }
export function regExpSubstr (value:string, expression:string):string { throw new Error('NotImplemented') }
export function replace (value:string, source:string, target:string):string { throw new Error('NotImplemented') }
export function rpad (value:string, len:number, pad:string) { throw new Error('NotImplemented') }
export function rtrim (value:string):string { throw new Error('NotImplemented') }
export function substr (value:string, from:number, count:number):string { throw new Error('NotImplemented') }
export function trim (value:string):string { throw new Error('NotImplemented') }
export function upper (value:string):string { throw new Error('NotImplemented') }
export function concat (...values:string[]):string { throw new Error('NotImplemented') }
// function length(value:string):number{throw new Error('NotImplemented')}
// null:
export function nvl (value:any, _default:any):any { throw new Error('NotImplemented') }
export function nvl2 (value:any, a:any, b:any):any { throw new Error('NotImplemented') }
export function isNull (value:any):boolean { throw new Error('NotImplemented') }
export function isNotNull (value:any):boolean { throw new Error('NotImplemented') }
//  group:
export function avg (value:any):any { throw new Error('NotImplemented') }
export function count (value:any):any { throw new Error('NotImplemented') }
export function first (value:any):any { throw new Error('NotImplemented') }
export function last (value:any):any { throw new Error('NotImplemented') }
export function max (value:any):any { throw new Error('NotImplemented') }
export function min (value:any):any { throw new Error('NotImplemented') }
export function sum (value:any):any { throw new Error('NotImplemented') }

// export function s<T>(object: T | null | undefined, defaultValue: T | null = {} as T) : T {
//     if (typeof object === 'undefined' || object === null)
//         return defaultValue as T
//     else
//         return object
// }
