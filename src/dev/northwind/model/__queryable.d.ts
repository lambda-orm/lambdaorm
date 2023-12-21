/* eslint-disable no-use-before-define */
import { Queryable, ManyToOne, OneToMany } from '../../../lib'
interface QryCategory {
	id: number
	name: string
	description: string
}

interface QryCustomer {
	id: string
	name: string
	contact: string
	phone: string
	address: string
	city: string
	region: string
	postalCode: string
	country: string
	orders: ManyToOne<QryOrder>
}
interface QryEmployee {
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
	reportsTo: QryEmployee & OneToMany<QryEmployee>
}
interface QryShipper {
	id: number
	name: string
	phone: string
}
interface QrySupplier {
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
interface QryProduct {
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
	supplier: QrySupplier & OneToMany<QrySupplier>
	category: QryCategory & OneToMany<QryCategory>
}
interface QryOrder {
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
	customer: QryCustomer & OneToMany<QryCustomer>
	employee: QryEmployee & OneToMany<QryEmployee>
	details: ManyToOne<QryOrderDetail>
}
interface QryOrderDetail {
	orderId: number
	productId: number
	unitPrice: number
	quantity: number
	discount: number
	order: QryOrder & OneToMany<QryOrder>
	product: QryProduct & OneToMany<QryProduct>
}

type QryCategories = Queryable<QryCategory>
type QryCustomers = Queryable<QryCustomer>
type QryEmployees = Queryable<QryEmployee>
type QryShippers = Queryable<QryShipper>
type QrySuppliers = Queryable<QrySupplier>
type QryProducts = Queryable<QryProduct>
type QryOrderDetails = Queryable<QryOrderDetail>
interface QryOrders extends Queryable<QryOrder>{
	details: QryOrderDetails
}
