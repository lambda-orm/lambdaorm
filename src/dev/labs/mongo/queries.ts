import { orm, Helper} from '../../../lib'

async function apply () {
	try {
		const stage = 'lambdadb'
		await orm.init()
		const cleanQueries  = await orm.stage.clean(stage).queries()
		const syncQueries = await orm.stage.sync(stage).queries()
		const importQueries  = orm.stage.import(stage).queries()
		const exportQueries  = orm.stage.export(stage).queries()

		await Helper.writeFile(`data-${stage}-clean-queries.json`, JSON.stringify(cleanQueries))
		await Helper.writeFile(`data-${stage}-sync-queries.json`, JSON.stringify(syncQueries))
		await Helper.writeFile(`data-${stage}-import-queries.json`, JSON.stringify(importQueries))
		await Helper.writeFile(`data-${stage}-export-queries.json`, JSON.stringify(exportQueries))		
		
	} catch (error:any) {
		console.error(error)
	}finally{
		await orm.end()
	}
}

apply()