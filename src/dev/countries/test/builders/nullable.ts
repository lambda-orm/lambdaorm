/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../task/UnitBuildTest'

export class NullableBuildTest extends UnitBuildTest {
 protected override get name() { return "nullable" }
 protected override tests():string[] {
		return [
			'States.filter(p=> isNull(p.latitude)).map(p=> count(1))',
			'States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))',
			'States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))',
			'Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})',
			'Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})'
		]
	}
}
