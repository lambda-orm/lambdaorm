import { show } from './util'

(async () => {
	const context = { a: 1, b: null, c: '', e: 'hello' }
	const list = [
		'nvl(a,2)',
		'nvl(b,2)',
		'nvl2(b,"is not null","is null")',
		'nvl2(c,"is not null","is null")',
		'nvl2(d,"is not null","is null")',
		'isNull(b)',
		'isNull(c)',
		'isNotNull(b)',
		'isNotNull(c)'
	]
	show(list, context)
})()
