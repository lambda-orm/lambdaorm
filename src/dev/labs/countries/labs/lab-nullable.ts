import { show } from './util'

(async () => {
	const context = {}
	const list = [
		'States.filter(p=> isNull(p.latitude)).map(p=> count(1))',
		'States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))',
		'States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))',
		'Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})',
		'Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})'
	]
	show(list, context)
})()
