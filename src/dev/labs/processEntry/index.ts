import { orm } from '../../../lib'
import { h3lp } from 'h3lp'

(async () => {
	await orm.init('./src/dev/labs/processEntry/schema.yaml')
	try {
    // const entries = await orm.execute('CapEntries')
		// await helper.fs.writeFile('./src/dev/labs/processEntry/entries.json', JSON.stringify(entries, null, 2))
		const content = await h3lp.fs.read( './src/dev/labs/processEntry/entries.json')	
		if (content){
			const entries = JSON.parse(content)	
			const data = entries.map( (p:any) => ({ id: p.id
																						, category: 'CapEntry'
																						 , keywords: [h3lp.str.normalize(p.creditorAccount.ledgerAccountId,{toLower:true})
																												 ,h3lp.str.normalize(p.referenceNumber,{toLower:true})
																												 ,h3lp.str.normalize(p.currency+p.amount.toString(),{toLower:true})  
																												 ] 
																						, data: { id: p.id
																							      , processId : p.processId
																										, referenceNumber : p.referenceNumber
																										, ledgerAccountId: p.creditorAccount.ledgerAccountId
																										, transactionType : p.transactionType.name
																										, currency : p.currency 
																										, amount: p.amount
																										, status: p.status
																										, entryDate: p.entryDate
																										} 
																						})
																)
			await h3lp.fs.write('./src/dev/labs/processEntry/omnibox.json', JSON.stringify(data, null, 2))	
			// await orm.execute('OmniBoxes.bulkInsert()', data)
			// db('collections-insight-kpn-ngc-test').collection('omnibox').insertMany()
		}
	
	} catch (error:any) {
		console.error(error.message)
		console.error(error.stack)
	} finally {
		orm.end()
	}
})()