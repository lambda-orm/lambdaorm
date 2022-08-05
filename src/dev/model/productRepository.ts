import { Repository, IOrm } from '../../lib'
import { Product } from './__model'

export class ProductRepository extends Repository<Product, QryProduct> {
	constructor (stage: string, Orm?:IOrm) {
		super('Products', stage, Orm)
	}
	// Add your methods here
}
