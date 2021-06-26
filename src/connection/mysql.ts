import mysql from 'mysql'
import Connection from './base'
import ConnectionInfo  from './../model/connectionInfo'

export default class MySqlConnection extends Connection
{       
    
    private isConnect:boolean;
    private pool?:mysql.Pool;    

    constructor(info:ConnectionInfo){        
        super(info);
        this.isConnect= false;
    }
    private connect():void{
        this.pool = mysql.createPool({
            host: this.info.host ,
            port: this.info.port | 3306,
            user: this.info.user,
            password: this.info.password,
            database: this.info.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.isConnect = true;

    }
    public async query(query:string,params:any[])
    {
        // if(!this.isConnect)this.connect();
        // let result =await this.pool.query(query,params);
        // return result.values;
        let me = this;
        return new Promise(function(resolve, reject) {           
            if(!me.isConnect)me.connect();
            if(me.pool)
                me.pool.query(query, params, function (err, rows, fields) {
                    // Call reject on error states,
                    // call resolve with results
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
            else
              reject("pool undefined");    
        });
    }
    public async queries(sentences:any[])
    {
        let results =[];
        if(!this.isConnect)this.connect();  
        for(let i=0;i<sentences.length;i++){
            let sentence = sentences[i];
            let result =this.pool?(await this.pool.query(sentence.query,sentence.params)):[];
            results.push(result.values);
        }
        return results; 
    }
    public async exec(sentences:any[])
    {
        //TODO: solve with Promise
        /*
        let results =[];
        if(!this.isConnect)this.connect();  
        const cnx = await this.pool.getConnection() as;
        try {
            await cnx.beginTransaction();
            for(let i=0;i<sentences.length;i++){
                let sentence = sentences[i];
                let result =await cnx.query(sentence.query,sentence.params);
                results.push(result.values);
            } 
            await cnx.commit();
        }catch (err) {
            await cnx.rollback();
            throw err;

        }finally {
            cnx.release();
            return results;
        }
        */
    }
}