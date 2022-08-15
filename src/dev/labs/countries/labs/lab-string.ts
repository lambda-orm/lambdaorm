/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable comma-style */
/* eslint-disable no-template-curly-in-string */
import { show } from './util'

(async () => {
	const context = { firstName: 'Juan'
									, lastName: 'Lopez'
									, email: 'jlopez@email.com'
									, age: 44
									, food: 'pizza'
									, film: 'Estación central'
									, data: '{"b":1}'
									, coordinate: { lat: 48.87, long: 2.29 }
									, a: null
									, b: ''
									, c: ' '
									}
	const list = [
		'capitalize(food)',
		'chr(68)',
		'concat(lastName,", ",firstName)',
		'initcap(film)',
		'lower(film)',
		'lpad(firstName,10,"_")',
		'ltrim("  a  ")',
		'replace(film,"a","*")',
		// 'match("¡Hello world!","He.*o")'
		'mask(email)',
		'parse(data).b',
		'rpad(firstName,10,"_")',
		'rtrim("  a  ")',
		'substr(film,1,3)',
		'substring(film,1,3)',
		'upper(film)',
		'strCount(film,"a")',
		'stringify(coordinate)',
		'toString(age)',
		'`${firstName} is ${age} years old and likes ${food}`',
		'test("5","[a-zA-Z0-9_.]+$")',
		'test("%","[a-zA-Z0-9_.]+$")',
		'isEmpty(a)',
		'isEmpty(b)',
		'isEmpty(c)',
		'isEmpty(food)',
		'$HOME',
		'${USER}',
		'concat($HOME,$USER)',
		'concat(${HOME},$USER)',
		'`value of home: $HOME`'
	]
	show(list, context)
})()
