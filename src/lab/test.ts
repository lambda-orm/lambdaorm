import {Products,Categories,Orders,OrderDetails,Customers,Product,Category,Customer,Order,OrderDetail} from './model'
import orm  from "./../orm"  


(async () => { 

let result

result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]) ,{id:0},'northwind');
result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer.map(p=> p.name),p.details
                                                                                                        .include(p=> p.product
                                                                                                            .include(p=> p.category.map(p=> p.name))
                                                                                                        .map(p=> p.name ))
                                                                                                        .map(p=>[p.quantity,p.unitPrice])
                                                                                                        ]) ,{id:0},'northwind');


result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).include(p=> [p.customer,p.details.product.category]) ,{id:0},'northwind');

let query = (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]);
result = orm.exec(query,{id:0},'northwind');



let updateCategory = (value:Category)=>Categories.update({name:value.name}).filter(p=> p.id == value.id)
result = orm.exec(updateCategory,{value:{id:1,name:'test'}},'northwind');



result = orm.exec(()=> 
OrderDetails.filter(p=> between(p.order.shippedDate,'19970101','19971231') )                 
            .map(p=> ({category:p.product.category.name,product:p.product.name}) )
            // .map(p=> [as(p.product.category.name,'category'),as(p.product.name,'product'),p.unitPrice,p.quantity])
            .sort(p=> [p.category,p.product])
,{id:0},'northwind');
// `SELECT c.CategoryName AS category, p.ProductName AS product, o.UnitPrice AS unitPrice, o.Quantity AS quantity
// FROM OrderDetails o
// INNER JOIN Orders o1 ON o1.OrderID = o.OrderID
// INNER JOIN Products p ON p.ProductID = o.ProductID
// INNER JOIN Categories c ON c.CategoryID = p.CategoryID
// WHERE o1.ShippedDate BETWEEN '19970101' AND '19971231'
// ORDER BY category, product
// `;




result = orm.exec( (id:number)=> OrderDetails.filter(p=> p.orderId == id )
                                             .map(p=> [p.orderId,as(sum((p.unitPrice*p.quantity*(1-p.discount/100))*100),'subTotal')]) 
                  ,{id:0},'northwind');

})();
// `SELECT o.OrderID AS order, SUM((((o.UnitPrice * o.Quantity) * (1 - (o.Discount / 100))) * 100)) AS subTotal
// FROM OrderDetails o
// GROUP BY o.OrderID
// `;



// debtor-management

// https://rarredondo:Beesion19@gitlab.com/bss-perimeter1/collection-portal.git

// https://flrita:flrita1234@gitlab.com/bss-perimeter1/collection-portal.git

// flrita flrita1234