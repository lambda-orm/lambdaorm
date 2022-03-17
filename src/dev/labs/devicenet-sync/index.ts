import { Orm, Helper } from '../../../lib'
import path from 'path'

// function getUsers () {
// return [
// { username: 'flaviolrita', firstname: 'Flavio Lionel', lastname: 'Rita', email: 'flaviolrita@hotmail.com' },
// { username: 'griss512', firstname: 'Gricelda Rocio', lastname: 'Puchuri Corilla', email: 'griss512@hotmail.com' },
// { username: 'micaelavrita', firstname: 'Micaela Valentina', lastname: 'Rita Puchuri', email: 'flaviolrita@hotmail.com' },
// { username: 'joaquinirita', firstname: 'Joaquin Ignacio', lastname: 'Rita Puchuri', email: 'flaviolrita@hotmail.com' }
// ]
// }

function getGroups () {
	return [
		{
			name: 'Rita Puchuri',
			members: [
				{ username: 'flaviolrita', role: 'admin' },
				{ username: 'griss512', role: 'auditor' },
				{ username: 'micaelavrita', role: 'operator' },
				{ username: 'joaquinirita', role: 'operator' }
			]
		}
	]
}

function getDevices () {
	return [
		{
			name: 'Huawei P30 lite Flavio',
			type: 'phone',
			serialNumber: 'L2NDU19A18006154',
			ownerId: 'flaviolrita',
			brand: 'Huawei',
			model: 'MAR-LX1A',
			so: 'android 10',
			imei: '863451049927149',
			imei2: '863451049959159',
			mac: 'FC:94:35:90:E2:86',
			macBluetooth: 'FC:94:35:90:EF:07',
			ip: '192.168.1.138',
			components: [
				{
					name: 'frontal camera',
					type: 'camera',
					brand: 'Huawei',
					model: '24Mpx front'
				},
				{
					name: 'Rear camera',
					type: 'camera',
					brand: 'Huawei',
					model: 'Rear camera 48, 8 and 2Mpx'
				},
				{
					name: 'microphone',
					type: 'microphone',
					brand: 'Huawei',
					model: 'Microphone SMD Soldering Soldar'
				}
			]
		}
	]
}

(async () => {
	const workspace = path.join(process.cwd(), '/src/dev/labs/devicenet-sync')
	const orm = new Orm(workspace)
	try {
		const schema = await orm.schema.get(workspace)
		await orm.init(schema)
		await orm.stage.clean(orm.defaultStage.name).execute(true)
		await orm.stage.sync(orm.defaultStage.name).execute()
		// //console.log(JSON.stringify(await orm.execute('Users.bulkInsert()', getUsers())))
		console.log(JSON.stringify(await orm.execute('Groups.bulkInsert().include(p-> p.members)', getGroups())))
		console.log(JSON.stringify(await orm.execute('Devices.bulkInsert().include(p-> p.components)', getDevices())))

		const expression = 'Groups.include(p=> [p.members.include(p=>p.user.include(p=> p.devices.include(p=>p.components.filter(p=> p.type == ComponentType.camera))))])'

		// const expression = 'Users.filter(p-> p.username == "flaviolrita")'
		// const expression = 'Users'

		console.log('sentence:')
		console.log(JSON.stringify(orm.sentence(expression)))
		// console.log('parameters:')
		// console.log(JSON.stringify(orm.parameters(expression)))
		// console.log('model:')
		// console.log(JSON.stringify(orm.model(expression)))
		// console.log('constraints:')
		// console.log(JSON.stringify(orm.constraints(expression)))
		// console.log('metadata:')
		// console.log(JSON.stringify(orm.metadata(expression)))

		console.log(JSON.stringify(await orm.execute(expression)))

		// // console.log(JSON.stringify(await orm.execute('Devices.updateAll({imei2:null})')))
		// // console.log(JSON.stringify(await orm.execute('Components.deleteAll()')))
		// // console.log(JSON.stringify(await orm.execute('Devices.deleteAll()')))

		Helper.writeFile(path.join(workspace, 'schema.json'), JSON.stringify(orm.schema.schema, null, 2))

		// await orm.stage.clean(orm.defaultStage.name).execute()
	} catch (error:any) {
		console.error(error.message)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()
