import fs from 'fs'
import path from 'path'
import { orm } from '../../lib'
import { h3lp } from 'h3lp'
import { OperatorMetadata } from '3xpr'

async function writeFunctions (category:string, list: any): Promise<void> {
	const lines: string[] = []
	// lines.push(`# ${category} functions\n`)

	lines.push('|Function    |Description                                   |')
	lines.push('|------------|----------------------------------------------|')
	for (const p in list) {
		const item = list[p]
		lines.push(`|${item.name}|${item.description}|`)
	}
	lines.push('')

	lines.push('## Definition\n')
	for (const p in list) {
		const item = list[p]
		lines.push(`### ${item.name}\n`)
		lines.push(`- description: ${item.description}`)
		lines.push(`- deterministic: ${item.deterministic}`)
		lines.push(`- return: ${item.return}`)
		lines.push('- params:')
		for (const q in item.params) {
			const param = item.params[q]
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

async function writeOperators (category:string, list: any): Promise<void> {
	const lines: string[] = []
	// lines.push(`# ${category} operators\n`)

	lines.push('|Operator    |Description                                   |')
	lines.push('|------------|----------------------------------------------|')
	for (const p in list) {
		const item = list[p]
		lines.push(`|${item.operator}|${item.name}|`)
	}
	lines.push('')

	lines.push('## Definition\n')
	for (const p in list) {
		const item = list[p]
		lines.push(`### Operator ${item.operator}\n`)
		lines.push(`- description: ${item.name}`)
		lines.push(`- return: ${item.return}`)
		lines.push('- params:')
		for (const q in item.params) {
			const param = item.params[q]
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
	const functions:OperatorMetadata[] = []
	for (const duple of orm.expressions.functions) {
		const metadata = duple[1]
		functions.push(metadata)
	}
	await writeFunctions('functions', functions)

	const operators:OperatorMetadata[] = []
	for (const duple of orm.expressions.operators) {
		const metadata = duple[1]
		operators.push(metadata)
	}
	await writeOperators('operators', operators)
	callback()
}
apply(function () { console.log('end') })
