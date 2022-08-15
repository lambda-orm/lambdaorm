import { show } from './util'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car', devices: ['phone', 'computer', 'robot'], pi: 3.141516 }
	const list = [
		'Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)',
		'Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)',
		'Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)',
		'Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)'
	]
	show(list, context)
})()
