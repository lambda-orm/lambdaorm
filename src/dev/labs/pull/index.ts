import { Orm} from '../../../lib'
(async () => {
	const workspace = __dirname.replace('/build/', '/src/')
	const orm = new Orm()
	try{		
		await orm.helper.fs.removeDir(workspace + '/data')
		await orm.init(workspace + '/lambdaOrm.yaml')	
		await orm.stage.pull()
		await orm.helper.fs.write( workspace + '/result.yaml', orm.helper.yaml.dump(orm.state.originalSchema))
	}catch(e){
		console.log(e)
	} finally {
		orm.end()
	}	
})()
