
'{"$and":[{"$or":[{"qty":{"$lt":10}},{"qty":{"$gt":50}}]},{"$or":[{"sale":true},{"price":{"$lt":5}}]}]}'

JSON.parse('{"$and" :[{"$eq" :["LastName","Davolio"]},{"$eq" :["FirstName","Nancy"]}]}')
