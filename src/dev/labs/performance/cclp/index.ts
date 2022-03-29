import { Helper, orm } from '../../../../lib'
import {
	LocCountries, LocAreaTypes, PmIndustryTypes, PmPartyStatuses, PmMaritalStatuses, PmIdentificationTypes, PrPartyRoleSpecs, PrPartyRoleStatuses,
	LamAccountTypes, LamStatementCycles, DbDebtorTypes, DbPaymentMethodTypes, DbDebtorStages, DbDebtor, DbPartyRoleReference, DbPaymentResponsible, PrPartyRole, PrIndividualReference, PmIndividual, PmParty, DbDebtorAccount, LocAddress, DbAccountPaymentResp, PrPartyRolePlace, PrAddressReference
} from './workspace/src/model'

const sourcePath = 'src/dev/labs/performance/cclp'
const beeStage = 'beesion'
const locStage = 'local'
const view = 'default'

// .page(1,10)
const expExport =
		`DbDebtors
		.include(p=> [p.partyRoleRef
									.include(p=> p.partyRole
																.include(p=> [p.individualReference
																							.include(p=> p.individual
																														.include(p=> [p.party
																																					  .include(p=> p.indentifications),
																																					p.names
																																		 	])
																											),
																							p.organizationReference
																							.include(p=> p.organization
																														.include(p=> [p.party
																																					  .include(p=> [p.indentifications,p.contactMediums]),
																																					p.names
																																		 	])
																											),
																							p.places
																							.include(p=> p.placeRef
																								            .include(p=> p.address.include(p=> p.areas)))
																				])
													),
								p.accounts
								 .include(p=> [p.accountLedgerRef
															  .include(p=> p.ledgerAccount
																							.include(p=> p.statusHistories)),
															 p.services,
															 p.accountPaymentResps
															  .include(p=> [p.locAddressRef.include(p=> p.address.include(p=> p.areas)),
																							p.paymentResponsible.include(p=> p.paymentMethods),
																							p.paymentMethodRef
																				])
												]),
								p.statusHistories
						])
		`
const expImportDebtors =
		`DbDebtors.bulkInsert()
		.include(p=> [p.partyRoleRef
									.include(p=> p.partyRole
																.include(p=> [p.individualReference
																							.include(p=> p.individual
																														.include(p=> [p.party
																																					.include(p=> p.indentifications),
																																		      p.names
																																		 ])
																											),
																							p.organizationReference
																							.include(p=> p.organization
																														.include(p=> [p.party
																																					  .include(p=> [p.indentifications,p.contactMediums]),
																																					p.names
																																		 	])
																											),
																							p.places
																							.include(p=> p.placeRef
																								            .include(p=> p.address
																																					.include(p=> p.areas))) 
																					])
													),
								p.accounts
								 .include(p=> [p.accountLedgerRef
															.include(p=> p.ledgerAccount
																            .include(p=> p.statusHistories)),
															p.services
												]),
								p.statusHistories
						])
		`
const expPaymentRespsImport =
	`DbPaymentResponsibles.bulkInsert()
	.include(p=> p.paymentMethods)
	`
const expAccountPaymentRespsImport =
	`DbAccountPaymentResps.bulkInsert()
	.include(p=> [p.locAddressRef,
								p.paymentResponsible.include(p=> p.paymentMethods)
					])
	`

async function createLocal () {
	// create DDL
	await orm.stage.clean(locStage).execute(true)
	await orm.stage.sync(locStage).execute()
}

async function loadLocalSettings () {
	// Get beesion settings

	const countries = await orm.execute(() => LocCountries, {}, view, beeStage)
	const areaTypes = await orm.execute(() => LocAreaTypes.include(p => p.areas), {}, view, beeStage)
	const industryTypes = await orm.execute(() => PmIndustryTypes, {}, view, beeStage)
	const partyStatuses = await orm.execute(() => PmPartyStatuses, {}, view, beeStage)
	const maritalStatuses = await orm.execute(() => PmMaritalStatuses, {}, view, beeStage)
	const identificationTypes = await orm.execute(() => PmIdentificationTypes, {}, view, beeStage)
	const partyRoleSpecs = await orm.execute(() => PrPartyRoleSpecs, {}, view, beeStage)
	const partyRoleStatuses = await orm.execute(() => PrPartyRoleStatuses, {}, view, beeStage)
	const accountTypes = await orm.execute(() => LamAccountTypes, {}, view, beeStage)
	const statementCycles = await orm.execute(() => LamStatementCycles, {}, view, beeStage)
	const debtorTypes = await orm.execute(() => DbDebtorTypes, {}, view, beeStage)
	const paymentMethodTypes = await orm.execute(() => DbPaymentMethodTypes, {}, view, beeStage)
	const debtorStages = await orm.execute(() => DbDebtorStages, {}, view, beeStage)
	const lamCurrencyReferences = await orm.execute('LamCurrencyReferences', {}, view, beeStage)
	const lamUserReferences = await orm.execute('LamUserReferences', {}, view, beeStage)
	const dbUserReferences = await orm.execute('DbUserReferences', {}, view, beeStage)
	const contactMediumTypes = await orm.execute('PmContactMediumTypes', {}, view, beeStage)

	const _countries = Helper.clone(countries)
	const _areaTypes = Helper.clone(areaTypes)
	const _industryTypes = Helper.clone(industryTypes)
	const _partyStatuses = Helper.clone(partyStatuses)
	const _maritalStatuses = Helper.clone(maritalStatuses)
	const _identificationTypes = Helper.clone(identificationTypes)
	const _partyRoleSpecs = Helper.clone(partyRoleSpecs)
	const _partyRoleStatuses = Helper.clone(partyRoleStatuses)
	const _accountTypes = Helper.clone(accountTypes)
	const _statementCycles = Helper.clone(statementCycles)
	const _debtorTypes = Helper.clone(debtorTypes)
	const _paymentMethodTypes = Helper.clone(paymentMethodTypes)
	const _debtorStages = Helper.clone(debtorStages)
	const _lamCurrencyReferences = Helper.clone(lamCurrencyReferences)
	const _lamUserReferences = Helper.clone(lamUserReferences)
	const _dbUserReferences = Helper.clone(dbUserReferences)
	const _contactMediumTypes = Helper.clone(contactMediumTypes)

	// Load settins
	await orm.execute('LocCountries.bulkInsert()', _countries, view, locStage)
	await orm.execute('LocAreaTypes.bulkInsert().include(p=> p.areas )', _areaTypes, view, locStage)
	await orm.execute('PmIndustryTypes.bulkInsert()', _industryTypes, view, locStage)
	await orm.execute('PmPartyStatuses.bulkInsert()', _partyStatuses, view, locStage)
	await orm.execute('PmMaritalStatuses.bulkInsert()', _maritalStatuses, view, locStage)
	await orm.execute('PmIdentificationTypes.bulkInsert()', _identificationTypes, view, locStage)
	await orm.execute('PrPartyRoleSpecs.bulkInsert()', _partyRoleSpecs, view, locStage)
	await orm.execute('PrPartyRoleStatuses.bulkInsert()', _partyRoleStatuses, view, locStage)
	await orm.execute('LamAccountTypes.bulkInsert()', _accountTypes, view, locStage)
	await orm.execute('LamStatementCycles.bulkInsert()', _statementCycles, view, locStage)
	await orm.execute('DbDebtorTypes.bulkInsert()', _debtorTypes, view, locStage)
	await orm.execute('DbPaymentMethodTypes.bulkInsert()', _paymentMethodTypes, view, locStage)
	await orm.execute('DbDebtorStages.bulkInsert()', _debtorStages, view, locStage)
	await orm.execute('LamCurrencyReferences.bulkInsert()', _lamCurrencyReferences, view, locStage)
	await orm.execute('LamUserReferences.bulkInsert()', _lamUserReferences, view, locStage)
	await orm.execute('DbUserReferences.bulkInsert()', _dbUserReferences, view, locStage)
	await orm.execute('PmContactMediumTypes.bulkInsert()', _contactMediumTypes, view, locStage)

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
	mapping.contactMediumTypes = {}
	for (const i in contactMediumTypes) {
		const source = contactMediumTypes[i]
		mapping.contactMediumTypes[source.id] = _contactMediumTypes.find((p: any) => p.code === source.code).id
	}

	await Helper.writeFile(sourcePath + '/mapping.json', JSON.stringify(mapping))
}

async function _export () {
	const start = new Date().getTime()
	const debtors:DbDebtor[] = await orm.execute(expExport, {}, view, beeStage)
	const get = new Date().getTime()
	console.log(`export: ${get - start}`)
	await Helper.writeFile(sourcePath + '/beesionDebtors.json', JSON.stringify(debtors))
}

async function _import () {
	const mapping = JSON.parse(await Helper.readFile(sourcePath + '/mapping.json') as string)
	const debtors:DbDebtor[] = JSON.parse(await Helper.readFile(sourcePath + '/beesionDebtors.json') as string)
	preImportDebtors(debtors, mapping)
	let start = new Date().getTime()
	await orm.execute(expImportDebtors, debtors, view, locStage)
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

async function exportLocal () {
	const start = new Date().getTime()
	const debtors = await orm.execute(expExport, {}, view, locStage)
	const get = new Date().getTime()
	console.log(`export Local: ${get - start}`)
	await Helper.writeFile(sourcePath + '/localDebtors.json', JSON.stringify(debtors))
}

async function sentence () {
	const sentences = orm.sentence(expExport, view, locStage)
	await Helper.writeFile(sourcePath + '/sentences.json', JSON.stringify(sentences))
}

async function validate () {
	const bDebtors:DbDebtor[] = JSON.parse(await Helper.readFile(sourcePath + '/beesionDebtors.json') as string)
	const lDebtors:DbDebtor[] = JSON.parse(await Helper.readFile(sourcePath + '/localDebtors.json') as string)

	for (const i in bDebtors) {
		const bDebtor = bDebtors[i]
		const lDebtor = lDebtors.find(p => p.debtorNumber === bDebtor.debtorNumber && p.referenceNumber === bDebtor.referenceNumber)
		if (lDebtor) {
			if (bDebtor.name !== lDebtor.name) {
				throw new Error(`Not match  name in  debtor ${bDebtor.debtorNumber}`)
			}
			// if (!equalDate(bDebtor.lastModificationDate, lDebtor.lastModificationDate)) {
			// throw new Error(`Not match lastModificationDate in  debtor ${bDebtor.debtorNumber}`)
			// }
			if (bDebtor.partyRoleRef) {
				const bPartyRoleRef = bDebtor.partyRoleRef
				const lPartyRoleRef = lDebtor.partyRoleRef as DbPartyRoleReference
				if (bPartyRoleRef.name !== lPartyRoleRef.name) {
					throw new Error(`Not match  partyRoleRef.name in  debtor ${bDebtor.debtorNumber}`)
				}
				if (bPartyRoleRef.partyRole) {
					const bPartyRole = bPartyRoleRef.partyRole
					const lPartyRole = lPartyRoleRef.partyRole as PrPartyRole
					if (bPartyRole.name !== lPartyRole.name) {
						throw new Error(`Not match  partyRoleRef.partyRole.name in  debtor ${bDebtor.debtorNumber}`)
					}
					if (bPartyRole.individualReference) {
						const bIndividualReference = bPartyRole.individualReference
						const lIndividualReference = lPartyRole.individualReference as PrIndividualReference
						if (bIndividualReference.name !== lIndividualReference.name) {
							throw new Error(`Not match  partyRoleRef.partyRole.individualReference.name in  debtor ${bDebtor.debtorNumber}`)
						}
						if (bIndividualReference.individual) {
							const bIndividual = bIndividualReference.individual
							const lIndividual = lIndividualReference.individual as PmIndividual
							if (bIndividual.party) {
								const bParty = bIndividual.party
								const lParty = lIndividual.party as PmParty
								if (bParty.indentifications.map(p => p.indentificationValue).join(':') !== lParty.indentifications.map(p => p.indentificationValue).join(':')) {
									throw new Error(`Not match  partyRoleRef.partyRole.individualReference.individual.party.indentifications in  debtor ${bDebtor.debtorNumber}`)
								}
							}
							if (bIndividual.names.map(p => p.legalName).join(':') !== lIndividual.names.map(p => p.legalName).join(':')) {
								throw new Error(`Not match  partyRoleRef.partyRole.individualReference.individual.names in  debtor ${bDebtor.debtorNumber}`)
							}
						}
					}
					const bNames = bPartyRole.places.map(p => p.placeRef !== undefined ? p.placeRef.name : '')
					const lNames = lPartyRole.places.map(p => p.placeRef !== undefined ? p.placeRef.name : '')
					if (bNames.join(':') !== lNames.join(':')) {
						throw new Error(`Not match  partyRoleRef.partyRole.places in  debtor ${bDebtor.debtorNumber}`)
					}
				}
			}
			if (bDebtor.accounts) {
				const bNames = bDebtor.accounts.map(p => p.name).join(':')
				const lNames = lDebtor.accounts.map(p => p.name).join(':')
				if (bNames !== lNames) {
					throw new Error(`Not match  accounts in  debtor ${bDebtor.debtorNumber}`)
				}
				for (const j in bDebtor.accounts) {
					const bAccount = bDebtor.accounts[j]
					const lAccount = lDebtor.accounts.find(p => p.accountNumber === bAccount.accountNumber) as DbDebtorAccount
					if (bAccount.accountLedgerRef && bAccount.accountLedgerRef.ledgerAccount && lAccount.accountLedgerRef && lAccount.accountLedgerRef.ledgerAccount) {
						if (bAccount.accountLedgerRef.ledgerAccount.accountNumber !== lAccount.accountLedgerRef.ledgerAccount.accountNumber) {
							throw new Error(`Not match  accounts.accountLedgerRef.ledgerAccount.accountNumber in  debtor ${bDebtor.debtorNumber}`)
						}
					} else if (bAccount.accountLedgerRef && !lAccount.accountLedgerRef) {
						throw new Error(`Not match  accounts.accountLedgerRef in  debtor ${bDebtor.debtorNumber}`)
					} else if (bAccount.accountLedgerRef && bAccount.accountLedgerRef.ledgerAccount && lAccount.accountLedgerRef && !lAccount.accountLedgerRef.ledgerAccount) {
						throw new Error(`Not match  accounts.accountLedgerRef.ledgerAccount in  debtor ${bDebtor.debtorNumber}`)
					}
				}
			}
		} else {
			throw new Error(`Local not found in debtor ${bDebtor.debtorNumber}`)
		}
	}
	console.log('validate Ok')
}

// function equalDate (value1: Date|undefined, value2:Date|undefined): boolean {
// if (value1 !== undefined && value2 !== undefined && value1 !== null && value2 !== null && new Date(value1).getTime() !== new Date(value2).getTime()) {
// return false
// } else if (!!value1 !== !!value2) {
// return false
// }
// return true
// }

function preImportDebtors (debtors:DbDebtor[], mapping:any) {
	for (const i in debtors) {
		const debtor = debtors[i]
		debtor.id = undefined
		if (debtor.partyRoleRef) {
			const partyRoleRef = debtor.partyRoleRef
			partyRoleRef.id = undefined
			partyRoleRef.refId = undefined
			if (partyRoleRef.partyRole) {
				const partyRole = partyRoleRef.partyRole
				partyRole.id = undefined
				partyRole.partyId = undefined
				if (partyRole.individualReference) {
					const individualReference = partyRole.individualReference
					individualReference.id = undefined
					individualReference.refId = undefined
					if (individualReference.individual) {
						const individual = individualReference.individual
						individual.id = undefined
						individual.partyId = undefined
						individual.currentNameId = undefined // TODO pendiente update posterior
						if (individual.party) {
							const party = individual.party
							party.id = undefined
							party.individualId = undefined
							party.organizationId = undefined
							if (party.indentifications) {
								for (const j in party.indentifications) {
									const indentification = party.indentifications[j]
									indentification.id = undefined
									indentification.partyId = undefined
									if (indentification.identificationTypeId) {
										indentification.identificationTypeId = mapping.identificationTypes[indentification.identificationTypeId]
									}
								}
							}
						}
						if (individual.names) {
							for (const j in individual.names) {
								const names = individual.names[j]
								names.id = undefined
								names.individualId = undefined
							}
						}
					}
				}
				if (partyRole.organizationReference) {
					const organizationReference = partyRole.organizationReference
					organizationReference.id = undefined
					organizationReference.refId = undefined
					if (organizationReference.organization) {
						const organization = organizationReference.organization
						organization.id = undefined
						organization.partyId = undefined
						organization.currentNameId = undefined // TODO pendiente update posterior
						if (organization.industyTypeId) {
							organization.industyTypeId = mapping.industryTypes[organization.industyTypeId]
						}
						if (organization.party) {
							const party = organization.party
							party.id = undefined
							party.individualId = undefined
							party.organizationId = undefined
							if (party.indentifications) {
								for (const j in party.indentifications) {
									const indentification = party.indentifications[j]
									indentification.id = undefined
									indentification.partyId = undefined
									if (indentification.identificationTypeId) {
										indentification.identificationTypeId = mapping.identificationTypes[indentification.identificationTypeId]
									}
								}
							}
						}
						if (organization.names) {
							for (const j in organization.names) {
								const names = organization.names[j]
								names.id = undefined
								names.organizationId = undefined
							}
						}
					}
				}
				if (partyRole.places) {
					for (const j in partyRole.places) {
						const place = partyRole.places[j]
						place.id = undefined
						place.partyRoleId = undefined
						if (place.placeRef) {
							const placeRef = place.placeRef
							placeRef.id = undefined
							placeRef.refId = undefined
							if (placeRef.address) {
								const address = placeRef.address
								address.id = undefined
								if (address.countryId) {
									address.countryId = mapping.countries[address.countryId]
								}
								if (address.areas) {
									for (const k in address.areas) {
										const adressArea = address.areas[k]
										adressArea.id = undefined
										adressArea.addressId = undefined
										if (adressArea.areaId) {
											adressArea.areaId = mapping.areas[adressArea.areaId]
										}
									}
								}
							}
						}
					}
				}
			}
		}
		if (debtor.accounts) {
			const partyRole = debtor.partyRoleRef?.partyRole as PrPartyRole
			for (const j in debtor.accounts) {
				const dbAccount = debtor.accounts[j]
				dbAccount.id = undefined
				dbAccount.debtorId = undefined
				dbAccount.accountStatusId = undefined // TODO pendiente agregar relacion en la importacion
				dbAccount.currencyRefId = undefined // TODO pendiente agregar relacion en la importacion
				if (dbAccount.accountLedgerRef) {
					const accountLedgerRef = dbAccount.accountLedgerRef
					accountLedgerRef.id = undefined
					accountLedgerRef.refId = undefined
					if (accountLedgerRef.ledgerAccount) {
						const ledgerAccount = accountLedgerRef.ledgerAccount
						ledgerAccount.id = undefined
						ledgerAccount.accountStatusId = undefined // TODO agregar relacion y luego update
						if (ledgerAccount.statementCycleId) {
							ledgerAccount.statementCycleId = mapping.statementCycles[ledgerAccount.statementCycleId]
						}
						if (ledgerAccount.currencyRefId) {
							ledgerAccount.currencyRefId = mapping.lamCurrencyReferences[ledgerAccount.currencyRefId]
						}
						ledgerAccount.accountHolderRefId = undefined // TODO pendiente agregar relacion en la importacion
						ledgerAccount.creditorId = undefined // TODO pendiente agregar relacion en la importacion
						if (ledgerAccount.accountTypeId) {
							ledgerAccount.accountTypeId = mapping.accountTypes[ledgerAccount.accountTypeId]
						}
						if (ledgerAccount.statusHistories) {
							for (const k in ledgerAccount.statusHistories) {
								const statusHistory = ledgerAccount.statusHistories[k]
								statusHistory.id = undefined
								statusHistory.accountId = undefined
								if (statusHistory.userRefId) {
									statusHistory.userRefId = mapping.lamUserReferences[statusHistory.userRefId]
								}
							}
						}
					}
				}
				if (dbAccount.services) {
					for (const k in dbAccount.services) {
						const service = dbAccount.services[k]
						service.id = undefined
						service.accountId = undefined
					}
				}
				if (dbAccount.accountPaymentResps) {
					for (const k in dbAccount.accountPaymentResps) {
						const accountPaymentResp = dbAccount.accountPaymentResps[k]
						accountPaymentResp.id = undefined
						accountPaymentResp.debtorAccountId = undefined
						if (accountPaymentResp.paymentResponsible) {
							const paymentResponsible = accountPaymentResp.paymentResponsible
							paymentResponsible.id = undefined
							if (paymentResponsible.paymentMethods) {
								for (const l in paymentResponsible.paymentMethods) {
									const paymentMethod = paymentResponsible.paymentMethods[l]
									paymentMethod.id = undefined
									paymentMethod.paymentResponsibleId = undefined
									if (paymentMethod.paymentMethodTypeId) {
										paymentMethod.paymentMethodTypeId = mapping.paymentMethodTypes[paymentMethod.paymentMethodTypeId]
									}
								}
							}
						}
						if (accountPaymentResp.locAddressRef) {
							const locAddressRef = accountPaymentResp.locAddressRef
							locAddressRef.id = undefined
							locAddressRef.refId = undefined
							if (locAddressRef.address) {
								const address = locAddressRef.address
								address.id = undefined
								if (address.countryId) {
									address.countryId = mapping.countries[address.countryId]
								}
								if (address.areas) {
									for (const k in address.areas) {
										const adressArea = address.areas[k]
										adressArea.id = undefined
										adressArea.addressId = undefined
										if (adressArea.areaId) {
											adressArea.areaId = mapping.areas[adressArea.areaId]
										}
									}
								}
								// Busca la direccion en partyRole.places.placeRef.address , en el caso de no encontrarla la agrea
								const partyRoleAddress = partyRole.places.find(p => p.placeRef ? equalAddress(p.placeRef?.address as LocAddress, address) : false)
								if (!partyRoleAddress) {
									const prAddressReference: PrAddressReference = { refType: 'Address', address: Helper.clone(address) as LocAddress }
									const partyRolePlace: PrPartyRolePlace = { placeRef: prAddressReference }
									partyRole.places.push(partyRolePlace)
								}
							} else {
								// IMPORTANTE: En el caso que locAddressRef.address sea nulo, se asigna la primera direccion del party.
								// en realidad este registro deberia ser excluido dado que no se podria importar.
								locAddressRef.address = partyRole.places.filter(p => p.placeRef !== undefined).map(p => p.placeRef?.address)[0]
							}
						}
					}
				}
			}
		}
		if (debtor.statusHistories) {
			for (const k in debtor.statusHistories) {
				const statusHistory = debtor.statusHistories[k]
				statusHistory.id = undefined
				statusHistory.debtorId = undefined
				if (statusHistory.userRefId) {
					statusHistory.userRefId = mapping.dbUserReferences[statusHistory.userRefId]
				}
			}
		}
	}
}

function getPaymentResponsibles (debtors: DbDebtor[]):DbPaymentResponsible[] {
	const paymentResponsibles:DbPaymentResponsible[] = []
	for (const i in debtors) {
		const debtor = debtors[i]
		for (const j in debtor.accounts) {
			const debtorAccount = debtor.accounts[j]
			for (const k in debtorAccount.accountPaymentResps) {
				const accountPaymentResp = debtorAccount.accountPaymentResps[k]
				if (accountPaymentResp.paymentResponsible) {
					paymentResponsibles.push(accountPaymentResp.paymentResponsible)
				}
			}
		}
	}
	return paymentResponsibles
}

function preImportAccountPaymentRest (debtors:DbDebtor[]) {
	for (const i in debtors) {
		const debtor = debtors[i]
		const places = debtor.partyRoleRef?.partyRole?.places
		const previousAddresses = places ? places.map(p => p.placeRef?.address) : []
		if (!previousAddresses) {
			console.log(places)
		}
		for (const j in debtor.accounts) {
			const debtorAccount = debtor.accounts[j]
			for (const k in debtorAccount.accountPaymentResps) {
				const accountPaymentResp = debtorAccount.accountPaymentResps[k]
				accountPaymentResp.debtorAccountId = debtorAccount.id
				// como previamente fueron insertados los metodos de pago, asigna el primer metodo de pago del responsable de pago
				accountPaymentResp.paymentMethodRefId = accountPaymentResp.paymentResponsible?.paymentMethods.map(p => p.id)[0]
				if (accountPaymentResp.locAddressRef) {
					const address = accountPaymentResp.locAddressRef.address
					if (address && previousAddresses) {
						const previousAddress = previousAddresses.find(p => equalAddress(p as LocAddress, address))
						if (previousAddress) {
							accountPaymentResp.locAddressRef.refId = previousAddress.id?.toString()
							if (!accountPaymentResp.locAddressRef.refId) {
								console.log(previousAddress)
							}
						} else {
							console.log(address)
						}
					} else {
						console.log(address)
					}
				}
			}
		}
	}
}
function getAccountPaymentRest (debtors: DbDebtor[]):DbAccountPaymentResp[] {
	const accountPaymentResps:DbAccountPaymentResp[] = []
	for (const i in debtors) {
		const debtor = debtors[i]
		for (const j in debtor.accounts) {
			const debtorAccount = debtor.accounts[j]
			for (const k in debtorAccount.accountPaymentResps) {
				const accountPaymentResp = debtorAccount.accountPaymentResps[k]
				accountPaymentResps.push(accountPaymentResp)
			}
		}
	}
	return accountPaymentResps
}

function equalAddress (value1: LocAddress, value2: LocAddress): boolean {
	if (value1.additionalData && value2.additionalData) {
		return value1.additionalData === value2.additionalData
	} else {
		return value1.city === value2.city && value1.postalCode === value2.postalCode && value1.streetName === value2.streetName && value1.streetNrFirst === value2.streetNrFirst
	}
}

async function execute () {
	try {
		await orm.init(`${sourcePath}/workspace/lambdaorm.yaml`)
		await createLocal()
		await loadLocalSettings()
		// await _export()
		await _import()
		// await exportLocal()
		// await validate()
		// await sentence()
	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
}

execute()

// Tareas
// Test:
// importar todos los debtos en Postgress
// Current:
// completar el bulkinsert en oracle y comenzar a migrar a oracle.
// Pending:
// pasar a trabajar con el archivo real (y no con los datos que se traen desde beesion oracle)
// modificar bulkinsert para que permita transacciones por lote o por item o poder deshabilitarlo.
// modificar bulkinsert para que en le caso de transacciones por item o deshabilitadas , retorne los registros que no pudieron ser importados completamente
// trabajar con lambdaOrm como servicio y no como libreria.
