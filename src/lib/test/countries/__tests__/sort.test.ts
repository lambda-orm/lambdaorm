/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/countries.env' })
	await orm.init('./config/countries.yaml')
})

describe('sort', () => {
	const context = JSON.parse('{}')
	test('normalize', () => {
		expect(orm.normalize('Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)')).toStrictEqual('Countries.map(p=>{region:p.region,countries:count(1)}).sort(p=>asc(p.countries))')
		expect(orm.normalize('Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))')).toStrictEqual('Countries.map(p=>{iso3:p.iso3}).filter(p=>(p.subregion==South America)).sort(p=>desc(iso3))')
		expect(orm.normalize('Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))')).toStrictEqual('Countries.map(p=>{region:p.region,max:max(p.latitude)}).sort(p=>asc(p.max))')
	})
	test('model', () => {
		expect(orm.model('Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)')).toStrictEqual([{'name':'region','type':'string'},{'name':'countries','type':'integer'}])
		expect(orm.model('Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))')).toStrictEqual([{'name':'iso3','type':'string'}])
		expect(orm.model('Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))')).toStrictEqual([{'name':'region','type':'string'},{'name':'max','type':'any'}])
	})
	test('parameters', () => {
		expect(orm.parameters('Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))')).toStrictEqual([{'name':'iso3','type':'any'}])
		expect(orm.parameters('Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))')).toStrictEqual([])
	})
	test('constraints', () => {
		expect(orm.constraints('Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))')).toStrictEqual({"entity":"Countries","constraints":[]})
	})
	test('getInfo', () => {
		expect(orm.getInfo('Countries.map(p=> {region:p.region,countries:count(1)}).sort(p=> p.countries)',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.region AS region, COUNT(1) AS countries FROM Countries c  GROUP BY c.region ORDER BY countries asc ","children":[]})
		expect(orm.getInfo('Countries.filter(p=> p.subregion == "South America").map(p=> p.iso3).sort(p=> desc(iso3))',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.iso3 AS iso3 FROM Countries c  WHERE c.subregion = 'South America' ORDER BY ? desc ","children":[]})
		expect(orm.getInfo('Countries.map(p=> {region:p.region,max:max(p.latitude)}).sort(p=> asc(p.max))',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.region AS region, MAX(c.latitude) AS max FROM Countries c  GROUP BY c.region ORDER BY max asc ","children":[]})
	})
})
