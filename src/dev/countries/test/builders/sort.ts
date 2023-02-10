/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../task/UnitBuildTest'

export class SortBuildTest extends UnitBuildTest {
 protected override get name() { return "sort" }
 protected override tests():string[] {
		return [
			'Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)',
			'Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))',
			'Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))'
		]
	}
}
