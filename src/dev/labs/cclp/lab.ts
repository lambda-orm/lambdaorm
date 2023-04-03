import { Orm, helper } from '../../../lib'
import path  from 'path'
import { DbDebtors } from './beesion/src/model'
const lab = async () => {
	const orm = new Orm('./config/cclp.yaml')
	try {
		await orm.init()
		const options = { stage: 'cclp' }
		const query = () => DbDebtors
			.include(p => [p.partyRoleRef
				.include(p => p.partyRole
					.include(p => [p.individualReference
						.include(p => p.individual
							.include(p => [p.party
								.include(p => [p.indentifications, p.contactMediums]), p.names])
						),
					p.organizationReference
						.include(p => p.organization
							.include(p => [p.party
								.include(p => [p.indentifications, p.contactMediums]), p.names])
						),
					p.places
						.include(p => p.placeRef
							.include(p => p.address
								.include(p => p.areas)))
					])
				),
			p.accounts
				.include(p => [p.accountLedgerRef
					.include(p => p.ledgerAccount
						.include(p => [p.statusHistories])
					), p.services, p.accountPaymentResps
					.include(p => [p.locAddressRef.filter(p=> isNotNull(p.name))
						.include(p => p.address
							.include(p => p.areas)),
					p.paymentResponsible.include(p => p.paymentMethods),
					p.paymentMethodRef
					]),
				p.statusHistories
				]),
			p.statusHistories
			])
			const sentence = orm.getInfo(query, options)
			await helper.fs.write(path.join(__dirname,'debtor.query.json'), JSON.stringify(sentence, null, 2))		
			console.log(JSON.stringify(sentence, null, 2))
			const result = await orm.execute(query, {}, options)
			await helper.fs.write(path.join(__dirname,'debtors.json'),JSON.stringify(result))
	} catch (e:any) {
		console.log(e.message)
		await helper.fs.write(path.join(__dirname,'error.txt'),e.message)
	} finally {
		await orm.end()
	}
}

lab()
