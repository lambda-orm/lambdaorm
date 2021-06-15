import {Orders,OrderDetails,Customers} from './model'
import orm  from "./../orm"  


(async () => { 

let result

result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]),{id:0},'northwind');
result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).include('customer','details.product') ,{id:0},'northwind');

})();