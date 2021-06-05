// import mysql from 'mysql2/promise'
// import { Connection } from './base'

// class MySQLConnection extends Connection
// {   
//     private pool=null;
//     constructor(){
//         super();
//     }
//     public connect(data:any):void{
//         this.pool = mysql.createPool({
//             host: data.host ,
//             port: data.port | 3306,
//             user: data.user,
//             password: data.password,
//             database: data.database,
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0
//           });
//     }
//     public async query(sentences:any[]){
//         let results =[];  
//         for(let i=0;i<sentences.length;i++){
//             let sentence = sentences[i];
//             let result =await this.pool.query(sentence.query,sentence.params);
//             results.push(result);
//         }
//         return results; 
//     }
//     public async  exec(sentences:any[]){
//         let results =[];  
//         const cnx = await this.pool.getConnection();
//         try {
//             await cnx.beginTransaction();
//             for(let i=0;i<sentences.length;i++){
//                 let sentence = sentences[i];
//                 let result =await cnx.query(sentence.query,sentence.params);
//                 results.push(result);
//             } 
//             await cnx.commit();
//         }catch (err) {
//             await cnx.rollback();
//             throw err;

//         }finally {
//             cnx.release();
//             return results;
//         }
//     }


// }

// "devDependencies": {
//     "@types/mysql2": "github:types/mysql2",
//     "chai": "^4.2.0",
//     "mocha": "^8.2.1",
//     "typescript": "^4.3.2"
//   }