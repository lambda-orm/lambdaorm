/* eslint-disable no-template-curly-in-string */
import { IOrm,QueryOptions } from '../../../lib'
import { TestSuiteRequest, IBuildTest } from 'h3lp'

export class UpdateBuildTest implements IBuildTest {
	public constructor(private readonly orm:IOrm, private readonly options:QueryOptions){}
	private tests():string[] {
		return [
			'Categories.update()',
			'Categories.update(entity)',
			'Categories.update(p => entity)',
			'Categories.update(p => p)',
			'Categories.update(p => { name: entity.name })',
			'Categories.update(p => { name: upper(p.name) })',
			'Categories.update(p => { name: concat("_" + p.name) })',
			'Categories.update(() => [name] )',
			'Categories.update({ name: entity.name })',
			'Categories.update([name, description])',
			'Categories.update(p=>[name, description])',
			'Categories.update(p=>{name:name,description:description})',
			'Categories.update(p=>{name:upper(p.name),description:description})',
			'Categories.updateAll(p => { name: upper(p.name) })',
			'Categories.updateAll(p => { name: concat("_",p.name) })',
			'Categories.updateAll(() => [name])',
			'Orders.update({ name: entity.name }).filter(p => p.id === entity.id)',
			'Orders.update({ name: entity.name }).include(p => p.details.update(p => p)).filter(p => p.id === entity.id)',
			'Orders.update({ name: entity.name }).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id)',
			'Orders.update(p => ({ name: entity.name })).filter(p => p.id === entity.id)',
			'Orders.update(() => ({ name: entity.name })).include(p => p.details).filter(p => p.id === entity.id)',
			'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => p)).filter(p => p.id === entity.id)',
			'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id)',
			'Orders.update().include(p => p.details)',
			'Customers.update().include(p => p.orders.include(p => p.details))'		
		]
	}
	public build(): TestSuiteRequest {
		return {
			name: 'update',
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
