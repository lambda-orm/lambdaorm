import {IOrm} from '../model/index'
import {SchemaHelper} from './schemaHelper'
import {ITransaction,ConnectionConfig } from '../connection'

export abstract class SchemaActionDDL
{    
    protected orm:IOrm 
    protected schema:SchemaHelper   
    constructor(orm:IOrm,schema:SchemaHelper){
        this.orm=orm;
        this.schema=schema;
    }
    public abstract sentence(dialect:string):string[];
    public async execute(connection?:string|ITransaction):Promise<any>
    {       
        let config:ConnectionConfig;
        let result:any; 
        if( typeof connection === "string"){
            config=this.orm.connection.get(connection);
            const sentences = this.sentence(config.dialect);
            await this.orm.createTransaction(connection,async (transaction)=>{
                result=await this.executeSentences(sentences,transaction);
            });
        }else{
            let transaction = connection as ITransaction;
            if(transaction){
                config=this.orm.connection.get(transaction.connectionName);
                const sentences = this.sentence(config.dialect);
                result=await this.executeSentences(sentences,transaction);
            } 
            else
                throw `connection no valid`; 
        }
        return result;
    }
    protected async executeSentences(sentences:string[],transaction:ITransaction):Promise<any[]>
    {
        let result:any[]=[];
        for(let i=0;i<sentences.length;i++){
            const sentence = sentences[i];
            result.push(await this.orm.executeSentence(sentence,transaction));
        }
        return result;
    }
}