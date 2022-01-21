import { Helper } from '../../lib'

import { CategoryTest, ExpressionTest } from './testModel'
import fs from 'fs'
import path from 'path'
const ConfigExtends = require('config-extends')

async function writeUnitTest (stages: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []
	lines.push('import { orm,Helper } from \'../../lib\'')
	lines.push('beforeAll(async () => {')
	lines.push('\trequire(\'dotenv\').config({ path: \'./test.env\' })')
	lines.push('\tawait orm.init()')
	lines.push('})')

	lines.push('describe(\'Complete Expression\', () => {')
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', () => {`)
			lines.push(`\t\tconst source = '${expTest.expression.trim()}'`)
			lines.push(`\t\tconst expected = '${expTest.completeExpression.trim()}'`)
			lines.push('\t\tconst target = orm.complete(source)')
			lines.push('\t\texpect(expected).toBe(target)')
			lines.push('\t})')
		}
	}
	lines.push('})')

	lines.push('describe(\'Metadata\', () => {')
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		lines.push(`\ttest('${expTest.name}', async () => {`)
		lines.push(`\t\tconst expression = '${expTest.expression}'`)
		lines.push(`\t\tconst modelExpected :any= ${JSON.stringify(expTest.model)}`)
		lines.push(`\t\tconst parametersExpected:any = ${JSON.stringify(expTest.parameters)}`)
		lines.push(`\t\tconst fieldsExpected :any= ${JSON.stringify(expTest.fields)}`)
		lines.push('\t\tconst model = await orm.model(expression)')
		lines.push('\t\tconst metadata = await orm.metadata(expression)')
		lines.push('\t\texpect(modelExpected).toStrictEqual(model)')
		lines.push('\t\texpect(fieldsExpected).toStrictEqual(metadata.f)')
		// lines.push(`\t\texpect(parametersExpected).toStrictEqual(metadata.p)`)
		lines.push('\t})')
	}
	lines.push('})')

	lines.push('describe(\'Sentences\', () => {')
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', async () => {`)
			lines.push(`\t\tconst expression = '${expTest.expression}'`)
			for (const r in stages) {
				const stage = stages[r]
				if (expTest.sentences !== undefined) {
					const sentence = expTest.sentences.find(p => p.stage === stage && p.error === undefined)
					if (sentence !== undefined && sentence.sentence !== undefined) {
						const _sentence = Helper.replace(sentence.sentence, '\n', '; ')
						lines.push(`\t\tconst ${stage}Expected = '${_sentence}'`)
						lines.push(`\t\tlet ${stage} =  await orm.sentence(expression,'${stage}')`)
						lines.push(`\t\t${stage}=Helper.replace(${stage},'\\n','; ')`)
						lines.push(`\t\texpect(${stage}Expected).toBe(${stage})`)
					}
				}
			}
			lines.push('\t})')
		}
	}
	lines.push('})')

	const content = lines.join('\n')
	const testFolder = 'src/test/__tests__'
	if (!await Helper.existsPath(testFolder)) {
		fs.mkdirSync(testFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(testFolder, category.name.replace(' ', '_') + '.test.ts'), content)
}
async function writeIntegrationTest (stages: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []

	lines.push('import { orm } from \'../../lib\'')
	lines.push('beforeAll(async () => {')
	lines.push('\trequire(\'dotenv\').config({ path: \'./test.env\' })')
	lines.push('\tawait orm.init()')
	lines.push('})')

	lines.push('describe(\'Execute\', () => {')
	lines.push(`\tconst data = ${JSON.stringify(category.data)}`)
	lines.push(`\tconst context = ${category.context !== undefined ? JSON.stringify(category.context) : '{}'}`)
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', async () => {`)
			lines.push(`\t\tconst expression = '${expTest.expression}'`)
			lines.push(`\t\tconst expected = ${JSON.stringify(expTest.result)}`)
			for (const p in stages) {
				const stage = stages[p]
				lines.push(`\t\tconst ${stage}Result =  await orm.execute(expression, data,context,'${stage}')`)
				lines.push(`\t\texpect(expected).toEqual(${stage}Result)`)
			}
			lines.push('\t})')
		}
	}
	lines.push('})')

	const content = lines.join('\n')
	const testFolder = 'src/test/__integration__'
	if (!await Helper.existsPath(testFolder)) {
		fs.mkdirSync(testFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(testFolder, category.name.replace(' ', '_') + '.test.ts'), content)
}

export async function apply (dataForTestPath: string, stages: string[], callback: any) {
	const testData = await ConfigExtends.apply(dataForTestPath)
	for (const k in testData) {
		await writeUnitTest(stages, testData[k])
		await writeIntegrationTest(stages, testData[k])
	}
	callback()
}
apply(path.join(process.cwd(), 'src/dev/dataForTest'), ['mysql', 'postgres', 'mariadb', 'mssql'], function () { console.log('end') })
