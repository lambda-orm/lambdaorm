/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/countries.env' })
	await orm.init('./config/countries.yaml')
})

describe('group', () => {
	const context = JSON.parse('{}')
	test('normalize', () => {
		expect(orm.normalize('Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})')).toStrictEqual('Countries.map(p=>{result:count(1)}).filter(p=>(p.region==Americas))')
		expect(orm.normalize('Countries.map(p=> {region:p.region,countries:count(1)})')).toStrictEqual('Countries.map(p=>{region:p.region,countries:count(1)})')
		expect(orm.normalize('Countries.map(p=> {region:p.region,max:max(p.latitude)})')).toStrictEqual('Countries.map(p=>{region:p.region,max:max(p.latitude)})')
		expect(orm.normalize('Countries.map(p=> {region:p.region,min:min(p.latitude)})')).toStrictEqual('Countries.map(p=>{region:p.region,min:min(p.latitude)})')
		expect(orm.normalize('Countries.map(p=> {region:p.region,avg:avg(p.latitude)})')).toStrictEqual('Countries.map(p=>{region:p.region,avg:avg(p.latitude)})')
	})
	test('model', () => {
		expect(orm.model('Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})')).toStrictEqual([{'name':'result','type':'integer'}])
		expect(orm.model('Countries.map(p=> {region:p.region,countries:count(1)})')).toStrictEqual([{'name':'region','type':'string'},{'name':'countries','type':'integer'}])
		expect(orm.model('Countries.map(p=> {region:p.region,max:max(p.latitude)})')).toStrictEqual([{'name':'region','type':'string'},{'name':'max','type':'any'}])
		expect(orm.model('Countries.map(p=> {region:p.region,min:min(p.latitude)})')).toStrictEqual([{'name':'region','type':'string'},{'name':'min','type':'any'}])
		expect(orm.model('Countries.map(p=> {region:p.region,avg:avg(p.latitude)})')).toStrictEqual([{'name':'region','type':'string'},{'name':'avg','type':'number'}])
	})
	test('parameters', () => {
		expect(orm.parameters('Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})')).toStrictEqual([])
		expect(orm.parameters('Countries.map(p=> {region:p.region,countries:count(1)})')).toStrictEqual([])
		expect(orm.parameters('Countries.map(p=> {region:p.region,max:max(p.latitude)})')).toStrictEqual([])
		expect(orm.parameters('Countries.map(p=> {region:p.region,min:min(p.latitude)})')).toStrictEqual([])
		expect(orm.parameters('Countries.map(p=> {region:p.region,avg:avg(p.latitude)})')).toStrictEqual([])
	})
	test('constraints', () => {
		expect(orm.constraints('Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.map(p=> {region:p.region,countries:count(1)})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.map(p=> {region:p.region,max:max(p.latitude)})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.map(p=> {region:p.region,min:min(p.latitude)})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.map(p=> {region:p.region,avg:avg(p.latitude)})')).toStrictEqual({"entity":"Countries","constraints":[]})
	})
	test('getInfo', () => {
		expect(orm.plan('Countries.filter(p=> p.region == "Americas").map(p=> {result:count(1)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT COUNT(1) AS result FROM Countries c  WHERE c.region = 'Americas' ","children":[]})
		expect(orm.plan('Countries.map(p=> {region:p.region,countries:count(1)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.region AS region, COUNT(1) AS countries FROM Countries c  GROUP BY c.region ","children":[]})
		expect(orm.plan('Countries.map(p=> {region:p.region,max:max(p.latitude)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.region AS region, MAX(c.latitude) AS max FROM Countries c  GROUP BY c.region ","children":[]})
		expect(orm.plan('Countries.map(p=> {region:p.region,min:min(p.latitude)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.region AS region, MIN(c.latitude) AS min FROM Countries c  GROUP BY c.region ","children":[]})
		expect(orm.plan('Countries.map(p=> {region:p.region,avg:avg(p.latitude)})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.region AS region, AVG(c.latitude) AS avg FROM Countries c  GROUP BY c.region ","children":[]})
	})
})
