const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://localhost:27017'
	const dbName = 'test'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	await db.collection('inventory').deleteMany({})

	await db.collection('inventory').insertMany([
		{
			item: 'journal',
			qty: 25,
			tags: ['blank', 'red'],
			dim_cm: [14, 21]
		},
		{
			item: 'notebook',
			qty: 50,
			tags: ['red', 'blank'],
			dim_cm: [14, 21]
		},
		{
			item: 'paper',
			qty: 100,
			tags: ['red', 'blank', 'plain'],
			dim_cm: [14, 21]
		},
		{
			item: 'planner',
			qty: 75,
			tags: ['blank', 'red'],
			dim_cm: [22.85, 30]
		},
		{
			item: 'postcard',
			qty: 45,
			tags: ['blue'],
			dim_cm: [10, 15.25]
		}
	])

	const result = await db.collection('inventory').find().limit(2).toArray()
	console.log(JSON.stringify(result, null, 2))

	client.close()
})()
