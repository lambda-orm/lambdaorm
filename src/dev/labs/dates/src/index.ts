import { orm } from '../../../../lib'
(async () => {
	try {
		const workspace = __dirname.replace('/build/', '/src/')
		await orm.init(workspace + '/../lambdaORM.yaml')
		const date = new Date()
		const test = { id: 1, 
			description: 'from new Date()', 
			testDate: date, 
			testDateTime: date, 
			testString: date.toISOString(), 
			testDateTime2: date,
			testDateTimeOffset: date}
		for (const stage of ['MySQL', 'PostgreSQL', 'SqlServer', 'MongoDB', 'Oracle']) {
			await orm.execute('Tests.deleteAll()', {}, { stage })
		}
		const inserts: any[] = []
		for (const stage of ['MySQL', 'PostgreSQL', 'SqlServer', 'MongoDB', 'Oracle']) {
			test.description = `${stage}: new Date()`
			const result = await orm.execute('Tests.insert()', test, { stage })
			inserts.push(result)
		}
		const results: any[] = []
		for (const stage of ['MySQL', 'PostgreSQL', 'SqlServer', 'MongoDB', 'Oracle']) {
			const result = await orm.execute('Tests', {}, { stage })
			results.push(result)
		}
		await orm.helper.fs.write(workspace + '/results.json', JSON.stringify(results, null, 2))
	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
})()
