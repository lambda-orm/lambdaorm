import { Orm } from '../../../lib'
import { h3lp } from 'h3lp'
const yaml = require('js-yaml');

(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const schemaPath = workspace + '/lambdaOrm.yaml'
	const schemaResultPath = workspace + '/result.yaml'		
	const orm = new Orm(workspace)
	try{
		await h3lp.fs.removeDir(workspace + '/data')
		const originalSchema = yaml.load(await h3lp.fs.read(schemaPath))
		const schema = h3lp.obj.clone(originalSchema)
		await orm.init(schema)
		for(const stage of ['MySQL','SqlServer','PostgreSQL','Oracle']){
			await orm.stage.match({stage, removeEntities: true, removeProperties: true, removeRelations: true })
		}
		await h3lp.fs.write(schemaResultPath, yaml.dump(schema))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()
