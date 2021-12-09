import { Respository, IOrm } from '../orm'
import { Product, QryProduct } from './model'

export class ProductRespository extends Respository<Product, QryProduct> {
	constructor (datastore: string, Orm?:IOrm) {
		super('Products', datastore, Orm)
	}
	// Add your methods here
}
