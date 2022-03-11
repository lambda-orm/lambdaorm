import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('bulkInsert 1', () => {
		const source = 'Categories.bulkInsert()'
		const expected = 'Categories.bulkInsert({name:name,description:description})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('bulkInsert 2', () => {
		const source = 'Orders.bulkInsert().include(p=>p.details)'
		const expected = 'Orders.bulkInsert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.bulkInsert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const metadataExpected :any= {"name":"bulkInsert","type":"Sentence","children":[{"name":"Categories.c","type":"From","children":[]},{"name":"Categories","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":1}],"property":"name"},{"name":"description","type":"KeyValue","children":[{"name":"description","type":"Variable","children":[],"number":2}],"property":"description"}]}],"sentence":"bulkInsert"}],"fields":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"entity":"Categories"}
		const constraintsExpected :any= {"entity":"Categories","constraints":[{"message":"Cannot be null property name in entity Categories","condition":"isNotNull(name)"}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails[]","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const metadataExpected :any= {"name":"bulkInsert","type":"Sentence","children":[{"name":"Orders.o","type":"From","children":[]},{"name":"Orders","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"customerId","type":"KeyValue","children":[{"name":"customerId","type":"Variable","children":[],"number":1}],"property":"customerId"},{"name":"employeeId","type":"KeyValue","children":[{"name":"employeeId","type":"Variable","children":[],"number":2}],"property":"employeeId"},{"name":"orderDate","type":"KeyValue","children":[{"name":"orderDate","type":"Variable","children":[],"number":3}],"property":"orderDate"},{"name":"requiredDate","type":"KeyValue","children":[{"name":"requiredDate","type":"Variable","children":[],"number":4}],"property":"requiredDate"},{"name":"shippedDate","type":"KeyValue","children":[{"name":"shippedDate","type":"Variable","children":[],"number":5}],"property":"shippedDate"},{"name":"shipViaId","type":"KeyValue","children":[{"name":"shipViaId","type":"Variable","children":[],"number":6}],"property":"shipViaId"},{"name":"freight","type":"KeyValue","children":[{"name":"freight","type":"Variable","children":[],"number":7}],"property":"freight"},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":8}],"property":"name"},{"name":"address","type":"KeyValue","children":[{"name":"address","type":"Variable","children":[],"number":9}],"property":"address"},{"name":"city","type":"KeyValue","children":[{"name":"city","type":"Variable","children":[],"number":10}],"property":"city"},{"name":"region","type":"KeyValue","children":[{"name":"region","type":"Variable","children":[],"number":11}],"property":"region"},{"name":"postalCode","type":"KeyValue","children":[{"name":"postalCode","type":"Variable","children":[],"number":12}],"property":"postalCode"},{"name":"country","type":"KeyValue","children":[{"name":"country","type":"Variable","children":[],"number":13}],"property":"country"}]}],"sentence":"bulkInsert"},{"name":"details","type":"SentenceInclude","children":[{"name":"bulkInsert","type":"Sentence","children":[{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"orderId","type":"KeyValue","children":[{"name":"orderId","type":"Variable","children":[],"number":1}],"property":"orderId"},{"name":"productId","type":"KeyValue","children":[{"name":"productId","type":"Variable","children":[],"number":2}],"property":"productId"},{"name":"unitPrice","type":"KeyValue","children":[{"name":"unitPrice","type":"Variable","children":[],"number":3}],"property":"unitPrice"},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Variable","children":[],"number":4}],"property":"quantity"},{"name":"discount","type":"KeyValue","children":[{"name":"discount","type":"Variable","children":[],"number":5}],"property":"discount"}]}],"sentence":"bulkInsert"}],"fields":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"fields":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"childs":[{"entity":"OrderDetails","constraints":[{"message":"Cannot be null property orderId in entity OrderDetails","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity OrderDetails","condition":"isNotNull(productId)"}]}]}
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
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const mysqlExpected = {"entity":"Categories","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES ?","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Categories","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ?","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES ?","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
})