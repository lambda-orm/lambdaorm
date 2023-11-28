/* eslint-disable no-template-curly-in-string */
import { orm } from '../../..'
beforeAll(async () => {
	require('dotenv').config({ path: './config/countries.env' })
	await orm.init('./config/countries.yaml')
})

describe('nullable', () => {
	const context = JSON.parse('{}')
	test('normalize', () => {
		expect(orm.normalize('States.filter(p=> isNull(p.latitude)).map(p=> count(1))')).toStrictEqual('States.map(p=>count(1)).filter(p=>isNull(p.latitude))')
		expect(orm.normalize('States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))')).toStrictEqual('States.map(p=>count(1)).filter(p=>isNotNull(p.latitude))')
		expect(orm.normalize('States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))')).toStrictEqual('States.map(p=>count(1)).filter(p=>(nvl(p.latitude,-100)==-100))')
		expect(orm.normalize('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})')).toStrictEqual('Countries.map(p=>{native:nvl(p.native,???)}).filter(p=>(p.iso3==CIV))')
		expect(orm.normalize('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})')).toStrictEqual('Countries.map(p=>{native:nvl2(p.native,is not null,is null)}).filter(p=>(p.iso3==CIV))')
	})
	test('model', () => {
		expect(orm.model('States.filter(p=> isNull(p.latitude)).map(p=> count(1))')).toStrictEqual([])
		expect(orm.model('States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))')).toStrictEqual([])
		expect(orm.model('States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))')).toStrictEqual([])
		expect(orm.model('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})')).toStrictEqual([{'name':'native','type':'string'}])
		expect(orm.model('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})')).toStrictEqual([{'name':'native','type':'string'}])
	})
	test('parameters', () => {
		expect(orm.parameters('States.filter(p=> isNull(p.latitude)).map(p=> count(1))')).toStrictEqual([])
		expect(orm.parameters('States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))')).toStrictEqual([])
		expect(orm.parameters('States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})')).toStrictEqual([])
		expect(orm.parameters('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})')).toStrictEqual([])
	})
	test('constraints', () => {
		expect(orm.constraints('States.filter(p=> isNull(p.latitude)).map(p=> count(1))')).toStrictEqual({"entity":"States","constraints":[]})
		expect(orm.constraints('States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))')).toStrictEqual({"entity":"States","constraints":[]})
		expect(orm.constraints('States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))')).toStrictEqual({"entity":"States","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})')).toStrictEqual({"entity":"Countries","constraints":[]})
		expect(orm.constraints('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})')).toStrictEqual({"entity":"Countries","constraints":[]})
	})
	test('getInfo', () => {
		expect(orm.plan('States.filter(p=> isNull(p.latitude)).map(p=> count(1))',{ stage: 'stage1' })).toStrictEqual({"entity":"States","dialect":"PostgreSQL","source":"dataSource2","sentence":"SELECT COUNT(1) FROM TBL_STATES s  WHERE (s.LATITUDE IS NULL) "})
		expect(orm.plan('States.filter(p=> isNotNull(p.latitude)).map(p=> count(1))',{ stage: 'stage1' })).toStrictEqual({"entity":"States","dialect":"PostgreSQL","source":"dataSource2","sentence":"SELECT COUNT(1) FROM TBL_STATES s  WHERE (s.LATITUDE IS NOT NULL) "})
		expect(orm.plan('States.filter(p=> nvl(p.latitude,-100)== -100).map(p=> count(1))',{ stage: 'stage1' })).toStrictEqual({"entity":"States","dialect":"PostgreSQL","source":"dataSource2","sentence":"SELECT COUNT(1) FROM TBL_STATES s  WHERE (CASE WHEN s.LATITUDE IS NOT NULL THEN s.LATITUDE ELSE -100 END) = -100 "})
		expect(orm.plan('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl(p.native,"???")})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT IFNULL(c.native,'???') AS native FROM Countries c  WHERE c.iso3 = 'CIV' "})
		expect(orm.plan('Countries.filter(p=> p.iso3 == "CIV" ).map(p=> {native: nvl2(p.native,"is not null","is null")})',{ stage: 'stage1' })).toStrictEqual({"entity":"Countries","dialect":"MySQL","source":"dataSource1","sentence":"SELECT (CASE WHEN c.native IS NOT NULL THEN 'is not null' ELSE 'is null' END) AS native FROM Countries c  WHERE c.iso3 = 'CIV' "})
	})
})
