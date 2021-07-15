import {IOrm,ITransaction,ConnectionConfig} from './../model'
import {LanguageManager} from './languageManager'
import {SchemaManager} from './schemaManager'
import {CompiledExpression} from './compiledExpression'
import {NodeExpression} from './nodeExpression'
import {Node,Parser} from './../parser/index'

export class Expression
{
    private orm:IOrm
    private expression:string    
    private dialect?:string
    // private schema?:string

    constructor(orm:IOrm,expression:string)
    {     
        this.orm =  orm; 
        this.expression= expression;
    }
    public async parse():Promise<NodeExpression> 
    {
       if(!this.expression)throw 'Expression not defined';
       let node = await this.orm.parser.parse(this.expression);
       return new NodeExpression(this.orm.parser,node);
    }    
    public async compile(dialect:string,schemaName:string):Promise<CompiledExpression> 
    {
       if(!this.expression)throw 'Expression not defined';
       this.dialect = dialect;
       let operand= await this.orm.compile(this.expression,this.dialect,schemaName);
       return new CompiledExpression(this.orm,operand,dialect)
    }  
    public async execute(context:any,connection?:string|ITransaction)
    {   
        let config:ConnectionConfig;
        if( typeof connection === "string"){
            config = this.orm.connection.get(connection);            
        }else{
            let transaction = connection as ITransaction;
            if(transaction)
            config = this.orm.connection.get(transaction.connectionName);
            else
                throw `connection no valid`; 
        } 
        let compiled = await this.compile(config.dialect,config.schema); 
        return await compiled.execute(context,connection) 
    }
}


