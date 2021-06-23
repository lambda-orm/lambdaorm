import Parser from './manager/parser'
import Model from './base/model'
import DefaultLanguage from './language/default/language'
import SqlLanguage from './language/sql/language'
import CoreLib from './language/default/coreLib'
import modelConfig from './base/config.json'
import sqlConfig  from './language/sql/config.json'
import Connection  from './connection/base'
import MySqlConnection  from './connection/mysql'
import {Schema} from './model/schema'
import SchemaManager  from './manager/schema'
import LanguageManager  from './manager/language'
import Expression from './manager/expression'
import CompiledExpression from './manager/compiledExpression'

class Orm {

    private model:any
    private parser:Parser
    private schemaManager:SchemaManager
    private languageManager:LanguageManager

    constructor(model:any){
        this.model = model;
        this.parser =  new Parser(this.model);
        this.schemaManager=new SchemaManager();
        this.languageManager = new LanguageManager(this.parser,this.schemaManager)
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
    public addConnection(value:any){        
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
    public query(value:Function):Expression
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
        
        orm= new Orm(model);    
        orm.addLanguage(new DefaultLanguage());
        orm.addLibrary(new CoreLib());

        orm.addLanguage(new SqlLanguage());
        orm.addLibrary({language:'sql',name:'sql',variants:sqlConfig.variants}); 

        orm.addConnectionType('mysql',MySqlConnection);
    }
    return orm;
})();

