const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	//await db.collection('inventory').deleteMany({})


	const result = await db.collection('Products').aggregate(
		[{
			"$lookup": {
				"from": "Categories", "localField": "_id",
				"foreignField": "CategoryID", "as": "c"
			}
		}, {
			"$project": {
				//"_id": 0
				"name": "$ProductName",
				"name2": "$c.CategoryName",
				"categoryName": { "$arrayElemAt": ["$c.CategoryName", 0] }
			}
		}]
	).toArray()
	// JOIN
	// const result = await db.collection('Products').aggregate([
	// 	{
	// 		$lookup: {
	// 			from: "Categories",
	// 			localField: "CategoryID",
	// 			foreignField: "_id",
	// 			as: "p"
	// 		}
	// 	},
	// 	{
	// 		$project: {
	// 			"name": "$ProductName",
	// 			"category": { $arrayElemAt: ["$p.CategoryName", 0] },
	// 		}
	// 	}
	// ]).toArray()
	// DISTINCT
	// const result = await db.collection('Products').aggregate([
	// 	{
	// 		$group: {
	// 			_id: null,
	// 			__distinct: { "$addToSet": { "a": "$CategoryID", "c": "$UnitPrice" } }
	// 		}
	// 	}
	// ]).toArray()
	// CHILD
	// ]).toArray()
	// const result = await db.collection('Orders').aggregate([
	// 	{
	// 		$project: {
	// 			_id: 0,
	// 			id: '$CustomerID',
	// 			details: {
	// 				$map: {
	// 					input: "$\"Order Details\"",
	// 					in: {
	// 						price: '$$this.UnitPrice',
	// 						qty: '$$this.Quantity'
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// ]).toArray()
	console.log(JSON.stringify(result, null, 2))
	client.close()
})()


//$replaceRoot: { newRoot: 