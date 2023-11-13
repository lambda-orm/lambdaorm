import { Repository, IOrm } from '../../../lib'
import { Category } from './__model'
import { QryCategory } from './__queryable'

export class CategoryRepository extends Repository<Category, QryCategory> {
	constructor (stage: string, orm?:IOrm) {
		super('Categories', stage, orm)
	}
	// Add your methods here
}
