import { Orm, helper } from '../../../lib'
import path  from 'path'
import { DbDebtors } from './beesion/src/model'
const lab = async () => {
	const orm = new Orm('./config/cclp.yaml')
	try {
		await orm.init()
		const options = { stage: 'cclp' }
		const query = () => DbDebtors
			.include(p => p.partyRoleRef
				.include(p => p.partyRole
					.include(p => p.individualReference	)))	
			const sentence = orm.getInfo(query, options)
			await helper.fs.write('debtor.query.json', JSON.stringify(sentence, null, 2))		
			console.log(JSON.stringify(sentence, null, 2))
			// const result = await orm.execute(query, {}, options)
			// await helper.fs.write(path.join(__dirname,'result.json'),JSON.stringify(result, null, 2))
	} catch (e:any) {
		console.log(e.message)
	} finally {
		await orm.end()
	}
}

lab()
