const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	//await db.collection('inventory').deleteMany({})

	const result = await db.collection('Orders').aggregate([
		// {
		// 	"$unwind": '$"Order Details"'
		// },
		{
			$project: {
				_id: 0,
				id: '$CustomerID',
				details: {
					$map: {
						input: "$\"Order Details\"",
						in: {
							price: '$$this.UnitPrice',
							qty: '$$this.Quantity'
						}
					}
				}
			}
		}
	]).toArray()
	console.log(JSON.stringify(result, null, 2))
	client.close()
})()


// {
// 	$project: {
// 		_id: 0,
// 		id: '$CustomerID',
// 		details: [{
// 			price: '$"Order Details".UnitPrice',
// 			qty: '$"Order Details".Quantity'
// 		}
// 		]
// 	}
// }

// '{"$and":[{"$or":[{"qty":{"$lt":10}},{"qty":{"$gt":50}}]},{"$or":[{"sale":true},{"price":{"$lt":5}}]}]}'

// JSON.parse('{"$and" :[{"$eq" :["LastName","Davolio"]},{"$eq" :["FirstName","Nancy"]}]}')

// ```json
// { "id": '$CustomerID', "details": '$"Order Details"' }
// // 
// { "id": '$CustomerID', "details": { "price": '$"Order Details".UnitPrice'} }
// ```