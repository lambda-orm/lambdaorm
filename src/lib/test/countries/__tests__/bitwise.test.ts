/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/countries.env' })
	await orm.init('./config/countries.yaml')
})

describe('bitwise', () => {
	const context = JSON.parse('{}')
	test('normalize', () => {
		expect(orm.normalize('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })')).toStrictEqual('Countries.map(p=>{result:(p.longitude&1)}).filter(p=>(p.iso3==BRA)).sort(p=>asc(p.result)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })')).toStrictEqual('Countries.map(p=>{result:(p.longitude|1)}).filter(p=>(p.iso3==BRA)).sort(p=>asc(p.result)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })')).toStrictEqual('Countries.map(p=>{result:~p.longitude}).filter(p=>(p.iso3==BRA)).sort(p=>asc(p.result)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })')).toStrictEqual('Countries.map(p=>{result:(p.longitude<<1)}).filter(p=>(p.iso3==BRA)).sort(p=>asc(p.result)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })')).toStrictEqual('Countries.map(p=>{result:(p.longitude^1)}).filter(p=>(p.iso3==BRA)).sort(p=>asc(p.result)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })')).toStrictEqual('Countries.map(p=>{result:(p.longitude>>1)}).filter(p=>(p.iso3==BRA)).sort(p=>asc(p.result)).page(1,1)')
	})
	test('model', () => {
		expect(orm.model('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })')).toStrictEqual([{'name':'result','type':'number'}])
		expect(orm.model('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })')).toStrictEqual([{'name':'result','type':'number'}])
		expect(orm.model('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })')).toStrictEqual([{'name':'result','type':'number'}])
		expect(orm.model('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })')).toStrictEqual([{'name':'result','type':'number'}])
		expect(orm.model('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })')).toStrictEqual([{'name':'result','type':'number'}])
		expect(orm.model('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })')).toStrictEqual([{'name':'result','type':'number'}])
	})
	test('parameters', () => {
		expect(orm.parameters('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })')).toStrictEqual([])
	})
	test('constraints', () => {
		expect(orm.constraints('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })')).toStrictEqual({"entity":"Countries","constraints":[]})
	})
	test('getInfo', () => {
		expect(orm.plan('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude & 1 })',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.longitude & 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 "})
		expect(orm.plan('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude | 1 })',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.longitude | 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 "})
		expect(orm.plan('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: ~ p.longitude })',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT ~ c.longitude AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 "})
		expect(orm.plan('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude << 1 })',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.longitude << 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 "})
		expect(orm.plan('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude ^ 1 })',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.longitude ^ 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 "})
		expect(orm.plan('Countries.filter(p=> p.iso3=="BRA").first(p=> {result: p.longitude >> 1 })',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.longitude >> 1 AS result FROM Countries c  WHERE c.iso3 = 'BRA' ORDER BY result asc  LIMIT 0,1 "})
	})
})
