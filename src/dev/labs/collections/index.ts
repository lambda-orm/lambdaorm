import { Orm, isNotNull} from '../../../lib'
import { h3lp } from 'h3lp'
import { DbDebtors } from './src/model'
const lab = async () => {
	require('dotenv').config({ path: './src/dev/labs/collections/.env' })
	const orm = new Orm()
	try {
		await orm.init('./src/dev/labs/collections/')
		const options = { stage: 'cclp' }
		// const data = { id: 1311 }
		const query = (id:number) => DbDebtors
			.include(p => [p.individualRef
				.include(p => p.individual
					.include(p => [p.party
						.include(p => [p.indentifications, p.contactMediums]),p.partyRoleRef
							.include(p => p.partyRole
								.include(p => p.places
									.include(p => p.placeRef
										.include(p => p.address
											.include(p => p.areas))))),
						p.names])),
				p.organizationRef
					.include(p => p.organization.map(p=> p.currentName)
						.include(p => [p.party
							.include(p => [p.indentifications, p.contactMediums]),p.partyRoleRef
								.include(p => p.partyRole
									.include(p => p.places
										.include(p => p.placeRef
											.include(p => p.address
												.include(p => p.areas))))),
							p.names])),
			p.accounts
				.include(p => [p.accountLedgerRef
					.include(p => p.ledgerAccount
						.include(p => [p.statusHistories])), p.services, p.accountPaymentResps
							.include(p => [p.locAddressRef.filter(p => isNotNull(p.name))
								.include(p => p.address.include(p => p.areas)), p.paymentResponsible
									.include(p => p.paymentMethods),p.paymentMethodRef]),
							p.statusHistories	]),p.statusHistories
		])
		// .filter(p => p.id === id)
		const sentence = orm.plan(query, options)
		await h3lp.fs.write('./src/dev/labs/collections/sentence.json', JSON.stringify(sentence, null, 2))
		const result = await orm.execute(query, {}, options)
		await h3lp.fs.write('./src/dev/labs/collections/result.json', JSON.stringify(result, null, 2))
	} catch (e:any) {
		console.log(e.message)
	} finally {
		await orm.end()
	}
}

lab()

// DbOrganizationReferences
// DbIndividualReferences


