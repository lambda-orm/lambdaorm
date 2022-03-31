import { Helper, orm } from '../../../../lib'
import {
	LocCountries, PmIndustryTypes, PmPartyStatuses, PmMaritalStatuses, PmIdentificationTypes, PrPartyRoleSpecs, PrPartyRoleStatuses,
	LamAccountTypes, LamStatementCycles, LamCurrencyReferences, DbDebtorTypes, DbPaymentMethodTypes, DbDebtorStages, DbDebtor, DbDebtorAccount,
	LocAddress, LamUserReferences, DbUserReferences, PmContactMediumTypes, LamAccount,
	DbPaymentResponsibleMethod, PmNationalReferences, LamCreditors, PmGenders, DbBanks
} from './workspace/src/model'
import { Debtor, Address, Message } from './sourceModel'
import {
	sourcePath, locStage, view, expDebtorsImport, expPaymentRespsImport, expAccountPaymentRespsImport, createLocal,
	getPaymentResponsibles, preImportAccountPaymentRest, getAccountPaymentRest, exportLocal
} from './common'

async function updateLocMapping () {
	const countries = await orm.execute(() => LocCountries.map(p => [p.id, p.iso3]), {}, view, locStage)
	const areaTypes = await orm.execute('LocAreaTypes.map(p=> [p.id,p.code]).include(p => p.areas.map(p=> [p.id,p.code]))', {}, view, locStage)
	const mapping: any = { countries: {}, areaTypes: {}, areas: {} }
	for (const i in countries) {
		const source = countries[i]
		mapping.countries[source.iso3] = source.id
	}
	for (const i in areaTypes) {
		const source = areaTypes[i]
		mapping.areaTypes[source.code] = source.id
		for (const j in source.areas) {
			const areaSource = source.areas[j]
			mapping.areas[areaSource.code] = areaSource.id
		}
	}
	await Helper.writeFile(sourcePath + '/confidentional_data/locMapping.json', JSON.stringify(mapping))
}

async function updatePmMapping () {
	const industryTypes = await orm.execute(() => PmIndustryTypes.map(p => [p.id, p.code]), {}, view, locStage)
	const partyStatuses = await orm.execute(() => PmPartyStatuses.map(p => [p.id, p.code]), {}, view, locStage)
	const maritalStatuses = await orm.execute(() => PmMaritalStatuses.map(p => [p.id, p.code]), {}, view, locStage)
	const identificationTypes = await orm.execute(() => PmIdentificationTypes.map(p => [p.id, p.code]), {}, view, locStage)
	const contactMediumTypes = await orm.execute(() => PmContactMediumTypes.map(p => [p.id, p.code]), {}, view, locStage)
	const nationalReferences = await orm.execute(() => PmNationalReferences.map(p => [p.id, p.refId]), {}, view, locStage)
	const genders = await orm.execute(() => PmGenders.map(p => [p.id, p.code]), {}, view, locStage)

	const mapping: any = { industryTypes: {}, partyStatuses: {}, maritalStatuses: {}, identificationTypes: {}, contactMediumTypes: {}, nationalReferences: {}, genders: {} }
	for (const i in industryTypes) {
		const source = industryTypes[i]
		mapping.industryTypes[source.code] = source.id
	}
	for (const i in partyStatuses) {
		const source = partyStatuses[i]
		mapping.partyStatuses[source.code] = source.id
	}
	for (const i in maritalStatuses) {
		const source = maritalStatuses[i]
		mapping.maritalStatuses[source.code] = source.id
	}
	for (const i in identificationTypes) {
		const source = identificationTypes[i]
		mapping.identificationTypes[source.code] = source.id
	}
	for (const i in contactMediumTypes) {
		const source = contactMediumTypes[i]
		mapping.contactMediumTypes[source.code] = source.id
	}
	for (const i in nationalReferences) {
		const source = nationalReferences[i]
		mapping.nationalReferences[source.refId] = source.id
	}
	for (const i in genders) {
		const source = genders[i]
		mapping.genders[source.code] = source.id
	}
	await Helper.writeFile(sourcePath + '/confidentional_data/pmMapping.json', JSON.stringify(mapping))
}

async function updatePrMapping () {
	const partyRoleSpecs = await orm.execute(() => PrPartyRoleSpecs.map(p => [p.id, p.code]), {}, view, locStage)
	const partyRoleStatuses = await orm.execute(() => PrPartyRoleStatuses.map(p => [p.id, p.code]), {}, view, locStage)
	const mapping: any = { partyRoleSpecs: {}, partyRoleStatuses: {} }
	for (const i in partyRoleSpecs) {
		const source = partyRoleSpecs[i]
		mapping.partyRoleSpecs[source.code] = source.id
	}
	for (const i in partyRoleStatuses) {
		const source = partyRoleStatuses[i]
		mapping.partyRoleStatuses[source.code] = source.id
	}
	await Helper.writeFile(sourcePath + '/confidentional_data/prMapping.json', JSON.stringify(mapping))
}

async function updateLamMapping () {
	const accountTypes = await orm.execute(() => LamAccountTypes.map(p => [p.id, p.code]), {}, view, locStage)
	const statementCycles = await orm.execute(() => LamStatementCycles.map(p => [p.id, p.code]), {}, view, locStage)
	const creditors = await orm.execute(() => LamCreditors.map(p => [p.id, p.creditorCode]), {}, view, locStage)
	const lamCurrencyReferences = await orm.execute(() => LamCurrencyReferences.map(p => [p.id, p.refId]), {}, view, locStage)
	const lamUserReferences = await orm.execute(() => LamUserReferences.map(p => [p.id, p.refId]), {}, view, locStage)

	const mapping: any = { accountTypes: {}, statementCycles: {}, lamCurrencyReferences: {}, lamUserReferences: {}, creditors: {} }
	for (const i in accountTypes) {
		const source = accountTypes[i]
		mapping.accountTypes[source.code] = source.id
	}
	for (const i in statementCycles) {
		const source = statementCycles[i]
		mapping.statementCycles[source.code] = source.id
	}
	for (const i in creditors) {
		const source = creditors[i]
		mapping.creditors[source.creditorCode] = source.id
	}
	for (const i in lamCurrencyReferences) {
		const source = lamCurrencyReferences[i]
		mapping.lamCurrencyReferences[source.refId] = source.id
	}
	for (const i in lamUserReferences) {
		const source = lamUserReferences[i]
		mapping.lamUserReferences[source.refId] = source.id
	}
	await Helper.writeFile(sourcePath + '/confidentional_data/lamMapping.json', JSON.stringify(mapping))
}

async function updateDbMapping () {
	const debtorTypes = await orm.execute(() => DbDebtorTypes.map(p => [p.id, p.code]), {}, view, locStage)
	const paymentMethodTypes = await orm.execute(() => DbPaymentMethodTypes.map(p => [p.id, p.code]), {}, view, locStage)
	const debtorStages = await orm.execute(() => DbDebtorStages.map(p => [p.id, p.code]), {}, view, locStage)
	const dbUserReferences = await orm.execute(() => DbUserReferences.map(p => [p.id, p.refId]), {}, view, locStage)
	const banks = await orm.execute(() => DbBanks.map(p => [p.id, p.bic]), {}, view, locStage)

	const mapping: any = { debtorTypes: {}, paymentMethodTypes: {}, debtorStages: {}, dbUserReferences: {}, banks: {} }
	for (const i in debtorTypes) {
		const source = debtorTypes[i]
		mapping.debtorTypes[source.code] = source.id
	}
	for (const i in paymentMethodTypes) {
		const source = paymentMethodTypes[i]
		mapping.paymentMethodTypes[source.code] = source.id
	}
	for (const i in debtorStages) {
		const source = debtorStages[i]
		mapping.debtorStages[source.code] = source.id
	}
	for (const i in dbUserReferences) {
		const source = dbUserReferences[i]
		mapping.dbUserReferences[source.refId] = source.id
	}
	for (const i in banks) {
		const source = banks[i]
		mapping.banks[source.bic] = source.id
	}
	await Helper.writeFile(sourcePath + '/confidentional_data/dbMapping.json', JSON.stringify(mapping))
}

async function _import () {
	const locMapping:any = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/locMapping.json') as string)
	const pmMapping:any = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/pmMapping.json') as string)
	const prMapping: any = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/prMapping.json') as string)
	const lamMapping: any = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/lamMapping.json') as string)
	const dbMapping: any = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/dbMapping.json') as string)

	const messages: Message[] = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/Request-importDebtors.json') as string)
	const debtors = toDbDebtor(messages, locMapping, pmMapping, prMapping, lamMapping, dbMapping)

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

function toDbDebtor (messages: Message[], locMapping:any, pmMapping:any, prMapping: any, lamMapping: any, dbMapping: any): DbDebtor[] {
	const result: DbDebtor[] = []
	for (let i = 0; i < messages.length; i++) {
		const sDebtor = messages[i].businessData
		const name = getName(sDebtor)
		const tDebtor: DbDebtor = {
			partyRoleRef: {
				name: name,
				partyRole: {
					name: name,
					places: [],
					statusId: prMapping.partyRoleStatuses.ACTIVE
				}
			},
			accounts: [],
			statusHistories: []
		}
		if (tDebtor.partyRoleRef) {
			const partyRole = tDebtor.partyRoleRef.partyRole
			if (partyRole) {
				if (sDebtor.individual) {
					partyRole.individualReference = { name: name }
					const individualReference = partyRole.individualReference
					individualReference.individual = {
						names: [{
							givenNames: sDebtor.individual.givenNames,
							middleNames: '',
							familyNames: `${sDebtor.individual.firstFamilyName} , ${sDebtor.individual.secondFamilyName} `,
							legalName: sDebtor.individual.legalName
						}],
						birthDate: new Date(sDebtor.individual.birthDate),
						genderId: sDebtor.individual.gender ? pmMapping.genders[sDebtor.individual.gender] : undefined,
						// WARNING: actualmente el codigo PER no esta cargado en nationalReferences
						nationalityRefId: sDebtor.individual.nationalityCode ? pmMapping.nationalReferences[sDebtor.individual.nationalityCode] : undefined
					}
					individualReference.individual.party = {
						statusId: pmMapping.partyStatuses.CREATED,
						indentifications: [],
						contactMediums: []
					}
					const party = individualReference.individual.party
					for (const j in sDebtor.identifications) {
						const identification = sDebtor.identifications[j]
						party.indentifications.push({
							identificationTypeId: pmMapping.identificationTypes[identification.identificationTypeCode],
							indentificationValue: identification.identificationValue
						})
					}
				} else if (sDebtor.organization) {
					partyRole.organizationReference = { name: name }
					const organizationReference = partyRole.organizationReference
					organizationReference.organization = {
						legalPeriodFrom: new Date(sDebtor.organization.legalPeriodFrom),
						industyTypeId: pmMapping.industryTypes[sDebtor.organization.industyType],
						commercialDescription: sDebtor.organization.commercialDescription,
						names: [{ tradingName: name }]
					}
					organizationReference.organization.party = {
						statusId: pmMapping.partyStatuses.CREATED,
						indentifications: [],
						contactMediums: []
					}
					const party = organizationReference.organization.party
					for (const j in sDebtor.identifications) {
						const identification = sDebtor.identifications[j]
						party.indentifications.push({
							identificationTypeId: pmMapping.identificationTypes[identification.identificationTypeCode],
							indentificationValue: identification.identificationValue
						})
					}
				}
				for (const j in sDebtor.addresses) {
					const address = sDebtor.addresses[j]
					partyRole.places.push({
						placeRef: {
							name: address.additionalData,
							address: getAddress(address, locMapping)
						}
					})
				}
			}
		}
		if (sDebtor.accounts) {
			for (const j in sDebtor.accounts) {
				const account = sDebtor.accounts[j]

				const lamAccount: LamAccount = {
					// TODO: el account number es el id con 0 delante (se debe de resolver como hacerlo)
					accountNumber: account.referenceCode,
					name: account.referenceCode,
					currencyRefId: lamMapping.lamCurrencyReferences.S,
					accountTypeId: lamMapping.accountTypes.BILLING,
					accountStatusId: undefined,
					// TODO: hay que verificar que se debe ingresar como refId en accountHolder
					accountHolderRef: { refId: account.referenceCode },
					balance: undefined,
					statementCycleId: lamMapping.statementCycles[account.billCycle],
					registrationDate: new Date(account.creationDate),
					creditorId: lamMapping.creditors[account.creditorCode],
					statusHistories: [{
						accountStatus: 0, // TODO: verificar si es un Enum
						registerDate: new Date(account.creationDate),
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						reason: 'Creation',
						remarks: 'New Account'
					},
					{
						accountStatus: 1, // TODO:  verificar si es un Enum
						registerDate: new Date(account.creationDate),
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						reason: 'Activation',
						remarks: 'New Account'
					}
					]
				}
				if (account.endDate && account.endDate !== '') {
					lamAccount.statusHistories.push({
						accountStatus: 1, // TODO:  verificar si es un Enum
						registerDate: new Date(account.endDate),
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						reason: 'Deactivation', // TODO: revisar cual es la razon y el status para deactivation
						remarks: ''
					})
				}

				const dbDebtorAccount: DbDebtorAccount = {
					accountLedgerRef: {
						name: account.referenceCode,
						ledgerAccount: lamAccount
					},
					services: [],
					accountPaymentResps: [],
					statusHistories: [
						{
							accountStatus: 0, // TODO:  verificar si es un Enum
							registrationDate: new Date(account.creationDate),
							userRefId: lamMapping.lamUserReferences.DefaultUser,
							isActive: false,
							reason: 'Creation',
							remarks: 'New Account'
						},
						{
							accountStatus: 1, // TODO:  verificar si es un Enum
							registrationDate: new Date(account.creationDate),
							userRefId: lamMapping.lamUserReferences.DefaultUser,
							isActive: !(account.endDate && account.endDate !== ''),
							reason: 'Activation',
							remarks: 'New Account'
						}
					]
				}
				if (account.endDate && account.endDate !== '') {
					dbDebtorAccount.statusHistories.push({
						accountStatus: 1, // TODO:  verificar si es un Enum
						registrationDate: new Date(account.endDate),
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						isActive: true,
						reason: 'Deactivation', // TODO: revisar cual es la razon y el status para deactivation
						remarks: ''
					})
				}
				if (account.subscriptions) {
					for (const k in account.subscriptions) {
						const subscription = account.subscriptions[k]
						dbDebtorAccount.services.push({
							name: subscription.name,
							referenceNumber: subscription.contractNumber,
							serialNumber: subscription.serialNumber,
							registrationDate: new Date(subscription.activationDate),
							activationDate: new Date(subscription.activationDate),
							deactivationDate: new Date(subscription.deactivationDate),
							contractNumber: subscription.contractNumber,
							serviceExternalCode: subscription.productOfferingId,
							productLine: subscription.type,
							subType: subscription.subType
						})
					}
				}
				if (account.paymentResponsibles) {
					for (const k in account.paymentResponsibles) {
						const paymentResponsible = account.paymentResponsibles[k]
						const locAddress = getAddress(paymentResponsible.addresses[0], locMapping)
						const dbPaymentResponsibleMethod: DbPaymentResponsibleMethod = {
							methodStatus: 0, // TODO: revisar si es un enum o corresponde a una tabla
							paymentMethodTypeId: dbMapping.paymentMethodTypes[paymentResponsible.paymentMethod.type],
							bankId: paymentResponsible.paymentMethod.bank !== '' ? dbMapping.banks[paymentResponsible.paymentMethod.bank] : undefined, // TODO: buscar la lista de bancos
							cardNumber: paymentResponsible.paymentMethod.cardNumber,
							cardName: paymentResponsible.paymentMethod.cardName,
							cardExpirationYear: paymentResponsible.paymentMethod.cardExpirationYear !== '' ? parseInt(paymentResponsible.paymentMethod.cardExpirationYear) : undefined,
							cardExpirationMonth: paymentResponsible.paymentMethod.cardExpirationMonth !== '' ? parseInt(paymentResponsible.paymentMethod.cardExpirationMonth) : undefined
						}
						dbDebtorAccount.accountPaymentResps.push({
							isMain: paymentResponsible.order === '1',
							paymentResponsible: {
								name: paymentResponsible.legalName,
								referenceNumber: paymentResponsible.referenceCode,
								paymentMethods: [dbPaymentResponsibleMethod]
							},
							locAddressRef: { name: locAddress.additionalData, address: locAddress },
							paymentMethodRef: dbPaymentResponsibleMethod
						})
					}
				}
				tDebtor.accounts.push(dbDebtorAccount)
			}

			const creationDate = minAccountDate(tDebtor.accounts, 'Creation')
			const activationDate = minAccountDate(tDebtor.accounts, 'Activation')
			const deactivationDate = maxAccountDate(tDebtor.accounts, 'Deactivation')
			if (creationDate) {
				tDebtor.statusHistories.push({
					debtorStatus: 0, // TODO:  verificar si es un Enum
					registrationDate: creationDate,
					userRefId: lamMapping.lamUserReferences.DefaultUser,
					reason: 'Creation',
					remarks: 'New Debtor'
				})
			}
			if (activationDate) {
				tDebtor.statusHistories.push({
					debtorStatus: 0, // TODO:  verificar si es un Enum
					registrationDate: activationDate,
					userRefId: lamMapping.lamUserReferences.DefaultUser,
					reason: 'Activation',
					remarks: 'New Debtor'
				})
			}
			if (deactivationDate) {
				tDebtor.statusHistories.push({
					debtorStatus: 0, // TODO:  verificar si es un Enum
					registrationDate: deactivationDate,
					userRefId: lamMapping.lamUserReferences.DefaultUser,
					reason: 'Deactivation',
					remarks: 'New Debtor'
				})
			}
			result.push(tDebtor)
		}
	}

	return result
}
function minAccountDate (accounts:DbDebtorAccount[], reason:string):Date|undefined {
	let creationDate:Date|undefined
	for (const k in accounts) {
		for (const l in accounts[k].statusHistories) {
			const statusHistory = accounts[k].statusHistories[l]
			if (statusHistory.reason === reason && statusHistory.registrationDate) {
				if (!creationDate || creationDate > statusHistory.registrationDate) {
					creationDate = statusHistory.registrationDate
				}
			}
		}
	}
	return creationDate
}
function maxAccountDate (accounts:DbDebtorAccount[], reason:string):Date|undefined {
	let creationDate:Date|undefined
	for (const k in accounts) {
		for (const l in accounts[k].statusHistories) {
			const statusHistory = accounts[k].statusHistories[l]
			if (statusHistory.reason === reason && statusHistory.registrationDate) {
				if (!creationDate || creationDate < statusHistory.registrationDate) {
					creationDate = statusHistory.registrationDate
				}
			}
		}
	}
	return creationDate
}
function getAddress (address:Address, locMapping:any):LocAddress {
	const locAddress: LocAddress = {
		countryId: locMapping.countries[address.countryCode],
		streetName: address.streetName,
		streetNrFirst: address.streetNrFirst,
		postalCode: address.postalCode,
		city: address.city,
		additionalData: address.additionalData,
		areas: []
	}
	locAddress.areas.push({ areaId: locMapping.areas[address.provinceCode] })
	locAddress.areas.push({ areaId: locMapping.areas[address.departmentCode] })
	locAddress.areas.push({ areaId: locMapping.areas[address.districtCode] })
	return locAddress
}

function getName (debtor: Debtor): string {
	if (debtor.individual) {
		return debtor.individual.legalName
	} else {
		throw new Error('name not found')
	}
}

async function execute () {
	try {
		await orm.init(`${sourcePath}/workspace/lambdaorm.yaml`)
		await createLocal()
		await updateLocMapping()
		await updatePmMapping()
		await updatePrMapping()
		await updateLamMapping()
		await updateDbMapping()
		await _import()
		await exportLocal()
	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
}

execute()
