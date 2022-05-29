
import { orm, Helper } from '../../../lib'

async function stageExport (source: string) {
	const exportFile = 'data/' + source + '-export.json'
	const data = await orm.stage.export({stage:source}).execute()
	await Helper.writeFile(exportFile, JSON.stringify(data))
}
async function stageImport (source: string, target: string) {
	const sourceFile = 'data/' + source + '-export.json'
	const content = await Helper.readFile(sourceFile) as string
	const data = JSON.parse(content)
	await orm.stage.import({stage:target}).execute(data)
}

async function execute () {
	try {
		await orm.init()
		const start = new Date().getTime()
		await orm.stage.clean({stage:'PostgreSQL'}).execute(true)
		let clean = new Date().getTime()
		console.log(`clean: ${clean - start}`)
		await orm.stage.sync({stage:'PostgreSQL'}).execute()
		let sync = new Date().getTime()
		console.log(`sync: ${sync - clean}`)
		await stageImport('source', 'PostgreSQL')
		let _import = new Date().getTime()
		console.log(`import: ${_import - sync}`)
		await stageExport('PostgreSQL')
		let _export = new Date().getTime()
		console.log(`export: ${_export - _import}`)
		await orm.stage.delete({stage:'PostgreSQL'}).execute()
		let _delete = new Date().getTime()
		console.log(`delete: ${_delete - _export}`)
		// TODO: temporal hasta resolver el problema en el import
		await orm.stage.clean({stage:'PostgreSQL'}).execute(true)
		clean = new Date().getTime()
		console.log(`clean: ${clean - _delete}`)
		await orm.stage.sync({stage:'PostgreSQL'}).execute()
		sync = new Date().getTime()
		console.log(`sync: ${sync - clean}`)
		// Resolver problema al volver a importar (puede ser por el DataMapping en state)
		await stageImport('source', 'PostgreSQL')
		_import = new Date().getTime()
		console.log(`import: ${_import - sync}`)
		await stageExport('PostgreSQL')
		_export = new Date().getTime()
		console.log(`export: ${_export - _import}`)
		await orm.stage.delete({stage:'PostgreSQL'}).execute()
		_delete = new Date().getTime()
		console.log(`delete: ${_delete - _export}`)
		await orm.end()
	} catch (error:any) {
		console.error(error)
	}
}
execute()

// clean: 288
// sync: 192
// import: 511
// export: 140
// delete: 88
// clean: 366
// sync: 181
// import: 292
// export: 126
// delete: 66
