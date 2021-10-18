/* eslint-disable no-use-before-define */
import { Queryable } from 'lambdaorm'
export class Category {
	id?: number
	name?: string
	description?: string
}
export interface QryCategory {
	id: number
	name: string
	description: string
}
export class Customer {
constructor () {
	this.orders=[]
}
	id?: string
	name?: string
	contact?: string
	phone?: string
	address?: string
	city?: string
	region?: string
	postalCode?: string
	country?: string
	orders: Order[]
}
export interface QryCustomer {
	id: string
	name: string
	contact: string
	phone: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	orders: ManyToOne<Order> & Order[]
}
export class Employee {
	id?: number
	lastName?: string
	firstName?: string
	title?: string
	titleOfCourtesy?: string
	birthDate?: Date
	hireDate?: Date
	phone?: string
	reportsToId?: number
	address?: string
	city?: string
	region?: string
	postalCode?: string
	country?: string
	reportsTo?: Employee
}
export interface QryEmployee {
	id: number
	lastName: string
	firstName: string
	title: string
	titleOfCourtesy: string
	birthDate: Date
	hireDate: Date
	phone: string
	reportsToId: number
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	reportsTo: Employee & OneToMany<Employee> & Employee
}
export class Shipper {
	id?: number
	name?: string
	phone?: string
}
export interface QryShipper {
	id: number
	name: string
	phone: string
}
export class Supplier {
	id?: number
	name?: string
	contact?: string
	phone?: string
	homepage?: string
	address?: string
	city?: string
	region?: string
	postalCode?: string
	country?: string
}
export interface QrySupplier {
	id: number
	name: string
	contact: string
	phone: string
	homepage: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
}
export class Product {
	id?: number
	name?: string
	supplierId?: number
	categoryId?: number
	quantity?: string
	price?: number
	inStock?: number
	onOrder?: number
	reorderLevel?: number
	discontinued?: boolean
	supplier?: Supplier
	category?: Category
}
export interface QryProduct {
	id: number
	name: string
	supplierId: number
	categoryId: number
	quantity: string
	price: number
	inStock: number
	onOrder: number
	reorderLevel: number
	discontinued: boolean
	supplier: Supplier & OneToMany<Supplier> & Supplier
	category: Category & OneToMany<Category> & Category
}
export class Order {
constructor () {
	this.details=[]
}
	id?: number
	customerId?: string
	employeeId?: number
	orderDate?: Date
	requiredDate?: Date
	shippedDate?: Date
	shipViaId?: number
	freight?: number
	name?: string
	address?: string
	city?: string
	region?: string
	postalCode?: string
	country?: string
	customer?: Customer
	employee?: Employee
	details: OrderDetail[]
}
export interface QryOrder {
	id: number
	customerId: string
	employeeId: number
	orderDate: Date
	requiredDate: Date
	shippedDate: Date
	shipViaId: number
	freight: number
	name: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	customer: Customer & OneToMany<Customer> & Customer
	employee: Employee & OneToMany<Employee> & Employee
	details: ManyToOne<OrderDetail> & OrderDetail[]
}
export class OrderDetail {
	orderId?: number
	productId?: number
	unitPrice?: number
	quantity?: number
	discount?: number
	order?: Order
	product?: Product
}
export interface QryOrderDetail {
	orderId: number
	productId: number
	unitPrice: number
	quantity: number
	discount: number
	order: Order & OneToMany<Order> & Order
	product: Product & OneToMany<Product> & Product
}
	export let Categories: Queryable<QryCategory>
	export let Customers: Queryable<QryCustomer>
	export let Employees: Queryable<QryEmployee>
	export let Shippers: Queryable<QryShipper>
	export let Suppliers: Queryable<QrySupplier>
	export let Products: Queryable<QryProduct>
	export let Orders: Queryable<QryOrder>
	export let OrderDetails: Queryable<QryOrderDetail>
