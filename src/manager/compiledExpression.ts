import {Operand,IOrm } from './../model'
import {ITransaction } from './../connection'
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
        return this.orm.language(this.dialect).operand.serialize(this.operand );
    }
    public sentence():string
    {
        return this.orm.language(this.dialect).operand.sentence(this.operand);
    }
    public model():any
    {
        return this.orm.language(this.dialect).operand.model(this.operand);
    }      
    public async execute(context:any,namespace:string,transaction?:ITransaction):Promise<any>
    {  
        return await this.orm.execute(this.operand,context,namespace,transaction);
    }
}