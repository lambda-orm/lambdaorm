import fs from 'fs'
import path from 'path'
import { Helper } from '../../lib/manager/helper'
import { orm } from '../../lib'

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
	if (!await Helper.existsPath(targetFolder)) {
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
	if (!await Helper.existsPath(targetFolder)) {
		fs.mkdirSync(targetFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(targetFolder, 'operator_' + category.replace(' ', '_') + '.md'), content)
}

export async function apply (callback: any) {
	const funcCategories:any = {}
	for (const p in orm.expressions.config.functions) {
		const item = orm.expressions.config.functions[p]
		const category = item.category !== undefined ? item.category : item.lib !== undefined ? item.lib : 'general'
		if (funcCategories[category] === undefined) {
			funcCategories[category] = { list: [] }
		}
		funcCategories[category].list.push(item)
	}

	for (const p in funcCategories) {
		const category = funcCategories[p]
		await writeFunctions(p, category.list)
	}

	const operCategories:any = {}
	for (const p in orm.expressions.config.operators) {
		const item = orm.expressions.config.operators[p]
		const category = item.category !== undefined ? item.category : item.lib !== undefined ? item.lib : 'general'
		if (operCategories[category] === undefined) {
			operCategories[category] = { list: [] }
		}
		operCategories[category].list.push(item)
	}

	for (const p in operCategories) {
		const category = operCategories[p]
		await writeOperators(p, category.list)
	}
	callback()
}
apply(function () { console.log('end') })
