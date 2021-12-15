import { Respository, IOrm } from '../orm'
import { Product, QryProduct } from './model'

export class ProductRespository extends Respository<Product, QryProduct> {
	constructor (dataSource: string, Orm?:IOrm) {
		super('Products', dataSource, Orm)
	}
	// Add your methods here
}
