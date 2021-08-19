import {IOrm} from './../model'
import {Transaction} from './../connection'
import {CompiledExpression} from './compiledExpression'
import {NodeExpression} from './nodeExpression'

export class Expression
{
    private orm:IOrm
    public expression:string    
    private dialect?:string
    constructor(orm:IOrm,expression:string)
    {     
        this.orm =  orm; 
        this.expression= expression;
    }
    public parse():NodeExpression 
    {
       if(!this.expression)throw 'Expression not defined';
       let node = this.orm.node.parse(this.expression);
       return new NodeExpression(this.orm.node,node);
    }
    public complete(schemaName:string):string
    {
       if(!this.expression)throw 'Expression not defined';
       return this.orm.complete(this.expression,schemaName);
    }    
    public async compile(dialect:string,schemaName:string):Promise<CompiledExpression> 
    {
       if(!this.expression)throw 'Expression not defined';
       this.dialect = dialect;
       let operand= await this.orm.compile(this.expression,this.dialect,schemaName);
       return new CompiledExpression(this.orm,operand,dialect)
    }  
    public async execute(context:any,database:string,transaction?:Transaction)
    {  
        let _database= this.orm.database.get(database);
        let compiled = await this.compile(_database.dialect,_database.schema); 
        return await compiled.execute(context,database,transaction);
    }
}


