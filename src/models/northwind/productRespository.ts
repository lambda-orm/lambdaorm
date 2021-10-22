import { Respository, IOrm } from '../../orm'
import { Product, QryProduct } from './model'

export class ProductRespository extends Respository<Product, QryProduct> {
	constructor (database?: string, Orm?:IOrm) {
		super('Products', database, Orm)
	}
	// Add your methods here
}
