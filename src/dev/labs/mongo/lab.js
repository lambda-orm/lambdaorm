const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	//await db.collection('inventory').deleteMany({})

	const result = await db.collection('Products').aggregate(
		[{ "$lookup": { "from": "Orders", "localField": "OrderID", "foreignField": "_id", "as": "o1" } }, { "$lookup": { "from": "Products", "localField": "ProductID", "foreignField": "_id", "as": "p" } }, { "$lookup": { "from": "Categories", "localField": "CategoryID", "foreignField": "_id", "as": "c" } }, { "$match": { "$and": [{ "$and": [{ "$gte": [{ "$arrayElemAt": ["$o1.ShippedDate", 0] }, "Invalid DateTime"] }, { "$lt": [{ "$arrayElemAt": ["$o1.ShippedDate", 0] }, "Invalid DateTime"] }] }, { "$gt": ["$UnitPrice", 10] }] } }, { "$project": { "_id": 0, "category": { "$arrayElemAt": ["$c.CategoryName", 0] }, "product": { "$arrayElemAt": ["$p.ProductName", 0] }, "unitPrice": "$UnitPrice", "quantity": "$Quantity" } }, { "$sort": { "category": 1, "product": 1 } }]
	).toArray()
	//JOIN
	// const result = await db.collection('Products').aggregate(
	// 	[{
	// 		"$lookup": {
	// 			"from": "Categories", "localField": "_id",
	// 			"foreignField": "CategoryID", "as": "c"
	// 		}
	// 	}, {
	// 		"$project": {
	// 			//"_id": 0
	// 			"name": "$ProductName",
	// 			"name2": "$c.CategoryName",
	// 			"categoryName": { "$arrayElemAt": ["$c.CategoryName", 0] }
	// 		}
	// 	}]
	// ).toArray()
	//JOIN
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