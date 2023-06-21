import { Repository, IOrm } from '../../../lib'
import { Customer } from './__model'

export class CustomerRepository extends Repository<Customer, QryCustomer> {
	constructor (stage: string, orm?:IOrm) {
		super('Customers', stage, orm)
	}
	// Add your methods here
}
