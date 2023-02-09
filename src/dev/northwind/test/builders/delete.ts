/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../general/UnitBuildTest'

export class DeleteBuildTest extends UnitBuildTest {	
	protected override get name() { return "delete" }
	protected override tests():string[] {
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
}
