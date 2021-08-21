import {ILanguage,IOperandExecutor,IQueryBuilder,ISchemaBuilder} from '../'
import {Model} from '../../node'
import {SqlDialectMetadata} from './dialectMetadata'
import {SqlSchemaBuilder} from './schemaBuilder'
import {SqlExecutor} from './executor'
import {SqlQueryBuilder } from './queryBuilder'

export class SqlLanguage implements ILanguage
{
    public name:string
    public libraries:any
    public dialects:any    
    private schemaBuilder:SqlSchemaBuilder
    private queryBuilder:SqlQueryBuilder
    private operandExecutor:SqlExecutor
    constructor(){
        this.name= 'sql',
        this.libraries={};
        this.dialects={};
        this.schemaBuilder = new SqlSchemaBuilder(this);
        this.queryBuilder = new SqlQueryBuilder(this);
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
    public get query():IQueryBuilder
    {
        return this.queryBuilder;
    }
    public get executor():IOperandExecutor
    {
        return this.operandExecutor;
    }
    public metadata(dialect:string):SqlDialectMetadata
    {
        return this.dialects[dialect] as SqlDialectMetadata;
    }
}