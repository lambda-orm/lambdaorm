import { orm } from '../../../lib'

export async function apply (callback: any) {
	try {
		await orm.init('/home/flavio/develop/lambdaorm/src/dev/labs/lab03/lambdaORM.yaml')
		await orm.stage.sync({ stage: 'stage2' }).execute()		
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })
