import LanguageManager from './language'
import Operand from './../base/operand'


export class Expression
{
    protected mgr:LanguageManager 
    protected expression:string    
    protected language?:string
    protected variant?:string
    protected schema?:string

    constructor(mgr:LanguageManager,expression:string){        
        this.mgr=mgr
        this.expression= expression;

    }    
    public compile(language:string,variant:string,schema:string):CompiledExpression 
    {
       if(!this.expression)throw 'Expression not defined';
       this.language = language;
       this.variant = variant;
       this.schema = schema;
       let operand=this.mgr.compile(this.expression,this.language,this.variant,this.schema);
       return new CompiledExpression(this.mgr,operand,this.language);
    }  
    public async run(context:any,connection:string)
    {     
        let cnx = this.mgr.getConnection(connection);
        let compiled = this.compile(cnx.language,cnx.variant,cnx.schema); 
        return await compiled.run(context,connection) 
    }
}


export class CompiledExpression
{
    protected mgr:LanguageManager 
    protected operand:Operand
    protected language:string   

    constructor(mgr:LanguageManager,operand:Operand,language:string){        
        this.mgr=mgr
        this.operand= operand
        this.language= language
    }       
    public serialize():string
    {
        return this.mgr.serialize(this.operand,this.language );
    }    
    public async run(context:any,connectionName:string)
    {        
        return await this.mgr.run(this.operand as Operand,context,connectionName)
    }
}
