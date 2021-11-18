import { orm, Helper } from './../../orm'

async function schemaExport (source: string) {
	const exportFile = 'data/' + source + '-export.json'
	const data = await orm.datastore.export(source).execute()
	await Helper.writeFile(exportFile, JSON.stringify(data))
}
async function schemaImport (source: string, target: string) {
	const sourceFile = 'data/' + source + '-export.json'
	const content = await Helper.readFile(sourceFile) as string
	const data = JSON.parse(content)
	await orm.datastore.import(target).execute(data)
}

export async function apply (datastores: string[], callback: any) {
	try {
		await orm.init()

		await orm.datastore.sync('source').execute()
		await schemaExport('source')
		for (const p in datastores) {
			const datastore = datastores[p]
			await orm.datastore.clean(datastore).execute(true)
			await orm.datastore.sync(datastore).execute()
			await schemaImport('source', datastore)
			await schemaExport(datastore)
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
