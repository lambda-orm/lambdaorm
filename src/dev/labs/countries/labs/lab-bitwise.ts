import { show } from './util'

(async () => {
	const context = { }
	const list = [
		'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })',
		'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })',
		'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })',
		'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })',
		'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })',
		'Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })'
	]
	await show(list, context)
})()
