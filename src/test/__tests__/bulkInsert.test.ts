import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('bulkInsert 1', () => {
		const source = 'Categories.bulkInsert()'
		const expected = 'Categories.bulkInsert({name:name,description:description})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('bulkInsert 2', () => {
		const source = 'Orders.bulkInsert().include(p=>p.details)'
		const expected = 'Orders.bulkInsert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.bulkInsert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const metadataExpected :any= {"name":"bulkInsert","classtype":"Sentence","children":[{"name":"Categories.c","classtype":"From","children":[],"type":"any"},{"name":"Categories","classtype":"Insert","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Variable","children":[],"type":"string","number":1}],"type":"any","property":"name"},{"name":"description","classtype":"KeyValue","children":[{"name":"description","classtype":"Variable","children":[],"type":"string","number":2}],"type":"any","property":"description"}],"type":"object"}],"type":"any","clause":"bulkInsert"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"entity":"Categories","constraints":[{"message":"Cannot be null property name in entity Categories","condition":"isNotNull(name)"}]}
		const constraintsExpected :any= {"entity":"Categories","constraints":[{"message":"Cannot be null property name in entity Categories","condition":"isNotNull(name)"}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails[]","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const metadataExpected :any= {"name":"bulkInsert","classtype":"Sentence","children":[{"name":"Orders.o","classtype":"From","children":[],"type":"any"},{"name":"Orders","classtype":"Insert","children":[{"name":"obj","classtype":"Obj","children":[{"name":"customerId","classtype":"KeyValue","children":[{"name":"customerId","classtype":"Variable","children":[],"type":"string","number":1}],"type":"any","property":"customerId"},{"name":"employeeId","classtype":"KeyValue","children":[{"name":"employeeId","classtype":"Variable","children":[],"type":"integer","number":2}],"type":"any","property":"employeeId"},{"name":"orderDate","classtype":"KeyValue","children":[{"name":"orderDate","classtype":"Variable","children":[],"type":"datetime","number":3}],"type":"any","property":"orderDate"},{"name":"requiredDate","classtype":"KeyValue","children":[{"name":"requiredDate","classtype":"Variable","children":[],"type":"datetime","number":4}],"type":"any","property":"requiredDate"},{"name":"shippedDate","classtype":"KeyValue","children":[{"name":"shippedDate","classtype":"Variable","children":[],"type":"datetime","number":5}],"type":"any","property":"shippedDate"},{"name":"shipViaId","classtype":"KeyValue","children":[{"name":"shipViaId","classtype":"Variable","children":[],"type":"integer","number":6}],"type":"any","property":"shipViaId"},{"name":"freight","classtype":"KeyValue","children":[{"name":"freight","classtype":"Variable","children":[],"type":"decimal","number":7}],"type":"any","property":"freight"},{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Variable","children":[],"type":"string","number":8}],"type":"any","property":"name"},{"name":"address","classtype":"KeyValue","children":[{"name":"address","classtype":"Variable","children":[],"type":"string","number":9}],"type":"any","property":"address"},{"name":"city","classtype":"KeyValue","children":[{"name":"city","classtype":"Variable","children":[],"type":"string","number":10}],"type":"any","property":"city"},{"name":"region","classtype":"KeyValue","children":[{"name":"region","classtype":"Variable","children":[],"type":"string","number":11}],"type":"any","property":"region"},{"name":"postalCode","classtype":"KeyValue","children":[{"name":"postalCode","classtype":"Variable","children":[],"type":"string","number":12}],"type":"any","property":"postalCode"},{"name":"country","classtype":"KeyValue","children":[{"name":"country","classtype":"Variable","children":[],"type":"string","number":13}],"type":"any","property":"country"}],"type":"object"}],"type":"any","clause":"bulkInsert"},{"name":"details","classtype":"SentenceInclude","children":[{"name":"bulkInsert","classtype":"Sentence","children":[{"name":"OrderDetails.o1","classtype":"From","children":[],"type":"any"},{"name":"OrderDetails","classtype":"Insert","children":[{"name":"obj","classtype":"Obj","children":[{"name":"orderId","classtype":"KeyValue","children":[{"name":"orderId","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any","property":"orderId"},{"name":"productId","classtype":"KeyValue","children":[{"name":"productId","classtype":"Variable","children":[],"type":"integer","number":2}],"type":"any","property":"productId"},{"name":"unitPrice","classtype":"KeyValue","children":[{"name":"unitPrice","classtype":"Variable","children":[],"type":"decimal","number":3}],"type":"any","property":"unitPrice"},{"name":"quantity","classtype":"KeyValue","children":[{"name":"quantity","classtype":"Variable","children":[],"type":"decimal","number":4}],"type":"any","property":"quantity"},{"name":"discount","classtype":"KeyValue","children":[{"name":"discount","classtype":"Variable","children":[],"type":"decimal","number":5}],"type":"any","property":"discount"}],"type":"object"}],"type":"any","clause":"bulkInsert"}],"type":"any","columns":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"entity":"OrderDetails","constraints":[{"message":"Cannot be null property orderId in entity OrderDetails","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity OrderDetails","condition":"isNotNull(productId)"}]}],"type":"any","relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"type":"any","columns":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}]}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"childs":[{"entity":"OrderDetails","constraints":[{"message":"Cannot be null property orderId in entity OrderDetails","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity OrderDetails","condition":"isNotNull(productId)"}]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
})
describe('Sentences', () => {
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const mysqlExpected = {"entity":"Categories","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES ?","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Categories","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Categories","dialect":"mariadb","dataSource":"mariadb","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES ?","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ?","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES ?","childs":[]}]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES","childs":[]}]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Orders","dialect":"mariadb","dataSource":"mariadb","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ?","childs":[{"entity":"OrderDetails","dialect":"mariadb","dataSource":"mariadb","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES ?","childs":[]}]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
})