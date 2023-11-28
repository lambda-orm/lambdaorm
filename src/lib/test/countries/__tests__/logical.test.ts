/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/countries.env' })
	await orm.init('./config/countries.yaml')
})

describe('logical', () => {
	const context = JSON.parse('{}')
	test('normalize', () => {
		expect(orm.normalize('Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})')).toStrictEqual('Countries.map(p=>{result:count(1)}).filter(p=>((p.subregion==South America)&&(p.longitude<-30)))')
		expect(orm.normalize('Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})')).toStrictEqual('Countries.map(p=>{result:count(1)}).filter(p=>((p.subregion==South America)||(p.subregion==Central America)))')
		expect(orm.normalize('Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})')).toStrictEqual('Countries.map(p=>{result:count(1)}).filter(p=>((p.region==Americas)&&(p.subregion!=Northern America)))')
	})
	test('model', () => {
		expect(orm.model('Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})')).toStrictEqual([{'name':'result','type':'integer'}])
		expect(orm.model('Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})')).toStrictEqual([{'name':'result','type':'integer'}])
		expect(orm.model('Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})')).toStrictEqual([{'name':'result','type':'integer'}])
	})
	test('parameters', () => {
		expect(orm.parameters('Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})')).toStrictEqual([])
	})
	test('constraints', () => {
		expect(orm.constraints('Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})')).toStrictEqual({"entity":"Countries","constraints":[]})
	})
	test('getInfo', () => {
		expect(orm.plan('Countries.filter(p=> p.subregion == "South America" &&  p.longitude < -30 ).map(p=> {result:count(1)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT COUNT(1) AS result FROM Countries c  WHERE (c.subregion = 'South America' AND c.longitude < -30) "})
		expect(orm.plan('Countries.filter(p=> p.subregion == "South America" || p.subregion == "Central America" ).map(p=> {result:count(1)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT COUNT(1) AS result FROM Countries c  WHERE (c.subregion = 'South America' OR c.subregion = 'Central America') "})
		expect(orm.plan('Countries.filter(p=> p.region == "Americas" &&  p.subregion != "Northern America" ).map(p=> {result:count(1)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT COUNT(1) AS result FROM Countries c  WHERE (c.region = 'Americas' AND c.subregion <> 'Northern America') "})
	})
})
