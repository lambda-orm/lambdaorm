import LanguageManager from './languageManager'
import CompiledExpression from './compiledExpression'


export default class Expression
{
    protected mgr:LanguageManager 
    protected expression:string    
    protected dialect?:string
    protected schema?:string

    constructor(mgr:LanguageManager,expression:string){        
        this.mgr=mgr
        this.expression= expression;

    }    
    public async compile(dialect:string,schema:string):Promise<CompiledExpression> 
    {
       if(!this.expression)throw 'Expression not defined';
       this.dialect = dialect;
       this.schema = schema;
       let operand=await this.mgr.compile(this.expression,this.dialect,this.schema);
       return new CompiledExpression(this.mgr,operand,this.dialect);
    }  
    public async run(context:any,connection:string)
    {     
        let cnx = this.mgr.getConnection(connection);
        let compiled = await this.compile(cnx.dialect,cnx.schema); 
        return await compiled.run(context,connection) 
    }
}


