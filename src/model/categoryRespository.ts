import { Respository, IOrm } from '../lib'
import { Category, QryCategory } from './model'

export class CategoryRespository extends Respository<Category, QryCategory> {
	constructor (stage: string, Orm?:IOrm) {
		super('Categories', stage, Orm)
	}
	// Add your methods here
}
