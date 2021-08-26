export interface Cache {
    get(key:string): any
    set(key:string,value:any):any
    del(key:string):any
}