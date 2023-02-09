/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../general/UnitBuildTest'

export class LogicalBuildTest extends UnitBuildTest {
 protected override get name() { return "logical" }
 protected override tests():string[] {
		return [
			'Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})',
			'Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})',
			'Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})'
		]
	}
}
