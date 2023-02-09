/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../general/UnitBuildTest'

export class ComparisonBuildTest extends UnitBuildTest {
 protected override get name() { return "comparison" }
 protected override tests():string[] {
		return [
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)',
			'Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)',
			'Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)',
			'Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)',
			'Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)'
		]
	}
}
