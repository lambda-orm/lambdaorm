/* eslint-disable no-template-curly-in-string */
import { UnitBuildTest } from '../../../general/UnitBuildTest'

export class NumericBuildTest extends UnitBuildTest {
 protected override get name() { return "numeric" }
 protected override tests():string[] {
		return [
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 3+2-1 })',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 3*4-1})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1-2-5})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: (2+3)*2})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 2*(3+2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: (1+(2**3)*4)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2**(3*4)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: abs(-9)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: acos(0.434)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: asin(0.434)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: atan(2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: atan2(90, 15)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ceil(2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: cos(2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: cosh(2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: exp(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: floor(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ln(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: log(7,10)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: log10(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: remainder(7,2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: round(7.984938,2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sign(-7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sin(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: sinh(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: tan(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: tanh(7)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: trunc(7.984938,2)})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: toNumber("3.141516")})'
		]
	}
}
