import { orm } from '../../lib'
export async function lab (callback: any) {
	try {
		await orm.init('./config/northwind.yaml')
		const workspace = __dirname.replace('/build/', '/src/')
		for (const stage of ['Source', 'MongoDB', 'MySQL', 'PostgreSQL', 'Oracle', 'SqlServer']) {
			const mappings = await orm.stage.fetch({ stage })
			await orm.helper.fs.write(`${workspace}/fetch_${stage}_mappings.yaml`, orm.helper.yaml.dump(mappings))
		}
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}
lab(function () { console.log('end') })
