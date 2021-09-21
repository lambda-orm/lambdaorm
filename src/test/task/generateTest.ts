import { orm } from '../../orm'
import { CategoryTest, ExpressionTest, ExecutionResult } from './testModel'
const ConfigExtends = require('config-extends')

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')


async function writeTest(dialects: string[], databases: string[], category: CategoryTest): Promise<void> {
  
	const lines: string[] = []
	
  lines.push(`import { orm } from '../../orm'`) 
	lines.push(`beforeAll(async () => {`)
	lines.push(`\trequire('dotenv').config({ path: './src/test/test.env' })`)
	lines.push(`\tawait orm.init('./src/test/config.yaml')`)
	lines.push(`})`)

	lines.push(`describe('Complete Expression', () => {`)
	for (const p in category.test) {
		let expTest = category.test[p] as ExpressionTest     
		if (expTest.expression && expTest.completeExpression) {
			lines.push(`\ttest('${expTest.name}', () => {`)
			lines.push(`\t\tconst source = '${expTest.expression.trim()}'`)
			lines.push(`\t\tconst expected = '${expTest.completeExpression.trim()}'`)
			lines.push(`\t\tconst target = orm.expression(source).complete('${category.schema}')`)
			lines.push(`\t\texpect(expected).toBe(target);`)
			lines.push(`\t})`)
		}
	}
	lines.push(`})`)

	const content = lines.join('\n') 
	fs.writeFileSync(path.join('src/test/__jest__', category.name.replace(' ', '_') + '.test.ts'), content)
}


export async function apply(dataForTestPath:string,callback: any) {

	let databases: string[] = ['mysql', 'postgres']
  let dialects = Object.values(orm.language.dialects).filter((p: any) => p.language == 'sql').map((p: any) => p.name)// ['mysql','postgres','mssql','oracle']
	const testData = await ConfigExtends.apply(dataForTestPath)
	for (const k in testData) {
		await writeTest(dialects,databases,testData[k])
	}
	console.log(testData) 
  callback()
}

apply(path.join(process.cwd(),'src/test/dataForTest'),function () { console.log('end')})