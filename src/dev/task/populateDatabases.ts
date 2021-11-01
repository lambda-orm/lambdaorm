import { orm, Helper } from './../../orm'

async function schemaExport (source: string) {
	const exportFile = 'data/' + source + '-export.json'
	const data = await orm.database.export(source).execute()
	await Helper.writeFile(exportFile, JSON.stringify(data))
}
async function schemaImport (source: string, target: string) {
	const sourceFile = 'data/' + source + '-export.json'
	const content = await Helper.readFile(sourceFile) as string
	const data = JSON.parse(content)
	await orm.database.import(target).execute(data)
}

export async function apply (databases: string[], callback: any) {
	try {
		await orm.init()

		await orm.database.sync('source').execute()
		await schemaExport('source')
		for (const p in databases) {
			const database = databases[p]
			await orm.database.clean(database).execute(true)
			await orm.database.sync(database).execute()
			await schemaImport('source', database)
			await schemaExport(database)
		}
		await orm.end()
	} catch (error) {
		console.error(error)
	} finally {
		callback()
	}
}
apply(['mysql', 'postgres', 'mariadb'], function () { console.log('end') })
// apply(['mysql', 'postgres', 'mariadb'], function () { console.log('end') })
// apply(['mysql'], function () { console.log('end') })
