// import { Orm, isNotNull } from '../../../lib'
// import { h3lp } from 'h3lp'
// import path  from 'path'
// import { DbDebtors } from './src/domain/model'
// const lab = async () => {
// 	const orm = new Orm()
// 	const output = path.join(__dirname.replace('build/','src/'),'outputs')
// 	try {
// 		await orm.init()
// 		const options = { stage: 'cclp' }
// 		// const query = () => DbDebtors
// 		// 	.include(p => [p.partyRoleRef
// 		// 		.include(p => p.partyRole
// 		// 			.include(p => [p.individualReference
// 		// 				.include(p => p.individual
// 		// 					.include(p => [p.party
// 		// 						.include(p => [p.indentifications, p.contactMediums]), p.names])
// 		// 				),
// 		// 			p.organizationReference
// 		// 				.include(p => p.organization
// 		// 					.include(p => [p.party
// 		// 						.include(p => [p.indentifications, p.contactMediums]), p.names])
// 		// 				),
// 		// 			p.places
// 		// 				.include(p => p.placeRef
// 		// 					.include(p => p.address
// 		// 						.include(p => p.areas)))
// 		// 			])
// 		// 		),
// 		// 	p.accounts
// 		// 		.include(p => [p.accountLedgerRef
// 		// 			.include(p => p.ledgerAccount
// 		// 				.include(p => [p.statusHistories])
// 		// 			), p.services, p.accountPaymentResps
// 		// 			.include(p => [p.locAddressRef.filter(p=> isNotNull(p.name))
// 		// 				.include(p => p.address
// 		// 					.include(p => p.areas)),
// 		// 			p.paymentResponsible.include(p => p.paymentMethods),
// 		// 			p.paymentMethodRef
// 		// 			]),
// 		// 		p.statusHistories
// 		// 		]),
// 		// 	p.statusHistories
// 		// 	])
// 		  const query = ()=> DbDebtors				
// 					// .include(p => [p.r
// 				// .include(p => p.partyRole
// 				// 	.include(p => [p.individualReference
// 				// 		.include(p => p.individual
// 				// 			.include(p => [p.party
// 				// 				.include(p => [p.indentifications, p.contactMediums]), p.names])
// 				// 			),	
// 				// 	p.organizationReference
// 				// 		.include(p => p.organization
// 				// 			.include(p => [p.party
// 				// 				.include(p => [p.indentifications, p.contactMediums]), p.names])
// 				// 		),
// 				// 	p.places
// 				// 		.include(p => p.placeRef
// 				// 			.include(p => p.address
// 				// 				.include(p => p.areas)))
// 				// 	]))
// 				// ])
// 			.page(1,10)  
// 			const sentence = orm.plan(query, options)
			
// 			await h3lp.fs.write(path.join(output,'plan.json'), JSON.stringify(sentence, null, 2))		
// 			console.log(JSON.stringify(sentence, null, 2))
// 			const result = await orm.execute(query, {}, options)
// 			await h3lp.fs.write(path.join(output,'result.json'),JSON.stringify(result))
// 	} catch (e:any) {
// 		console.log(e.message)
// 		await h3lp.fs.write(path.join(output,'error.txt'),e.message)
// 	} finally {
// 		await orm.end()
// 	}
// }

// lab()
