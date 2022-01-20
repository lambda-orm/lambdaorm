import { Respository, IOrm } from '../lib'
import { Product, QryProduct } from './model'

export class ProductRespository extends Respository<Product, QryProduct> {
	constructor (stage: string, Orm?:IOrm) {
		super('Products', stage, Orm)
	}
	// Add your methods here
}
