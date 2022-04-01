import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('groupBy 1', () => {
		const source = 'Products.map(p=>{maxPrice:max(p.price)})'
		const expected = 'Products.map(p=>{maxPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 2', () => {
		const source = 'Products.map(p=>{minPrice:min(p.price)})'
		const expected = 'Products.map(p=>{minPrice:min(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 3', () => {
		const source = 'Products.map(p=>{total:sum(p.price)})'
		const expected = 'Products.map(p=>{total:sum(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 4', () => {
		const source = 'Products.map(p=>{average:avg(p.price)})'
		const expected = 'Products.map(p=>{average:avg(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 5', () => {
		const source = 'Products.map(p=>{count:count(1)})'
		const expected = 'Products.map(p=>{count:count(1)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 6', () => {
		const source = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const expected = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 7', () => {
		const source = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 8', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('groupBy 9', () => {
		const source = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
		const modelExpected :any= [{"name":"maxPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"maxPrice","classtype":"KeyValue","children":[{"name":"max","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"maxPrice","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const modelExpected :any= [{"name":"minPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"minPrice","classtype":"KeyValue","children":[{"name":"min","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"minPrice","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const modelExpected :any= [{"name":"total","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"total","classtype":"KeyValue","children":[{"name":"sum","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"total","type":"any"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
		const modelExpected :any= [{"name":"average","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"average","classtype":"KeyValue","children":[{"name":"avg","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"average","type":"any"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const modelExpected :any= [{"name":"count","type":"any"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"count","classtype":"KeyValue","children":[{"name":"count","classtype":"FunctionRef","children":[{"name":1,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"count","type":"any"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const modelExpected :any= [{"name":"category","type":"integer"},{"name":"largestPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"},{"name":"largestPrice","classtype":"KeyValue","children":[{"name":"max","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"groupBy","classtype":"GroupBy","children":[{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"integer"},{"name":"largestPrice","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"largestPrice","classtype":"KeyValue","children":[{"name":"max","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"groupBy","classtype":"GroupBy","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"any"}]
		const parametersExpected:any = [{"name":"id","type":"integer"}]
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"filter","classtype":"Filter","children":[{"name":"===","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"},{"name":"id","classtype":"Variable","children":[],"type":"integer","number":1}],"type":"any"}],"type":"any"},{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"name","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Products","alias":"p"}],"type":"any"},{"name":"source","classtype":"KeyValue","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":"result","classtype":"KeyValue","children":[{"name":"abs","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"}],"type":"any","columns":[{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"any"}],"parameters":[{"name":"id","type":"integer"}],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const modelExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}]
		const parametersExpected:any = []
		const metadataExpected :any= {"name":"select","classtype":"Sentence","children":[{"name":"Products.p","classtype":"From","children":[],"type":"any"},{"name":"map","classtype":"Map","children":[{"name":"obj","classtype":"Obj","children":[{"name":"category","classtype":"KeyValue","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"largestPrice","classtype":"KeyValue","children":[{"name":"max","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"object"}],"type":"any"},{"name":"groupBy","classtype":"GroupBy","children":[{"name":"name","classtype":"Field","children":[],"type":"string","entity":"Categories","alias":"c"}],"type":"any"},{"name":"having","classtype":"Having","children":[{"name":">","classtype":"Operator","children":[{"name":"max","classtype":"FunctionRef","children":[{"name":"price","classtype":"Field","children":[],"type":"decimal","entity":"Products","alias":"p"}],"type":"any"},{"name":100,"classtype":"Constant2","children":[],"type":"number"}],"type":"any"}],"type":"any"},{"name":"Categories.c","classtype":"Join","children":[{"name":"==","classtype":"Operator","children":[{"name":"id","classtype":"Field","children":[],"type":"integer","entity":"Categories","alias":"c"},{"name":"categoryId","classtype":"Field","children":[],"type":"integer","entity":"Products","alias":"p"}],"type":"any"}],"type":"any"}],"type":"any","columns":[{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}],"parameters":[],"entity":"Products","constraints":[]}
		const constraintsExpected :any= {"entity":"Products","constraints":[]}
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
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT MAX(p.UnitPrice) AS `maxPrice` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT MAX(p.UnitPrice) AS \"maxPrice\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT MAX(p.UnitPrice) AS `maxPrice` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT MIN(p.UnitPrice) AS `minPrice` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT MIN(p.UnitPrice) AS \"minPrice\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT MIN(p.UnitPrice) AS `minPrice` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT SUM(p.UnitPrice) AS `total` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT SUM(p.UnitPrice) AS \"total\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT SUM(p.UnitPrice) AS `total` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT AVG(p.UnitPrice) AS `average` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT AVG(p.UnitPrice) AS \"average\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT AVG(p.UnitPrice) AS `average` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT COUNT(1) AS `count` FROM Products p  ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT COUNT(1) AS \"count\" FROM Products p  ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT COUNT(1) AS `count` FROM Products p  ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.CategoryID AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p  GROUP BY p.CategoryID ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.CategoryID AS \"category\", MAX(p.UnitPrice) AS \"largestPrice\" FROM Products p  GROUP BY p.CategoryID ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.CategoryID AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p  GROUP BY p.CategoryID ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", MAX(p.UnitPrice) AS \"largestPrice\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT p.ProductName AS `name`, p.UnitPrice AS `source`, ABS(p.UnitPrice) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT p.ProductName AS \"name\", p.UnitPrice AS \"source\", ABS(p.UnitPrice) AS \"result\" FROM Products p  WHERE p.ProductID = $1 ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT p.ProductName AS `name`, p.UnitPrice AS `source`, ABS(p.UnitPrice) AS `result` FROM Products p  WHERE p.ProductID = ? ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const mysqlExpected = {"entity":"Products","dialect":"mysql","dataSource":"mysql","sentence":"SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","childs":[]}
		let mysql = orm.sentence(expression,'default','mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Products","dialect":"postgres","dataSource":"postgres","sentence":"SELECT c.CategoryName AS \"category\", MAX(p.UnitPrice) AS \"largestPrice\" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","childs":[]}
		let postgres = orm.sentence(expression,'default','postgres')
		expect(postgresExpected).toStrictEqual(postgres)
		const mariadbExpected = {"entity":"Products","dialect":"mariadb","dataSource":"mariadb","sentence":"SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 ","childs":[]}
		let mariadb = orm.sentence(expression,'default','mariadb')
		expect(mariadbExpected).toStrictEqual(mariadb)
	})
})