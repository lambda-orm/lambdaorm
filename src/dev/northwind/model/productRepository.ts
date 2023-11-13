import { Repository, IOrm } from '../../../lib'
import { Product } from './__model'
import { QryProduct } from './__queryable'

export class ProductRepository extends Repository<Product, QryProduct> {
	constructor (stage: string, orm?:IOrm) {
		super('Products', stage, orm)
	}
	// Add your methods here
}
