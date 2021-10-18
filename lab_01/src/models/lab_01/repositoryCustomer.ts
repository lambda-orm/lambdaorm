import { Respository } from 'lambdaorm'
import { QryCustomer } from './model'
export class CustomerRespository extends Respository<QryCustomer> {
	constructor (database: string) {
		super('Customers', database)
	}
	// Add your code here
}
