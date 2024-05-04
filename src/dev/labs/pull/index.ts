import { Orm} from '../../../lib'
(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const orm = new Orm(workspace)
	try{		
		await orm.helper.fs.removeDir(workspace + '/data')
		const originalSchema = orm.helper.yaml.load(await orm.helper.fs.read(workspace + '/lambdaOrm.yaml'))
		await orm.init(originalSchema)	
		await orm.stage.pull()
		await orm.helper.fs.write( workspace + '/result.yaml', orm.helper.yaml.dump(orm.state.originalSchema))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()
