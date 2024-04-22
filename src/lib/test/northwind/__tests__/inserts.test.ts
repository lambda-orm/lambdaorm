import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/northwind.env' })
	await orm.init('./config/northwind.yaml')
})
describe('Normalize Expression', () => {
	test('insert 1', () => {
		const source = 'Categories.insert()'
		const expected = 'Categories.insert({name:name,description:description})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('insert 2', () => {
		const source = 'Categories.insert(() => [name, description])'
		const expected = 'Categories.insert({name:name,description:description})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('insert 3', () => {
		const source = 'Categories.insert(entity)'
		const expected = 'Categories.insert({name:entity.name,description:entity.description})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('insert 4', () => {
		const source = 'Categories.insert(entity)'
		const expected = 'Categories.insert({name:entity.name,description:entity.description})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('insert 5', () => {
		const source = 'Orders.insert()'
		const expected = 'Orders.insert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('insert 6', () => {
		const source = 'Orders.insert().include(p => p.details)'
		const expected = 'Orders.insert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.insert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('insert 7', () => {
		const source = 'Orders.insert().include(p => [p.details, p.customer])'
		const expected = 'Orders.insert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.insert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('insert 1', async () => {
		const expression = 'Categories.insert()'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":18},"name":"insert","children":[],"type":"any","entity":"Categories","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"constraints":[{"message":"Cannot be null property name in entity Categories","condition":"isNotNull(name)"}],"values":[],"defaults":[],"clause":"insert","alias":"c"}
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
	test('insert 2', async () => {
		const expression = 'Categories.insert(() => [name, description])'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":18},"name":"insert","children":[],"type":"any","entity":"Categories","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"constraints":[{"message":"Cannot be null property name in entity Categories","condition":"isNotNull(name)"}],"values":[],"defaults":[],"clause":"insert","alias":"c"}
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
	test('insert 3', async () => {
		const expression = 'Categories.insert(entity)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.description","type":"string"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":18},"name":"insert","children":[],"type":"any","entity":"Categories","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"entity.name","type":"string"},{"name":"entity.description","type":"string"}],"constraints":[],"values":[],"defaults":[],"clause":"insert","alias":"c"}
		const constraintsExpected :any= {"entity":"Categories","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('insert 4', async () => {
		const expression = 'Categories.insert(entity)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.description","type":"string"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":18},"name":"insert","children":[],"type":"any","entity":"Categories","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"entity.name","type":"string"},{"name":"entity.description","type":"string"}],"constraints":[],"values":[],"defaults":[],"clause":"insert","alias":"c"}
		const constraintsExpected :any= {"entity":"Categories","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('insert 5', async () => {
		const expression = 'Orders.insert()'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":14},"name":"insert","children":[],"type":"any","entity":"Orders","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"values":[],"defaults":[],"clause":"insert","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('insert 6', async () => {
		const expression = 'Orders.insert().include(p => p.details)'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"Orders.details","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":24},"name":"insert","children":[{"classtype":"Sentence","pos":{"ln":0,"col":29},"name":"insert","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"insert","alias":"o1"}],"type":"any","entity":"Orders","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"values":[],"defaults":[],"clause":"insert","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('insert 7', async () => {
		const expression = 'Orders.insert().include(p => [p.details, p.customer])'
		const modelExpected :any= [{"name":"id","type":"integer"},{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]},{"name":"customer","type":"Customers","children":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"Orders.details","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]},{"name":"customer","type":"Customers","children":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":24},"name":"insert","children":[{"classtype":"Sentence","pos":{"ln":0,"col":30},"name":"insert","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"insert","alias":"o1"},{"classtype":"Sentence","pos":{"ln":0,"col":41},"name":"insert","children":[],"type":"any","entity":"Customers","columns":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"constraints":[{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"},{"message":"Cannot be null property name in entity Customers","condition":"isNotNull(name)"}],"values":[],"defaults":[],"clause":"insert","alias":"c"}],"type":"any","entity":"Orders","columns":[{"name":"id","type":"integer","required":false,"autoIncrement":true},{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"values":[],"defaults":[],"clause":"insert","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]},{"entity":"Customers","constraints":[{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"},{"message":"Cannot be null property name in entity Customers","condition":"isNotNull(name)"}]}]}
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
	test('insert 1', async () => {
		const expression = 'Categories.insert()'
		const MySQLExpected = {"entity":"Categories","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Categories","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Categories","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id"}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Categories","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Categories(CategoryName,Description) OUTPUT INSERTED.CategoryID VALUES(@name,@description)"}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Categories","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CategoryName\":{{name}},\"Description\":{{description}}}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Categories","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Categories(CategoryID,CategoryName,Description) VALUES(SQ_CATEGORIES.nextval,:name,:description)"}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('insert 2', async () => {
		const expression = 'Categories.insert(() => [name, description])'
		const MySQLExpected = {"entity":"Categories","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Categories","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Categories","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id"}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Categories","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Categories(CategoryName,Description) OUTPUT INSERTED.CategoryID VALUES(@name,@description)"}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Categories","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CategoryName\":{{name}},\"Description\":{{description}}}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Categories","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Categories(CategoryID,CategoryName,Description) VALUES(SQ_CATEGORIES.nextval,:name,:description)"}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('insert 3', async () => {
		const expression = 'Categories.insert(entity)'
		const MySQLExpected = {"entity":"Categories","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Categories","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Categories","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id"}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Categories","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Categories(CategoryName,Description) OUTPUT INSERTED.CategoryID VALUES(@entity_name,@entity_description)"}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Categories","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CategoryName\":{{entity_name}},\"Description\":{{entity_description}}}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Categories","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Categories(CategoryID,CategoryName,Description) VALUES(SQ_CATEGORIES.nextval,:entity_name,:entity_description)"}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('insert 4', async () => {
		const expression = 'Categories.insert(entity)'
		const MySQLExpected = {"entity":"Categories","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Categories","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)"}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Categories","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id"}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Categories","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Categories(CategoryName,Description) OUTPUT INSERTED.CategoryID VALUES(@entity_name,@entity_description)"}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Categories","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CategoryName\":{{entity_name}},\"Description\":{{entity_description}}}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Categories","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Categories(CategoryID,CategoryName,Description) VALUES(SQ_CATEGORIES.nextval,:entity_name,:entity_description)"}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('insert 5', async () => {
		const expression = 'Orders.insert()'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING OrderID AS id"}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) OUTPUT INSERTED.OrderID VALUES(@customerId,@employeeId,@orderDate,@requiredDate,@shippedDate,@shipViaId,@freight,@name,@address,@city,@region,@postalCode,@country)"}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CustomerID\":{{customerId}},\"EmployeeID\":{{employeeId}},\"OrderDate\":{{orderDate}},\"RequiredDate\":{{requiredDate}},\"ShippedDate\":{{shippedDate}},\"ShipVia\":{{shipViaId}},\"Freight\":{{freight}},\"ShipName\":{{name}},\"ShipAddress\":{{address}},\"ShipCity\":{{city}},\"ShipRegion\":{{region}},\"ShipPostalCode\":{{postalCode}},\"ShipCountry\":{{country}}}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Orders(OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(SQ_ORDERS.nextval,:customerId,:employeeId,:orderDate,:requiredDate,:shippedDate,:shipViaId,:freight,:name,:address,:city,:region,:postalCode,:country)"}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('insert 6', async () => {
		const expression = 'Orders.insert().include(p => p.details)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(?,?,?,?,?)"}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(?,?,?,?,?)"}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING OrderID AS id","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES($1,$2,$3,$4,$5) RETURNING 0 AS id"}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) OUTPUT INSERTED.OrderID VALUES(@customerId,@employeeId,@orderDate,@requiredDate,@shippedDate,@shipViaId,@freight,@name,@address,@city,@region,@postalCode,@country)","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO [Order Details](OrderID,ProductID,UnitPrice,Quantity,Discount) OUTPUT INSERTED.0 VALUES(@orderId,@productId,@unitPrice,@quantity,@discount)"}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CustomerID\":{{customerId}},\"EmployeeID\":{{employeeId}},\"OrderDate\":{{orderDate}},\"RequiredDate\":{{requiredDate}},\"ShippedDate\":{{shippedDate}},\"ShipVia\":{{shipViaId}},\"Freight\":{{freight}},\"ShipName\":{{name}},\"ShipAddress\":{{address}},\"ShipCity\":{{city}},\"ShipRegion\":{{region}},\"ShipPostalCode\":{{postalCode}},\"ShipCountry\":{{country}}}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"OrderID\":{{orderId}},\"ProductID\":{{productId}},\"UnitPrice\":{{unitPrice}},\"Quantity\":{{quantity}},\"Discount\":{{discount}}}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"OrderID\":{{orderId}},\"ProductID\":{{productId}},\"UnitPrice\":{{unitPrice}},\"Quantity\":{{quantity}},\"Discount\":{{discount}}}"}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Orders(OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(SQ_ORDERS.nextval,:customerId,:employeeId,:orderDate,:requiredDate,:shippedDate,:shipViaId,:freight,:name,:address,:city,:region,:postalCode,:country)","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(:orderId,:productId,:unitPrice,:quantity,:discount)"}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('insert 7', async () => {
		const expression = 'Orders.insert().include(p => [p.details, p.customer])'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(?,?,?,?,?)"},{"entity":"Customers","dialect":"MySQL","source":"MySQL","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) VALUES(?,?,?,?,?,?,?,?,?)"}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(?,?,?,?,?)"},{"entity":"Customers","dialect":"MariaDB","source":"MariaDB","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) VALUES(?,?,?,?,?,?,?,?,?)"}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING OrderID AS id","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES($1,$2,$3,$4,$5) RETURNING 0 AS id"},{"entity":"Customers","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING 0 AS id"}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) OUTPUT INSERTED.OrderID VALUES(@customerId,@employeeId,@orderDate,@requiredDate,@shippedDate,@shipViaId,@freight,@name,@address,@city,@region,@postalCode,@country)","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO [Order Details](OrderID,ProductID,UnitPrice,Quantity,Discount) OUTPUT INSERTED.0 VALUES(@orderId,@productId,@unitPrice,@quantity,@discount)"},{"entity":"Customers","dialect":"SqlServer","source":"SqlServer","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) OUTPUT INSERTED.0 VALUES(@id,@name,@contact,@phone,@address,@city,@region,@postalCode,@country)"}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"CustomerID\":{{customerId}},\"EmployeeID\":{{employeeId}},\"OrderDate\":{{orderDate}},\"RequiredDate\":{{requiredDate}},\"ShippedDate\":{{shippedDate}},\"ShipVia\":{{shipViaId}},\"Freight\":{{freight}},\"ShipName\":{{name}},\"ShipAddress\":{{address}},\"ShipCity\":{{city}},\"ShipRegion\":{{region}},\"ShipPostalCode\":{{postalCode}},\"ShipCountry\":{{country}}}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"OrderID\":{{orderId}},\"ProductID\":{{productId}},\"UnitPrice\":{{unitPrice}},\"Quantity\":{{quantity}},\"Discount\":{{discount}}}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"OrderID\":{{orderId}},\"ProductID\":{{productId}},\"UnitPrice\":{{unitPrice}},\"Quantity\":{{quantity}},\"Discount\":{{discount}}}"},{"entity":"Customers","dialect":"MongoDB","source":"MongoDB","sentence":"{\"_id\":{{id}},\"CompanyName\":{{name}},\"ContactName\":{{contact}},\"ContactTitle\":{{phone}},\"Address\":{{address}},\"City\":{{city}},\"Region\":{{region}},\"PostalCode\":{{postalCode}},\"Country\":{{country}}}"}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Orders(OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(SQ_ORDERS.nextval,:customerId,:employeeId,:orderDate,:requiredDate,:shippedDate,:shipViaId,:freight,:name,:address,:city,:region,:postalCode,:country)","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(:orderId,:productId,:unitPrice,:quantity,:discount)"},{"entity":"Customers","dialect":"Oracle","source":"Oracle","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) VALUES(:id,:name,:contact,:phone,:address,:city,:region,:postalCode,:country)"}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
})