// import {Entity,Property,Relation} from './decorators'

import { getSupportedCodeFixes } from "typescript"

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


class Customer extends Entity<Customer>
{
    constructor(id:number,name:string){
        super()
        this.id=id
        this.name=name       
    }
    public id:number
    public name:string
}
class Category extends Entity<Category>
{
    constructor(id:number,name:string){
        super()
        this.id=id
        this.name=name       
    }
    public id:number
    public name:string
}
class Product extends Entity<Product>
{
    constructor(id:number,name:string,category:Category){
        super()
        this.id=id
        this.name=name
        this.category=category        
    }
    public id:number
    public name:string
    public category:Category
}
class Order extends Entity<Order>
{
    constructor(id:number,name:string,customerId:number,shippedDate:Date,customer:Customer,details:OrderDetail){
        super()
        this.id=id
        this.name=name
        this.customerId=customerId 
        this.shippedDate=shippedDate 
        this.customer=customer  
        this.details=details       
    }
    public id:number
    public name:string
    public customerId:number
    public shippedDate:Date    
    public customer:Customer
    public details:OrderDetail
    
}
class OrderDetail extends Entity<OrderDetail>
{
    constructor(id:number,orderId:number,productId:number,unitPrice:number,quantity:number,discount:number,product:Product,order:Order){
        super()
        this.id=id
        this.orderId=orderId
        this.productId=productId 
        this.unitPrice=unitPrice 
        this.quantity=quantity  
        this.discount=discount 
        this.product=product  
        this.order=order        
    }
    public id:number
    public orderId:number
    public productId:number
    public unitPrice:number
    public quantity:number
    public discount:number
    public product:Product
    public order:Order
}

let Products:Product;
let Categories:Category;
let Customers:Customer;
let Orders:Order;
let OrderDetails:OrderDetail;

export {Products,Categories,Orders,OrderDetails,Customers,Product,Category,Customer,Order,OrderDetail}



// interface Customer
// {
//     id:number
//     name:string
// }
// interface Category
// {
//     id:number
//     name:string
// }
// interface Product
// {
//     id:number
//     name:string
//     category:Category
// }
// interface Order
// {
//     id:number
//     name:string
//     customerId:number    
//     customer:Customer
//     details:OrderDetail[]
//     shippedDate:Date
// }
// let Products:Entity<Product>;
// let Categories:Entity<Category>;
// let Customers:Entity<Customer>;
// let Orders:Entity<Order>;
// let OrderDetails:OrderDetail;

// export {Products,Categories,Orders,OrderDetails,Customers,OrderDetail}


