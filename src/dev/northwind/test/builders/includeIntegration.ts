import { IntegrationBuildTest } from '../../../task/integrationBuildTest'
import { TestSuiteRequest} from 'h3lp'

export class IncludeIntegrationBuildTest extends IntegrationBuildTest {

	protected override tests():string[] {
		return [
			'Orders.filter(p => p.id === id).include(p => p.customer)',
			'Orders.filter(p => p.id === id).include(p => p.details)',
			'Orders.filter(p => p.id === id).include(p => [p.details, p.customer])',
			'Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product), p.customer]) ',
			'Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product.include(p => p.category)), p.customer]) ',
			'Orders.filter(p => p.id === id).include(p => [p.details.map(p => ({ quantity: p.quantity, unitPrice: p.unitPrice, productId: p.productId })), p.customer])',
			'Orders.filter(p => p.id === id).include(p => [p.details.include(q => q.product).map(p => ({ quantity: p.quantity, unitPrice: p.unitPrice, productId: p.productId })), p.customer])',
			'Orders.filter(p => p.id === id).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])])',
			'Orders.filter(p => p.id === id).include(p=> p.details.map(p=> [p,p.product,p.product.category])).map(p=> [p,p.customer])',
			'Orders.filter(p => p.id === id).include(p=> p.details.map(p=> [p,p.product,p.product.category]))',
			'Orders.filter(p => p.id === id).include(p=> p.details.map(p=> [p,p.product]))' 
		]
	}
	public override build(): TestSuiteRequest {
		return {
			name: 'include',
			context: { id: 1  },
			cases: this.cases()
		}	
	}
}
