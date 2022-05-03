/* eslint-disable no-use-before-define */

export class Category {
	id?: number
	name?: string
	description?: string
}

export class Customer {
	constructor () {
		this.orders = []
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
export class Shipper {
	id?: number
	name?: string
	phone?: string
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
export class Order {
	constructor () {
		this.details = []
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
export class OrderDetail {
	orderId?: number
	productId?: number
	unitPrice?: number
	quantity?: number
	discount?: number
	order?: Order
	product?: Product
}

export let Categories : QryCategories
export let Customers : QryCustomers
export let Employees :QryEmployees
export let Shippers : QryShippers
export let Suppliers : QrySuppliers
export let Products : QryProducts
export let OrderDetails : QryOrderDetails
export let Orders : QryOrders
