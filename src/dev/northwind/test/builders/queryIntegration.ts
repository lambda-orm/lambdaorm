import { IntegrationBuildTest } from '../../../general/integrationBuildTest'
import { TestSuiteRequest } from 'h3lp'

export class QueryIntegrationBuildTest extends IntegrationBuildTest {

protected override tests():string[] {
		return [
			'Products.sort(p => p.name)',
			'Products.map(p => p).sort(p => p.id).page(1, 1)',
			'Products.sort(p => p.id).page(1, 1)',
			'Products.filter(p => p.id === id).map(p => p).sort(p => p.id)',
			'Products.filter(p => p.id === id).sort(p => p.id) ',
			'Products.map(p => ({ category: p.category.name })).sort(p => p.category)',
			'Products.map(p => ({ name: p.name, category: p.category.name })).sort(p => [p.category, p.name])',
			'Products.map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => p.name)',
			'Products.filter(p => p.discontinued !== false).map(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock })).sort(p => [p.category, desc(p.name)])',
			'Orders.details.filter(p => between(p.order.shippedDate, fromDate, toDate) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity }))',
			'Orders.details.filter(p => between(p.order.shippedDate, fromDate, toDate) && p.unitPrice > minValue).map(p => ({ category: p.product.category.name, product: p.product.name, unitPrice: p.unitPrice, quantity: p.quantity })).sort(p => [p.category, p.product, p.unitPrice, p.quantity]) ',
			'Products.first(p => p)',
			'Products.last(p => p)',
			'Products.first(p => ({ category: p.category.name, name: p.name, quantity: p.quantity, inStock: p.inStock }))',
			'Products.filter(p => p.discontinued !== false).last(p => p.id)',
			'Products.distinct(p => p).sort(p => p.id)',
			'Products.distinct(p => ({ category: p.category.name })).sort(p => p.category)',
			'Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => [p.quantity, p.category])'		
		]
	}
	public override build(): TestSuiteRequest {
		return {
			name: 'query',
			context: { id: 1 , minValue: 10, fromDate: '1997-01-01', toDate: '1997-12-31' },
			cases: this.cases()
		}	
	}
}
