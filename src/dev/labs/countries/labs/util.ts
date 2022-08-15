import { orm, Helper } from '../../../../lib'

export async function show (list:string[], data:any) {
	const tests:string[] = []
	const examples:string[] = []
	for(let i=0;i<list.length;i++){
		const expression = list[i]
		try {
			await orm.init('./src/dev/labs/countries/country.yaml')
			const sentence = orm.sentence(expression)
			const sentences =Helper.sentenceToArray(sentence).join('\n')
			const result = await orm.execute(expression, data)
			let expect:any
			let testCompare = 'toBe'
			if (result === null) {
				expect = 'null'
			} else if (result === undefined) {
				expect = 'undefined'
			} else if (typeof result === 'string') {
				expect = `'${result}'`
			} else if (Array.isArray(result)) {
				testCompare = 'toStrictEqual'
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
			if (expression.includes('\n')) {				
				examples.push(`|\`${expression}\`|${sentences}|${expect}|`)
			} else {				
				examples.push(`|${expression}|${sentences}|${expect}|`)
			}
		} catch (error) {
			console.log(`exp: ${expression} error: ${error}`)
		}
	}
	console.log(examples.join('\n'))
	console.log(tests.join('\n'))
}
