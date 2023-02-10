/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../task/UnitBuildTest'

export class IncludeBuildTest extends UnitBuildTest {
	protected override get name() { return "include" }
	protected override tests():string[] {
		return [
			'Orders.filter(p => p.id === id).include(p => p.customer)',
			'Orders.filter(p => p.id === id).include(p => p.details)',
			'Orders.filter(p => p.id === id).include(p => [p.details, p.customer])',
			'Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product), p.customer]) ',
			'Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product.include(p => p.category)), p.customer]) ',
			'Orders.filter(p => p.id === id).include(p => [p.details.map(p => ({ quantity: p.quantity, unitPrice: p.unitPrice, productId: p.productId })), p.customer])',
			'Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product).map(p => ({ quantity: p.quantity, unitPrice: p.unitPrice, productId: p.productId })), p.customer])',
			'Orders.filter(p => p.id === id).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])])'
		]
	}
}
