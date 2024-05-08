import { Orm } from '../../../lib'
(async () => {
	const workspace = __dirname.replace('/build/', '/src/')	
	const orm = new Orm()
	try{			
		await orm.helper.fs.removeDir(workspace + '/data')
		await orm.init(workspace + '/lambdaOrm.yaml')
		for(const stage of ['Source','MySQL','SqlServer','PostgreSQL','Oracle','MongoDB']){
			await orm.stage.pull({stage, removeEntities: true, removeProperties: true, removeRelations: true })
		}
		await orm.helper.fs.write(workspace + '/result.yaml', orm.helper.yaml.dump(orm.state.originalSchema))
	}catch(e){
		console.log(e)
	} finally {
		await orm.end()
	}	
})()
