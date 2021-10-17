import { orm,Helper } from '../../orm'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('delete 1', () => {
		const source = 'northwind_1.OrderDetails.delete().filter(p => p.orderId === id)'
		const expected = 'northwind_1.OrderDetails.delete().filter(p=>(p.orderId===id))'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
	test('delete 2', () => {
		const source = 'northwind_1.Orders.delete().include(p => p.details)'
		const expected = 'northwind_1.Orders.filter(p=>(p.id==id)).delete().include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
	test('delete 3', () => {
		const source = 'northwind_1.Orders.delete().filter(p => p.id === id).include(p => p.details)'
		const expected = 'northwind_1.Orders.delete().filter(p=>(p.id===id)).include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
	test('delete 4', () => {
		const source = 'northwind_1.Orders.delete().include(p => p.details)'
		const expected = 'northwind_1.Orders.filter(p=>(p.id==id)).delete().include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
	test('delete 4', () => {
		const source = 'northwind_1.OrderDetails.delete(entity)'
		const expected = 'northwind_1.OrderDetails.filter(p=>((p.orderId==entity.orderId)&&(p.productId==entity.productId))).delete(entity)'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
	test('delete 5', () => {
		const source = 'northwind_1.Orders.delete(entity).include(p => p.details)'
		const expected = 'northwind_1.Orders.filter(p=>(p.id==entity.id)).delete(entity).include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).delete())'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
	test('delete 6', () => {
		const source = 'northwind_1.OrderDetails.deleteAll()'
		const expected = 'northwind_1.OrderDetails.delete()'
		const target = orm.expression(source).complete('northwind')
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('delete 1', async () => {
		const expression = 'northwind_1.OrderDetails.delete().filter(p => p.orderId === id)'
		const modelExpected :any= {}
		const parametersExpected:any = [{"name":"id","type":"integer","value":9}]
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('delete 2', async () => {
		const expression = 'northwind_1.Orders.delete().include(p => p.details)'
		const modelExpected :any= {"details":[{}]}
		const parametersExpected:any = [{"name":"id","type":"integer","value":4}]
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('delete 3', async () => {
		const expression = 'northwind_1.Orders.delete().filter(p => p.id === id).include(p => p.details)'
		const modelExpected :any= {"details":[{}]}
		const parametersExpected:any = [{"name":"id","type":"integer","value":2}]
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('delete 4', async () => {
		const expression = 'northwind_1.Orders.delete().include(p => p.details)'
		const modelExpected :any= {"details":[{}]}
		const parametersExpected:any = [{"name":"id","type":"integer","value":4}]
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('delete 4', async () => {
		const expression = 'northwind_1.OrderDetails.delete(entity)'
		const modelExpected :any= {}
		const parametersExpected:any = [{"name":"entity.orderId","type":"integer","value":null},{"name":"entity.productId","type":"integer","value":null}]
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('delete 5', async () => {
		const expression = 'northwind_1.Orders.delete(entity).include(p => p.details)'
		const modelExpected :any= {"details":[{}]}
		const parametersExpected:any = [{"name":"entity.id","type":"integer","value":null}]
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('delete 6', async () => {
		const expression = 'northwind_1.OrderDetails.deleteAll()'
		const modelExpected :any= {}
		const parametersExpected:any = []
		const fieldsExpected :any= []
		const model = await orm.expression(expression).model('northwind')
		const metadata = await orm.expression(expression).metadata('northwind')
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
})
describe('Sentences', () => {
	test('delete 1', async () => {
		const expression = 'northwind_1.OrderDetails.delete().filter(p => p.orderId === id)'
		const mariadbExpected = 'DELETE n FROM `Order Details` AS n WHERE n.OrderID = ? '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM [Order Details] n WHERE n.OrderID = :id '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM `Order Details` AS n WHERE n.OrderID = ? '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM "Order Details" n WHERE n.OrderID = :id '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM "Order Details" n WHERE n.OrderID = $1 '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('delete 2', async () => {
		const expression = 'northwind_1.Orders.delete().include(p => p.details)'
		const mariadbExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM Orders n WHERE n.OrderID = :id ; DELETE FROM [Order Details] o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM Orders n WHERE n.OrderID = :id ; DELETE FROM "Order Details" o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM Orders n WHERE n.OrderID = $1 ; DELETE FROM "Order Details" o WHERE (o.OrderID = $1 AND o.ProductID = $2) '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('delete 3', async () => {
		const expression = 'northwind_1.Orders.delete().filter(p => p.id === id).include(p => p.details)'
		const mariadbExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM Orders n WHERE n.OrderID = :id ; DELETE FROM [Order Details] o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM Orders n WHERE n.OrderID = :id ; DELETE FROM "Order Details" o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM Orders n WHERE n.OrderID = $1 ; DELETE FROM "Order Details" o WHERE (o.OrderID = $1 AND o.ProductID = $2) '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('delete 4', async () => {
		const expression = 'northwind_1.Orders.delete().include(p => p.details)'
		const mariadbExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM Orders n WHERE n.OrderID = :id ; DELETE FROM [Order Details] o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM Orders n WHERE n.OrderID = :id ; DELETE FROM "Order Details" o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM Orders n WHERE n.OrderID = $1 ; DELETE FROM "Order Details" o WHERE (o.OrderID = $1 AND o.ProductID = $2) '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('delete 4', async () => {
		const expression = 'northwind_1.OrderDetails.delete(entity)'
		const mariadbExpected = 'DELETE n FROM `Order Details` AS n WHERE (n.OrderID = ? AND n.ProductID = ?) '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM [Order Details] n WHERE (n.OrderID = :entity.orderId AND n.ProductID = :entity.productId) '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM `Order Details` AS n WHERE (n.OrderID = ? AND n.ProductID = ?) '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM "Order Details" n WHERE (n.OrderID = :entity.orderId AND n.ProductID = :entity.productId) '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM "Order Details" n WHERE (n.OrderID = $1 AND n.ProductID = $2) '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('delete 5', async () => {
		const expression = 'northwind_1.Orders.delete(entity).include(p => p.details)'
		const mariadbExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM Orders n WHERE n.OrderID = :entity.id ; DELETE FROM [Order Details] o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM Orders AS n WHERE n.OrderID = ? ; DELETE o FROM `Order Details` AS o WHERE (o.OrderID = ? AND o.ProductID = ?) '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM Orders n WHERE n.OrderID = :entity.id ; DELETE FROM "Order Details" o WHERE (o.OrderID = :orderId AND o.ProductID = :productId) '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM Orders n WHERE n.OrderID = $1 ; DELETE FROM "Order Details" o WHERE (o.OrderID = $1 AND o.ProductID = $2) '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('delete 6', async () => {
		const expression = 'northwind_1.OrderDetails.deleteAll()'
		const mariadbExpected = 'DELETE n FROM `Order Details` AS n '
		let mariadb =  await orm.expression(expression).sentence('mariadb', 'northwind')
		mariadb=Helper.replace(mariadb,'\n','; ')
		expect(mariadbExpected).toBe(mariadb)
		const mssqlExpected = 'DELETE FROM [Order Details] n '
		let mssql =  await orm.expression(expression).sentence('mssql', 'northwind')
		mssql=Helper.replace(mssql,'\n','; ')
		expect(mssqlExpected).toBe(mssql)
		const mysqlExpected = 'DELETE n FROM `Order Details` AS n '
		let mysql =  await orm.expression(expression).sentence('mysql', 'northwind')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const oracleExpected = 'DELETE FROM "Order Details" n '
		let oracle =  await orm.expression(expression).sentence('oracle', 'northwind')
		oracle=Helper.replace(oracle,'\n','; ')
		expect(oracleExpected).toBe(oracle)
		const postgresExpected = 'DELETE FROM "Order Details" n '
		let postgres =  await orm.expression(expression).sentence('postgres', 'northwind')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
})