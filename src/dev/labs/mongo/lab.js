const MongoClient = require('mongodb').MongoClient;

(async () => {
	const url = 'mongodb://test:test@localhost:27017'
	const dbName = 'northwind'
	const client = await MongoClient.connect(url)
	const db = client.db(dbName)
	const result = await db.collection('Products').aggregate(
		[
			{ $lookup: { from: "Categories", localField: "CategoryID", foreignField: "_id", as: "c" } }
		, { $group: { _id: null, __distinct: { $addToSet: { category: { $arrayElemAt: ["$c.CategoryName", 0] } } } } },
			
		  { $sort: { "__distinct.category": 1 } }, { $project: { _id: 0 } }]
	).toArray()
	console.log(JSON.stringify(result, null, 2))

	const result2 = await db.collection('Products').aggregate([
    { $lookup: { from: "Categories", localField: "CategoryID", foreignField: "_id", as: "c" } },
    { $group: { _id: null, __distinct: { $addToSet: { category: { $arrayElemAt: ["$c.CategoryName", 0] } } } } },
    { $unwind: "$__distinct" }, // Deshacer el array generado por $addToSet
    { $sort: { "__distinct.category": 1 } }, // Ordenar por el campo category dentro de __distinct
    { $replaceRoot: { newRoot: "$__distinct" } }, // Reemplazar el root con __distinct
    { $project: { _id: 0 } }
	]).toArray()
	console.log(JSON.stringify(result2, null, 2))


	client.close()
})()