import { Helper, orm } from '../../../../lib'
import {
	LocCountries, LocAreaTypes, PmIndustryTypes, PmPartyStatuses, PmMaritalStatuses, PmIdentificationTypes, PrPartyRoleSpecs, PrPartyRoleStatuses,
	LamAccountTypes, LamStatementCycles, LamCurrencyReferences, DbDebtorTypes, DbPaymentMethodTypes, DbDebtorStages, DbDebtor,
	LamUserReferences, DbUserReferences, PmContactMediumTypes, LamCreditors, PmGenders, DbBanks
} from './workspace/src/model'
import {
	sourcePath, beeStage, locStage, view, expDebtorsExport, expDebtorsImport, expPaymentRespsImport, expAccountPaymentRespsImport, createLocal,
	preImportDebtors, getPaymentResponsibles, preImportAccountPaymentRest, getAccountPaymentRest, exportLocal
} from './common'

async function loadLocalSettings () {
	// Get beesion settings

	const countries = await orm.execute(() => LocCountries, {}, view, beeStage)
	const areaTypes = await orm.execute('LocAreaTypes.include(p => p.areas)', {}, view, beeStage)
	const industryTypes = await orm.execute(() => PmIndustryTypes, {}, view, beeStage)
	const partyStatuses = await orm.execute(() => PmPartyStatuses, {}, view, beeStage)
	const maritalStatuses = await orm.execute(() => PmMaritalStatuses, {}, view, beeStage)
	const identificationTypes = await orm.execute(() => PmIdentificationTypes, {}, view, beeStage)
	const contactMediumTypes = await orm.execute(() => PmContactMediumTypes, {}, view, beeStage)
	const genders = await orm.execute(() => PmGenders, {}, view, beeStage)
	const partyRoleSpecs = await orm.execute(() => PrPartyRoleSpecs, {}, view, beeStage)
	const partyRoleStatuses = await orm.execute(() => PrPartyRoleStatuses, {}, view, beeStage)
	const accountTypes = await orm.execute(() => LamAccountTypes, {}, view, beeStage)
	const statementCycles = await orm.execute(() => LamStatementCycles, {}, view, beeStage)
	const lamCreditors = await orm.execute(() => LamCreditors, {}, view, beeStage)
	const lamCurrencyReferences = await orm.execute(() => LamCurrencyReferences, {}, view, beeStage)
	const lamUserReferences = await orm.execute(() => LamUserReferences, {}, view, beeStage)
	const debtorTypes = await orm.execute(() => DbDebtorTypes, {}, view, beeStage)
	const paymentMethodTypes = await orm.execute(() => DbPaymentMethodTypes, {}, view, beeStage)
	const debtorStages = await orm.execute(() => DbDebtorStages, {}, view, beeStage)
	const dbUserReferences = await orm.execute(() => DbUserReferences, {}, view, beeStage)
	const dbBanks = await orm.execute(() => DbBanks, {}, view, beeStage)

	const _countries = Helper.clone(countries)
	const _areaTypes = Helper.clone(areaTypes)
	const _industryTypes = Helper.clone(industryTypes)
	const _partyStatuses = Helper.clone(partyStatuses)
	const _maritalStatuses = Helper.clone(maritalStatuses)
	const _identificationTypes = Helper.clone(identificationTypes)
	const _contactMediumTypes = Helper.clone(contactMediumTypes)
	const _genders = Helper.clone(genders)
	const _partyRoleSpecs = Helper.clone(partyRoleSpecs)
	const _partyRoleStatuses = Helper.clone(partyRoleStatuses)
	const _accountTypes = Helper.clone(accountTypes)
	const _statementCycles = Helper.clone(statementCycles)
	const _debtorTypes = Helper.clone(debtorTypes)
	const _paymentMethodTypes = Helper.clone(paymentMethodTypes)
	const _debtorStages = Helper.clone(debtorStages)
	const _lamCreditors = Helper.clone(lamCreditors)
	const _lamCurrencyReferences = Helper.clone(lamCurrencyReferences)
	const _lamUserReferences = Helper.clone(lamUserReferences)
	const _dbUserReferences = Helper.clone(dbUserReferences)
	const _dbBanks = Helper.clone(dbBanks)

	// Load settins
	await orm.execute('LocCountries.bulkInsert()', _countries, view, locStage)
	await orm.execute('LocAreaTypes.bulkInsert().include(p=> p.areas )', _areaTypes, view, locStage)
	await orm.execute('PmIndustryTypes.bulkInsert()', _industryTypes, view, locStage)
	await orm.execute('PmPartyStatuses.bulkInsert()', _partyStatuses, view, locStage)
	await orm.execute('PmMaritalStatuses.bulkInsert()', _maritalStatuses, view, locStage)
	await orm.execute('PmIdentificationTypes.bulkInsert()', _identificationTypes, view, locStage)
	await orm.execute('PmContactMediumTypes.bulkInsert()', _contactMediumTypes, view, locStage)
	await orm.execute('PmGenders.bulkInsert()', _genders, view, locStage)
	await orm.execute('PrPartyRoleSpecs.bulkInsert()', _partyRoleSpecs, view, locStage)
	await orm.execute('PrPartyRoleStatuses.bulkInsert()', _partyRoleStatuses, view, locStage)
	await orm.execute('LamAccountTypes.bulkInsert()', _accountTypes, view, locStage)
	await orm.execute('LamStatementCycles.bulkInsert()', _statementCycles, view, locStage)
	await orm.execute('LamCurrencyReferences.bulkInsert()', _lamCurrencyReferences, view, locStage)
	await orm.execute('LamUserReferences.bulkInsert()', _lamUserReferences, view, locStage)
	await orm.execute('LamCreditors.bulkInsert()', _lamCreditors, view, locStage)
	await orm.execute('DbDebtorTypes.bulkInsert()', _debtorTypes, view, locStage)
	await orm.execute('DbPaymentMethodTypes.bulkInsert()', _paymentMethodTypes, view, locStage)
	await orm.execute('DbDebtorStages.bulkInsert()', _debtorStages, view, locStage)
	await orm.execute('DbUserReferences.bulkInsert()', _dbUserReferences, view, locStage)
	await orm.execute('DbBanks.bulkInsert()', _dbBanks, view, locStage)

	const mapping:any = {}
	mapping.countries = {}
	for (const i in countries) {
		const source = countries[i]
		mapping.countries[source.id] = _countries.find((p: any) => p.iso3 === source.iso3).id
	}
	mapping.areaTypes = {}
	mapping.areas = {}
	for (const i in areaTypes) {
		const source = areaTypes[i]
		const target = _areaTypes.find((p: any) => p.code === source.code)
		mapping.areaTypes[source.id] = target.id
		for (const j in source.areas) {
			const areaSource = source.areas[j]
			mapping.areas[areaSource.id] = target.areas.find((p: any) => p.code === areaSource.code).id
		}
	}
	mapping.industryTypes = {}
	for (const i in industryTypes) {
		const source = industryTypes[i]
		mapping.industryTypes[source.id] = _industryTypes.find((p: any) => p.code === source.code).id
	}
	mapping.partyStatuses = {}
	for (const i in partyStatuses) {
		const source = partyStatuses[i]
		mapping.partyStatuses[source.id] = _partyStatuses.find((p: any) => p.code === source.code).id
	}
	mapping.maritalStatuses = {}
	for (const i in maritalStatuses) {
		const source = maritalStatuses[i]
		mapping.maritalStatuses[source.id] = _maritalStatuses.find((p: any) => p.code === source.code).id
	}
	mapping.identificationTypes = {}
	for (const i in identificationTypes) {
		const source = identificationTypes[i]
		mapping.identificationTypes[source.id] = _identificationTypes.find((p: any) => p.code === source.code).id
	}
	mapping.contactMediumTypes = {}
	for (const i in contactMediumTypes) {
		const source = contactMediumTypes[i]
		mapping.contactMediumTypes[source.id] = _contactMediumTypes.find((p: any) => p.code === source.code).id
	}
	mapping.genders = {}
	for (const i in genders) {
		const source = genders[i]
		mapping.genders[source.id] = _genders.find((p: any) => p.code === source.code).id
	}
	mapping.partyRoleSpecs = {}
	for (const i in partyRoleSpecs) {
		const source = partyRoleSpecs[i]
		mapping.partyRoleSpecs[source.id] = _partyRoleSpecs.find((p: any) => p.code === source.code).id
	}
	mapping.partyRoleStatuses = {}
	for (const i in partyRoleStatuses) {
		const source = partyRoleStatuses[i]
		mapping.partyRoleStatuses[source.id] = _partyRoleStatuses.find((p: any) => p.code === source.code).id
	}
	mapping.accountTypes = {}
	for (const i in accountTypes) {
		const source = accountTypes[i]
		mapping.accountTypes[source.id] = _accountTypes.find((p: any) => p.code === source.code).id
	}
	mapping.statementCycles = {}
	for (const i in statementCycles) {
		const source = statementCycles[i]
		mapping.statementCycles[source.id] = _statementCycles.find((p: any) => p.code === source.code).id
	}
	mapping.debtorTypes = {}
	for (const i in debtorTypes) {
		const source = debtorTypes[i]
		mapping.debtorTypes[source.id] = _debtorTypes.find((p: any) => p.code === source.code).id
	}
	mapping.paymentMethodTypes = {}
	for (const i in paymentMethodTypes) {
		const source = paymentMethodTypes[i]
		mapping.paymentMethodTypes[source.id] = _paymentMethodTypes.find((p: any) => p.code === source.code).id
	}
	mapping.debtorStages = {}
	for (const i in debtorStages) {
		const source = debtorStages[i]
		mapping.debtorStages[source.id] = _debtorStages.find((p: any) => p.code === source.code).id
	}
	mapping.lamCurrencyReferences = {}
	for (const i in lamCurrencyReferences) {
		const source = lamCurrencyReferences[i]
		mapping.lamCurrencyReferences[source.id] = _lamCurrencyReferences.find((p: any) => p.ref_id === source.ref_id).id
	}
	mapping.lamUserReferences = {}
	for (const i in lamUserReferences) {
		const source = lamUserReferences[i]
		mapping.lamUserReferences[source.id] = _lamUserReferences.find((p: any) => p.ref_id === source.ref_id).id
	}
	mapping.dbUserReferences = {}
	for (const i in dbUserReferences) {
		const source = dbUserReferences[i]
		mapping.dbUserReferences[source.id] = _dbUserReferences.find((p: any) => p.ref_id === source.ref_id).id
	}
	mapping.lamCreditors = {}
	for (const i in lamCreditors) {
		const source = lamCreditors[i]
		mapping.lamCreditors[source.id] = _lamCreditors.find((p: any) => p.creditorCode === source.creditorCode).id
	}
	mapping.dbBanks = {}
	for (const i in dbBanks) {
		const source = dbBanks[i]
		mapping.dbBanks[source.id] = _dbBanks.find((p: any) => p.bic === source.bic).id
	}

	await Helper.writeFile(sourcePath + '/confidentional_data/mapping.json', JSON.stringify(mapping))
}

async function _export () {
	const start = new Date().getTime()
	const debtors:DbDebtor[] = await orm.execute(expDebtorsExport, {}, view, beeStage)
	const get = new Date().getTime()
	console.log(`export: ${get - start}`)
	await Helper.writeFile(sourcePath + '/confidentional_data/beesionDebtors.json', JSON.stringify(debtors))
}

async function _import () {
	const mapping = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/mapping.json') as string)
	const debtors:DbDebtor[] = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/beesionDebtors.json') as string)
	preImportDebtors(debtors, mapping)
	let start = new Date().getTime()
	await orm.execute(expDebtorsImport, debtors, view, locStage)
	let end = new Date().getTime()
	console.log(`import debtors: ${end - start}`)

	const paymentResponsibles = getPaymentResponsibles(debtors)
	start = new Date().getTime()
	await orm.execute(expPaymentRespsImport, paymentResponsibles, view, locStage)
	end = new Date().getTime()
	console.log(`import paymentResponsibles: ${end - start}`)

	preImportAccountPaymentRest(debtors)
	const accountPaymentResps = getAccountPaymentRest(debtors)
	start = new Date().getTime()
	await orm.execute(expAccountPaymentRespsImport, accountPaymentResps, view, locStage)
	end = new Date().getTime()
	console.log(`import accountPaymentResps: ${end - start}`)
}

async function execute () {
	try {
		await orm.init(`${sourcePath}/workspace/lambdaorm.yaml`)
		await createLocal()
		await loadLocalSettings()
		await _export()
		// await _import()
		// await exportLocal()
		// await validate()
		// await sentence()
	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
}

// export: 10644
// import debtors: 1726
// import paymentResponsibles: 119
// import accountPaymentResps: 196
// export Local: 1401

execute()

// TEST:
// importar todos los debtos en Postgress
// completar el bulkinsert en oracle y comenzar a migrar a oracle.
// CURRENT:
// pasar a trabajar con el archivo real (y no con los datos que se traen desde beesion oracle)
// PENDING:
// modificar bulkinsert para que permita transacciones por lote o por item o poder deshabilitarlo.
// modificar bulkinsert para que en le caso de transacciones por item o deshabilitadas , retorne los registros que no pudieron ser importados completamente
// trabajar con lambdaOrm como servicio y no como libreria.
