import { LoggerBuilder, Orm, OrmH3lp} from '../../../lib'
import { h3lp } from 'h3lp'
(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const orm = new Orm(workspace)
	const helper = new OrmH3lp(h3lp, new LoggerBuilder().build())	
	try{		
		const originalSchema = helper.yaml.load(await helper.fs.read(workspace + '/lambdaOrm.yaml'))
		await orm.init(originalSchema)	
		const mappings = await orm.stage.fetch()
		await helper.fs.write( workspace + '/mappings.yaml', helper.yaml.dump(mappings))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()
