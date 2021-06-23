export interface Cache {
    get(key:string): any
    set(key:string,value:any):any
    del(key:string):any
}

export class MemoryCache implements Cache {

    private list:any
    constructor(){
        this.list={}
    }
    public get(key:string){
        return this.list[key]; 
    }
    public set(key:string,value:any){
        this.list[key]= value
    }
    public del(key:string){
        delete this.list[key]
    }
}
