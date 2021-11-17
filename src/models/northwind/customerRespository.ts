import { Respository, IOrm } from '../../orm'
import { Customer, QryCustomer } from './model'

export class CustomerRespository extends Respository<Customer, QryCustomer> {
	constructor (datastore?: string, Orm?:IOrm) {
		super('Customers', datastore, Orm)
	}
	// Add your methods here
}
