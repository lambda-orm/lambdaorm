import { show } from './util'

(async () => {
	const context = {}
	const list = [
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)',
		'Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)',
		'Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)',
		'Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)',
		'Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)'
	]
	show(list, context)
})()
