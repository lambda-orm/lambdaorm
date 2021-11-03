import { Helper } from './../../orm'

import { CategoryTest, ExpressionTest } from './testModel'
import fs from 'fs'
import path from 'path'
const ConfigExtends = require('config-extends')

async function writeUnitTest (databases: string[], category: CategoryTest): Promise<void> {
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
			lines.push(`\t\tconst target = orm.expression(source).complete('${category.database}')`)
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
		lines.push(`\t\tconst model = await orm.expression(expression).model('${category.database}')`)
		lines.push(`\t\tconst metadata = await orm.expression(expression).metadata('${category.database}')`)
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
			for (const r in databases) {
				const database = databases[r]
				if (expTest.sentences !== undefined) {
					let sentence = expTest.sentences.find(p => p.database === database && p.error === undefined)?.sentence
					sentence = Helper.replace(sentence, '\n', '; ')
					if (sentence) {
						lines.push(`\t\tconst ${database}Expected = '${sentence}'`)
						lines.push(`\t\tlet ${database} =  await orm.expression(expression).sentence('${database}')`)
						lines.push(`\t\t${database}=Helper.replace(${database},'\\n','; ')`)
						lines.push(`\t\texpect(${database}Expected).toBe(${database})`)
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
async function writeIntegrationTest (databases: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []

	lines.push('import { orm } from \'../../orm\'')
	lines.push('beforeAll(async () => {')
	lines.push('\trequire(\'dotenv\').config({ path: \'./test.env\' })')
	lines.push('\tawait orm.init()')
	lines.push('})')

	lines.push('describe(\'Execute\', () => {')
	lines.push(`\tconst dataContext = ${JSON.stringify(category.dataContext)}`)
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', async () => {`)
			lines.push(`\t\tconst expression = '${expTest.expression}'`)
			lines.push(`\t\tconst expected = ${JSON.stringify(expTest.result)}`)
			for (const p in databases) {
				const database = databases[p]
				lines.push(`\t\tconst ${database}Result =  await orm.expression(expression).execute(dataContext,'${database}')`)
				lines.push(`\t\texpect(expected).toEqual(${database}Result)`)
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

export async function apply (dataForTestPath: string, databases: string[], callback: any) {
	const testData = await ConfigExtends.apply(dataForTestPath)
	for (const k in testData) {
		await writeUnitTest(databases, testData[k])
		await writeIntegrationTest(databases, testData[k])
	}
	callback()
}
apply(path.join(process.cwd(), 'src/test/dataForTest'), ['mysql', 'postgres', 'mariadb', 'mssql'], function () { console.log('end') })
