import { orm, Helper } from '../../../lib'

(async () => {
	await orm.init('./src/dev/labs/processEntry/schema.yaml')
	try {
    // const entries = await orm.execute('CapEntries')
		// await Helper.fs.writeFile('./src/dev/labs/processEntry/entries.json', JSON.stringify(entries, null, 2))
		const content = await Helper.fs.read( './src/dev/labs/processEntry/entries.json')	
		if (content){
			const entries = JSON.parse(content)	
			const data = entries.map( (p:any) => ({ id: p.id
																						, category: 'CapEntry'
																						 , keywords: [Helper.string.normalize(p.creditorAccount.ledgerAccountId,{toLower:true})
																												 ,Helper.string.normalize(p.referenceNumber,{toLower:true})
																												 ,Helper.string.normalize(p.currency+p.amount.toString(),{toLower:true})  
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
			await Helper.fs.write('./src/dev/labs/processEntry/omnibox.json', JSON.stringify(data, null, 2))	
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