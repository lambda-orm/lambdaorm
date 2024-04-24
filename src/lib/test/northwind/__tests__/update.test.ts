import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/northwind.env' })
	await orm.init('./config/northwind.yaml')
})
describe('Normalize Expression', () => {
	test('update 1', () => {
		const source = 'Orders.update()'
		const expected = 'Orders.update(p=>{customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).filter(p=>(p.id==id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 2', () => {
		const source = 'Orders.update(entity)'
		const expected = 'Orders.update(p=>{customerId:entity.customerId,employeeId:entity.employeeId,orderDate:entity.orderDate,requiredDate:entity.requiredDate,shippedDate:entity.shippedDate,shipViaId:entity.shipViaId,freight:entity.freight,name:entity.name,address:entity.address,city:entity.city,region:entity.region,postalCode:entity.postalCode,country:entity.country}).filter(p=>(p.id==entity.id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 3', () => {
		const source = 'Orders.updateAll(() => [postalCode])'
		const expected = 'Orders.update(=>{postalCode:postalCode})'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 4', () => {
		const source = 'Orders.update(p => ({ name: entity.name })).filter(p => p.id === entity.id)'
		const expected = 'Orders.update(p=>{name:entity.name}).filter(p=>(p.id==entity.id))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 5', () => {
		const source = 'Orders.update(() => ({ name: entity.name })).include(p => p.details).filter(p => p.id === entity.id)'
		const expected = 'Orders.update(=>{name:entity.name}).filter(p=>(p.id==entity.id)).include(p=>p.details.update(p=>{orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}).filter(p=>((p.orderId==orderId)&&(p.productId==productId))))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 6', () => {
		const source = 'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => p)).filter(p => p.id === entity.id)'
		const expected = 'Orders.update(=>{name:entity.name}).filter(p=>(p.id==entity.id)).include(p=>p.details.update(p=>{unitPrice:unitPrice,quantity:quantity,discount:discount}).filter(p=>((p.orderId==orderId)&&(p.productId==productId))))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 7', () => {
		const source = 'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id)'
		const expected = 'Orders.update(=>{name:entity.name}).filter(p=>(p.id==entity.id)).include(p=>p.details.update(p=>{unitPrice:p.unitPrice,productId:p.productId}).filter(p=>((p.orderId==orderId)&&(p.productId==productId))))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 8', () => {
		const source = 'Orders.update().include(p => p.details)'
		const expected = 'Orders.update(p=>{customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).filter(p=>(p.id==id)).include(p=>p.details.update(p=>{orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}).filter(p=>((p.orderId==orderId)&&(p.productId==productId))))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
	test('update 9', () => {
		const source = 'Customers.update().include(p => p.orders.include(p => p.details))'
		const expected = 'Customers.update(p=>{id:id,name:name,contact:contact,phone:phone,address:address,city:city,region:region,postalCode:postalCode,country:country}).filter(p=>(p.id==id)).include(p=>p.orders.update(p=>{customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).filter(p=>(p.id==id)).include(p=>p.details.update(p=>{orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}).filter(p=>((p.orderId==orderId)&&(p.productId==productId)))))'
		const target = orm.normalize(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('update 1', async () => {
		const expression = 'Orders.update()'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":14},"name":"update","children":[],"type":"any","entity":"Orders","columns":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"integer"}],"constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"values":[],"defaults":[],"clause":"update","alias":"o"}
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
	test('update 2', async () => {
		const expression = 'Orders.update(entity)'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const parametersExpected:any = [{"name":"entity.customerId","type":"string"},{"name":"entity.employeeId","type":"integer"},{"name":"entity.orderDate","type":"dateTime"},{"name":"entity.requiredDate","type":"date"},{"name":"entity.shippedDate","type":"date"},{"name":"entity.shipViaId","type":"integer"},{"name":"entity.freight","type":"decimal"},{"name":"entity.name","type":"string"},{"name":"entity.address","type":"string"},{"name":"entity.city","type":"string"},{"name":"entity.region","type":"string"},{"name":"entity.postalCode","type":"string"},{"name":"entity.country","type":"string"},{"name":"entity.id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":14},"name":"update","children":[],"type":"any","entity":"Orders","columns":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"entity.customerId","type":"string"},{"name":"entity.employeeId","type":"integer"},{"name":"entity.orderDate","type":"dateTime"},{"name":"entity.requiredDate","type":"date"},{"name":"entity.shippedDate","type":"date"},{"name":"entity.shipViaId","type":"integer"},{"name":"entity.freight","type":"decimal"},{"name":"entity.name","type":"string"},{"name":"entity.address","type":"string"},{"name":"entity.city","type":"string"},{"name":"entity.region","type":"string"},{"name":"entity.postalCode","type":"string"},{"name":"entity.country","type":"string"},{"name":"entity.id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 3', async () => {
		const expression = 'Orders.updateAll(() => [postalCode])'
		const modelExpected :any= [{"name":"postalCode","type":"string"}]
		const parametersExpected:any = [{"name":"postalCode","type":"string"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":17},"name":"update","children":[],"type":"any","entity":"Orders","columns":[{"name":"postalCode","type":"string"}],"parameters":[{"name":"postalCode","type":"string"}],"constraints":[],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 4', async () => {
		const expression = 'Orders.update(p => ({ name: entity.name })).filter(p => p.id === entity.id)'
		const modelExpected :any= [{"name":"name","type":"string"}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":51},"name":"update","children":[],"type":"any","entity":"Orders","columns":[{"name":"name","type":"string"}],"parameters":[{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 5', async () => {
		const expression = 'Orders.update(() => ({ name: entity.name })).include(p => p.details).filter(p => p.id === entity.id)'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"},{"name":"details","type":"Orders.details","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":76},"name":"update","children":[{"classtype":"Sentence","pos":{"ln":0,"col":58},"name":"update","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"},{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"update","alias":"o1"}],"type":"any","entity":"Orders","columns":[{"name":"name","type":"string"}],"parameters":[{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"},{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 6', async () => {
		const expression = 'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => p)).filter(p => p.id === entity.id)'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"},{"name":"details","type":"Orders.details","children":[{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":91},"name":"update","children":[{"classtype":"Sentence","pos":{"ln":0,"col":75},"name":"update","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"update","alias":"o1"}],"type":"any","entity":"Orders","columns":[{"name":"name","type":"string"}],"parameters":[{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 7', async () => {
		const expression = 'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id)'
		const modelExpected :any= [{"name":"name","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"unitPrice","type":"decimal"},{"name":"productId","type":"integer"}]}]
		const parametersExpected:any = [{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"},{"name":"details","type":"Orders.details","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":142},"name":"update","children":[{"classtype":"Sentence","pos":{"ln":0,"col":75},"name":"update","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"unitPrice","type":"decimal"},{"name":"productId","type":"integer"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"update","alias":"o1"}],"type":"any","entity":"Orders","columns":[{"name":"name","type":"string"}],"parameters":[{"name":"entity.name","type":"string"},{"name":"entity.id","type":"integer"}],"constraints":[],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 8', async () => {
		const expression = 'Orders.update().include(p => p.details)'
		const modelExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const parametersExpected:any = [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"integer"},{"name":"details","type":"Orders.details","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":24},"name":"update","children":[{"classtype":"Sentence","pos":{"ln":0,"col":29},"name":"update","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"},{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"update","alias":"o1"}],"type":"any","entity":"Orders","columns":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"integer"}],"constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"values":[],"defaults":[],"clause":"update","alias":"o"}
		const constraintsExpected :any= {"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"},{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]}]}
		const model = orm.model(expression)
		const parameters = orm.parameters(expression)
		const constraints = orm.constraints(expression)
		const metadata = orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(metadataExpected.columns).toStrictEqual(metadata.columns)
		expect(parametersExpected).toStrictEqual(parameters)
		expect(constraintsExpected).toStrictEqual(constraints)
	})
	test('update 9', async () => {
		const expression = 'Customers.update().include(p => p.orders.include(p => p.details))'
		const modelExpected :any= [{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"orders","type":"Orders[]","children":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"details","type":"Orders.details[]","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]}]
		const parametersExpected:any = [{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"orders","type":"Orders","children":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"integer"},{"name":"details","type":"Orders.details","children":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}]}]}]
		const metadataExpected :any= {"classtype":"Sentence","pos":{"ln":0,"col":27},"name":"update","children":[{"classtype":"Sentence","pos":{"ln":0,"col":49},"name":"update","children":[{"classtype":"Sentence","pos":{"ln":0,"col":54},"name":"update","children":[],"type":"any","entity":"Orders.details","columns":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"}],"parameters":[{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"},{"name":"unitPrice","type":"decimal"},{"name":"quantity","type":"decimal"},{"name":"discount","type":"decimal"},{"name":"orderId","type":"integer"},{"name":"productId","type":"integer"}],"constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"},{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}],"values":[],"defaults":[],"clause":"update","alias":"o1"}],"type":"any","entity":"Orders","columns":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"dateTime"},{"name":"requiredDate","type":"date"},{"name":"shippedDate","type":"date"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"integer"}],"constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"values":[],"defaults":[],"clause":"update","alias":"o"}],"type":"any","entity":"Customers","columns":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}],"parameters":[{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"},{"name":"id","type":"string"}],"constraints":[{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"},{"message":"Cannot be null property name in entity Customers","condition":"isNotNull(name)"},{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"}],"values":[],"defaults":[],"clause":"update","alias":"c"}
		const constraintsExpected :any= {"entity":"Customers","constraints":[{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"},{"message":"Cannot be null property name in entity Customers","condition":"isNotNull(name)"},{"message":"Cannot be null property id in entity Customers","condition":"isNotNull(id)"}],"children":[{"entity":"Orders","constraints":[{"message":"Cannot be null property customerId in entity Orders","condition":"isNotNull(customerId)"},{"message":"Cannot be null property employeeId in entity Orders","condition":"isNotNull(employeeId)"}],"children":[{"entity":"Orders.details","constraints":[{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"},{"message":"Cannot be null property orderId in entity Orders.details","condition":"isNotNull(orderId)"},{"message":"Cannot be null property productId in entity Orders.details","condition":"isNotNull(productId)"}]}]}]}
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
	test('update 1', async () => {
		const expression = 'Orders.update()'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? "}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? "}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET CustomerID = $1,EmployeeID = $2,OrderDate = $3,RequiredDate = $4,ShippedDate = $5,ShipVia = $6,Freight = $7,ShipName = $8,ShipAddress = $9,ShipCity = $10,ShipRegion = $11,ShipPostalCode = $12,ShipCountry = $13 WHERE o.OrderID = $14 "}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET CustomerID = @customerId,EmployeeID = @employeeId,OrderDate = @orderDate,RequiredDate = @requiredDate,ShippedDate = @shippedDate,ShipVia = @shipViaId,Freight = @freight,ShipName = @name,ShipAddress = @address,ShipCity = @city,ShipRegion = @region,ShipPostalCode = @postalCode,ShipCountry = @country FROM Orders o WHERE o.OrderID = @id "}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"CustomerID\\\":\\\"$customerId$\\\",\\\"EmployeeID\\\":\\\"$employeeId$\\\",\\\"OrderDate\\\":\\\"$orderDate$\\\",\\\"RequiredDate\\\":\\\"$requiredDate$\\\",\\\"ShippedDate\\\":\\\"$shippedDate$\\\",\\\"ShipVia\\\":\\\"$shipViaId$\\\",\\\"Freight\\\":\\\"$freight$\\\",\\\"ShipName\\\":\\\"$name$\\\",\\\"ShipAddress\\\":\\\"$address$\\\",\\\"ShipCity\\\":\\\"$city$\\\",\\\"ShipRegion\\\":\\\"$region$\\\",\\\"ShipPostalCode\\\":\\\"$postalCode$\\\",\\\"ShipCountry\\\":\\\"$country$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$id$\\\"}\"}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET CustomerID = :customerId,EmployeeID = :employeeId,OrderDate = :orderDate,RequiredDate = :requiredDate,ShippedDate = :shippedDate,ShipVia = :shipViaId,Freight = :freight,ShipName = :name,ShipAddress = :address,ShipCity = :city,ShipRegion = :region,ShipPostalCode = :postalCode,ShipCountry = :country WHERE o.OrderID = :id "}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 2', async () => {
		const expression = 'Orders.update(entity)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? "}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? "}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET CustomerID = $1,EmployeeID = $2,OrderDate = $3,RequiredDate = $4,ShippedDate = $5,ShipVia = $6,Freight = $7,ShipName = $8,ShipAddress = $9,ShipCity = $10,ShipRegion = $11,ShipPostalCode = $12,ShipCountry = $13 WHERE o.OrderID = $14 "}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET CustomerID = @entity_customerId,EmployeeID = @entity_employeeId,OrderDate = @entity_orderDate,RequiredDate = @entity_requiredDate,ShippedDate = @entity_shippedDate,ShipVia = @entity_shipViaId,Freight = @entity_freight,ShipName = @entity_name,ShipAddress = @entity_address,ShipCity = @entity_city,ShipRegion = @entity_region,ShipPostalCode = @entity_postalCode,ShipCountry = @entity_country FROM Orders o WHERE o.OrderID = @entity_id "}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"CustomerID\\\":\\\"$entity_customerId$\\\",\\\"EmployeeID\\\":\\\"$entity_employeeId$\\\",\\\"OrderDate\\\":\\\"$entity_orderDate$\\\",\\\"RequiredDate\\\":\\\"$entity_requiredDate$\\\",\\\"ShippedDate\\\":\\\"$entity_shippedDate$\\\",\\\"ShipVia\\\":\\\"$entity_shipViaId$\\\",\\\"Freight\\\":\\\"$entity_freight$\\\",\\\"ShipName\\\":\\\"$entity_name$\\\",\\\"ShipAddress\\\":\\\"$entity_address$\\\",\\\"ShipCity\\\":\\\"$entity_city$\\\",\\\"ShipRegion\\\":\\\"$entity_region$\\\",\\\"ShipPostalCode\\\":\\\"$entity_postalCode$\\\",\\\"ShipCountry\\\":\\\"$entity_country$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$entity_id$\\\"}\"}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET CustomerID = :entity_customerId,EmployeeID = :entity_employeeId,OrderDate = :entity_orderDate,RequiredDate = :entity_requiredDate,ShippedDate = :entity_shippedDate,ShipVia = :entity_shipViaId,Freight = :entity_freight,ShipName = :entity_name,ShipAddress = :entity_address,ShipCity = :entity_city,ShipRegion = :entity_region,ShipPostalCode = :entity_postalCode,ShipCountry = :entity_country WHERE o.OrderID = :entity_id "}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 3', async () => {
		const expression = 'Orders.updateAll(() => [postalCode])'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET ShipPostalCode = ? "}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET ShipPostalCode = ? "}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET ShipPostalCode = $1 "}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET ShipPostalCode = @postalCode FROM Orders o "}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"ShipPostalCode\\\":\\\"$postalCode$\\\"}\",\"filter\":\"{}\"}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET ShipPostalCode = :postalCode "}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 4', async () => {
		const expression = 'Orders.update(p => ({ name: entity.name })).filter(p => p.id === entity.id)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? "}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? "}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET ShipName = $1 WHERE o.OrderID = $2 "}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET ShipName = @entity_name FROM Orders o WHERE o.OrderID = @entity_id "}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"ShipName\\\":\\\"$entity_name$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$entity_id$\\\"}\"}"}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET ShipName = :entity_name WHERE o.OrderID = :entity_id "}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 5', async () => {
		const expression = 'Orders.update(() => ({ name: entity.name })).include(p => p.details).filter(p => p.id === entity.id)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET ShipName = $1 WHERE o.OrderID = $2 ","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE \"Order Details\" o1 SET OrderID = $1,ProductID = $2,UnitPrice = $3,Quantity = $4,Discount = $5 WHERE (o1.OrderID = $6 AND o1.ProductID = $7) "}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET ShipName = @entity_name FROM Orders o WHERE o.OrderID = @entity_id ","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o1 SET OrderID = @orderId,ProductID = @productId,UnitPrice = @unitPrice,Quantity = @quantity,Discount = @discount FROM [Order Details] o1 WHERE (o1.OrderID = @orderId AND o1.ProductID = @productId) "}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"ShipName\\\":\\\"$entity_name$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$entity_id$\\\"}\"}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"OrderID\\\":\\\"$orderId$\\\",\\\"ProductID\\\":\\\"$productId$\\\",\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"OrderID\\\":\\\"$orderId$\\\",\\\"ProductID\\\":\\\"$productId$\\\",\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET ShipName = :entity_name WHERE o.OrderID = :entity_id ","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"UPDATE \"Order Details\" o1 SET OrderID = :orderId,ProductID = :productId,UnitPrice = :unitPrice,Quantity = :quantity,Discount = :discount WHERE (o1.OrderID = :orderId AND o1.ProductID = :productId) "}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 6', async () => {
		const expression = 'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => p)).filter(p => p.id === entity.id)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"UPDATE `Order Details` o1 SET UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE `Order Details` o1 SET UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET ShipName = $1 WHERE o.OrderID = $2 ","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE \"Order Details\" o1 SET UnitPrice = $1,Quantity = $2,Discount = $3 WHERE (o1.OrderID = $4 AND o1.ProductID = $5) "}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET ShipName = @entity_name FROM Orders o WHERE o.OrderID = @entity_id ","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o1 SET UnitPrice = @unitPrice,Quantity = @quantity,Discount = @discount FROM [Order Details] o1 WHERE (o1.OrderID = @orderId AND o1.ProductID = @productId) "}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"ShipName\\\":\\\"$entity_name$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$entity_id$\\\"}\"}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET ShipName = :entity_name WHERE o.OrderID = :entity_id ","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"UPDATE \"Order Details\" o1 SET UnitPrice = :unitPrice,Quantity = :quantity,Discount = :discount WHERE (o1.OrderID = :orderId AND o1.ProductID = :productId) "}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 7', async () => {
		const expression = 'Orders.update(() => ({ name: entity.name })).include(p => p.details.update(p => ({ unitPrice: p.unitPrice, productId: p.productId }))).filter(p => p.id === entity.id)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"UPDATE `Order Details` o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE `Order Details` o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET ShipName = $1 WHERE o.OrderID = $2 ","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE \"Order Details\" o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID WHERE (o1.OrderID = $1 AND o1.ProductID = $2) "}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET ShipName = @entity_name FROM Orders o WHERE o.OrderID = @entity_id ","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID FROM [Order Details] o1 WHERE (o1.OrderID = @orderId AND o1.ProductID = @productId) "}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"ShipName\\\":\\\"$entity_name$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$entity_id$\\\"}\"}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"UnitPrice\\\":\\\"UnitPrice\\\",\\\"ProductID\\\":\\\"ProductID\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"UnitPrice\\\":\\\"UnitPrice\\\",\\\"ProductID\\\":\\\"ProductID\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET ShipName = :entity_name WHERE o.OrderID = :entity_id ","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"UPDATE \"Order Details\" o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID WHERE (o1.OrderID = :orderId AND o1.ProductID = :productId) "}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 8', async () => {
		const expression = 'Orders.update().include(p => p.details)'
		const MySQLExpected = {"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET CustomerID = $1,EmployeeID = $2,OrderDate = $3,RequiredDate = $4,ShippedDate = $5,ShipVia = $6,Freight = $7,ShipName = $8,ShipAddress = $9,ShipCity = $10,ShipRegion = $11,ShipPostalCode = $12,ShipCountry = $13 WHERE o.OrderID = $14 ","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE \"Order Details\" o1 SET OrderID = $1,ProductID = $2,UnitPrice = $3,Quantity = $4,Discount = $5 WHERE (o1.OrderID = $6 AND o1.ProductID = $7) "}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET CustomerID = @customerId,EmployeeID = @employeeId,OrderDate = @orderDate,RequiredDate = @requiredDate,ShippedDate = @shippedDate,ShipVia = @shipViaId,Freight = @freight,ShipName = @name,ShipAddress = @address,ShipCity = @city,ShipRegion = @region,ShipPostalCode = @postalCode,ShipCountry = @country FROM Orders o WHERE o.OrderID = @id ","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o1 SET OrderID = @orderId,ProductID = @productId,UnitPrice = @unitPrice,Quantity = @quantity,Discount = @discount FROM [Order Details] o1 WHERE (o1.OrderID = @orderId AND o1.ProductID = @productId) "}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"CustomerID\\\":\\\"$customerId$\\\",\\\"EmployeeID\\\":\\\"$employeeId$\\\",\\\"OrderDate\\\":\\\"$orderDate$\\\",\\\"RequiredDate\\\":\\\"$requiredDate$\\\",\\\"ShippedDate\\\":\\\"$shippedDate$\\\",\\\"ShipVia\\\":\\\"$shipViaId$\\\",\\\"Freight\\\":\\\"$freight$\\\",\\\"ShipName\\\":\\\"$name$\\\",\\\"ShipAddress\\\":\\\"$address$\\\",\\\"ShipCity\\\":\\\"$city$\\\",\\\"ShipRegion\\\":\\\"$region$\\\",\\\"ShipPostalCode\\\":\\\"$postalCode$\\\",\\\"ShipCountry\\\":\\\"$country$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$id$\\\"}\"}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"OrderID\\\":\\\"$orderId$\\\",\\\"ProductID\\\":\\\"$productId$\\\",\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"OrderID\\\":\\\"$orderId$\\\",\\\"ProductID\\\":\\\"$productId$\\\",\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET CustomerID = :customerId,EmployeeID = :employeeId,OrderDate = :orderDate,RequiredDate = :requiredDate,ShippedDate = :shippedDate,ShipVia = :shipViaId,Freight = :freight,ShipName = :name,ShipAddress = :address,ShipCity = :city,ShipRegion = :region,ShipPostalCode = :postalCode,ShipCountry = :country WHERE o.OrderID = :id ","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"UPDATE \"Order Details\" o1 SET OrderID = :orderId,ProductID = :productId,UnitPrice = :unitPrice,Quantity = :quantity,Discount = :discount WHERE (o1.OrderID = :orderId AND o1.ProductID = :productId) "}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
	test('update 9', async () => {
		const expression = 'Customers.update().include(p => p.orders.include(p => p.details))'
		const MySQLExpected = {"entity":"Customers","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Customers c SET CustomerID = ?,CompanyName = ?,ContactName = ?,ContactTitle = ?,Address = ?,City = ?,Region = ?,PostalCode = ?,Country = ? WHERE c.CustomerID = ? ","children":[{"entity":"Orders","dialect":"MySQL","source":"MySQL","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MySQL","source":"MySQL","sentence":"UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}]}
		let MySQL = orm.plan(expression,{stage:'MySQL'})
		expect(MySQLExpected).toStrictEqual(MySQL)
		const MariaDBExpected = {"entity":"Customers","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Customers c SET CustomerID = ?,CompanyName = ?,ContactName = ?,ContactTitle = ?,Address = ?,City = ?,Region = ?,PostalCode = ?,Country = ? WHERE c.CustomerID = ? ","children":[{"entity":"Orders","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? ","children":[{"entity":"Orders.details","dialect":"MariaDB","source":"MariaDB","sentence":"UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) "}]}]}
		let MariaDB = orm.plan(expression,{stage:'MariaDB'})
		expect(MariaDBExpected).toStrictEqual(MariaDB)
		const PostgreSQLExpected = {"entity":"Customers","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Customers c SET CustomerID = $1,CompanyName = $2,ContactName = $3,ContactTitle = $4,Address = $5,City = $6,Region = $7,PostalCode = $8,Country = $9 WHERE c.CustomerID = $10 ","children":[{"entity":"Orders","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE Orders o SET CustomerID = $1,EmployeeID = $2,OrderDate = $3,RequiredDate = $4,ShippedDate = $5,ShipVia = $6,Freight = $7,ShipName = $8,ShipAddress = $9,ShipCity = $10,ShipRegion = $11,ShipPostalCode = $12,ShipCountry = $13 WHERE o.OrderID = $14 ","children":[{"entity":"Orders.details","dialect":"PostgreSQL","source":"PostgreSQL","sentence":"UPDATE \"Order Details\" o1 SET OrderID = $1,ProductID = $2,UnitPrice = $3,Quantity = $4,Discount = $5 WHERE (o1.OrderID = $6 AND o1.ProductID = $7) "}]}]}
		let PostgreSQL = orm.plan(expression,{stage:'PostgreSQL'})
		expect(PostgreSQLExpected).toStrictEqual(PostgreSQL)
		const SqlServerExpected = {"entity":"Customers","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE c SET CustomerID = @id,CompanyName = @name,ContactName = @contact,ContactTitle = @phone,Address = @address,City = @city,Region = @region,PostalCode = @postalCode,Country = @country FROM Customers c WHERE c.CustomerID = @id ","children":[{"entity":"Orders","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o SET CustomerID = @customerId,EmployeeID = @employeeId,OrderDate = @orderDate,RequiredDate = @requiredDate,ShippedDate = @shippedDate,ShipVia = @shipViaId,Freight = @freight,ShipName = @name,ShipAddress = @address,ShipCity = @city,ShipRegion = @region,ShipPostalCode = @postalCode,ShipCountry = @country FROM Orders o WHERE o.OrderID = @id ","children":[{"entity":"Orders.details","dialect":"SqlServer","source":"SqlServer","sentence":"UPDATE o1 SET OrderID = @orderId,ProductID = @productId,UnitPrice = @unitPrice,Quantity = @quantity,Discount = @discount FROM [Order Details] o1 WHERE (o1.OrderID = @orderId AND o1.ProductID = @productId) "}]}]}
		let SqlServer = orm.plan(expression,{stage:'SqlServer'})
		expect(SqlServerExpected).toStrictEqual(SqlServer)
		const MongoDBExpected = {"entity":"Customers","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"_id\\\":\\\"$id$\\\",\\\"CompanyName\\\":\\\"$name$\\\",\\\"ContactName\\\":\\\"$contact$\\\",\\\"ContactTitle\\\":\\\"$phone$\\\",\\\"Address\\\":\\\"$address$\\\",\\\"City\\\":\\\"$city$\\\",\\\"Region\\\":\\\"$region$\\\",\\\"PostalCode\\\":\\\"$postalCode$\\\",\\\"Country\\\":\\\"$country$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$id$\\\"}\"}","children":[{"entity":"Orders","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"CustomerID\\\":\\\"$customerId$\\\",\\\"EmployeeID\\\":\\\"$employeeId$\\\",\\\"OrderDate\\\":\\\"$orderDate$\\\",\\\"RequiredDate\\\":\\\"$requiredDate$\\\",\\\"ShippedDate\\\":\\\"$shippedDate$\\\",\\\"ShipVia\\\":\\\"$shipViaId$\\\",\\\"Freight\\\":\\\"$freight$\\\",\\\"ShipName\\\":\\\"$name$\\\",\\\"ShipAddress\\\":\\\"$address$\\\",\\\"ShipCity\\\":\\\"$city$\\\",\\\"ShipRegion\\\":\\\"$region$\\\",\\\"ShipPostalCode\\\":\\\"$postalCode$\\\",\\\"ShipCountry\\\":\\\"$country$\\\"}\",\"filter\":\"{\\\"_id\\\":\\\"$id$\\\"}\"}","children":[{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"OrderID\\\":\\\"$orderId$\\\",\\\"ProductID\\\":\\\"$productId$\\\",\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"},{"entity":"Orders.details","dialect":"MongoDB","source":"MongoDB","sentence":"{\"set\":\"{\\\"OrderID\\\":\\\"$orderId$\\\",\\\"ProductID\\\":\\\"$productId$\\\",\\\"UnitPrice\\\":\\\"$unitPrice$\\\",\\\"Quantity\\\":\\\"$quantity$\\\",\\\"Discount\\\":\\\"$discount$\\\"}\",\"filter\":\"{\\\"$and\\\":[{\\\"OrderID\\\":\\\"$orderId$\\\"},{\\\"ProductID\\\":\\\"$productId$\\\"}]}\"}"}]}]}
		let MongoDB = orm.plan(expression,{stage:'MongoDB'})
		expect(MongoDBExpected).toStrictEqual(MongoDB)
		const OracleExpected = {"entity":"Customers","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Customers c SET CustomerID = :id,CompanyName = :name,ContactName = :contact,ContactTitle = :phone,Address = :address,City = :city,Region = :region,PostalCode = :postalCode,Country = :country WHERE c.CustomerID = :id ","children":[{"entity":"Orders","dialect":"Oracle","source":"Oracle","sentence":"UPDATE Orders o SET CustomerID = :customerId,EmployeeID = :employeeId,OrderDate = :orderDate,RequiredDate = :requiredDate,ShippedDate = :shippedDate,ShipVia = :shipViaId,Freight = :freight,ShipName = :name,ShipAddress = :address,ShipCity = :city,ShipRegion = :region,ShipPostalCode = :postalCode,ShipCountry = :country WHERE o.OrderID = :id ","children":[{"entity":"Orders.details","dialect":"Oracle","source":"Oracle","sentence":"UPDATE \"Order Details\" o1 SET OrderID = :orderId,ProductID = :productId,UnitPrice = :unitPrice,Quantity = :quantity,Discount = :discount WHERE (o1.OrderID = :orderId AND o1.ProductID = :productId) "}]}]}
		let Oracle = orm.plan(expression,{stage:'Oracle'})
		expect(OracleExpected).toStrictEqual(Oracle)
	})
})