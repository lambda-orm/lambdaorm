import { IOrm } from '../application'

export class OrmLibrary {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:IOrm) {}

	load () {
		// TODO: solve async expression
		this.orm.expressions.addFunction('execute(expression:string,data:any,options:any):any', async (expression:string, data:any, options:any) => {
			if (expression !== undefined && expression !== null && expression.trim() !== '') {
				return await this.orm.execute(expression, data, options)
			}
		})
	}
}
