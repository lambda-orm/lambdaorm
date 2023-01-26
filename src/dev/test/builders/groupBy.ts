/* eslint-disable no-template-curly-in-string */
import { IOrm,QueryOptions } from '../../../lib'
import { TestSuiteRequest, IBuildTest } from 'h3lp'

export class GroupByBuildTest implements IBuildTest {

	public constructor(private readonly orm:IOrm, private readonly options:QueryOptions){}

	private tests():string[] {
		return [
			'Products.map(p => ({ maxPrice: max(p.price) }))',
			'Products.map(p => ({ minPrice: min(p.price) }))',
			'Products.map(p => ({ total: sum(p.price) }))',
			'Products.map(p => ({ average: round(avg(p.price), 4) }))',
			'Products.map(p => ({ count: count(1) }))',
			'Products.map(p => ({ category: p.categoryId, largestPrice: max(p.price) }))',
			'Products.map(p => ({ category: p.category.name, largestPrice: max(p.price) }))',
			'Products.filter(p => p.id === id).map(p => ({ name: p.name, source: p.price, result: abs(p.price) }))',
			'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))',
			'Orders.details.map(p => ({ subTotal: sum((p.unitPrice * p.quantity * (1 - p.discount / 100)) * 100) })).sort(p => p.subTotal)',
			'Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))',
			'Products.filter(p => p.price > 5).having(p => max(p.price) > 50).map(p => ({ category: p.category.name, largestPrice: max(p.price) })).sort(p => desc(p.largestPrice))'
		]
	}
	public build(): TestSuiteRequest {
		return {
			name: 'groupBy',
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
