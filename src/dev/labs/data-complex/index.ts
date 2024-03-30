import { Type } from 'typ3s';
import { orm, Orm, Dialect, Schema} from '../../../lib'
import { h3lp } from 'h3lp'
const yaml = require('js-yaml');

const createSchemaIfNotExists = async(schemaPath:string): Promise<void> => {
	if( !await h3lp.fs.exists(schemaPath)) {
		const schema = orm.schema.new(Dialect.PostgreSQL, '$CNX_POSTGRES' )
		await h3lp.fs.write(schemaPath, yaml.dump(schema))
	}
}

(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const schemaPath = workspace + '/lambdaOrm.yaml'		
	const orm = new Orm(workspace)
	try{
		await createSchemaIfNotExists(schemaPath)
		const data = JSON.parse( await h3lp.fs.read(workspace + '/countries.json') || '{}')
		await orm.init(schemaPath)	
		await orm.stage.drop({ tryAllCan: true }).execute()
		const [schema,schemaData] =  await orm.syncAndImport(data, 'countries')		
		await h3lp.fs.write(workspace + '/schemaData.json', JSON.stringify(schemaData, null, 2))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()