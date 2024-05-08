import { Orm} from '../../../lib'
(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const orm = new Orm()
	try{		
		await orm.init(workspace + '/lambdaOrm.yaml')	
		const mappings = await orm.stage.fetch()
		await orm.helper.fs.write( workspace + '/mappings.yaml', orm.helper.yaml.dump(mappings))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()
