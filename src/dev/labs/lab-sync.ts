import { orm } from '../../lib'
(async () => {
	
	try {
		require('dotenv').config({ path: './src/dev/labs/collections/.env' })
		await orm.init('./src/dev/labs/collections/lambdaORM.yaml')		
		await orm.stage.sync({stage:'insights'}).execute()
	} catch (error) {
		console.error(`error: ${error}`)
	} finally {
		orm.end()
	}
})()
