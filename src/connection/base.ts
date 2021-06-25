export default abstract class Connection
{
    protected data:any;

    constructor(data:any){        
        this.data = data;        
    }
    public get name(){return this.data.name;}
    public get dialect(){return this.data.dialect;}
    public get schema(){return this.data.schema;}
    public abstract query(query:string,params:any[]):any;
    public abstract queries(sentences:any[]):any;
    public abstract exec(sentences:any[]):any;
}