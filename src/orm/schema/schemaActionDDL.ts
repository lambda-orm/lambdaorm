import {IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {ExecutionResult,ExecutionSentenceResult} from '../connection'

export abstract class SchemaActionDDL
{    
    protected orm:IOrm 
    protected schema:SchemaHelper
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm
        this.schema=schema
    }
    public abstract sentence(dialect:string):any[]
    public async execute(database:string,tryAllCan:boolean=false):Promise<ExecutionResult>
    {       
        //let _database= this.orm.database.get(database)
        let config = this.orm.connection.get(database)
        let sentences = this.sentence(config.dialect)  
        let results:ExecutionSentenceResult[]=[] 
        await this.orm.transaction(database,async (tr)=>{            
            let sentence:any 
            if(tryAllCan){
                for(let i=0;i<sentences.length;i++){                
                    sentence = sentences[i]
                    try{
                        const result= await tr.executeSentence(sentence)
                        results.push({result:result,sentence:sentence}) 
                    }
                    catch(error){
                        results.push({error:error,sentence:sentence}) 
                    }
                } 
            }
            else{
                try{
                    for(let i=0;i<sentences.length;i++){                
                        sentence = sentences[i]
                        const result= await tr.executeSentence(sentence)
                        results.push({result:result,sentence:sentence})
                    }
                }
                catch(error:any){
                    throw `sentence: ${sentence.toString()} error: ${error.toString()}`
                }
            } 
        })
        return {results:results}
    }
}