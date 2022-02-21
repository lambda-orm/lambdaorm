import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('groupBy 1', () => {
		const source = 'Products.map(p=>{maxPrice:max(p.price)})'
		const expected = 'Products.map(p=>{maxPrice:max(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 2', () => {
		const source = 'Products.map(p=>{minPrice:min(p.price)})'
		const expected = 'Products.map(p=>{minPrice:min(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 3', () => {
		const source = 'Products.map(p=>{total:sum(p.price)})'
		const expected = 'Products.map(p=>{total:sum(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 4', () => {
		const source = 'Products.map(p=>{average:avg(p.price)})'
		const expected = 'Products.map(p=>{average:avg(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 5', () => {
		const source = 'Products.map(p=>{count:count(1)})'
		const expected = 'Products.map(p=>{count:count(1)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 6', () => {
		const source = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const expected = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 7', () => {
		const source = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 8', () => {
		const source = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const expected = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('groupBy 9', () => {
		const source = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const expected = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
		const modelExpected :any= {"maxPrice":"decimal"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"maxPrice","type":"decimal"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const modelExpected :any= {"minPrice":"decimal"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"minPrice","type":"decimal"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const modelExpected :any= {"total":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"total","type":"any"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
		const modelExpected :any= {"average":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"average","type":"any"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const modelExpected :any= {"count":"any"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"count","type":"any"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const modelExpected :any= {"category":"integer","largestPrice":"decimal"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"integer"},{"name":"largestPrice","type":"decimal"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const modelExpected :any= {"category":"string","largestPrice":"decimal"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const modelExpected :any= {"name":"string","source":"decimal","result":"any"}
		const parametersExpected:any = [{"name":"id","type":"integer","value":1}]
		const fieldsExpected :any= [{"name":"name","type":"string"},{"name":"source","type":"decimal"},{"name":"result","type":"any"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const modelExpected :any= {"category":"string","largestPrice":"decimal"}
		const parametersExpected:any = []
		const fieldsExpected :any= [{"name":"category","type":"string"},{"name":"largestPrice","type":"decimal"}]
		const model = orm.model(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
})
describe('Sentences', () => {
	test('groupBy 1', async () => {
		const expression = 'Products.map(p=>{maxPrice:max(p.price)})'
		const mysqlExpected = 'SELECT MAX(p.UnitPrice) AS `maxPrice` FROM Products p  '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT MAX(p.UnitPrice) AS "maxPrice" FROM Products p  '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 2', async () => {
		const expression = 'Products.map(p=>{minPrice:min(p.price)})'
		const mysqlExpected = 'SELECT MIN(p.UnitPrice) AS `minPrice` FROM Products p  '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT MIN(p.UnitPrice) AS "minPrice" FROM Products p  '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 3', async () => {
		const expression = 'Products.map(p=>{total:sum(p.price)})'
		const mysqlExpected = 'SELECT SUM(p.UnitPrice) AS `total` FROM Products p  '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT SUM(p.UnitPrice) AS "total" FROM Products p  '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 4', async () => {
		const expression = 'Products.map(p=>{average:avg(p.price)})'
		const mysqlExpected = 'SELECT AVG(p.UnitPrice) AS `average` FROM Products p  '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT AVG(p.UnitPrice) AS "average" FROM Products p  '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 5', async () => {
		const expression = 'Products.map(p=>{count:count(1)})'
		const mysqlExpected = 'SELECT COUNT(1) AS `count` FROM Products p  '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT COUNT(1) AS "count" FROM Products p  '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 6', async () => {
		const expression = 'Products.map(p=>{category:p.categoryId,largestPrice:max(p.price)})'
		const mysqlExpected = 'SELECT p.CategoryID AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p  GROUP BY p.CategoryID '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT p.CategoryID AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p  GROUP BY p.CategoryID '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 7', async () => {
		const expression = 'Products.map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const mysqlExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 8', async () => {
		const expression = 'Products.filter(p=>(p.id===id)).map(p=>{name:p.name,source:p.price,result:abs(p.price)})'
		const mysqlExpected = 'SELECT p.ProductName AS `name`, p.UnitPrice AS `source`, ABS(p.UnitPrice) AS `result` FROM Products p  WHERE p.ProductID = ? '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT p.ProductName AS "name", p.UnitPrice AS "source", ABS(p.UnitPrice) AS "result" FROM Products p  WHERE p.ProductID = $1 '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
	test('groupBy 9', async () => {
		const expression = 'Products.having(p=>(max(p.price)>100)).map(p=>{category:p.category.name,largestPrice:max(p.price)})'
		const mysqlExpected = 'SELECT c.CategoryName AS `category`, MAX(p.UnitPrice) AS `largestPrice` FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		let mysql =  orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
		const postgresExpected = 'SELECT c.CategoryName AS "category", MAX(p.UnitPrice) AS "largestPrice" FROM Products p INNER JOIN Categories c ON c.CategoryID = p.CategoryID GROUP BY c.CategoryName HAVING MAX(p.UnitPrice) > 100 '
		let postgres =  orm.sentence(expression,'postgres')
		postgres=Helper.replace(postgres,'\n','; ')
		expect(postgresExpected).toBe(postgres)
	})
})