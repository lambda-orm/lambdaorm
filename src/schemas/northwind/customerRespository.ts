import { Respository } from '../../orm'
import { QryCustomer } from './model'

export class CustomerRespository extends Respository<QryCustomer> {
	constructor (database: string) {
		super('Customers', database)
	}
	// Add your methods here
}
