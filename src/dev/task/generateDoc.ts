import fs from 'fs'
import path from 'path'
const ConfigExtends = require('config-extends')

async function writeFunctions (category:string, list: any): Promise<void> {
	const lines: string[] = []
	lines.push(`# ${category} functions\n`)

	lines.push('|Function    |Description                                   |')
	lines.push('|------------|----------------------------------------------|')
	for (const p in list) {
		const item = list[p]
		lines.push(`|${item.name}|${item.desc}|`)
	}
	lines.push('')

	lines.push('## Definition\n')
	for (const p in list) {
		const item = list[p]
		lines.push(`### ${item.name}\n`)
		lines.push(`- description: ${item.desc}`)
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
	const targetFolder = '.github/wiki'
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(targetFolder, 'function_' + category.replace(' ', '_') + '.md'), content)
}

async function writeOperators (category:string, list: any): Promise<void> {
	const lines: string[] = []
	lines.push(`# ${category} operators\n`)

	lines.push('|Operator    |Description                                   |')
	lines.push('|------------|----------------------------------------------|')
	for (const p in list) {
		const item = list[p]
		lines.push(`|${item.op}|${item.name}|`)
	}
	lines.push('')

	lines.push('## Definition\n')
	for (const p in list) {
		const item = list[p]
		lines.push(`### Operator ${item.op}\n`)
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
	const targetFolder = '.github/wiki'
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder, { recursive: true })
	}
	fs.writeFileSync(path.join(targetFolder, 'operator_' + category.replace(' ', '_') + '.md'), content)
}

export async function apply (callback: any) {
	const model = await ConfigExtends.apply(path.join('src/dev/config/model.yaml'))

	const funcCategories:any = {}
	for (const p in model.functions) {
		const item = model.functions[p]
		item.name = p
		if (funcCategories[item.category as string] === undefined) {
			funcCategories[item.category] = { list: [] }
		}
		funcCategories[item.category].list.push(item)
	}

	for (const p in funcCategories) {
		const category = funcCategories[p]
		await writeFunctions(p, category.list)
	}

	const operCategories:any = {}
	for (const p in model.operators.unary) {
		const item = model.operators.unary[p]
		item.op = p
		if (operCategories[item.category as string] === undefined) {
			operCategories[item.category] = { list: [] }
		}
		operCategories[item.category].list.push(item)
	}
	for (const p in model.operators.binary) {
		const item = model.operators.binary[p]
		item.op = p
		if (operCategories[item.category as string] === undefined) {
			operCategories[item.category] = { list: [] }
		}
		operCategories[item.category].list.push(item)
	}

	for (const p in operCategories) {
		const category = operCategories[p]
		await writeOperators(p, category.list)
	}
	callback()
}

apply(function () { console.log('end') })
