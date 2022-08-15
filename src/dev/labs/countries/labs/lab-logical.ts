import { show } from './util'

(async () => {
	const context = {}
	const list = [
		'Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})',
		'Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})',
		'Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})'
	]
	show(list, context)
})()
