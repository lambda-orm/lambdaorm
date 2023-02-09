/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../general/UnitBuildTest'

export class InsertBuildTest extends UnitBuildTest {
	protected override get name() { return "insert" }
	protected override tests():string[] {
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
}
