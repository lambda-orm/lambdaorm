// import {Node,Parser} from '../parser/index'
// import {Dialect,IExecutor,ConnectionConfig,Cache,Operand,Context,IConnectionManager, Delta,ILanguage } from '../model/index'
// import {SchemaHelper} from './schemaHelper'

// export class DialectManager
// {
//     private languages:any
//     private dialects:any
//     constructor(){
//         this.languages={};
//         this.dialects={};
//     }
//     public add(value:Dialect):void
//     {
//         this.dialects[value.name] =value;
//     }
//     private get(dialect:string):Dialect
//     {
//         return this.dialects[dialect];
//     }
//     public addLanguage(value:ILanguage){
//         this.languages[value.name] =value;
//     }


//     public schemaSql(schema:SchemaHelper,delta:Delta,dialect:string):string
//     {
//         try
//         {
//             let info =  this.get(dialect);
//             let language = this.languages[info.language] as ILanguage
//             return language.schema.create(delta,dialect,schema);
//         }
//         catch(error){
//             throw 'schemaSql error: '+error.toString(); 
//         }
//     }
//     public compile(node:Node,dialect:string,schema?:SchemaHelper):Operand
//     {       
//         try
//         {      
//             let info =  this.get(dialect);                
//             let language = this.languages[info.language] as ILanguage
//             return language.operand.build(node,dialect,schema);
//         }
//         catch(error){
//             console.log(error)
//             throw 'compile error: '+error.toString();
//         }
//     }
//     public serialize(operand:Operand,dialect:string):any
//     {
//         try
//         {
//             let info =  this.get(dialect);
//             let language = this.languages[info.language] as ILanguage
//             return language.operand.serialize(operand);
//         }
//         catch(error){
//             throw 'serialize: '+operand.name+' error: '+error.toString(); 
//         }
//     }
//     public deserialize(json:any,dialect:string):Operand
//     {
//         try
//         {
//             let info =  this.get(dialect);
//             let language = this.languages[info.language] as ILanguage
//             return language.operand.deserialize(json);
//         }
//         catch(error){
//             throw 'deserialize: '+json+' error: '+error.toString(); 
//         }
//     }
//     public sql(operand:Operand,dialect:string):string
//     {
//         try
//         {
//             let info =  this.get(dialect);
//             let language = this.languages[info.language] as ILanguage
//             return language.operand.sql(operand);
//         }
//         catch(error){
//             throw 'sql: '+operand.name+' error: '+error.toString(); 
//         }
//     }
//     public model(operand:Operand,dialect:string):any
//     {
//         try
//         {
//             let info =  this.get(dialect);
//             let language = this.languages[info.language] as ILanguage
//             return language.operand.model(operand);
//         }
//         catch(error){
//             throw 'query: '+operand.name+' error: '+error.toString(); 
//         }
//     }
//     public async execute(operand:Operand,dialect:string,context:Context,executor?:IExecutor):Promise<any>
//     {
//         try{
//             let info =  this.get(dialect); 
//             let language = this.languages[info.language] as ILanguage          
//             if(executor){ 
//                 return await language.executor.execute(operand,context,executor);                
//             }else{
//                 return await language.executor.execute(operand,context);
//             }            
//         }catch(error){
//             throw 'run: '+operand.name+' error: '+error.toString(); 
//         }
//     }  
// }