import { Respository } from 'lambdaorm'
import { QryCategory } from './model'
export class CategoryRespository extends Respository<QryCategory> {
	constructor (database: string) {
		super('Categories', database)
	}
	// Add your code here
}
