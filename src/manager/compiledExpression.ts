import {Operand,IOrm } from './../model'
import {Transaction } from './../connection'
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
        return this.orm.language.serialize(this.dialect,this.operand );
    }
    public sentence():string
    {
        return this.orm.language.sentence(this.dialect,this.operand);
    }
    public model():any
    {
        return this.orm.language.model(this.dialect,this.operand);
    }      
    public async execute(context:any,database:string,transaction?:Transaction):Promise<any>
    {  
        return await this.orm.execute(this.operand,context,database,transaction);
    }
}