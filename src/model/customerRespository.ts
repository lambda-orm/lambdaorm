import { Respository, IOrm } from '../lib'
import { Customer, QryCustomer } from './model'

export class CustomerRespository extends Respository<Customer, QryCustomer> {
	constructor (dataSource: string, Orm?:IOrm) {
		super('Customers', dataSource, Orm)
	}
	// Add your methods here
}
