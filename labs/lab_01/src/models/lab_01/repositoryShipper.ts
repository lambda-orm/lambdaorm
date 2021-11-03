import { Respository } from 'lambdaorm'
import { QryShipper } from './model'
export class ShipperRespository extends Respository<QryShipper> {
	constructor (database: string) {
		super('Shippers', database)
	}
	// Add your code here
}
