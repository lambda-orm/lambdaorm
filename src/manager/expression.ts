import {IOrm} from './../model'
import {ITransaction,ConnectionConfig} from './../connection'
import {CompiledExpression} from './compiledExpression'
import {NodeExpression} from './nodeExpression'

export class Expression
{
    private orm:IOrm
    private expression:string    
    private dialect?:string
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
    public async execute(context:any,database:string,transaction?:ITransaction)
    {  
        let _database= this.orm.database.get(database);
        let compiled = await this.compile(_database.dialect,_database.schema); 
        return await compiled.execute(context,database,transaction);
    }
}


