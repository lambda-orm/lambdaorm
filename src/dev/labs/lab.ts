import { orm} from '../../lib'
import { Products } from '../northwind/model/__model'

export async function apply (callback: any) {
	try {		
		await orm.init('./config/countries.yaml')
		const options = {stage:'stage1'}	
		// expect(orm.model('Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})')).toStrictEqual([{'name':'result','type':'integer'}])

		// const query = 'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})'
		const queries = [
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})',
			'Countries.filter(p=> p.iso3 == "BRA").map(p=> {result: 1+2*3*4})'
			// 'Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})',
			// 'Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})'
		]
		for(const query of queries) {
			console.log(JSON.stringify(orm.model(query)))
		}
	} catch (error:any) {
		console.error(error.stack)
	} finally {
		await orm.end()
		callback()
	}
}

apply(function () { console.log('end') })

