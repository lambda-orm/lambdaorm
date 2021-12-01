import { orm } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Execute', () => {
	const data = {"a":{"id":1,"__parentId":[49,60]}}
	const context = {}
	test('include 1', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.customer)'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 2', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>p.details)'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":1,"productId":28,"unitPrice":45.6,"quantity":15,"discount":0},{"orderId":1,"productId":39,"unitPrice":18,"quantity":21,"discount":0},{"orderId":1,"productId":46,"unitPrice":12,"quantity":2,"discount":0}]}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 3', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details,p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":1,"productId":28,"unitPrice":45.6,"quantity":15,"discount":0},{"orderId":1,"productId":39,"unitPrice":18,"quantity":21,"discount":0},{"orderId":1,"productId":46,"unitPrice":12,"quantity":2,"discount":0}],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 4', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":1,"productId":28,"unitPrice":45.6,"quantity":15,"discount":0,"product":{"id":28,"name":"Rssle Sauerkraut","supplierId":12,"categoryId":7,"quantity":"25 - 825 g cans","price":45.6,"inStock":26,"onOrder":0,"reorderLevel":0,"discontinued":true}},{"orderId":1,"productId":39,"unitPrice":18,"quantity":21,"discount":0,"product":{"id":39,"name":"Chartreuse verte","supplierId":18,"categoryId":1,"quantity":"750 cc per bottle","price":18,"inStock":69,"onOrder":0,"reorderLevel":5,"discontinued":false}},{"orderId":1,"productId":46,"unitPrice":12,"quantity":2,"discount":0,"product":{"id":46,"name":"Spegesild","supplierId":21,"categoryId":8,"quantity":"4 - 450 g glasses","price":12,"inStock":95,"onOrder":0,"reorderLevel":0,"discontinued":false}}],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 5', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product.include(p=>p.category)),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"orderId":1,"productId":28,"unitPrice":45.6,"quantity":15,"discount":0,"product":{"id":28,"name":"Rssle Sauerkraut","supplierId":12,"categoryId":7,"quantity":"25 - 825 g cans","price":45.6,"inStock":26,"onOrder":0,"reorderLevel":0,"discontinued":true,"category":{"id":7,"name":"Produce","description":"Dried fruit and bean curd"}}},{"orderId":1,"productId":39,"unitPrice":18,"quantity":21,"discount":0,"product":{"id":39,"name":"Chartreuse verte","supplierId":18,"categoryId":1,"quantity":"750 cc per bottle","price":18,"inStock":69,"onOrder":0,"reorderLevel":5,"discontinued":false,"category":{"id":1,"name":"Beverages","description":"Soft drinks, coffees, teas, beers, and ales"}}},{"orderId":1,"productId":46,"unitPrice":12,"quantity":2,"discount":0,"product":{"id":46,"name":"Spegesild","supplierId":21,"categoryId":8,"quantity":"4 - 450 g glasses","price":12,"inStock":95,"onOrder":0,"reorderLevel":0,"discontinued":false,"category":{"id":8,"name":"Seafood","description":"Seaweed and fish"}}}],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 6', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"quantity":15,"unitPrice":45.6,"productId":28},{"quantity":21,"unitPrice":18,"productId":39},{"quantity":2,"unitPrice":12,"productId":46}],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 7', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.details.include(q=>q.product).map(p=>{quantity:p.quantity,unitPrice:p.unitPrice,productId:p.productId}),p.customer])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","details":[{"quantity":15,"unitPrice":45.6,"productId":28,"product":{"id":28,"name":"Rssle Sauerkraut","supplierId":12,"categoryId":7,"quantity":"25 - 825 g cans","price":45.6,"inStock":26,"onOrder":0,"reorderLevel":0,"discontinued":true}},{"quantity":21,"unitPrice":18,"productId":39,"product":{"id":39,"name":"Chartreuse verte","supplierId":18,"categoryId":1,"quantity":"750 cc per bottle","price":18,"inStock":69,"onOrder":0,"reorderLevel":5,"discontinued":false}},{"quantity":2,"unitPrice":12,"productId":46,"product":{"id":46,"name":"Spegesild","supplierId":21,"categoryId":8,"quantity":"4 - 450 g glasses","price":12,"inStock":95,"onOrder":0,"reorderLevel":0,"discontinued":false}}],"customer":{"id":"ALFKI","name":"Alfreds Futterkiste","contact":"Maria Anders","phone":"Sales Representative","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany"}}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
	test('include 8', async () => {
		const expression = 'Orders.filter(p=>(p.id===id)).include(p=>[p.customer.map(p=>p.name),p.details.include(p=>p.product.include(p=>p.category.map(p=>p.name)).map(p=>p.name)).map(p=>[p.quantity,p.unitPrice])])'
		const expected = [{"id":1,"customerId":"ALFKI","employeeId":6,"orderDate":"1997-08-24T22:00:00.000Z","requiredDate":"1997-09-21T22:00:00.000Z","shippedDate":"1997-09-01T22:00:00.000Z","shipViaId":1,"freight":29.46,"name":"Alfreds Futterkiste","address":"Obere Str. 57","city":"Berlin","region":null,"postalCode":"12209","country":"Germany","customer":{"name":"Alfreds Futterkiste"},"details":[{"quantity":15,"unitPrice":45.6,"product":{"name":"Rssle Sauerkraut","category":{"name":"Produce"}}},{"quantity":21,"unitPrice":18,"product":{"name":"Chartreuse verte","category":{"name":"Beverages"}}},{"quantity":2,"unitPrice":12,"product":{"name":"Spegesild","category":{"name":"Seafood"}}}]}]
		const mysqlResult =  await orm.expression(expression).execute(data,context,'mysql')
		expect(expected).toEqual(mysqlResult)
		const postgresResult =  await orm.expression(expression).execute(data,context,'postgres')
		expect(expected).toEqual(postgresResult)
		const mariadbResult =  await orm.expression(expression).execute(data,context,'mariadb')
		expect(expected).toEqual(mariadbResult)
		const mssqlResult =  await orm.expression(expression).execute(data,context,'mssql')
		expect(expected).toEqual(mssqlResult)
	})
})