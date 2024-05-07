import fs from 'fs'
import path from 'path'
import { orm } from '../../lib'
import { h3lp } from 'h3lp'
import { OperatorMetadata } from '3xpr'

async function writeFunctions (category:string, list: [string, OperatorMetadata][]): Promise<void> {
	const lines: string[] = []
	// lines.push(`# ${category} functions\n`)

	lines.push('|Function    |Description                                   |')
	lines.push('|------------|----------------------------------------------|')
	for (const item of list) {
		lines.push(`|${item[0]}|${item[1].doc?.description}|`)
	}
	lines.push('')

	lines.push('## Definition\n')
	for (const item of list) {
		const metadata = item[1]
		lines.push(`### ${item[0]}\n`)
		lines.push(`- description: ${metadata.doc?.description}`)
		lines.push(`- deterministic: ${metadata.deterministic}`)
		lines.push(`- return: ${metadata.returnType}`)
		lines.push('- params:')
		for (const param of metadata.params) {
			lines.push(`\t- ${param.name}: ${param.type}`)
		}
		lines.push('')
	}

	const content = lines.join('\n')
	const targetFolder = 'doc/wiki'
	if (!await h3lp.fs.exists(targetFolder)) {
		fs.mkdirSync(targetFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(targetFolder, 'function_' + category.replace(' ', '_') + '.md'), content)
}

async function writeOperators (category:string, list: [string, OperatorMetadata][]): Promise<void> {
	const lines: string[] = []
	// lines.push(`# ${category} operators\n`)

	lines.push('|Operator    |Description                                   |')
	lines.push('|------------|----------------------------------------------|')
	for (const item of list) {
		lines.push(`|${item[0]}|${item[1].doc?.description}|`)
	}
	lines.push('')

	lines.push('## Definition\n')
	for (const item of list) {
		const metadata = item[1]
		lines.push(`### Operator ${item[0]}\n`)
		lines.push(`- description: ${metadata.doc?.description}`)
		lines.push(`- return: ${metadata.returnType}`)
		lines.push('- params:')
		for (const param of metadata.params) {
			lines.push(`\t- ${param.name}: ${param.type}`)
		}
		lines.push('')
	}

	const content = lines.join('\n')
	const targetFolder = 'doc/wiki'
	if (!await h3lp.fs.exists(targetFolder)) {
		fs.mkdirSync(targetFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(targetFolder, 'operator_' + category.replace(' ', '_') + '.md'), content)
}

export async function apply (callback: any) {
	await writeFunctions('functions', orm.exp.functions)
	await writeOperators('operators', orm.exp.operators)
	callback()
}
apply(function () { console.log('end') })
