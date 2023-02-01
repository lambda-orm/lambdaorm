/* eslint-disable no-template-curly-in-string */
import { IOrm,QueryOptions } from '../../../lib'
import { TestSuiteRequest, IBuildTest } from 'h3lp'

export class InsertBuildTest implements IBuildTest {
	public constructor(private readonly orm:IOrm, private readonly options:QueryOptions){}
	private tests():string[] {
		return [
			'Categories.insert({name:name,description:description})',
			'Categories.insert()',
			'Categories.insert([name, description])',
			'Categories.insert(entity)',
			'Orders.insert()',
			'Orders.insert().include(p => p.details)',
			'Orders.insert().include(p => [p.details, p.customer])',
			'Categories.insert(() => ({ name: name, description: description }))',
			'Categories.insert(p=>{name:p.name,description:p.description})',
			'Categories.insert(p=> [p.name,p.description])',
			'Categories.bulkInsert()',
			'Orders.bulkInsert().include(p => p.details)',
			'Orders.bulkInsert().include(p => [p.details, p.customer])'
		]
	}
	public build(): TestSuiteRequest {
		return {
			name: 'insert',
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
