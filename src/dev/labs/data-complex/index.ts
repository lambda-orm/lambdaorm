import { orm, Orm, Dialect, Schema} from '../../../lib'
import { h3lp } from 'h3lp'
const yaml = require('js-yaml');

const createSchema = async(workspace:string): Promise<Schema> => {	
	const data = await h3lp.fs.read(workspace + '/countries.json')
	if (data === null) {
		throw new Error('data is null')
	}
	const array:any[] = JSON.parse(data)
	const schema = orm.schema.create(array, 'countries')
	if (schema.infrastructure === undefined) {
		schema.infrastructure = { }
	}
	schema.infrastructure.mappings = [ { name: 'default', entities:[] }]
	schema.infrastructure.sources = [ { name: 'default', mapping: 'default', dialect: Dialect.PostgreSQL, connection: '$CNX_POSTGRES' }]
	return schema
}

(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const schema = await createSchema(workspace)	
	const orm = new Orm(workspace)
	await orm.init(schema)		
	await orm.stage.sync({stage:'default', tryAllCan:true }).execute()
	await h3lp.fs.write(workspace + '/lambdaOrm.yaml', yaml.dump(schema))
	orm.end()
	
})()