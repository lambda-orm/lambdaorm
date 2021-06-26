import ConnectionInfo  from './../model/connectionInfo'
export default abstract class Connection
{
    protected info:ConnectionInfo;

    constructor(info:ConnectionInfo){        
        this.info = info;        
    }
    public get name(){return this.info.name;}
    public get dialect(){return this.info.dialect;}
    public get schema(){return this.info.schema;}
    public abstract query(query:string,params:any[]):any;
    public abstract queries(sentences:any[]):any;
    public abstract exec(sentences:any[]):any;
}