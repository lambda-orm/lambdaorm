/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/countries.env' })
	await orm.init('./config/countries.yaml')
})

describe('comparison', () => {
	const context = JSON.parse('{}')
	test('normalize', () => {
		expect(orm.normalize('Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)')).toStrictEqual('Countries.map(p=>{name:p.name}).filter(p=>(p.iso3==BRA))')
		expect(orm.normalize('Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)')).toStrictEqual('Countries.map(p=>{name:p.name}).filter(p=>(p.iso3==BRA))')
		expect(orm.normalize('Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual('Countries.map(p=>{name:p.name}).filter(p=>((p.latitude<-9)&&((p.latitude>-11)&&(p.longitude==-55)))).sort(p=>asc(p.name)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual('Countries.map(p=>{name:p.name}).filter(p=>(between(p.latitude,-11,-9)&&(p.longitude==-55))).sort(p=>asc(p.name)).page(1,1)')
		expect(orm.normalize('Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)')).toStrictEqual('Countries.map(p=>{name:p.name}).filter(p=>in(p.iso3,[BRA,ARG]))')
	})
	test('model', () => {
		expect(orm.model('Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)')).toStrictEqual([{'name':'name','type':'string'}])
		expect(orm.model('Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)')).toStrictEqual([{'name':'name','type':'string'}])
		expect(orm.model('Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual([{'name':'name','type':'string'}])
		expect(orm.model('Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual([{'name':'name','type':'string'}])
		expect(orm.model('Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)')).toStrictEqual([{'name':'name','type':'string'}])
	})
	test('parameters', () => {
		expect(orm.parameters('Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)')).toStrictEqual([])
	})
	test('constraints', () => {
		expect(orm.constraints('Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)')).toStrictEqual({"entity":"Countries","constraints":[]})
	})
	test('getInfo', () => {
		expect(orm.plan('Countries.filter(p=> p.iso3 == "BRA").map(p=> p.name)',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.name AS name FROM Countries c  WHERE c.iso3 = 'BRA' ","children":[]})
		expect(orm.plan('Countries.filter(p=> p.iso3 === "BRA").map(p=> p.name)',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.name AS name FROM Countries c  WHERE c.iso3 = 'BRA' ","children":[]})
		expect(orm.plan('Countries.filter(p=> p.latitude < -9 && p.latitude > -11 && p.longitude == -55 ).first(p=> p.name)',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.name AS name FROM Countries c  WHERE (c.latitude < -9 AND (c.latitude > -11 AND c.longitude = -55)) ORDER BY c.name asc  LIMIT 0,1 ","children":[]})
		expect(orm.plan('Countries.filter(p=> between(p.latitude,-11,-9) && p.longitude == -55 ).first(p=> p.name)',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.name AS name FROM Countries c  WHERE (c.latitude BETWEEN -11 AND -9 AND c.longitude = -55) ORDER BY c.name asc  LIMIT 0,1 ","children":[]})
		expect(orm.plan('Countries.filter(p=> in(p.iso3,["BRA","ARG"])).map(p=> p.name)',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT c.name AS name FROM Countries c  WHERE  c.iso3 IN ('BRA', 'ARG') ","children":[]})
	})
})
