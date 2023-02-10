/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../task/UnitBuildTest'

export class BitwiseBuildTest extends UnitBuildTest {
 protected override get name() { return "bitwise" }
 protected override tests():string[] {
		return [
			'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })',
			'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })',
			'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })',
			'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })',
			'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })',
			'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })'
		]
	}
}
