import { orm, Helper } from '../../lib'

async function stageExport (source: string) {
	const exportFile = 'data/' + source + '-export.json'
	const data = await orm.stage.export(source).execute()
	await Helper.writeFile(exportFile, JSON.stringify(data))
}
async function stageImport (source: string, target: string) {
	const sourceFile = 'data/' + source + '-export.json'
	const content = await Helper.readFile(sourceFile) as string
	const data = JSON.parse(content)
	await orm.stage.import(target).execute(data)
}

export async function apply (stages: string[], callback: any) {
	try {
		await orm.init()

		await orm.stage.sync('source').execute()
		await stageExport('source')
		for (const p in stages) {
			const stage = stages[p]
			await orm.stage.clean(stage).execute(true)
			await orm.stage.sync(stage).execute()
			await stageImport('source', stage)
			await stageExport(stage)
		}
		await orm.end()
	} catch (error) {
		console.error(error)
	} finally {
		callback()
	}
}
apply(['mysql', 'postgres', 'mariadb'], function () { console.log('end') })
// apply(['mysql', 'postgres', 'mariadb', 'mssql'], function () { console.log('end') })
// apply(['mysql'], function () { console.log('end') })
