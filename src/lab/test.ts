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
    const cnx = {name:'northwind',dialect:'mysql',schema:'northwind',connectionString:'mysql://root:root@0.0.0.0:3306/northwind'};
    orm.connection.add(cnx);
let result;


let qryInsert =(o:Order)=> Orders.insert({name:o.name,customerId:o.customerId,shippedDate:o.shippedDate})
//en este caso la variable entity dentro del contexto es el objeto de tipo Order
let qryInsert2 =(entity:Order)=> Orders.insert(entity).include(p=> p.details )
let qryInsert3 =(entity:Order)=> Orders.insert(entity).include(p=> [p.details,p.customer])
//en este caso se asume que el contexto sera directamente el objeto de tipo Order
let qryInsert4 =()=> Orders.insert()
let qryInsert5 =()=> Orders.insert().include(p=> [p.details,p.customer])

let qryUpdate =(entity:Order)=> Orders.update({name:entity.name}).filter(p=> p.id == entity.id)
let qryUpdate2 =(entity:Order)=> Orders.update({name:entity.name})
                                      .include(p=> [p.details,p.customer])
                                      .filter(p=> p.id == entity.id )
//en este caso la variable entity dentro del contexto es el objeto de tipo Order
let qryUpdate3 =(entity:Order)=> Orders.update(entity)                                     

//en este caso se asume que el contexto sera directamente el objeto de tipo Order
let qryUpdate4 =(entity:Order)=> Orders.update()
let qryUpdate5 =(entity:Order)=> Orders.update().include(p=> p.details)
let qryUpdate6 =(entity:Order)=> Orders.update().include(p=> [p.details,p.customer])

// let qryUpdate6 =(entity:Order)=> Orders.update({name:entity.name})
//                                       .include(p=> p.details.update((p,q) => ({unitPrice:q.unitPrice,productId:p.productId })) )
//                                       .filter(p=> p.id == entity.id )

let qryDelete =(id:number)=> Orders.delete().filter(p=> p.id == id).include(p=> p.details)
let qryFilterMap =(id:number)=> Orders.filter(p=> p.id == id).map(p=>({name:p.name})).sort(p=> p.name).skip(20).take(10)

//en este caso se asume que el contexto sera directamente el objeto de tipo Order
let qrySync =(entity:Order)=> Orders.sync()
let qrySync2 =(entity:Order)=> Orders.sync().include(p=> (p.details,p.customer))


// result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]) ,{id:0},'northwind');
result = orm.lambda( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer.map(p=> p.name),p.details
                                                                                                        .include(p=> p.product
                                                                                                            .include(p=> p.category.map(p=> p.name))
                                                                                                        .map(p=> p.name ))
                                                                                                        .map(p=>[p.quantity,p.unitPrice])
                                                                                                        ])).execute({id:0},'northwind');


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


// let a =(await orm.lambda(query).parse()).serialize()

result = (await orm.lambda(query).compile('mysql','northwind')).serialize();
console.log(result);
result = (await orm.lambda(query2).compile('mysql','northwind')).serialize();
console.log(result);
result = (await orm.lambda(query3).compile('mysql','northwind')).serialize();
console.log(result);


let context = {id:10584}
let query4 = (id:number)=> Orders.filter(p=>p.id == id ).map(p=> ({id:p.id,customer:p.customer.name}));
result = await orm.lambda(query4).execute(context,'northwind');
console.log(result);






})();