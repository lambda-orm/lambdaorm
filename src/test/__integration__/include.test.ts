import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const dataContext = {"a":{"id":1,"__parentId":[1]}}
	test('include 1', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.customer)'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 2', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.details)'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[]}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 3', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details,p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 4', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 5', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product.include(p=>p.category)),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 6', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 7', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product).map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 8', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.customer.map(p=>p.name),p.details.include(p=>p.product.include(p=>p.category.map(p=>p.name)).map(p=>p.name)).map(p=>[p.quantity,p.unitPrice])])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","customer":{"name":"Alfreds Futterkiste"},"details":[]}]
		const mysqlResult =  await orm.expression(expression).execute('dataContext,mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute('dataContext,postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute('dataContext,mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute('dataContext,mssql')
		expect(expected).toEqual(mssqlResult)
	})
})