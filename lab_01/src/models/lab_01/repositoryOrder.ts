import { Respository } from 'lambdaorm'
import { QryOrder } from './model'
export class OrderRespository extends Respository<QryOrder> {
	constructor (database: string) {
		super('Orders', database)
	}
	// Add your code here
}
