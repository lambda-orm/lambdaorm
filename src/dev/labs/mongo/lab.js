const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	//await db.collection('inventory').deleteMany({})

	const id = await db.collection('inventory').insertOne({
		item: 'journal',
		qty: 25,
		tags: ['blank', 'red'],
		dim_cm: [14, 21]
	})
	console.log(JSON.stringify(id, null, 2))

	const ids = await db.collection('inventory').insertMany([
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
	console.log(JSON.stringify(ids, null, 2))

	const result = await db.collection('inventory').find().limit(2).toArray()
	console.log(JSON.stringify(result, null, 2))

	client.close()
})()
