import {Orders,OrderDetails,Customers} from './model'
import orm  from "./../orm"  

orm.introspectSchema('./model')

const result = orm.exec( (id:number)=> Orders.filter(p=> p.id == id ).map(p=> [p.id,as(p.customer.name,'customer')]),{id:0},'northwind')

