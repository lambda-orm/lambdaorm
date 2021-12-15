import { Helper } from './../../orm'

import { CategoryTest, ExpressionTest } from './testModel'
import fs from 'fs'
import path from 'path'
const ConfigExtends = require('config-extends')

async function writeUnitTest (dataSources: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []
	lines.push('import { orm,Helper } from \'../../orm\'')
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
			for (const r in dataSources) {
				const dataSource = dataSources[r]
				if (expTest.sentences !== undefined) {
					const sentence = expTest.sentences.find(p => p.dataSource === dataSource && p.error === undefined)
					if (sentence !== undefined && sentence.sentence !== undefined) {
						const _sentence = Helper.replace(sentence.sentence, '\n', '; ')
						lines.push(`\t\tconst ${dataSource}Expected = '${_sentence}'`)
						lines.push(`\t\tlet ${dataSource} =  await orm.sentence(expression,'${dataSource}')`)
						lines.push(`\t\t${dataSource}=Helper.replace(${dataSource},'\\n','; ')`)
						lines.push(`\t\texpect(${dataSource}Expected).toBe(${dataSource})`)
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
async function writeIntegrationTest (dataSources: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []

	lines.push('import { orm } from \'../../orm\'')
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
			for (const p in dataSources) {
				const dataSource = dataSources[p]
				lines.push(`\t\tconst ${dataSource}Result =  await orm.execute(expression, data,context,'${dataSource}')`)
				lines.push(`\t\texpect(expected).toEqual(${dataSource}Result)`)
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

export async function apply (dataForTestPath: string, dataSources: string[], callback: any) {
	const testData = await ConfigExtends.apply(dataForTestPath)
	for (const k in testData) {
		await writeUnitTest(dataSources, testData[k])
		await writeIntegrationTest(dataSources, testData[k])
	}
	callback()
}
apply(path.join(process.cwd(), 'src/test/dataForTest'), ['mysql', 'postgres', 'mariadb', 'mssql'], function () { console.log('end') })
