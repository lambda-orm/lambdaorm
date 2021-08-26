///<reference path="sintaxis.d.ts" />





// general
export function as(value:any,name:any):any{throw 'NotImplemented'}
export function desc(value:any):any{throw 'NotImplemented'}
export function asc(value:any,name:any):any{throw 'NotImplemented'}
export function between(value:any,from:any,to:any):boolean{throw 'NotImplemented'}
export function includes(value:any,list:any):boolean{throw 'NotImplemented'}
// numeric
export function abs(value:number):number{throw 'NotImplemented'}
export function acos(value:number):number{throw 'NotImplemented'}
export function asin(value:number):number{throw 'NotImplemented'}
export function atan(value:number):number{throw 'NotImplemented'}
export function atan2(x:number,y:number):number{throw 'NotImplemented'}
export function ceil(value:number):number{throw 'NotImplemented'}
export function cos(value:number):number{throw 'NotImplemented'}
export function cosh(value:number):number{throw 'NotImplemented'}
export function exp(value:number):number{throw 'NotImplemented'}
export function floor(value:number):number{throw 'NotImplemented'}
export function ln(value:number):number{throw 'NotImplemented'}
export function log(num1:number,num2:number):number{throw 'NotImplemented'}
export function remainder(n1:number,n2:number):number{throw 'NotImplemented'}
export function round(value:number,decimals:number):number{throw 'NotImplemented'}
export function sign(value:number):number{throw 'NotImplemented'}
export function sin(value:number):number{throw 'NotImplemented'}
export function sinh(value:number):number{throw 'NotImplemented'}
export function tan(value:number):number{throw 'NotImplemented'}
export function tanh(value:number):number{throw 'NotImplemented'}
export function trunc(value:number):number{throw 'NotImplemented'}
// string:
export function chr(value:string):string{throw 'NotImplemented'}
export function initcap(value:string):string{throw 'NotImplemented'}  
export function lower(value:string):string{throw 'NotImplemented'}  
export function lpad(value:string,len:number,pad:string):string{throw 'NotImplemented'}  
export function ltrim(value:string):string{throw 'NotImplemented'}   
export function regExpReplace(value:string,expression:string):string{throw 'NotImplemented'}  
export function regExpSubstr(value:string,expression:string):string{throw 'NotImplemented'}  
export function replace(value:string,source:string,target:string):string{throw 'NotImplemented'}  
export function rpad(value:string,len:number,pad:string){throw 'NotImplemented'}  
export function rtrim(value:string):string{throw 'NotImplemented'}  
export function substr(value:string,from:number,count:number):string{throw 'NotImplemented'}    
export function trim(value:string):string{throw 'NotImplemented'}   
export function upper(value:string):string{throw 'NotImplemented'}  
export function concat(...values:string[]):string{throw 'NotImplemented'}  
// function length(value:string):number{throw 'NotImplemented'}   
// null:
export function nvl(value:any,_default:any):any{throw 'NotImplemented';}
export function nvl2(value:any,a:any,b:any):any{throw 'NotImplemented';}
export function isNull(value:any):boolean{throw 'NotImplemented';}
export function isNotNull(value:any):boolean{throw 'NotImplemented';}
//  group:  
export function avg(value:any):any{throw 'NotImplemented';}
export function count(value:any):any{throw 'NotImplemented';}
export function first(value:any):any{throw 'NotImplemented';}
export function last(value:any):any{throw 'NotImplemented';}
export function max(value:any):any{throw 'NotImplemented';}
export function min(value:any):any{throw 'NotImplemented';}
export function sum(value:any):any{throw 'NotImplemented';}

// export function s<T>(object: T | null | undefined, defaultValue: T | null = {} as T) : T {
//     if (typeof object === 'undefined' || object === null)
//         return defaultValue as T;
//     else
//         return object;
// }