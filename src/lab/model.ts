// import {Entity,Property,Relation} from './decorators'

// @Entity('Customers')
// class Customer
// {
//     @Property('CustomerId',false,true,true)  
//     public id?:number
//     @Property('Name')
//     public name?:string
// }
// let Customers:Entity<Customer>;

// @Entity('OrderDetails')
// class OrderDetail
// {
//     @Property('OrderDetailId',false,true,true)    
//     public id?:number
//     @Property('Name')
//     public orderId?:number
// }
// let OrderDetails:Entity<OrderDetail>;

// @Entity('Orders')
// class Order
// {
//     @Property('OrderId',false,true,true)  
//     public id?:number
//     @Property('Name')
//     public name?:string
//     @Property('CustomerId')
//     public customerId?:number    
//     @Relation('manyToOne','customerId','id')
//     public customer:Customer=new Customer() 
//     @Relation('oneToMany','id','orderId')
//     public details?:OrderDetail[]

// }
// let Orders:Entity<Order>;


// import {Entity,Property,Relation} from './decorators'


interface Customer
{
    id:number
    name:string
}
interface Category
{
    id:number
    name:string
}
interface Product
{
    id:number
    name:string
    category:Category
}
interface Order
{
    id:number
    name:string
    customerId:number    
    customer:Customer
    details:OrderDetail[]
    shippedDate:Date
}
interface OrderDetail
{
    id:number
    orderId:number
    productId:number
    unitPrice:number
    quantity:number
    discount:number
    product:Product
    order:Order
}

let Products:Entity<Product>;
let Categories:Entity<Category>;
let Customers:Entity<Customer>;
let Orders:Entity<Order>;
let OrderDetails:Entity<OrderDetail>;

export {Products,Categories,Orders,OrderDetails,Customers}
