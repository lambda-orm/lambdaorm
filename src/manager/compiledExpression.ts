import {LanguageManager} from './languageManager'
import {IExecutor,Operand } from './../model'

export class CompiledExpression
{
    protected mgr:LanguageManager 
    protected operand:Operand
    protected dialect:string   

    constructor(mgr:LanguageManager,operand:Operand,dialect:string){        
        this.mgr=mgr
        this.operand= operand
        this.dialect= dialect
    }       
    public serialize():string
    {
        return this.mgr.serialize(this.operand,this.dialect );
    }
    public query():string
    {
        return this.mgr.query(this.operand,this.dialect );
    }
    public schema():any
    {
        return this.mgr.schema(this.operand,this.dialect);
    }      
    public async execute(context:any,connectionName:string):Promise<any>
    {        
        return await this.mgr.execute(this.operand,this.dialect,context,connectionName)
    }
    public async transaction(context:any,transaction:IExecutor):Promise<any>
    {
        return await this.mgr.transaction(this.operand,this.dialect,context,transaction);
    }
}