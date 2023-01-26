/* eslint-disable no-template-curly-in-string */
import { IOrm,QueryOptions } from '../../../lib'
import { TestSuiteRequest, IBuildTest } from 'h3lp'

export class NumericBuildTest implements IBuildTest {

	public constructor(private readonly orm:IOrm, private readonly options:QueryOptions){}

	private tests():string[] {
		return [
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: p.price * -1, result: round(abs(p.price * -1), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 0.25, result: round(acos(0.25), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 0.25, result: round(asin(0.25), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 0.25, result: round(atan(0.25), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 0.50, result: round(atan2(0.25, 1), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 25.75, result: round(ceil(25.75), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 2, result: round(cos(2), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 1, result: round(exp(1), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 25.75, result: round(floor(25.75), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 2, result: round(ln(2), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, m: 10, n: 20, result: round(log(10, 20), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 135.375, result: round(135.375, 2) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 255.5, result: round(sign(255.5), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 1.75, result: round(tan(1.75), 10) })',
			'Products.filter(p => p.id === id).map(p => { name: p.name, source: 135.375, result: round(trunc(135.375, 2), 10) })'
		]
	}
	public build(): TestSuiteRequest {
		return {
			name: 'numeric',
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
