import {IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {Transaction,ConnectionConfig,ExecutionResult,ExecutionSentenceResult} from '../connection'

export abstract class SchemaActionDDL
{    
    protected orm:IOrm 
    protected schema:SchemaHelper
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm;
        this.schema=schema;
    }
    public abstract sentence(dialect:string):any[];
    public async execute(database:string,transaction?:Transaction,tryAllCan:boolean=false):Promise<ExecutionResult>
    {       
        let _database= this.orm.database.get(database);
        let config = this.orm.connection.get(_database.name);
        let sentences = this.sentence(config.dialect);  
        let results:ExecutionSentenceResult[]=[]; 
        if(transaction){            
            results=await this.executeSentences(database,sentences,transaction,tryAllCan);            
        }else{
            sentences = this.sentence(config.dialect);
            await this.orm.internalTransaction(_database.name,async (transaction)=>{
                results=await this.executeSentences(database,sentences,transaction,tryAllCan);
            });
        }
        return {results:results}
    }
    protected async executeSentences(database:string,sentences:string[],transaction:Transaction,tryAllCan:boolean):Promise<ExecutionSentenceResult[]>
    {
        let results:ExecutionSentenceResult[]=[];
        let sentence:any; 
        if(tryAllCan){
            for(let i=0;i<sentences.length;i++){                
                sentence = sentences[i];
                try{
                    const result= await this.orm.executeSentence(sentence,database,transaction);
                    results.push({result:result,sentence:sentence}); 
                }
                catch(error){
                    results.push({error:error,sentence:sentence}); 
                }
            } 
        }
        else{
            try{
                for(let i=0;i<sentences.length;i++){                
                    sentence = sentences[i];
                    const result= await this.orm.executeSentence(sentence,database,transaction);
                    results.push({result:result,sentence:sentence});
                }
            }
            catch(error){
                throw `sentence: ${sentence.toString()} error: ${error.toString()}`;
            }
        }    
        return results;
    }
}