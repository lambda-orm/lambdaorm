import LanguageManager from './languageManager'
import CompiledExpression from './compiledExpression'


export default class Expression
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
    public async compile(language:string,variant:string,schema:string):Promise<CompiledExpression> 
    {
       if(!this.expression)throw 'Expression not defined';
       this.language = language;
       this.variant = variant;
       this.schema = schema;
       let operand=await this.mgr.compile(this.expression,this.language,this.variant,this.schema);
       return new CompiledExpression(this.mgr,operand,this.language);
    }  
    public async run(context:any,connection:string)
    {     
        let cnx = this.mgr.getConnection(connection);
        let compiled = await this.compile(cnx.language,cnx.variant,cnx.schema); 
        return await compiled.run(context,connection) 
    }
}


