import { orm, helper } from '../../../../lib'

export async function show (list:string[], data:any) {
	const tests:string[] = []
	const examples:string[] = []
	const sentences:string[] = []
	for(let i=0;i<list.length;i++){
		const expression = list[i]
		let sentence = ''
		try {
			await orm.init('./src/dev/labs/countries/country.yaml')
			const _sentence = orm.sentence(expression)
			sentence =helper.sentenceToArray(_sentence).join('\n')
			const result = await orm.execute(expression, data)
			let expect:any
			if (result === null) {
				expect = 'null'
			} else if (result === undefined) {
				expect = 'undefined'
			} else if (typeof result === 'string') {
				expect = `'${result}'`
			} else if (Array.isArray(result)) {
				if (result.length === 0) {
					expect = '[]'
				} else {
					if (typeof result[0] === 'string') {
						expect = '[' + result.map(p => `'${p}'`).join(',') + ']'
					} else if (typeof result[0] === 'object'){
						expect = '[' + result.map(p=> JSON.stringify(p)).join(',') + ']'						
					} else {
						expect = '[' + result.join(',') + ']'
					}
				}
			} else if (typeof result === 'object') {
				expect = JSON.stringify(result)			
			} else {
				expect = result
			}
			tests.push(`{ name: 'query ${i+1}', lambda: () => ${expression} },`)
			sentences.push(`\`\`\`js\n${expression}\n\`\`\`\n\n\`\`\`sql\n${sentence}\n\`\`\`\n`)
			if (expression.includes('\n')) {				
				examples.push(`|\`${expression}\`|${expect}|`)
			} else {				
				examples.push(`|${expression}|${expect}|`)				
			}
		} catch (error) {
			console.log(`exp: ${expression} sentence: ${sentence} error: ${error}`)
		}
	}
	console.log(examples.join('\n'))
	console.log(sentences.join('\n'))
	console.log(tests.join('\n'))
}
