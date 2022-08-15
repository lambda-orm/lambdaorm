/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable comma-style */
/* eslint-disable no-template-curly-in-string */
import { show } from './util'

(async () => {
	const context = { }
	const list = [
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: lower(p.subregion) })',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: upper(p.subregion) })',
		// 'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: capitalize(lower(p.subregion)) })',
		// 'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: initcap(lower(p.subregion)) })',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: concat(p.region," ",p.subregion) })',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: lpad(p.region,12,"_") })',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: rpad(p.region,12,"_") })',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: chr(68)})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: ltrim("  a  ")})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: rtrim("  a  ")})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: replace(p.region,"a","*")})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: mask(p.subregion)})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: substr(p.subregion,1,3)})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: substring(p.subregion,1,3)})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: strCount(p.subregion,"a")})',
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: toString(p.latitude)})'
		// 'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: isEmpty(p.region)})',
		// 'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: stringify(p)})',
		// 'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: parse("{a:1,b:""x""}")})'	
	]
	show(list, context)
})()
