import { Respository } from 'lambdaorm'
import { QryEmployee } from './model'
export class EmployeeRespository extends Respository<QryEmployee> {
	constructor (database: string) {
		super('Employees', database)
	}
	// Add your code here
}
