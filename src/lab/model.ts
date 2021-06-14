import {Mapping,NotNull,PrimaryKey,Autoincrement,Relation,RelationType} from './decorators'

@Mapping('Customer')
class Customer
{
    @Mapping('CustomerId') @NotNull() @PrimaryKey() @Autoincrement()    
    public id?:number
    @Mapping('Name')
    public name?:string
}
const Customers:Entity<Customer> = []

@Mapping('OrderDetails')
class OrderDetail
{
    @Mapping('OrderDetailId') @NotNull() @PrimaryKey() @Autoincrement()    
    public id?:number
    @Mapping('Name')
    public orderId?:number
}
const OrderDetails:Entity<OrderDetail> = []

@Mapping('Orders')
class Order
{
    @Mapping('OrderId')
    public id?:number
    @Mapping('Name')
    public name?:string
    @Mapping('CustomerId')
    public customerId?:number    
    @Relation(RelationType.ManyToOne,'customerId','id')
    public customer:Customer=new Customer() 
    @Relation(RelationType.OneToMany,'id','orderId')
    public details?:OrderDetail[]

}
const Orders:Entity<Order>= []


export { Orders,OrderDetails,Customers}
