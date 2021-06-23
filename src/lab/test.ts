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
        orm.applySchema(schema);
    }
    const cnx = {name:'northwind',language:'sql',variant:'mysql',host:'0.0.0.0',port:3306,user:'root',password:'admin',schema:'northwind' ,database:'northwind'};
    orm.addConnection(cnx);


let result;

let qryDelete =(id:number)=> Orders.delete().filter(p=> p.id == id).include(p=> p.customer )
let qryFilterMap =(id:number)=> Orders.filter(p=> p.id == id).map(p=>({name:p.name})).sort(p=> p.name).skip(20).take(10)

// result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]) ,{id:0},'northwind');
result = orm.query( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer.map(p=> p.name),p.details
                                                                                                        .include(p=> p.product
                                                                                                            .include(p=> p.category.map(p=> p.name))
                                                                                                        .map(p=> p.name ))
                                                                                                        .map(p=>[p.quantity,p.unitPrice])
                                                                                                        ])).run({id:0},'northwind');


// result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer,p.details.product.category]) ,{id:0},'northwind');

let query = (id:number)=> Orders.filter(p=> p.id == id ).map(p=> ({id:p.id,customer:p.customer.name}));

let query2 =  ()=> OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
                               .map(p=> ({category:p.product.category.name,product:p.product.name}) )
                               .sort(p=> [p.category,p.product]);
// `SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity
// FROM OrderDetails o
// INNER JOIN Orders o1 ON o1.OrderID = o.OrderID
// INNER JOIN Products p ON p.ProductID = o.ProductID
// INNER JOIN Categories c ON c.CategoryID = p.CategoryID
// WHERE o1.ShippedDate BETWEEN '19970101' AND '19971231'
// ORDER BY category, product
// `;                               
let query3= (id:number)=> OrderDetails.filter(p=> p.orderId == id )
                               .map(p=> ({id:p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100)})); 
// `SELECT o.OrderID AS order, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal
// FROM OrderDetails o
// GROUP BY o.OrderID
// `;                                                              
// let updateCategory = (value:Category)=>Categories.update({name:value.name}).filter(p=> p.id == value.id);

OrderDetails.map(p=> ({order: p.orderId,subTotal:sum((p.unitPrice*p.quantity*(1-p.discount/100))*100) }))

let query5 = (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])

let query6 = (id:number)=> Orders.filter(p=>p.id==id).include(p => [p.details.include(q=>q.product.include(p=>p.category)).map(p=>({quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId})),p.customer])

result = (await orm.query(query).compile('sql','mysql','northwind')).serialize();
console.log(result);
result = (await orm.query(query2).compile('sql','mysql','northwind')).serialize();
console.log(result);
result = (await orm.query(query3).compile('sql','mysql','northwind')).serialize();
console.log(result);
// result = orm.query(updateCategory).compile('sql','mysql','northwind').serialize();
// console.log(result);

let context = {id:10584}
let query4 = (id:number)=> Orders.filter(p=>p.id == id ).map(p=> ({id:p.id,customer:p.customer.name}));
result = await orm.query(query4).run(context,'northwind');
console.log(result);


})();