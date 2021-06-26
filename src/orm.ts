import Parser from './parser/parser'
import Model from './parser/model'
import DefaultLanguage from './language/default/language'
import SqlLanguage from './language/sql/language'
import CoreLib from './language/default/coreLib' 
import modelConfig from './parser/config.json'
import sqlConfig  from './language/sql/config.json'
import Connection  from './connection/base'
import MySqlConnection  from './connection/mysql'
import {Schema} from './model/schema'
import SchemaManager  from './manager/schemaManager'
import LanguageManager  from './manager/languageManager'
import Expression from './manager/expression'
import CompiledExpression from './manager/compiledExpression'
import {Cache} from './model/cache'
import Dialect from './model/dialect'
import ConnectionInfo  from './model/connectionInfo'

class Orm {
    private schemaManager:SchemaManager
    private languageManager:LanguageManager

    constructor(schemaManager:SchemaManager,languageManager:LanguageManager){
        this.schemaManager=schemaManager
        this.languageManager = languageManager
    }
    public setCache(value:Cache){
        this.languageManager.addLanguage(value);
    }
    public addDialect(value:Dialect){
        this.languageManager.addDialect(value);
    }
    public addLanguage(value:any){
        this.languageManager.addLanguage(value);
    }
    public addLibrary(value:any){
        this.languageManager.addLibrary(value);
    }
    public addConnectionType(name:string,value:any){
        this.languageManager.addConnectionType(name,value);
    }
    public addConnection(value:ConnectionInfo){        
        this.languageManager.addConnection(value);
    }
    public getConnection(name:string):Connection
    {
        return this.languageManager.getConnection(name);
    }
    public applySchema(value:Schema):void
    {
        this.schemaManager.apply(value);
    }
    public deleteSchema(name:string):void
    {
        return this.schemaManager.delete(name);
    }  
    public getSchema(name:string):Schema | undefined
    {
        return this.schemaManager.get(name);
    }
    public listSchema():Schema[]
    {
        return this.schemaManager.list();
    }
    public expression(value:string){
        return new Expression(this.languageManager,value)
    }
    public lambda(value:Function):Expression
    {
        let str = value.toString();
        let index = str.indexOf('=>')+2;
        let expression = str.substring(index,str.length);
        return new Expression(this.languageManager,expression)
    }
    public deserialize(serialized:string,language:string):CompiledExpression
    {
       let operand= this.languageManager.deserialize(serialized,language);
       return new CompiledExpression(this.languageManager,operand,language);
    } 
}
var orm = null;
export =(function() {
    if(!orm){
        let model = new Model();
        model.load(modelConfig);
        let parser =  new Parser(model);

        let schemaManager=new SchemaManager();
        let languageManager = new LanguageManager(parser,schemaManager)
                
        orm= new Orm(schemaManager,languageManager);    
        orm.addLanguage(new DefaultLanguage());
        orm.addLibrary(new CoreLib());

        orm.addLanguage(new SqlLanguage());
        orm.addLibrary({language:'sql',name:'sql',variants:sqlConfig.variants}); 

        orm.addConnectionType('mysql',MySqlConnection);

        orm.addDialect({name:'mysql',language:'sql',variant:'mysql',connectionType:'mysql'});
        orm.addDialect({name:'oracle',language:'sql',variant:'oracle',connectionType:'oracle'});
        orm.addDialect({name:'mssql',language:'sql',variant:'mmsql',connectionType:'mmsql'});
        orm.addDialect({name:'postgres',language:'sql',variant:'postgres',connectionType:'postgres'});
        orm.addDialect({name:'memory',language:'memory'});       
    }
    return orm;
})();

