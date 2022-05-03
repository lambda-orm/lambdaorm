import { Repository, IOrm } from '../lib'
import { Category } from './__model'

export class CategoryRepository extends Repository<Category, QryCategory> {
	constructor (stage: string, Orm?:IOrm) {
		super('Categories', stage, Orm)
	}
	// Add your methods here
}
