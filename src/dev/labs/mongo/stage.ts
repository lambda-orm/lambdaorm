import { orm } from '../../../lib'
import { h3lp } from 'h3lp'

async function apply () {
	try {
		const stage = 'MongoDB'
		await orm.init()
		const cleanQueries  = await orm.stage.drop({stage:stage}).queries()
		const pushQueries = await orm.stage.push({stage:stage}).queries()
		const importQueries  = orm.stage.import({stage:stage}).queries()
		const exportQueries  = orm.stage.export({stage:stage}).queries()

		await h3lp.fs.write(`src/dev/labs/mongo/${stage}-clean-queries.json`, JSON.stringify(cleanQueries,null,2))
		await h3lp.fs.write(`src/dev/labs/mongo/${stage}-push-queries.json`, JSON.stringify(pushQueries,null,2))
		await h3lp.fs.write(`src/dev/labs/mongo/${stage}-import-queries.json`, JSON.stringify(importQueries,null,2))
		await h3lp.fs.write(`src/dev/labs/mongo/${stage}-export-queries.json`, JSON.stringify(exportQueries,null,2))		
		
	} catch (error:any) {
		console.error(error)
	}finally{
		await orm.end()
	}
}

apply()