/* eslint-disable no-template-curly-in-string */
import { h3lp } from 'h3lp'
import path from 'path'

const unitTemplate = {
	header:
`/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './countries.env' })
	await orm.init('./countries.yaml')
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
		// {builded
		// name: 'metadata',
		// template: '\t\texpect(orm.metadata(${test})).toStrictEqual(${result})\n'
		// },
		{
			name: 'getInfo',
			template: '\t\texpect(orm.getInfo(${test},{ stage: \'stage1\' })).toStrictEqual(${result})\n'
		}
	]
}

;(async () => {
	const root = './src/dev/countries/test/suites/unittest'
	await h3lp.test
		.createBuilder()
		.add({ source: path.join(root, 'bitwise.json'), template: unitTemplate })
		.add({ source: path.join(root, 'comparison.json'), template: unitTemplate })
		.add({ source: path.join(root, 'dateTime.json'), template: unitTemplate })
		.add({ source: path.join(root, 'group.json'), template: unitTemplate })
		.add({ source: path.join(root, 'logical.json'), template: unitTemplate })
		.add({ source: path.join(root, 'nullable.json'), template: unitTemplate })
		.add({ source: path.join(root, 'numeric.json'), template: unitTemplate })
		.add({ source: path.join(root, 'sort.json'), template: unitTemplate })
		.add({ source: path.join(root, 'string.json'), template: unitTemplate })
		.build('./src/lib/test/countries/__tests__')
})()
