import { show } from './util'

(async () => {
	const context = {}
	const list = [
		'Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})',		
		'Countries.map(p=> {region:p.region,countries:count(1)})',
		'Countries.map(p=> {region:p.region,max:max(p.latitude)})',
		'Countries.map(p=> {region:p.region,min:min(p.latitude)})',
		'Countries.map(p=> {region:p.region,avg:avg(p.latitude)})'
		// 'Countries.map(p=> {region:p.region,first:first(p.iso3)})',
		// 'Countries.map(p=> {region:p.region,last:last(p.iso3)})'
	]
	show(list, context)
})()
