import { orm, Helper } from '../../orm'

async function schemaSync (target: string) {
	await orm.database.sync(target).execute()
}
async function schemaDrop (target: string, TryAndContinue = false) {
	if (await orm.database.exists(target)) {
		await orm.database.clean(target).execute(TryAndContinue)
	}
}
async function schemaExport (source: string) {
	const exportFile = 'data/' + source + '-export.json'
	const data = await orm.database.export(source)
	await Helper.writeFile(exportFile, JSON.stringify(data))
}
async function schemaImport (source: string, target: string) {
	const sourceFile = 'data/' + source + '-export.json'
	const content = await Helper.readFile(sourceFile) as string
	const data = JSON.parse(content)
	await orm.database.import(target, data)
}

export async function apply (databases: string[], callback: any) {
	await orm.init()

	await schemaSync('source')
	await schemaExport('source')

	for (const p in databases) {
		const database = databases[p]
		await schemaDrop(database, true)
		await schemaSync(database)
		await schemaImport('source', database)
		await schemaExport(database)
	}
	await orm.end()
	callback()
}
apply(['mssql'], function () { console.log('end') })
// apply(['mysql', 'postgres', 'mariadb'], function () { console.log('end') })
// apply(['mysql'], function () { console.log('end') })
