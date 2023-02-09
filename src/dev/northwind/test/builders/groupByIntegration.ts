import { IntegrationBuildTest } from '../../../general/integrationBuildTest'
import { TestSuiteRequest} from 'h3lp'

export class GroupByIntegrationBuildTest extends IntegrationBuildTest {

	protected override tests():string[] {
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
	public override build(): TestSuiteRequest {
		return {
			name: 'groupBy',
			context: { id: 1  },
			cases: this.cases()
		}	
	}
}
