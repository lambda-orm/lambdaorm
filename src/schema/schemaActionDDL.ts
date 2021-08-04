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
    public async execute(connection?:string|ITransaction,tryAllCan:boolean=false):Promise<ExecutionResult>
    {       
        let config:ConnectionConfig;
        let sentences:any[];
        let results:ExecutionSentenceResult[]=[]; 
        if( typeof connection === "string"){
            config=this.orm.connection.get(connection);
            sentences = this.sentence(config.dialect);
            await this.orm.createTransaction(connection,async (transaction)=>{
                results=await this.executeSentences(sentences,transaction,tryAllCan);
            });
        }else{
            let transaction = connection as ITransaction;
            if(transaction){
                config=this.orm.connection.get(transaction.connectionName);
                sentences = this.sentence(config.dialect);
                results=await this.executeSentences(sentences,transaction,tryAllCan);
            } 
            else
                throw `connection no valid`; 
        }
        return {results:results}
    }
    protected async executeSentences(sentences:string[],transaction:ITransaction,tryAllCan:boolean):Promise<ExecutionSentenceResult[]>
    {
        let results:ExecutionSentenceResult[]=[];
        let sentence:any; 
        if(tryAllCan){
            for(let i=0;i<sentences.length;i++){                
                sentence = sentences[i];
                try{
                    const result= await this.orm.executeSentence(sentence,transaction);
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
                    const result= await this.orm.executeSentence(sentence,transaction);
                    results.push({result:result,sentence:sentence});
                }
            }
            catch(error){
                throw `sentence: ${sentence.toStrin()} error: ${error.toString()}`;
            }
        }    
        return results;
    }
}