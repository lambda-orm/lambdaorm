import { orm, helper } from '../../../lib'

(async () => {
	await orm.init('./src/dev/labs/placement/schema.yaml')
	try {
    const placements = await orm.execute('PlacementDebtors')
    await helper.fs.write('./src/dev/labs/placement/placement.json', JSON.stringify(placements, null, 2))
		const debtors = await orm.execute('InsightDebtors')
    await helper.fs.write('./src/dev/labs/placement/debtors.json', JSON.stringify(debtors, null, 2))
	} catch (error:any) {
		console.error(error.message)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()