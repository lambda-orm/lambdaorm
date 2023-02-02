/* eslint-disable no-template-curly-in-string */
import { IOrm,QueryOptions } from '../../../lib'
import { TestSuiteRequest, IBuildTest } from 'h3lp'

export class DeleteBuildTest implements IBuildTest {
	public constructor(private readonly orm:IOrm, private readonly options:QueryOptions){}
	private tests():string[] {
		return [
			'Categories.delete()',
			'Categories.delete(entity)',
			'Categories.delete(p => entity)',
			'Categories.delete(p => p)',
			'Categories.delete().filter(p => p.id === id)',
			'Categories.delete().filter(p => p.id === entity.id)',
			'Categories.deleteAll()',
			'Categories.deleteAll().filter(p=> substring(p.name,1,3) === "cat")',
			'Orders.details.delete().filter(p => p.orderId === id)',
			'Orders.delete().include(p => p.details)',
			'Orders.delete().filter(p => p.id === id).include(p => p.details)',
			'Orders.delete().include(p => p.details)',
			'Orders.details.delete(entity)',
			'Orders.delete(entity).include(p => p.details)',
			'Orders.details.deleteAll()'
		]
	}
	public build(): TestSuiteRequest {
		return {
			name: 'delete',
			context: { id: 1  },
			cases: [
				{
					name: 'normalize',
					func: (expression: string) => this.orm.normalize(expression),
					tests: this.tests()
				},
				{
					name: 'model',
					func: (expression: string) => this.orm.model(expression),
					tests: this.tests()
				},
				{
					name: 'parameters',
					func: (expression: string) => this.orm.parameters(expression),
					tests: this.tests()
				},
				{
					name: 'constraints',
					func: (expression: string) => this.orm.constraints(expression),
					tests: this.tests()
				},
				{
					name: 'metadata',
					func: (expression: string) => this.orm.metadata(expression),
					tests: this.tests()
				},
				{
					name: 'getInfo',
					func: (expression: string) => this.orm.getInfo(expression, this.options),
					tests: this.tests()
				}		
			]
		}	
	}
}
