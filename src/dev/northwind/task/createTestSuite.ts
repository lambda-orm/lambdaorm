/* eslint-disable no-template-curly-in-string */
import { h3lp } from 'h3lp'
import path from 'path'

const unitTemplate = {
	header:
`/* eslint-disable no-template-curly-in-string */
import { orm } from '../../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/northwind.env' })
	await orm.init('./config/northwind.yaml')
})
`,
	cases: [
		{
			name: 'normalize',
			template: '\t\texpect(orm.normalize(${test})).toStrictEqual(${result})\n'
		},
		{
			name: 'model',
			template: '\t\texpect(orm.model(${test})).toStrictEqual(${result})\n'
		},
		{
			name: 'parameters',
			template: '\t\texpect(orm.parameters(${test})).toStrictEqual(${result})\n'
		},
		{
			name: 'constraints',
			template: '\t\texpect(orm.constraints(${test})).toStrictEqual(${result})\n'
		},
		// {
		// name: 'metadata',
		// template: '\t\texpect(orm.metadata(${test})).toStrictEqual(${result})\n'
		// },
		{
			name: 'getInfo',
			template: '\t\texpect(orm.plan(${test},{ stage: \'MySQL\' })).toStrictEqual(${result})\n'
		}
	]
}

export async function apply (callback: any) {
	const root = './src/dev/northwind/test/suites/unittest'
	await h3lp.test
		.createBuilder()
		.add({ source: path.join(root, 'delete.json'), template: unitTemplate })
		.add({ source: path.join(root, 'groupBy.json'), template: unitTemplate })
		.add({ source: path.join(root, 'include.json'), template: unitTemplate })
		.add({ source: path.join(root, 'insert.json'), template: unitTemplate })
		.add({ source: path.join(root, 'numeric.json'), template: unitTemplate })
		.add({ source: path.join(root, 'query.json'), template: unitTemplate })
		.add({ source: path.join(root, 'update.json'), template: unitTemplate })
		.build('./src/lib/test/northwind/__tests__/suite')
	callback()
}
// apply(function () { console.log('end') })
