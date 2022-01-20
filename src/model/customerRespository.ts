import { Respository, IOrm } from '../lib'
import { Customer, QryCustomer } from './model'

export class CustomerRespository extends Respository<Customer, QryCustomer> {
	constructor (stage: string, Orm?:IOrm) {
		super('Customers', stage, Orm)
	}
	// Add your methods here
}
