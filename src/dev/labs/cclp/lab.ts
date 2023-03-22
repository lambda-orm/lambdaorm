import { Orm } from '../../../lib'
import { h3lp } from 'h3lp'
import path  from 'path'
import { DbDebtors } from './beesion/src/model'
const lab = async () => {
	const orm = new Orm('./config/cclp.yaml')
	try {
		await orm.init()
		const options = { stage: 'cclp' }
		// const query = () => DbLedgerAccountReferences
		const query = () => DbDebtors
			.include(p => p.accounts
				.include(p => p.accountLedgerRef)
			)
		const sentence = orm.getInfo(query, options)
		console.log(JSON.stringify(sentence, null, 2))
		const result = await orm.execute(query, {}, options)
		await h3lp.fs.write(path.join(__dirname,'result.json'),JSON.stringify(result, null, 2))
	} catch (e:any) {
		console.log(e.message)
	} finally {
		await orm.end()
	}
}

lab()
