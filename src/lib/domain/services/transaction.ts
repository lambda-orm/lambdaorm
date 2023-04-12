/* eslint-disable @typescript-eslint/ban-types */
import { Query } from '../model'

export interface ITransaction {
	execute (expression: string|Function, data?: any): Promise<any>
	executeQuery (query: Query, data?: any): Promise<any>
}
