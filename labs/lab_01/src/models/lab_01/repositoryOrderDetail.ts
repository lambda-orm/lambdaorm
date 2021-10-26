import { Respository } from 'lambdaorm'
import { QryOrderDetail } from './model'
export class OrderDetailRespository extends Respository<QryOrderDetail> {
	constructor (database: string) {
		super('OrderDetails', database)
	}
	// Add your code here
}
