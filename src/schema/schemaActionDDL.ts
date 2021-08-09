import {IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {ITransaction,ConnectionConfig,ExecutionResult,ExecutionSentenceResult} from '../connection'

export abstract class SchemaActionDDL
{    
    protected orm:IOrm 
    protected schema:SchemaHelper
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm;
        this.schema=schema;
    }
    public abstract sentence(dialect:string):any[];
    public async execute(namespace:string,transaction?:ITransaction,tryAllCan:boolean=false):Promise<ExecutionResult>
    {       
        let _namespace= this.orm.namespace.get(namespace);
        let config = this.orm.connection.get(_namespace.connection);
        let sentences = this.sentence(config.dialect);  
        let results:ExecutionSentenceResult[]=[]; 
        if(transaction){            
            results=await this.executeSentences(namespace,sentences,transaction,tryAllCan);            
        }else{
            sentences = this.sentence(config.dialect);
            await this.orm.createTransaction(_namespace.connection,async (transaction)=>{
                results=await this.executeSentences(namespace,sentences,transaction,tryAllCan);
            });
        }
        return {results:results}
    }
    protected async executeSentences(namespace:string,sentences:string[],transaction:ITransaction,tryAllCan:boolean):Promise<ExecutionSentenceResult[]>
    {
        let results:ExecutionSentenceResult[]=[];
        let sentence:any; 
        if(tryAllCan){
            for(let i=0;i<sentences.length;i++){                
                sentence = sentences[i];
                try{
                    const result= await this.orm.executeSentence(sentence,namespace,transaction);
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
                    const result= await this.orm.executeSentence(sentence,namespace,transaction);
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