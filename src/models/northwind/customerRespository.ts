import { Respository, IOrm } from '../../orm'
import { QryCustomer } from './model'

export class CustomerRespository extends Respository<QryCustomer> {
	constructor (database?: string, Orm?:IOrm) {
		super('Customers', database, Orm)
	}
	// Add your methods here
}
