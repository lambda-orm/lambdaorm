import {ITransaction,Operand,IOrm } from './../model/index'

export class CompiledExpression
{
    private orm:IOrm
    private operand:Operand
    private dialect:string   

    constructor(orm:IOrm,operand:Operand,dialect:string){        
        this.orm=orm
        this.operand= operand
        this.dialect= dialect
    }       
    public serialize():string
    {
        return this.orm.getLanguage(this.dialect).operand.serialize(this.operand );
    }
    public sql():string
    {
        return this.orm.getLanguage(this.dialect).operand.sql(this.operand);
    }
    public model():any
    {
        return this.orm.getLanguage(this.dialect).operand.model(this.operand);
    }      
    public async execute(context:any,connection?:string|ITransaction):Promise<any>
    {        
        return await this.orm.execute(this.operand,this.dialect,context,connection);
    }
}