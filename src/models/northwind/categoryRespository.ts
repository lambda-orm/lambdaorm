import { Respository, IOrm } from '../../orm'
import { Category, QryCategory } from './model'

export class CategoryRespository extends Respository<Category, QryCategory> {
	constructor (datastore: string, Orm?:IOrm) {
		super('Categories', datastore, Orm)
	}
	// Add your methods here
}
