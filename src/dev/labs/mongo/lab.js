const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	//await db.collection('inventory').deleteMany({})


	const result = await db.collection('Products').aggregate(
		[{ "$group": { "_id": 0, "count": { "$sum": 1 } } }]
	).toArray()
	//GROUP BY
	// const result = await db.collection('Products').aggregate(
	// 	[{
	// 		"$group": {
	// 			"_id": {
	// 				"category": "$CategoryID",
	// 				"supplier": "$SupplierID"
	// 			},
	// 			"maxPrice": {
	// 				"$max": "$UnitPrice"
	// 			}
	// 		}
	// 	},
	// 	{
	// 		"$project": {
	// 			"_id": 0,
	// 			"category": "$_id.category",
	// 			"supplier": "$_id.supplier",
	// 			"maxPrice": "$maxPrice"
	// 		}
	// 	}
	// 	]
	// ).toArray()
	//JOINS
	// const result = await db.collection('Orders').aggregate(
	// 	[
	// 		//https://stackoverflow.com/questions/64515836/how-to-replace-root-with-an-array-field-during-MongoDB-aggregation-pipeline
	// 		// unwind solo aplica si el child es un array
	// 		{ $unwind: "$\"Order Details\"" },
	// 		{ $replaceRoot: { newRoot: "$\"Order Details\"" } },
	// 		{
	// 			"$lookup": {
	// 				"from": "Orders",
	// 				"localField": "OrderID",
	// 				"foreignField": "_id",
	// 				"as": "o1"
	// 			}
	// 		},
	// 		{
	// 			"$lookup": {
	// 				"from": "Products",
	// 				"localField": "ProductID",
	// 				"foreignField": "_id",
	// 				"as": "p"
	// 			}
	// 		},
	// 		{
	// 			"$lookup": {
	// 				"from": "Categories",
	// 				"localField": "CategoryID",
	// 				"foreignField": "p._id",
	// 				"as": "c"
	// 			}
	// 		},
	// 		{
	// 			"$match": {
	// 				"$and": [{ "UnitPrice": { "$gt": 10 } }, { "o1.ShippedDate": { $gte: "1997-01-01", $lt: "1997-12-31" } }]
	// 			}
	// 		},
	// 		{
	// 			"$project": {
	// 				"_id": 0,
	// 				"category": {
	// 					"$arrayElemAt": ["$c.CategoryName", 0]
	// 				},
	// 				"product": {
	// 					"$arrayElemAt": ["$p.ProductName", 0]
	// 				},
	// 				"unitPrice": "$UnitPrice",
	// 				"quantity": "$Quantity"
	// 			}
	// 		}
	// 		, {
	// 			"$sort": {
	// 				"category": 1,
	// 				"product": 1
	// 			}
	// 		}
	// 	]
	// ).toArray()
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