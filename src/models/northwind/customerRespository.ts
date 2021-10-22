import { Respository, IOrm } from '../../orm'
import { Customer, QryCustomer } from './model'

export class CustomerRespository extends Respository<Customer, QryCustomer> {
	constructor (database?: string, Orm?:IOrm) {
		super('Customers', database, Orm)
	}
	// Add your methods here
}
