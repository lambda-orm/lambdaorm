import { orm } from '../../../lib'
import { h3lp } from 'h3lp'
const sourcePath = 'src/dev/labs/performance/shape'

async function execute () {
	try {
		const stage = 'default'
		await orm.init(`${sourcePath}/shapes.yaml`)
		const start = new Date().getTime()
		await orm.stage.clean({stage:stage, tryAllCan: true }).execute()
		let clean = new Date().getTime()
		console.log(`clean: ${clean - start}`)
		await orm.stage.sync({stage:stage}).execute()
		let sync = new Date().getTime()
		console.log(`sync: ${sync - clean}`)
		const content = await h3lp.fs.read(`${sourcePath}/shapes.json`) as string
		const data = JSON.parse(content)
		const readFile = new Date().getTime()
		console.log(`readFile: ${readFile - sync}`)
		await orm.execute('Shapes.bulkInsert().include(p-> [p.properties,p.geometry.include(p-> p.coordinates)])', data)
		const bulkInsert = new Date().getTime()
		console.log(`bulkInsert: ${bulkInsert - readFile}`)
		const exportData = await orm.stage.export({stage:stage}).execute()
		const _export = new Date().getTime()
		console.log(`export: ${_export - bulkInsert}`)
		// TODO: se queda bloqueado por los constrains por mas que borre las tablas en orden
		// await orm.stage.delete(stage).execute()
		// const _delete = new Date().getTime()
		// console.log(`delete: ${_delete - _export}`)

		// TODO: temporalmente para borrar en Postgres
		await orm.stage.clean({stage:stage, tryAllCan: true }).execute()
		clean = new Date().getTime()
		console.log(`clean: ${clean - _export}`)
		await orm.stage.sync({stage:stage}).execute()
		sync = new Date().getTime()
		console.log(`sync: ${sync - clean}`)

		await orm.stage.import({stage:stage}).execute(exportData)
		const _import = new Date().getTime()
		console.log(`import: ${_import - sync}`)
		await orm.end()
	} catch (error:any) {
		console.error(error)
	}
}

// async function transform () {
// try {
// const content = await helper.readFile(`${sourcePath}/example/large2.json`) as string
// const data = JSON.parse(content)
// for (const i in data) {
// const item = data[i]
// if (item && item.geometry && item.geometry.coordinates && item.geometry.coordinates[0]) {
// const coordinates: any[] = []
// for (const j in item.geometry.coordinates[0]) {
// const p = item.geometry.coordinates[0][j]
// coordinates.push({ lat: p[0].toString(), long: p[1].toString(), alt: p[2].toString() })
// }
// item.geometry.coordinates = coordinates
// }
// }
// await helper.writeFile(`${sourcePath}/shapes.json`, JSON.stringify(data, null, 2))
// } catch (error:any) {
// console.error(error)
// }
// }
// async function _export () {
// try {
// const stage = 'default'
// await orm.init(`${sourcePath}/shapes.yaml`)
// const start = new Date().getTime()
// await stageExport(stage)
// const _export = new Date().getTime()
// console.log(`export: ${_export - start}`)
// await orm.end()
// } catch (error:any) {
// console.error(error)
// }
// }

// async function _delete () {
// try {
// const stage = 'default'
// await orm.init(`${sourcePath}/shapes.yaml`)
// const start = new Date().getTime()
// await orm.stage.delete(stage).execute()
// const _delete = new Date().getTime()
// console.log(`delete: ${_delete - start}`)
// await orm.end()
// } catch (error:any) {
// console.error(error)
// }
// }

// _export()
// transform()
execute()
// _delete()
