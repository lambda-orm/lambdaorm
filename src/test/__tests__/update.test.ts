import { orm,Helper } from '../../lib'
beforeAll(async () => {
	require('dotenv').config({ path: './test.env' })
	await orm.init()
})
describe('Complete Expression', () => {
	test('update 1', () => {
		const source = 'Orders.update()'
		const expected = 'Orders.filter(p=>(p.id==obj.id)).update({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 2', () => {
		const source = 'Orders.update(entity)'
		const expected = 'Orders.filter(p=>(p.id==obj.id)).update({customerId:entity.customerId,employeeId:entity.employeeId,orderDate:entity.orderDate,requiredDate:entity.requiredDate,shippedDate:entity.shippedDate,shipViaId:entity.shipViaId,freight:entity.freight,name:entity.name,address:entity.address,city:entity.city,region:entity.region,postalCode:entity.postalCode,country:entity.country})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 3', () => {
		const source = 'Orders.updateAll(=>{postalCode:postalCode})'
		const expected = 'Orders.update(=>{postalCode:postalCode})'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 4', () => {
		const source = 'Orders.update(p=>{name:entity.name}).filter(p=>(p.id===entity.id))'
		const expected = 'Orders.update(p=>{name:entity.name}).filter(p=>(p.id===entity.id))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 5', () => {
		const source = 'Orders.update(=>{name:entity.name}).include(p=>p.details).filter(p=>(p.id===entity.id))'
		const expected = 'Orders.update(=>{name:entity.name}).include(p=>p.details.filter(p=>((p.orderId==obj.orderId)&&(p.productId==obj.productId))).update({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount})).filter(p=>(p.id===entity.id))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 6', () => {
		const source = 'Orders.update(=>{name:entity.name}).include(p=>p.details.update(p=>p)).filter(p=>(p.id===entity.id))'
		const expected = 'Orders.update(=>{name:entity.name}).include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).update(p=>{unitPrice:p.unitPrice,quantity:p.quantity,discount:p.discount})).filter(p=>(p.id===entity.id))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 7', () => {
		const source = 'Orders.update(=>{name:entity.name}).include(p=>p.details.update(p=>{unitPrice:p.unitPrice,productId:p.productId})).filter(p=>(p.id===entity.id))'
		const expected = 'Orders.update(=>{name:entity.name}).include(p=>p.details.filter(p=>((p.orderId==orderId)&&(p.productId==productId))).update(p=>{unitPrice:p.unitPrice,productId:p.productId})).filter(p=>(p.id===entity.id))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 8', () => {
		const source = 'Orders.update().include(p=>p.details)'
		const expected = 'Orders.filter(p=>(p.id==obj.id)).update({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.details.filter(p=>((p.orderId==obj.orderId)&&(p.productId==obj.productId))).update({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount}))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
	test('update 9', () => {
		const source = 'Customers.update().include(p=>p.orders.include(p=>p.details))'
		const expected = 'Customers.filter(p=>(p.id==obj.id)).update({id:id,name:name,contact:contact,phone:phone,address:address,city:city,region:region,postalCode:postalCode,country:country}).include(p=>p.orders.include(p=>p.details.filter(p=>((p.orderId==obj.orderId)&&(p.productId==obj.productId))).update({orderId:orderId,productId:productId,unitPrice:unitPrice,quantity:quantity,discount:discount})).filter(p=>(p.id==obj.id)).update({customerId:customerId,employeeId:employeeId,orderDate:orderDate,requiredDate:requiredDate,shippedDate:shippedDate,shipViaId:shipViaId,freight:freight,name:name,address:address,city:city,region:region,postalCode:postalCode,country:country}))'
		const target = orm.complete(source)
		expect(expected).toBe(target)
	})
})
describe('Metadata', () => {
	test('update 1', async () => {
		const expression = 'Orders.update()'
		const modelExpected :any= {"customerId":"string","employeeId":"integer","orderDate":"datetime","requiredDate":"datetime","shippedDate":"datetime","shipViaId":"integer","freight":"decimal","name":"string","address":"string","city":"string","region":"string","postalCode":"string","country":"string"}
		const parametersExpected:any = [{"name":"customerId","type":"string","value":"ANATR"},{"name":"employeeId","type":"integer","value":7},{"name":"orderDate","type":"datetime","value":"1996-09-18 00:00:00"},{"name":"requiredDate","type":"datetime","value":"1996-10-16 00:00:00"},{"name":"shippedDate","type":"datetime","value":"1996-09-24 00:00:00"},{"name":"shipViaId","type":"integer","value":3},{"name":"freight","type":"decimal","value":"1.6100"},{"name":"name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"address","type":"string","value":"Avda. de la Constitucin 2222"},{"name":"city","type":"string","value":"Mxico D.F."},{"name":"region","type":"string","value":null},{"name":"postalCode","type":"string","value":"5021"},{"name":"country","type":"string","value":"Mexico"},{"name":"obj.id","type":"integer","value":null}]
		const fieldsExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 2', async () => {
		const expression = 'Orders.update(entity)'
		const modelExpected :any= {"customerId":"string","employeeId":"integer","orderDate":"datetime","requiredDate":"datetime","shippedDate":"datetime","shipViaId":"integer","freight":"decimal","name":"string","address":"string","city":"string","region":"string","postalCode":"string","country":"string"}
		const parametersExpected:any = [{"name":"entity.customerId","type":"string","value":"ANATR"},{"name":"entity.employeeId","type":"integer","value":3},{"name":"entity.orderDate","type":"datetime","value":"1997-08-08 00:00:00"},{"name":"entity.requiredDate","type":"datetime","value":"1997-09-05 00:00:00"},{"name":"entity.shippedDate","type":"datetime","value":"1997-08-14 00:00:00"},{"name":"entity.shipViaId","type":"integer","value":1},{"name":"entity.freight","type":"decimal","value":"43.9000"},{"name":"entity.name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"entity.address","type":"string","value":"Avda. de la Constitucin 2222"},{"name":"entity.city","type":"string","value":"Mxico D.F."},{"name":"entity.region","type":"string","value":null},{"name":"entity.postalCode","type":"string","value":"5021"},{"name":"entity.country","type":"string","value":"Mexico"},{"name":"obj.id","type":"integer","value":null}]
		const fieldsExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 3', async () => {
		const expression = 'Orders.updateAll(=>{postalCode:postalCode})'
		const modelExpected :any= {"postalCode":"string"}
		const parametersExpected:any = [{"name":"postalCode","type":"string","value":"xxx"}]
		const fieldsExpected :any= [{"name":"postalCode","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 4', async () => {
		const expression = 'Orders.update(p=>{name:entity.name}).filter(p=>(p.id===entity.id))'
		const modelExpected :any= {"name":"string"}
		const parametersExpected:any = [{"name":"entity.name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"entity.id","type":"integer","value":8}]
		const fieldsExpected :any= [{"name":"name","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 5', async () => {
		const expression = 'Orders.update(=>{name:entity.name}).include(p=>p.details).filter(p=>(p.id===entity.id))'
		const modelExpected :any= {"name":"string","details":[{"orderId":"integer","productId":"integer","unitPrice":"decimal","quantity":"decimal","discount":"decimal"}]}
		const parametersExpected:any = [{"name":"entity.name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"entity.id","type":"integer","value":8}]
		const fieldsExpected :any= [{"name":"name","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 6', async () => {
		const expression = 'Orders.update(=>{name:entity.name}).include(p=>p.details.update(p=>p)).filter(p=>(p.id===entity.id))'
		const modelExpected :any= {"name":"string","details":[{"unitPrice":"decimal","quantity":"decimal","discount":"decimal"}]}
		const parametersExpected:any = [{"name":"entity.name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"entity.id","type":"integer","value":8}]
		const fieldsExpected :any= [{"name":"name","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 7', async () => {
		const expression = 'Orders.update(=>{name:entity.name}).include(p=>p.details.update(p=>{unitPrice:p.unitPrice,productId:p.productId})).filter(p=>(p.id===entity.id))'
		const modelExpected :any= {"name":"string","details":[{"unitPrice":"decimal","productId":"integer"}]}
		const parametersExpected:any = [{"name":"entity.name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"entity.id","type":"integer","value":8}]
		const fieldsExpected :any= [{"name":"name","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 8', async () => {
		const expression = 'Orders.update().include(p=>p.details)'
		const modelExpected :any= {"customerId":"string","employeeId":"integer","orderDate":"datetime","requiredDate":"datetime","shippedDate":"datetime","shipViaId":"integer","freight":"decimal","name":"string","address":"string","city":"string","region":"string","postalCode":"string","country":"string","details":[{"orderId":"integer","productId":"integer","unitPrice":"decimal","quantity":"decimal","discount":"decimal"}]}
		const parametersExpected:any = [{"name":"customerId","type":"string","value":"ANATR"},{"name":"employeeId","type":"integer","value":7},{"name":"orderDate","type":"datetime","value":"1996-09-18 00:00:00"},{"name":"requiredDate","type":"datetime","value":"1996-10-16 00:00:00"},{"name":"shippedDate","type":"datetime","value":"1996-09-24 00:00:00"},{"name":"shipViaId","type":"integer","value":3},{"name":"freight","type":"decimal","value":"1.6100"},{"name":"name","type":"string","value":"Ana Trujillo Emparedados y helados"},{"name":"address","type":"string","value":"Avda. de la Constitucin 2222"},{"name":"city","type":"string","value":"Mxico D.F."},{"name":"region","type":"string","value":null},{"name":"postalCode","type":"string","value":"5021"},{"name":"country","type":"string","value":"Mexico"},{"name":"obj.id","type":"integer","value":null}]
		const fieldsExpected :any= [{"name":"customerId","type":"string"},{"name":"employeeId","type":"integer"},{"name":"orderDate","type":"datetime"},{"name":"requiredDate","type":"datetime"},{"name":"shippedDate","type":"datetime"},{"name":"shipViaId","type":"integer"},{"name":"freight","type":"decimal"},{"name":"name","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
	test('update 9', async () => {
		const expression = 'Customers.update().include(p=>p.orders.include(p=>p.details))'
		const modelExpected :any= {"id":"string","name":"string","contact":"string","phone":"string","address":"string","city":"string","region":"string","postalCode":"string","country":"string","orders":[{"customerId":"string","employeeId":"integer","orderDate":"datetime","requiredDate":"datetime","shippedDate":"datetime","shipViaId":"integer","freight":"decimal","name":"string","address":"string","city":"string","region":"string","postalCode":"string","country":"string","details":[{"orderId":"integer","productId":"integer","unitPrice":"decimal","quantity":"decimal","discount":"decimal"}]}]}
		const parametersExpected:any = [{"name":"id","type":"string","value":null},{"name":"name","type":"string","value":null},{"name":"contact","type":"string","value":null},{"name":"phone","type":"string","value":null},{"name":"address","type":"string","value":null},{"name":"city","type":"string","value":null},{"name":"region","type":"string","value":null},{"name":"postalCode","type":"string","value":"xxx"},{"name":"country","type":"string","value":null},{"name":"obj.id","type":"string","value":null}]
		const fieldsExpected :any= [{"name":"id","type":"string"},{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"phone","type":"string"},{"name":"address","type":"string"},{"name":"city","type":"string"},{"name":"region","type":"string"},{"name":"postalCode","type":"string"},{"name":"country","type":"string"}]
		const model = await orm.model(expression)
		const metadata = await orm.metadata(expression)
		expect(modelExpected).toStrictEqual(model)
		expect(fieldsExpected).toStrictEqual(metadata.f)
	})
})
describe('Sentences', () => {
	test('update 1', async () => {
		const expression = 'Orders.update()'
		const mysqlExpected = 'UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 2', async () => {
		const expression = 'Orders.update(entity)'
		const mysqlExpected = 'UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 3', async () => {
		const expression = 'Orders.updateAll(=>{postalCode:postalCode})'
		const mysqlExpected = 'UPDATE Orders o SET ShipPostalCode = ? '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 4', async () => {
		const expression = 'Orders.update(p=>{name:entity.name}).filter(p=>(p.id===entity.id))'
		const mysqlExpected = 'UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 5', async () => {
		const expression = 'Orders.update(=>{name:entity.name}).include(p=>p.details).filter(p=>(p.id===entity.id))'
		const mysqlExpected = 'UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ; UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 6', async () => {
		const expression = 'Orders.update(=>{name:entity.name}).include(p=>p.details.update(p=>p)).filter(p=>(p.id===entity.id))'
		const mysqlExpected = 'UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ; UPDATE `Order Details` o1 SET UnitPrice = o1.UnitPrice,Quantity = o1.Quantity,Discount = o1.Discount WHERE (o1.OrderID = ? AND o1.ProductID = ?) '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 7', async () => {
		const expression = 'Orders.update(=>{name:entity.name}).include(p=>p.details.update(p=>{unitPrice:p.unitPrice,productId:p.productId})).filter(p=>(p.id===entity.id))'
		const mysqlExpected = 'UPDATE Orders o SET ShipName = ? WHERE o.OrderID = ? ; UPDATE `Order Details` o1 SET UnitPrice = o1.UnitPrice,ProductID = o1.ProductID WHERE (o1.OrderID = ? AND o1.ProductID = ?) '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 8', async () => {
		const expression = 'Orders.update().include(p=>p.details)'
		const mysqlExpected = 'UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? ; UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
	test('update 9', async () => {
		const expression = 'Customers.update().include(p=>p.orders.include(p=>p.details))'
		const mysqlExpected = 'UPDATE Customers c SET CustomerID = ?,CompanyName = ?,ContactName = ?,ContactTitle = ?,Address = ?,City = ?,Region = ?,PostalCode = ?,Country = ? WHERE c.CustomerID = ? ; UPDATE Orders o SET CustomerID = ?,EmployeeID = ?,OrderDate = ?,RequiredDate = ?,ShippedDate = ?,ShipVia = ?,Freight = ?,ShipName = ?,ShipAddress = ?,ShipCity = ?,ShipRegion = ?,ShipPostalCode = ?,ShipCountry = ? WHERE o.OrderID = ? ; UPDATE `Order Details` o1 SET OrderID = ?,ProductID = ?,UnitPrice = ?,Quantity = ?,Discount = ? WHERE (o1.OrderID = ? AND o1.ProductID = ?) '
		let mysql =  await orm.sentence(expression,'mysql')
		mysql=Helper.replace(mysql,'\n','; ')
		expect(mysqlExpected).toBe(mysql)
	})
})