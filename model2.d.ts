import './../sintaxis';
,declare global {
,interface Category{
,	id:integer
,	name:string
,	description:string
,}
,interface Customer{
,	id:string
,	name:string
,	contact:string
,	phone:string
,	address:string
,	city:string
,	region:string
,	postalCode:string
,	country:string
,	orders:ManyToOne<Order>
,}
,interface Employee{
,	id:integer
,	lastName:string
,	firstName:string
,	title:string
,	titleOfCourtesy:string
,	birthDate:datetime
,	hireDate:datetime
,	phone:string
,	reportsToId:integer
,	address:string
,	city:string
,	region:string
,	postalCode:string
,	country:string
,	reportsTo:Employee & OneToMany<Employee>
,}
,interface Shipper{
,	id:integer
,	name:string
,	phone:string
,}
,interface Supplier{
,	id:integer
,	name:string
,	contact:string
,	phone:string
,	homepage:string
,	address:string
,	city:string
,	region:string
,	postalCode:string
,	country:string
,}
,interface Product{
,	id:integer
,	name:string
,	supplierId:integer
,	categoryId:integer
,	quantity:string
,	price:decimal
,	inStock:decimal
,	onOrder:decimal
,	reorderLevel:decimal
,	discontinued:bool
,	supplier:Supplier & OneToMany<Supplier>
,	category:Category & OneToMany<Category>
,}
,interface Order{
,	id:integer
,	customerId:string
,	employeeId:integer
,	orderDate:datetime
,	requiredDate:datetime
,	shippedDate:datetime
,	shipViaId:integer
,	freight:decimal
,	name:string
,	address:string
,	city:string
,	region:string
,	postalCode:string
,	country:string
,	customer:Customer & OneToMany<Customer>
,	employee:Employee & OneToMany<Employee>
,	details:ManyToOne<OrderDetail>
,}
,interface OrderDetail{
,	orderId:integer
,	productId:integer
,	unitPrice:decimal
,	quantity:decimal
,	discount:bool
,	order:Order & OneToMany<Order>
,	product:Product & OneToMany<Product>
,}
,let Categories:Entity<Category> 
,let Customers:Entity<Customer> 
,let Employees:Entity<Employee> 
,let Shippers:Entity<Shipper> 
,let Suppliers:Entity<Supplier> 
,let Products:Entity<Product> 
,let Orders:Entity<Order> 
,let OrderDetails:Entity<OrderDetail> 
,}
