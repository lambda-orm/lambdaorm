import { orm, Orm, Dialect} from '../../../lib'
import { h3lp } from 'h3lp'
const yaml = require('js-yaml');

const createSchemaIfNotExists = async(schemaPath:string): Promise<void> => {
	if( !await h3lp.fs.exists(schemaPath)) {
		const schema = orm.schema.create(Dialect.PostgreSQL, '$CNX_POSTGRES' )
		await h3lp.fs.write(schemaPath, yaml.dump(schema))
	}
}

(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const schemaPath = workspace + '/lambdaOrm.yaml'		
	const orm = new Orm(workspace)
	try{
		await createSchemaIfNotExists(schemaPath)
		await orm.init(schemaPath)	
		await orm.stage.match({ removeEntities: true, removeProperties: true})
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()