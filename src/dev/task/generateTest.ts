import { orm, Helper } from '../../orm'
import { CategoryTest, ExpressionTest } from './testModel'
import fs from 'fs'
import path from 'path'
const ConfigExtends = require('config-extends')

async function writeUnitTest (dialects: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []
	lines.push('import { orm,Helper } from \'../../orm\'')
	lines.push('beforeAll(async () => {')
	lines.push('\trequire(\'dotenv\').config({ path: \'./src/test/test.env\' })')
	lines.push('\tawait orm.init(\'./src/test/config.yaml\')')
	lines.push('})')

	lines.push('describe(\'Complete Expression\', () => {')
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', () => {`)
			lines.push(`\t\tconst source = '${expTest.expression.trim()}'`)
			lines.push(`\t\tconst expected = '${expTest.completeExpression.trim()}'`)
			lines.push(`\t\tconst target = orm.expression(source).complete('${category.schema}')`)
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
		lines.push(`\t\tconst model = await orm.expression(expression).model('${category.schema}')`)
		lines.push(`\t\tconst serialize = await orm.expression(expression).serialize('${category.schema}')`)
		lines.push('\t\texpect(modelExpected).toStrictEqual(model)')
		lines.push('\t\texpect(fieldsExpected).toStrictEqual(serialize.f)')
		// lines.push(`\t\texpect(parametersExpected).toStrictEqual(serialize.p)`)
		lines.push('\t})')
	}
	lines.push('})')

	lines.push('describe(\'Sentences\', () => {')
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', async () => {`)
			lines.push(`\t\tconst expression = '${expTest.expression}'`)
			for (const r in dialects) {
				const dialect = dialects[r]
				if (expTest.sentences !== undefined) {
					let sentence = expTest.sentences.find(p => p.dialect === dialect && p.error === undefined)?.sentence
					sentence = Helper.replace(sentence, '\n', '; ')
					if (sentence) {
						lines.push(`\t\tconst ${dialect}Expected = '${sentence}'`)
						lines.push(`\t\tlet ${dialect} =  await orm.expression(expression).sentence('${dialect}', '${category.schema}')`)
						lines.push(`\t\t${dialect}=Helper.replace(${dialect},'\\n','; ')`)
						lines.push(`\t\texpect(${dialect}Expected).toBe(${dialect})`)
					}
				}
			}
			lines.push('\t})')
		}
	}
	lines.push('})')

	const content = lines.join('\n')
	const testFolder = 'src/test/__tests__'
	if (!fs.existsSync(testFolder)) {
		fs.mkdirSync(testFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(testFolder, category.name.replace(' ', '_') + '.test.ts'), content)
}
async function writeIntegrationTest (databases: string[], category: CategoryTest): Promise<void> {
	const lines: string[] = []

	lines.push('import { orm } from \'../../orm\'')
	lines.push('beforeAll(async () => {')
	lines.push('\trequire(\'dotenv\').config({ path: \'./src/test/test.env\' })')
	lines.push('\tawait orm.init(\'./src/test/config.yaml\')')
	lines.push('})')

	lines.push('describe(\'Execute\', () => {')
	lines.push(`\tconst context = ${JSON.stringify(category.context)}`)
	for (const p in category.test) {
		const expTest = category.test[p] as ExpressionTest
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', async () => {`)
			lines.push(`\t\tconst expression = '${expTest.expression}'`)
			lines.push(`\t\tconst expected = ${JSON.stringify(expTest.result)}`)
			for (const p in databases) {
				const database = databases[p]
				lines.push(`\t\tconst ${database}Result =  await orm.expression(expression).execute(context, '${database}')`)
				lines.push(`\t\texpect(expected).toBe(${database}Result)`)
			}
			lines.push('\t})')
		}
	}
	lines.push('})')

	const content = lines.join('\n')
	const testFolder = 'src/test/__integration__'
	if (!fs.existsSync(testFolder)) {
		fs.mkdirSync(testFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(testFolder, category.name.replace(' ', '_') + '.test.ts'), content)
}

export async function apply (dataForTestPath: string, databases: string[], callback: any) {
	const dialects = Object.values(orm.language.dialects).filter((p: any) => p.language === 'sql').map((p: any) => p.name)
	const testData = await ConfigExtends.apply(dataForTestPath)
	for (const k in testData) {
		await writeUnitTest(dialects, testData[k])
		await writeIntegrationTest(databases, testData[k])
	}
	console.log(testData)
	callback()
}

// apply(path.join(process.cwd(),'src/dev/task/dataForTest'),['mysql', 'postgres'],function () { console.log('end')})
