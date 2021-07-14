// import {Products,Categories,Orders,OrderDetails,Customers,Product,Category,Customer,Order,OrderDetail} from './model'
import orm from "./../orm"  
// import {between,sum } from "./../index"  
const ConfigExtends = require("config-extends");
import './../sintaxis'
import './model';

(async () => { 

    let schemas =  await ConfigExtends.apply('test/config/schema');
    for(const p in schemas){
        let schema =  schemas[p];
        orm.schema.add(schema);
    }
    const cnx = {name:'northwind',dialect:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
    orm.connection.add(cnx);
let result;



let qryInsert =(o:Order)=> Orders.insert({name:o.name,customerId:o.customerId,shippedDate:o.shippedDate})
let qryInsert2 =(entity:Order)=> Orders.insert(entity).include(p=> p.details )
let qryInsert3 =(entity:Order)=> Orders.insert(entity).include(p=> [p.details,p.customer])
let qryInsert4 =()=> Orders.insert()
let qryInsert5 =()=> Orders.insert().include(p=> [p.details,p.customer])
let qryUpdate =(entity:Order)=> Orders.update({name:entity.name}).filter(p=> p.id == entity.id)
let qryUpdate2 =(entity:Order)=> Orders.update({name:entity.name})
                                      .include(p=> [p.details,p.customer])
                                      .filter(p=> p.id == entity.id )

let context = {id:10584}
// orm.transaction('northwind',async function(tr){
//     await orm.lambda(qryInsert).run(context,tr);
//     await orm.lambda(qryInsert).run(context,tr);
//     await orm.lambda(qryInsert).run(context,tr);
//     await orm.lambda(qryInsert).run(context,tr);
// });
// commit y rollback estarian implicitos. si hay una excepcion ejecuta el rollback y hace throw de la exception , en caso contrario commit

})();