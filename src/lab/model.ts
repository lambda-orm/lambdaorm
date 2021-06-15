import {Entity,Property,Relation} from './decorators'

@Entity('Customers')
class Customer
{
    @Property('CustomerId',false,true,true)  
    public id?:number
    @Property('Name')
    public name?:string
}
let Customers:Entity<Customer>;

@Entity('OrderDetails')
class OrderDetail
{
    @Property('OrderDetailId',false,true,true)    
    public id?:number
    @Property('Name')
    public orderId?:number
}
let OrderDetails:Entity<OrderDetail>;

@Entity('Orders')
class Order
{
    @Property('OrderId',false,true,true)  
    public id?:number
    @Property('Name')
    public name?:string
    @Property('CustomerId')
    public customerId?:number    
    @Relation('manyToOne','customerId','id')
    public customer:Customer=new Customer() 
    @Relation('oneToMany','id','orderId')
    public details?:OrderDetail[]

}
let Orders:Entity<Order>;



export { Orders,OrderDetails,Customers}
