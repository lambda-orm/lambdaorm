import { Respository } from 'lambdaorm'
import { QrySupplier } from './model'
export class SupplierRespository extends Respository<QrySupplier> {
	constructor (database: string) {
		super('Suppliers', database)
	}
	// Add your code here
}
