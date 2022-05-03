import { Repository, IOrm } from '../lib'
import { Customer } from './__model'

export class CustomerRepository extends Repository<Customer, QryCustomer> {
	constructor (stage: string, Orm?:IOrm) {
		super('Customers', stage, Orm)
	}
	// Add your methods here
}
