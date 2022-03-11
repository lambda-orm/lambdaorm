import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('delete 1', () => {
		const source = 'OrderDetails.delete().filter(p=>(p.orderId===id))'
		const expected = 'OrderDetails.delete().filter(p=>(p.orderId===id))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('delete 2', () => {
		const source = 'Orders.delete().include(p=>p.details)'
		const expected = 'Orders.filter(p=>(p.id==id)).delete().include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('delete 3', () => {
		const source = 'Orders.delete().filter(p=>(p.id===id)).include(p=>p.details)'
		const expected = 'Orders.delete().filter(p=>(p.id===id)).include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('delete 4', () => {
		const source = 'Orders.delete().include(p=>p.details)'
		const expected = 'Orders.filter(p=>(p.id==id)).delete().include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('delete 4', () => {
		const source = 'OrderDetails.delete(entity)'
		const expected = 'OrderDetails.filter(p=>((p.orderId==entity.orderId)&&(p.productId==entity.productId))).delete(entity)'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('delete 5', () => {
		const source = 'Orders.delete(entity).include(p=>p.details)'
		const expected = 'Orders.filter(p=>(p.id==entity.id)).delete(entity).include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('delete 6', () => {
		const source = 'OrderDetails.deleteAll()'
		const expected = 'OrderDetails.delete()'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('delete 1', async () => {
		const expression = 'OrderDetails.delete().filter(p=>(p.orderId===id))'
		const modelExpected :any= []
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"OrderDetails.o","type":"From","children":[]},{"name":"OrderDetails.o","type":"Delete","children":[]}],"fields":[],"parameters":[{"name":"id","type":"integer","value":9}],"entity":"OrderDetails"}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('delete 2', async () => {
		const expression = 'Orders.delete().include(p=>p.details)'
		const modelExpected :any= [{"name":"details","type":"OrderDetails[]","childs":[]}]
		const parametersExpected:any = [{"name":"id","type":"integer"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}]}]
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Orders","alias":"o"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Orders.o","type":"From","children":[]},{"name":"Orders.o","type":"Delete","children":[]},{"name":"details","type":"SentenceInclude","children":[{"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"&&","type":"Operator","children":[{"name":"==","type":"Operator","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"orderId","type":"Variable","children":[],"number":1}]},{"name":"==","type":"Operator","children":[{"name":"productId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"productId","type":"Variable","children":[],"number":2}]}]}]},{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails.o1","type":"Delete","children":[]}],"fields":[],"parameters":[{"name":"orderId","type":"integer","value":4},{"name":"productId","type":"integer","value":77}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"fields":[],"parameters":[{"name":"id","type":"integer","value":4}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"childs":[{"entity":"OrderDetails","constraints":[]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('delete 3', async () => {
		const expression = 'Orders.delete().filter(p=>(p.id===id)).include(p=>p.details)'
		const modelExpected :any= [{"name":"details","type":"OrderDetails[]","childs":[]}]
		const parametersExpected:any = [{"name":"id","type":"integer"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}]}]
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"===","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Orders","alias":"o"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Orders.o","type":"From","children":[]},{"name":"Orders.o","type":"Delete","children":[]},{"name":"details","type":"SentenceInclude","children":[{"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"&&","type":"Operator","children":[{"name":"==","type":"Operator","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"orderId","type":"Variable","children":[],"number":1}]},{"name":"==","type":"Operator","children":[{"name":"productId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"productId","type":"Variable","children":[],"number":2}]}]}]},{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails.o1","type":"Delete","children":[]}],"fields":[],"parameters":[{"name":"orderId","type":"integer","value":2},{"name":"productId","type":"integer","value":63}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"fields":[],"parameters":[{"name":"id","type":"integer","value":2}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"childs":[{"entity":"OrderDetails","constraints":[]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('delete 4', async () => {
		const expression = 'Orders.delete().include(p=>p.details)'
		const modelExpected :any= [{"name":"details","type":"OrderDetails[]","childs":[]}]
		const parametersExpected:any = [{"name":"id","type":"integer"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}]}]
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Orders","alias":"o"},{"name":"id","type":"Variable","children":[],"number":1}]}]},{"name":"Orders.o","type":"From","children":[]},{"name":"Orders.o","type":"Delete","children":[]},{"name":"details","type":"SentenceInclude","children":[{"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"&&","type":"Operator","children":[{"name":"==","type":"Operator","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"orderId","type":"Variable","children":[],"number":1}]},{"name":"==","type":"Operator","children":[{"name":"productId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"productId","type":"Variable","children":[],"number":2}]}]}]},{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails.o1","type":"Delete","children":[]}],"fields":[],"parameters":[{"name":"orderId","type":"integer","value":4},{"name":"productId","type":"integer","value":77}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"fields":[],"parameters":[{"name":"id","type":"integer","value":4}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"childs":[{"entity":"OrderDetails","constraints":[]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('delete 4', async () => {
		const expression = 'OrderDetails.delete(entity)'
		const modelExpected :any= []
		const parametersExpected:any = [{"name":"entity.orderId","type":"integer"},{"name":"entity.productId","type":"integer"}]
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"&&","type":"Operator","children":[{"name":"==","type":"Operator","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":"entity.orderId","type":"Variable","children":[],"number":1}]},{"name":"==","type":"Operator","children":[{"name":"productId","type":"Field","children":[],"entity":"OrderDetails","alias":"o"},{"name":"entity.productId","type":"Variable","children":[],"number":2}]}]}]},{"name":"OrderDetails.o","type":"From","children":[]},{"name":"OrderDetails.o","type":"Delete","children":[]}],"fields":[],"parameters":[{"name":"entity.orderId","type":"integer","value":null},{"name":"entity.productId","type":"integer","value":null}],"entity":"OrderDetails"}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('delete 5', async () => {
		const expression = 'Orders.delete(entity).include(p=>p.details)'
		const modelExpected :any= [{"name":"details","type":"OrderDetails[]","childs":[]}]
		const parametersExpected:any = [{"name":"entity.id","type":"integer"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}]}]
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"==","type":"Operator","children":[{"name":"id","type":"Field","children":[],"entity":"Orders","alias":"o"},{"name":"entity.id","type":"Variable","children":[],"number":1}]}]},{"name":"Orders.o","type":"From","children":[]},{"name":"Orders.o","type":"Delete","children":[]},{"name":"details","type":"SentenceInclude","children":[{"name":"delete","type":"Sentence","children":[{"name":"filter","type":"Filter","children":[{"name":"&&","type":"Operator","children":[{"name":"==","type":"Operator","children":[{"name":"orderId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"orderId","type":"Variable","children":[],"number":1}]},{"name":"==","type":"Operator","children":[{"name":"productId","type":"Field","children":[],"entity":"OrderDetails","alias":"o1"},{"name":"productId","type":"Variable","children":[],"number":2}]}]}]},{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails.o1","type":"Delete","children":[]}],"fields":[],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"fields":[],"parameters":[{"name":"entity.id","type":"integer","value":null}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"childs":[{"entity":"OrderDetails","constraints":[]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('delete 6', async () => {
		const expression = 'OrderDetails.deleteAll()'
		const modelExpected :any= []
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"delete","type":"Sentence","children":[{"name":"OrderDetails.o","type":"From","children":[]},{"name":"OrderDetails.o","type":"Delete","children":[]}],"fields":[],"parameters":[],"entity":"OrderDetails"}
		const constraintsExpected :any= {"entity":"OrderDetails","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
})
describe('Sentences', () => {
	test('delete 1', async () => {
		const expression = 'OrderDetails.delete().filter(p=>(p.orderId===id))'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM `Order Details` AS o WHERE o.OrderID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o WHERE o.OrderID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('delete 2', async () => {
		const expression = 'Orders.delete().include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM Orders AS o WHERE o.OrderID = ? ","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o1 FROM `Order Details` AS o1 WHERE (o1.OrderID = ? AND o1.ProductID = ?) ","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM Orders o WHERE o.OrderID = $1 ","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o1 WHERE (o1.OrderID = $1 AND o1.ProductID = $2) ","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('delete 3', async () => {
		const expression = 'Orders.delete().filter(p=>(p.id===id)).include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM Orders AS o WHERE o.OrderID = ? ","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o1 FROM `Order Details` AS o1 WHERE (o1.OrderID = ? AND o1.ProductID = ?) ","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM Orders o WHERE o.OrderID = $1 ","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o1 WHERE (o1.OrderID = $1 AND o1.ProductID = $2) ","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('delete 4', async () => {
		const expression = 'Orders.delete().include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM Orders AS o WHERE o.OrderID = ? ","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o1 FROM `Order Details` AS o1 WHERE (o1.OrderID = ? AND o1.ProductID = ?) ","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM Orders o WHERE o.OrderID = $1 ","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o1 WHERE (o1.OrderID = $1 AND o1.ProductID = $2) ","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('delete 4', async () => {
		const expression = 'OrderDetails.delete(entity)'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o WHERE (o.OrderID = $1 AND o.ProductID = $2) ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('delete 5', async () => {
		const expression = 'Orders.delete(entity).include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM Orders AS o WHERE o.OrderID = ? ","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o1 FROM `Order Details` AS o1 WHERE (o1.OrderID = ? AND o1.ProductID = ?) ","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM Orders o WHERE o.OrderID = $1 ","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o1 WHERE (o1.OrderID = $1 AND o1.ProductID = $2) ","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('delete 6', async () => {
		const expression = 'OrderDetails.deleteAll()'
		const mysqlExpected = {"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"DELETE o FROM `Order Details` AS o ","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"DELETE FROM \"Order Details\" o ","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
})