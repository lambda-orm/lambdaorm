const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	const result = await db.collection('Products').aggregate(
		[
			{$match:{_id:1}},{$project:{_id:0,name:"$ProductName", source:{ $literal:25.75},result:{$round:[{$floor:25.75},10]}}}
		]).toArray()
	console.log(JSON.stringify(result, null, 2))
	
	client.close()
})()