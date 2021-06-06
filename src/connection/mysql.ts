import mysql from 'mysql'
import Connection from './base'

export default class MySqlConnection extends Connection
{       
    
    private isConnect:boolean;
    private pool=null;    

    constructor(data:any){        
        super(data);
        this.isConnect= false;
    }
    private connect():void{
        this.pool = mysql.createPool({
            host: this.data.host ,
            port: this.data.port | 3306,
            user: this.data.user,
            password: this.data.password,
            database: this.data.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.isConnect = true;

    }
    public async query(query:string,params:any[])
    {
        if(!this.isConnect)this.connect();
        let result =await this.pool.query(query,params);
        return result;
    }
    public async queries(sentences:any[])
    {
        let results =[];
        if(!this.isConnect)this.connect();  
        for(let i=0;i<sentences.length;i++){
            let sentence = sentences[i];
            let result =await this.pool.query(sentence.query,sentence.params);
            results.push(result);
        }
        return results; 
    }
    public async  exec(sentences:any[])
    {
        let results =[];
        if(!this.isConnect)this.connect();  
        const cnx = await this.pool.getConnection();
        try {
            await cnx.beginTransaction();
            for(let i=0;i<sentences.length;i++){
                let sentence = sentences[i];
                let result =await cnx.query(sentence.query,sentence.params);
                results.push(result);
            } 
            await cnx.commit();
        }catch (err) {
            await cnx.rollback();
            throw err;

        }finally {
            cnx.release();
            return results;
        }
    }
}