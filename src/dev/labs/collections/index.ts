import { orm } from '../../../lib'
export async function apply (callback: any) {
	try {
		await orm.init('./src/dev/labs/collections')
		const result = await orm.stage.clean({ stage: 'default', tryAllCan: true }).execute()
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

