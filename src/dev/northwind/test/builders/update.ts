/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../task/UnitBuildTest'

export class UpdateBuildTest extends UnitBuildTest {
	protected override get name() { return "update" }
	protected override tests():string[] {
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
}
