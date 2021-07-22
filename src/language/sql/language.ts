import {ILanguage,IOperandExecutor,IOperandManager,ISchemaBuilder} from '../'
import {Model} from './../../parser'
import {SqlDialectMetadata} from './dialectMetadata'
import {SqlSchemaBuilder} from './schemaBuilder'
import {SqlOperandManager} from './operandManager'
import {SqlExecutor} from './executor'

export class SqlLanguage implements ILanguage
{
    public name:string
    public libraries:any
    public dialects:any
    
    private schemaBuilder:SqlSchemaBuilder
    private operandManager:SqlOperandManager
    private operandExecutor:SqlExecutor
    constructor(languageModel:Model){
        this.name= 'sql',
        this.libraries={};
        this.dialects={};
        this.schemaBuilder = new SqlSchemaBuilder(this);
        this.operandManager = new SqlOperandManager(this,languageModel);
        this.operandExecutor = new SqlExecutor(this);

    }
    public addLibrary(library:any):void
    {
        this.libraries[library.name] =library;
        for(const name in library.dialects){
            let data =  library.dialects[name];
            let dialect = new SqlDialectMetadata(name);
            dialect.add(data);
            this.dialects[name] =dialect 
        }
    }
    public get schema():ISchemaBuilder
    {
        return this.schemaBuilder;
    }
    public get operand():IOperandManager
    {
        return this.operandManager;
    }
    public get executor():IOperandExecutor
    {
        return this.operandExecutor;
    }
}