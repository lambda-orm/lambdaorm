import { orm, Helper} from '../../../lib'

async function apply () {
	try {
		const stage = 'MongoDB'
		await orm.init()
		const cleanQueries  = await orm.stage.clean(stage).queries()
		const syncQueries = await orm.stage.sync(stage).queries()
		const importQueries  = orm.stage.import(stage).queries()
		const exportQueries  = orm.stage.export(stage).queries()

		await Helper.writeFile(`src/dev/labs/mongo/${stage}-clean-queries.json`, JSON.stringify(cleanQueries,null,2))
		await Helper.writeFile(`src/dev/labs/mongo/${stage}-sync-queries.json`, JSON.stringify(syncQueries,null,2))
		await Helper.writeFile(`src/dev/labs/mongo/${stage}-import-queries.json`, JSON.stringify(importQueries,null,2))
		await Helper.writeFile(`src/dev/labs/mongo/${stage}-export-queries.json`, JSON.stringify(exportQueries,null,2))		
		
	} catch (error:any) {
		console.error(error)
	}finally{
		await orm.end()
	}
}

apply()