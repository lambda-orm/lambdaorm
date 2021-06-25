import LanguageManager from './languageManager'
import Operand from '../language/operand'

export default class CompiledExpression
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
    public async run(context:any,connectionName:string)
    {        
        return await this.mgr.run(this.operand,context,connectionName)
    }
}