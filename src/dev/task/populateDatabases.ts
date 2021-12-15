import { orm, Helper } from './../../orm'

async function schemaExport (source: string) {
	const exportFile = 'data/' + source + '-export.json'
	const data = await orm.dataSource.export(source).execute()
	await Helper.writeFile(exportFile, JSON.stringify(data))
}
async function schemaImport (source: string, target: string) {
	const sourceFile = 'data/' + source + '-export.json'
	const content = await Helper.readFile(sourceFile) as string
	const data = JSON.parse(content)
	await orm.dataSource.import(target).execute(data)
}

export async function apply (dataSources: string[], callback: any) {
	try {
		await orm.init()

		await orm.dataSource.sync('source').execute()
		await schemaExport('source')
		for (const p in dataSources) {
			const dataSource = dataSources[p]
			await orm.dataSource.clean(dataSource).execute(true)
			await orm.dataSource.sync(dataSource).execute()
			await schemaImport('source', dataSource)
			await schemaExport(dataSource)
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
