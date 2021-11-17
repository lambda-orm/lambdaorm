import { orm,Helper } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('bulkInsert 1', () => {
		const source = 'Categories.bulkInsert()'
		const expected = 'Categories.bulkInsert({name:name,description:description})'
		const target = orm.expression(source).complete('source')
		expect(expected).toBe(target)
	})
	test('bulkInsert 2', () => {
		const source = 'Orders.bulkInsert().include(p=>p.details)'
		const expected = 'Orders.bulkInsert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.bulkInsert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.expression(source).complete('source')
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const modelExpected :any= {"name":"string","description":"string"}
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const model = await orm.expression(expression).model('source')
		const metadata = await orm.expression(expression).metadata('source')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const modelExpected :any= {"customerId":"string","employeeId":"integer","orderDate":"datetime","requiredDate":"datetime","shippedDate":"datetime","shipViaId":"integer","freight":"decimal","name":"string","address":"string","city":"string","region":"string","postalCode":"string","country":"string","details":[{"orderId":"integer","productId":"integer","unitPrice":"decimal","quantity":"decimal","discount":"decimal"}]}
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const fieldsExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const model = await orm.expression(expression).model('source')
		const metadata = await orm.expression(expression).metadata('source')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
})
describe('Sentences', () => {
	test('bulkInsert 1', async () => {
		const expression = 'Categories.bulkInsert()'
		const mysqlExpected = 'INSERT INTO Categories(CategoryName,Description) VALUES ?'
		let mysql =  await orm.expression(expression).sentence('mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'INSERT INTO Categories(CategoryName,Description) VALUES'
		let postgres =  await orm.expression(expression).sentence('postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('bulkInsert 2', async () => {
		const expression = 'Orders.bulkInsert().include(p=>p.details)'
		const mysqlExpected = 'INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ?; INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES ?'
		let mysql =  await orm.expression(expression).sentence('mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES; INSERT INTO "Order Details"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES'
		let postgres =  await orm.expression(expression).sentence('postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
})