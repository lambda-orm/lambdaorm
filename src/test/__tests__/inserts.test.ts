import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('insert 1', () => {
		const source = 'Categories.insert()'
		const expected = 'Categories.insert({name:name,description:description})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('insert 2', () => {
		const source = 'Categories.insert(=>{name:name,description:description})'
		const expected = 'Categories.insert(=>{name:name,description:description})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('insert 3', () => {
		const source = 'Categories.insert(entity)'
		const expected = 'Categories.insert({name:entity.name,description:entity.description})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('insert 4', () => {
		const source = 'Orders.insert()'
		const expected = 'Orders.insert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('insert 5', () => {
		const source = 'Orders.insert().include(p=>p.details)'
		const expected = 'Orders.insert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.insert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('insert 6', () => {
		const source = 'Orders.insert().include(p=>[p.details,p.customer])'
		const expected = 'Orders.insert({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>[p.details.insert({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}),p.customer.insert({id:id,name:name,contact:contact,phone:phone,address:address,city:city,region:region,postalCode:postalCode,country:country})])'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('insert 1', async () => {
		const expression = 'Categories.insert()'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const metadataExpected :any= {"name":"insert","type":"Sentence","children":[{"name":"Categories.c","type":"From","children":[]},{"name":"Categories","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":1}],"property":"name"},{"name":"description","type":"KeyValue","children":[{"name":"description","type":"Variable","children":[],"number":2}],"property":"description"}]}],"sentence":"insert"}],"fields":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"name","type":"string","value":"Beverages20"},{"name":"description","type":"string","value":"Soft drinks, coffees, teas, beers, and ales"}],"entity":"Categories"}
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
	test('insert 2', async () => {
		const expression = 'Categories.insert(=>{name:name,description:description})'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const metadataExpected :any= {"name":"insert","type":"Sentence","children":[{"name":"Categories.c","type":"From","children":[]},{"name":"Categories","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":1}],"property":"name"},{"name":"description","type":"KeyValue","children":[{"name":"description","type":"Variable","children":[],"number":2}],"property":"description"}]}],"sentence":"insert"}],"fields":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"name","type":"string","value":"Beverages21"},{"name":"description","type":"string","value":"Soft drinks, coffees, teas, beers, and ales"}],"entity":"Categories"}
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
	test('insert 3', async () => {
		const expression = 'Categories.insert(entity)'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"description","type":"string"}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.description","type":"string"}]
		const metadataExpected :any= {"name":"insert","type":"Sentence","children":[{"name":"Categories.c","type":"From","children":[]},{"name":"Categories","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"name","type":"KeyValue","children":[{"name":"entity.name","type":"Variable","children":[],"number":1}],"property":"name"},{"name":"description","type":"KeyValue","children":[{"name":"entity.description","type":"Variable","children":[],"number":2}],"property":"description"}]}],"sentence":"insert"}],"fields":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"parameters":[{"name":"entity.name","type":"string","value":"Beverages22"},{"name":"entity.description","type":"string","value":"Soft drinks, coffees, teas, beers, and ales"}],"entity":"Categories"}
		const constraintsExpected :any= {"entity":"Categories","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('insert 4', async () => {
		const expression = 'Orders.insert()'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const metadataExpected :any= {"name":"insert","type":"Sentence","children":[{"name":"Orders.o","type":"From","children":[]},{"name":"Orders","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"customerId","type":"KeyValue","children":[{"name":"customerId","type":"Variable","children":[],"number":1}],"property":"customerId"},{"name":"employeeId","type":"KeyValue","children":[{"name":"employeeId","type":"Variable","children":[],"number":2}],"property":"employeeId"},{"name":"orderDate","type":"KeyValue","children":[{"name":"orderDate","type":"Variable","children":[],"number":3}],"property":"orderDate"},{"name":"requiredDate","type":"KeyValue","children":[{"name":"requiredDate","type":"Variable","children":[],"number":4}],"property":"requiredDate"},{"name":"shippedDate","type":"KeyValue","children":[{"name":"shippedDate","type":"Variable","children":[],"number":5}],"property":"shippedDate"},{"name":"shipViaId","type":"KeyValue","children":[{"name":"shipViaId","type":"Variable","children":[],"number":6}],"property":"shipViaId"},{"name":"freight","type":"KeyValue","children":[{"name":"freight","type":"Variable","children":[],"number":7}],"property":"freight"},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":8}],"property":"name"},{"name":"address","type":"KeyValue","children":[{"name":"address","type":"Variable","children":[],"number":9}],"property":"address"},{"name":"city","type":"KeyValue","children":[{"name":"city","type":"Variable","children":[],"number":10}],"property":"city"},{"name":"region","type":"KeyValue","children":[{"name":"region","type":"Variable","children":[],"number":11}],"property":"region"},{"name":"postalCode","type":"KeyValue","children":[{"name":"postalCode","type":"Variable","children":[],"number":12}],"property":"postalCode"},{"name":"country","type":"KeyValue","children":[{"name":"country","type":"Variable","children":[],"number":13}],"property":"country"}]}],"sentence":"insert"}],"fields":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string","value":"VINET"},{"name":"employeeId","type":"integer","value":5},{"name":"orderDate","type":"datetime","value":"1996-07-04 00:00:00"},{"name":"requiredDate","type":"datetime","value":"1996-08-01 00:00:00"},{"name":"shippedDate","type":"datetime","value":"1996-07-16 00:00:00"},{"name":"shipViaId","type":"integer","value":3},{"name":"freight","type":"decimal","value":32.38},{"name":"name","type":"string","value":"Vins et alcools Chevalier"},{"name":"address","type":"string","value":"59 rue de l-Abbaye"},{"name":"city","type":"string","value":"Reims"},{"name":"region","type":"string","value":null},{"name":"postalCode","type":"string","value":"51100"},{"name":"country","type":"string","value":"France"}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.fields).toStrictEqual(metadata.fields)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('insert 5', async () => {
		const expression = 'Orders.insert().include(p=>p.details)'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails[]","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const metadataExpected :any= {"name":"insert","type":"Sentence","children":[{"name":"Orders.o","type":"From","children":[]},{"name":"Orders","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"customerId","type":"KeyValue","children":[{"name":"customerId","type":"Variable","children":[],"number":1}],"property":"customerId"},{"name":"employeeId","type":"KeyValue","children":[{"name":"employeeId","type":"Variable","children":[],"number":2}],"property":"employeeId"},{"name":"orderDate","type":"KeyValue","children":[{"name":"orderDate","type":"Variable","children":[],"number":3}],"property":"orderDate"},{"name":"requiredDate","type":"KeyValue","children":[{"name":"requiredDate","type":"Variable","children":[],"number":4}],"property":"requiredDate"},{"name":"shippedDate","type":"KeyValue","children":[{"name":"shippedDate","type":"Variable","children":[],"number":5}],"property":"shippedDate"},{"name":"shipViaId","type":"KeyValue","children":[{"name":"shipViaId","type":"Variable","children":[],"number":6}],"property":"shipViaId"},{"name":"freight","type":"KeyValue","children":[{"name":"freight","type":"Variable","children":[],"number":7}],"property":"freight"},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":8}],"property":"name"},{"name":"address","type":"KeyValue","children":[{"name":"address","type":"Variable","children":[],"number":9}],"property":"address"},{"name":"city","type":"KeyValue","children":[{"name":"city","type":"Variable","children":[],"number":10}],"property":"city"},{"name":"region","type":"KeyValue","children":[{"name":"region","type":"Variable","children":[],"number":11}],"property":"region"},{"name":"postalCode","type":"KeyValue","children":[{"name":"postalCode","type":"Variable","children":[],"number":12}],"property":"postalCode"},{"name":"country","type":"KeyValue","children":[{"name":"country","type":"Variable","children":[],"number":13}],"property":"country"}]}],"sentence":"insert"},{"name":"details","type":"SentenceInclude","children":[{"name":"insert","type":"Sentence","children":[{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"orderId","type":"KeyValue","children":[{"name":"orderId","type":"Variable","children":[],"number":1}],"property":"orderId"},{"name":"productId","type":"KeyValue","children":[{"name":"productId","type":"Variable","children":[],"number":2}],"property":"productId"},{"name":"unitPrice","type":"KeyValue","children":[{"name":"unitPrice","type":"Variable","children":[],"number":3}],"property":"unitPrice"},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Variable","children":[],"number":4}],"property":"quantity"},{"name":"discount","type":"KeyValue","children":[{"name":"discount","type":"Variable","children":[],"number":5}],"property":"discount"}]}],"sentence":"insert"}],"fields":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer","value":832},{"name":"productId","type":"integer","value":72},{"name":"unitPrice","type":"decimal","value":34.8},{"name":"quantity","type":"decimal","value":5},{"name":"discount","type":"decimal","value":10}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}}],"fields":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string","value":"VINET"},{"name":"employeeId","type":"integer","value":5},{"name":"orderDate","type":"datetime","value":"1996-07-04 00:00:00"},{"name":"requiredDate","type":"datetime","value":"1996-08-01 00:00:00"},{"name":"shippedDate","type":"datetime","value":"1996-07-16 00:00:00"},{"name":"shipViaId","type":"integer","value":3},{"name":"freight","type":"decimal","value":32.38},{"name":"name","type":"string","value":"Vins et alcools Chevalier"},{"name":"address","type":"string","value":"59 rue de l-Abbaye"},{"name":"city","type":"string","value":"Reims"},{"name":"region","type":"string","value":null},{"name":"postalCode","type":"string","value":"51100"},{"name":"country","type":"string","value":"France"}],"entity":"Orders"}
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
	test('insert 6', async () => {
		const expression = 'Orders.insert().include(p=>[p.details,p.customer])'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails[]","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]},{"name":"customer","type":"Customers","childs":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"OrderDetails","childs":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]},{"name":"customer","type":"Customers","childs":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]}]
		const metadataExpected :any= {"name":"insert","type":"Sentence","children":[{"name":"Orders.o","type":"From","children":[]},{"name":"Orders","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"customerId","type":"KeyValue","children":[{"name":"customerId","type":"Variable","children":[],"number":1}],"property":"customerId"},{"name":"employeeId","type":"KeyValue","children":[{"name":"employeeId","type":"Variable","children":[],"number":2}],"property":"employeeId"},{"name":"orderDate","type":"KeyValue","children":[{"name":"orderDate","type":"Variable","children":[],"number":3}],"property":"orderDate"},{"name":"requiredDate","type":"KeyValue","children":[{"name":"requiredDate","type":"Variable","children":[],"number":4}],"property":"requiredDate"},{"name":"shippedDate","type":"KeyValue","children":[{"name":"shippedDate","type":"Variable","children":[],"number":5}],"property":"shippedDate"},{"name":"shipViaId","type":"KeyValue","children":[{"name":"shipViaId","type":"Variable","children":[],"number":6}],"property":"shipViaId"},{"name":"freight","type":"KeyValue","children":[{"name":"freight","type":"Variable","children":[],"number":7}],"property":"freight"},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":8}],"property":"name"},{"name":"address","type":"KeyValue","children":[{"name":"address","type":"Variable","children":[],"number":9}],"property":"address"},{"name":"city","type":"KeyValue","children":[{"name":"city","type":"Variable","children":[],"number":10}],"property":"city"},{"name":"region","type":"KeyValue","children":[{"name":"region","type":"Variable","children":[],"number":11}],"property":"region"},{"name":"postalCode","type":"KeyValue","children":[{"name":"postalCode","type":"Variable","children":[],"number":12}],"property":"postalCode"},{"name":"country","type":"KeyValue","children":[{"name":"country","type":"Variable","children":[],"number":13}],"property":"country"}]}],"sentence":"insert"},{"name":"details","type":"SentenceInclude","children":[{"name":"insert","type":"Sentence","children":[{"name":"OrderDetails.o1","type":"From","children":[]},{"name":"OrderDetails","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"orderId","type":"KeyValue","children":[{"name":"orderId","type":"Variable","children":[],"number":1}],"property":"orderId"},{"name":"productId","type":"KeyValue","children":[{"name":"productId","type":"Variable","children":[],"number":2}],"property":"productId"},{"name":"unitPrice","type":"KeyValue","children":[{"name":"unitPrice","type":"Variable","children":[],"number":3}],"property":"unitPrice"},{"name":"quantity","type":"KeyValue","children":[{"name":"quantity","type":"Variable","children":[],"number":4}],"property":"quantity"},{"name":"discount","type":"KeyValue","children":[{"name":"discount","type":"Variable","children":[],"number":5}],"property":"discount"}]}],"sentence":"insert"}],"fields":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer","value":833},{"name":"productId","type":"integer","value":72},{"name":"unitPrice","type":"decimal","value":34.8},{"name":"quantity","type":"decimal","value":5},{"name":"discount","type":"decimal","value":10}],"entity":"OrderDetails"}],"relation":{"name":"details","type":"manyToOne","composite":true,"from":"id","entity":"OrderDetails","weak":true,"to":"orderId","target":"order"}},{"name":"customer","type":"SentenceInclude","children":[{"name":"insert","type":"Sentence","children":[{"name":"Customers.c","type":"From","children":[]},{"name":"Customers","type":"Insert","children":[{"name":"obj","type":"Obj","children":[{"name":"id","type":"KeyValue","children":[{"name":"id","type":"Variable","children":[],"number":1}],"property":"id"},{"name":"name","type":"KeyValue","children":[{"name":"name","type":"Variable","children":[],"number":2}],"property":"name"},{"name":"contact","type":"KeyValue","children":[{"name":"contact","type":"Variable","children":[],"number":3}],"property":"contact"},{"name":"phone","type":"KeyValue","children":[{"name":"phone","type":"Variable","children":[],"number":4}],"property":"phone"},{"name":"address","type":"KeyValue","children":[{"name":"address","type":"Variable","children":[],"number":5}],"property":"address"},{"name":"city","type":"KeyValue","children":[{"name":"city","type":"Variable","children":[],"number":6}],"property":"city"},{"name":"region","type":"KeyValue","children":[{"name":"region","type":"Variable","children":[],"number":7}],"property":"region"},{"name":"postalCode","type":"KeyValue","children":[{"name":"postalCode","type":"Variable","children":[],"number":8}],"property":"postalCode"},{"name":"country","type":"KeyValue","children":[{"name":"country","type":"Variable","children":[],"number":9}],"property":"country"}]}],"sentence":"insert"}],"fields":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"entity":"Customers"}],"relation":{"name":"customer","from":"customerId","entity":"Customers","to":"id","target":"orders","targetComposite":true,"type":"oneToMany","weak":false}}],"fields":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string","value":"VINET"},{"name":"employeeId","type":"integer","value":5},{"name":"orderDate","type":"datetime","value":"1996-07-04 00:00:00"},{"name":"requiredDate","type":"datetime","value":"1996-08-01 00:00:00"},{"name":"shippedDate","type":"datetime","value":"1996-07-16 00:00:00"},{"name":"shipViaId","type":"integer","value":3},{"name":"freight","type":"decimal","value":32.38},{"name":"name","type":"string","value":"Vins et alcools Chevalier"},{"name":"address","type":"string","value":"59 rue de l-Abbaye"},{"name":"city","type":"string","value":"Reims"},{"name":"region","type":"string","value":null},{"name":"postalCode","type":"string","value":"51100"},{"name":"country","type":"string","value":"France"}],"entity":"Orders"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"childs":[{"entity":"OrderDetails","constraints":[{"message":"Cannot be null property orderId in entity OrderDetails","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity OrderDetails","condition":"isNotNull(productId)"}]},{"entity":"Customers","constraints":[{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"},{"message":"Cannot be null property name in entity Customers","condition":"isNotNull(name)"}]}]}
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
	test('insert 1', async () => {
		const expression = 'Categories.insert()'
		const mysqlExpected = {"entity":"Categories","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Categories","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('insert 2', async () => {
		const expression = 'Categories.insert(=>{name:name,description:description})'
		const mysqlExpected = {"entity":"Categories","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Categories","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('insert 3', async () => {
		const expression = 'Categories.insert(entity)'
		const mysqlExpected = {"entity":"Categories","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES(?,?)","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Categories","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Categories(CategoryName,Description) VALUES($1,$2) RETURNING CategoryID AS id","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('insert 4', async () => {
		const expression = 'Orders.insert()'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","childs":[]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING OrderID AS id","childs":[]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('insert 5', async () => {
		const expression = 'Orders.insert().include(p=>p.details)'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(?,?,?,?,?)","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING OrderID AS id","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES($1,$2,$3,$4,$5) RETURNING 0 AS id","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
	test('insert 6', async () => {
		const expression = 'Orders.insert().include(p=>[p.details,p.customer])'
		const mysqlExpected = {"entity":"Orders","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)","childs":[{"entity":"OrderDetails","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO `Order Details`(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES(?,?,?,?,?)","childs":[]},{"entity":"Customers","dialect":"mysql","dataSource":"mysql","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) VALUES(?,?,?,?,?,?,?,?,?)","childs":[]}]}
		let mysql = orm.sentence(expression,'mysql')
		expect(mysqlExpected).toStrictEqual(mysql)
		const postgresExpected = {"entity":"Orders","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING OrderID AS id","childs":[{"entity":"OrderDetails","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO \"Order Details\"(OrderID,ProductID,UnitPrice,Quantity,Discount) VALUES($1,$2,$3,$4,$5) RETURNING 0 AS id","childs":[]},{"entity":"Customers","dialect":"postgres","dataSource":"postgres","sentence":"INSERT INTO Customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING 0 AS id","childs":[]}]}
		let postgres = orm.sentence(expression,'postgres')
		expect(postgresExpected).toStrictEqual(postgres)
	})
})