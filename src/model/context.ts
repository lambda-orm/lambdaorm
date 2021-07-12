export class Context
{
    protected _data: any
    protected _parent: any 
    constructor(data:any,parent?:Context){
        this._data = data;
        this._parent= parent;
    }
    newContext():Context
    {        
        return new Context({},this)
    }
    getContext(variable:string):any
    {
        if(this._data[variable] !==undefined || this._parent == null)return this._data
        let _context =this._parent.getContext(variable);
        return  _context?_context:this._data;
    }
    contains(name:string):boolean
    {
        let names=name.split('.');
        let value = this.getContext(names[0]); 
        for(let n in names){
            if(value[n]===undefined) return false;
            value=value[n];
        }
        return true;
    }
    get(name:string):any
    {
        let names=name.split('.');
        let value = this.getContext(names[0]); 
        for(let p in names){
            let name = names[p]
            if(value[name]===undefined) return null;
            value=value[name];
        }
        return value;
    }
    set(name:string,value:any):void
    {
        let names=name.split('.') ;       
        let level = names.length -1;
        let list = this.getContext(names[0]);
        for(let i=0;i<names.length;i++){ 
            const p = names[i];
            if(i == level)
                list[p]=value;
            else                    
                list=list[p];
        }
    }
    init(name:string,value:any):void
    {
        this._data[name]=value; 
    } 
}