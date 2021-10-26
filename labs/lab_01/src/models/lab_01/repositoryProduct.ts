import { Respository } from 'lambdaorm'
import { QryProduct } from './model'
export class ProductRespository extends Respository<QryProduct> {
	constructor (database: string) {
		super('Products', database)
	}
	// Add your code here
}
