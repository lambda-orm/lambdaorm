import { show } from './util'

(async () => {
	const context = {}
	const list = [			
		'Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)',
		'Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))',
		'Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))'
	]
	show(list, context)
})()
