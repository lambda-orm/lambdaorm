abstract class Connection
{
    constructor(){}
    public abstract connect(data:any):void;
    public abstract query(sentences:any[]):any;
    public abstract exec(sentences:any[]):any;
}

export{
    Connection
}