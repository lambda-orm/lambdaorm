import { orm, Orm, Dialect, OrmH3lp, LoggerBuilder} from '../../../lib'
import { h3lp } from 'h3lp'

const helper = new OrmH3lp(h3lp, new LoggerBuilder().build())

const createSchemaIfNotExists = async(schemaPath:string): Promise<void> => {
	if( !await helper.fs.exists(schemaPath)) {
		const schema = orm.schema.create(Dialect.PostgreSQL, '$CNX_POSTGRES' )
		await helper.fs.write(schemaPath, helper.yaml.dump(schema))
	}
}

(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const schemaPath = workspace + '/lambdaOrm.yaml'		
	const orm = new Orm(workspace)
	try{
		await createSchemaIfNotExists(schemaPath)
		const data = JSON.parse( await helper.fs.read(workspace + '/countries.json') || '{}')
		await orm.init(schemaPath)	
		await orm.stage.drop({ tryAllCan: true }).execute()
		const schemaData =  await orm.stage.incorporate(data, 'countries')		
		await helper.fs.write(workspace + '/schemaData.json', JSON.stringify(schemaData, null, 2))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()