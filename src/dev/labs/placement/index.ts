import { orm } from '../../../lib'
import { h3lp } from 'h3lp'

(async () => {
	await orm.init('./src/dev/labs/placement/schema.yaml')
	try {
    const placements = await orm.execute('PlacementDebtors')
    await h3lp.fs.write('./src/dev/labs/placement/placement.json', JSON.stringify(placements, null, 2))
		const debtors = await orm.execute('InsightDebtors')
    await h3lp.fs.write('./src/dev/labs/placement/debtors.json', JSON.stringify(debtors, null, 2))
	} catch (error:any) {
		console.error(error.message)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()