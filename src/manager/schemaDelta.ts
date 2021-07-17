import {Delta,IOrm} from './../model/index'

export class SchemaDelta
{
    private delta:Delta;
    private orm:IOrm  
    constructor(orm:IOrm,delta:Delta){
        this.orm=orm;
        this.delta = delta;
    }
    public serialize():Delta
    {
        return this.delta;
    }
    // public sql(dialect:string):string
    // {
    //     return this.orm.language.schemaSql(this.delta,this.dialect);
    // }
}