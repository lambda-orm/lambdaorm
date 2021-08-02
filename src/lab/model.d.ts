import './../sintaxis';

declare global {
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
    quantity:string
    inStock:number
    discontinued:boolean
    categoryId:number
    category:Category & OneToMany<Category>
}
interface Order 
{
    id:number
    name:string
    customerId:number
    shippedDate:Date    
    customer:Customer & OneToMany<Customer>
    details: ManyToOne<OrderDetail>
}
interface OrderDetail 
{
    orderId:number
    productId:number
    unitPrice:number
    quantity:number
    discount:number
    product:Product & OneToMany<Product>
    order:Order & OneToMany<Order>
}
let Products:Entity<Product>;
let Categories:Entity<Category>;
let Customers:Entity<Customer>;
let Orders:Entity<Order>;
let OrderDetails:Entity<OrderDetail>;

}