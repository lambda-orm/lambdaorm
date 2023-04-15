import { Repository, IOrm } from '../../../lib'
import { Product } from './__model'

export class ProductRepository extends Repository<Product, QryProduct> {
	constructor (stage: string, orm?:IOrm) {
		super('Products', stage, orm)
	}
	// Add your methods here
}
