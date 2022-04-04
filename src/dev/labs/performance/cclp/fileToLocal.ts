import { Helper, orm } from '../../../../lib'
import { DbDebtor, DbDebtorAccount, LocAddress, LamAccount, DbPaymentResponsibleMethod, PmGenders } from './workspace/src/model'
import { Debtor, Address, Message } from './sourceModel'
import {
	sourcePath, locStage, view, expDebtorsImport, expPaymentRespsImport, expAccountPaymentRespsImport,
	getPaymentResponsibles, preImportAccountPaymentRest, getAccountPaymentRest, exportLocal, sentence
} from './common'

async function updateLocMapping () {
	const countries = await orm.execute('LocCountries.map(p => [p.id, p.iso3])', {}, view, locStage)
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
	const industryTypes = await orm.execute('PmIndustryTypes.map(p => [p.id, p.code])', {}, view, locStage)
	const partyStatuses = await orm.execute('PmPartyStatuses.map(p => [p.id, p.code])', {}, view, locStage)
	const maritalStatuses = await orm.execute('PmMaritalStatuses.map(p => [p.id, p.code])', {}, view, locStage)
	const identificationTypes = await orm.execute('PmIdentificationTypes.map(p => [p.id, p.code])', {}, view, locStage)
	const contactMediumTypes = await orm.execute('PmContactMediumTypes.map(p => [p.id, p.code])', {}, view, locStage)
	const nationalReferences = await orm.execute('PmNationalReferences.map(p => [p.id, p.refId])', {}, view, locStage)
	const genders = await orm.execute('PmGenders.map(p => [p.id, p.code])', {}, view, locStage)

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
	const partyRoleSpecs = await orm.execute('PrPartyRoleSpecs.map(p => [p.id, p.code])', {}, view, locStage)
	const partyRoleStatuses = await orm.execute('PrPartyRoleStatuses.map(p => [p.id, p.code])', {}, view, locStage)
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
	const accountTypes = await orm.execute('LamAccountTypes.map(p => [p.id, p.code])', {}, view, locStage)
	const statementCycles = await orm.execute('LamStatementCycles.map(p => [p.id, p.code])', {}, view, locStage)
	const creditors = await orm.execute('LamCreditors.map(p => [p.id, p.creditorCode])', {}, view, locStage)
	const lamCurrencyReferences = await orm.execute('LamCurrencyReferences.map(p => [p.id, p.refId])', {}, view, locStage)
	const lamUserReferences = await orm.execute('LamUserReferences.map(p => [p.id, p.refId])', {}, view, locStage)

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
	const debtorTypes = await orm.execute('DbDebtorTypes.map(p => [p.id, p.code])', {}, view, locStage)
	const paymentMethodTypes = await orm.execute('DbPaymentMethodTypes.map(p => [p.id, p.code])', {}, view, locStage)
	const debtorStages = await orm.execute('DbDebtorStages.map(p => [p.id, p.code])', {}, view, locStage)
	const dbUserReferences = await orm.execute('DbUserReferences.map(p => [p.id, p.refId])', {}, view, locStage)
	const banks = await orm.execute('DbBanks.map(p => [p.id, p.bic])', {}, view, locStage)

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

	const messages:any = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/debtors-022-10000-records.json') as string)
	const debtors = toDbDebtor(messages as Message[], locMapping, pmMapping, prMapping, lamMapping, dbMapping)

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
			debtorNumber: sDebtor.referenceCode,
			referenceNumber: sDebtor.referenceCode,
			name: name,
			partyRoleRef: {
				name: name,
				partyRole: {
					name: name,
					places: [],
					statusId: prMapping.partyRoleStatuses.ACTIVE,
					partyRoleSpecId: prMapping.partyRoleSpecs.Customer
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
						birthDate: sDebtor.individual.birthDate ? new Date(sDebtor.individual.birthDate).toISOString() : undefined,
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
						legalPeriodFrom: new Date(sDebtor.organization.legalPeriodFrom).toISOString(),
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
					// TODO: deberia calcularse posteriormente
					balance: 0,
					// TODO: hay que verificar que se debe ingresar como refId en accountHolder
					accountHolderRef: { refId: account.referenceCode },
					statementCycleId: lamMapping.statementCycles[account.billCycle],
					registrationDate: account.creationDate ? new Date(account.creationDate).toISOString() : undefined,
					creditorId: lamMapping.creditors[account.creditorCode],
					statusHistories: [{
						accountStatus: 0, // TODO: verificar si es un Enum
						registerDate: account.creationDate ? new Date(account.creationDate).toISOString() : undefined,
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						reason: 'Creation',
						remarks: 'New Account'
					},
					{
						accountStatus: 1, // TODO:  verificar si es un Enum
						registerDate: account.creationDate ? new Date(account.creationDate).toISOString() : undefined,
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						reason: 'Activation',
						remarks: 'New Account'
					}
					]
				}
				if (account.endDate && account.endDate !== '') {
					lamAccount.statusHistories.push({
						accountStatus: 1, // TODO:  verificar si es un Enum
						registerDate: new Date(account.endDate).toISOString(),
						userRefId: lamMapping.lamUserReferences.DefaultUser,
						reason: 'Deactivation', // TODO: revisar cual es la razon y el status para deactivation
						remarks: ''
					})
				}

				const dbDebtorAccount: DbDebtorAccount = {
					// TODO : entiendo que se debria de generar
					accountNumber: account.referenceCode,
					accountLedgerRef: {
						name: account.referenceCode,
						ledgerAccount: lamAccount
					},
					services: [],
					accountPaymentResps: [],
					statusHistories: [
						{
							accountStatus: 0, // TODO:  verificar si es un Enum
							registrationDate: account.creationDate ? new Date(account.creationDate).toISOString() : undefined,
							userRefId: lamMapping.lamUserReferences.DefaultUser,
							isActive: false,
							reason: 'Creation',
							remarks: 'New Account'
						},
						{
							accountStatus: 1, // TODO:  verificar si es un Enum
							registrationDate: account.creationDate ? new Date(account.creationDate).toISOString() : undefined,
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
						registrationDate: account.endDate ? new Date(account.endDate).toISOString() : undefined,
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
							registrationDate: subscription.activationDate ? new Date(subscription.activationDate).toISOString() : undefined,
							activationDate: subscription.activationDate ? new Date(subscription.activationDate).toISOString() : undefined,
							deactivationDate: subscription.deactivationDate ? new Date(subscription.deactivationDate).toISOString() : undefined,
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
function minAccountDate (accounts:DbDebtorAccount[], reason:string):string|undefined {
	let creationDate:string|undefined
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
function maxAccountDate (accounts:DbDebtorAccount[], reason:string):string|undefined {
	let creationDate:string|undefined
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
	const provinceId = locMapping.areas[address.provinceCode]
	const departmentId = locMapping.areas[address.departmentCode]
	const districtId = locMapping.areas[address.districtCode]
	if (provinceId) {
		locAddress.areas.push({ areaId: provinceId })
	}
	if (departmentId) {
		locAddress.areas.push({ areaId: departmentId })
	}
	if (districtId) {
		locAddress.areas.push({ areaId: districtId })
	}
	return locAddress
}

function getName (debtor: Debtor): string {
	if (debtor.individual) {
		return debtor.individual.legalName
	} else {
		throw new Error('name not found')
	}
}

async function  createFile(key:string,count: number) { 

	const messages: Message[]=[] 
	for (let i = 0; i < count; i++) {
		messages.push(createDebtorExample(key+i))
	}
	await Helper.writeFile(sourcePath + `/confidentional_data/debtors-${key}-${count}-records.json`,JSON.stringify(messages))
}

function createDebtorExample(nro:string): any { 
		return {
        entity: "debtor",
        identifier: "9999"+nro,
        action: "save",
        reference: "",
        batchId: "6BTCH_20220402"+nro,
        requester: "360",
        priority: "normal","uniqueKey":"",
        processContext:[{
            key: "PROCESS_TYPE",
            value: "daily"
        }],
        businessData: {
            referenceCode: "9999"+nro,
            provider: "360",
            debtorType: "N",
            debtorSubtype: "",
            identifications: [{
                identificationTypeCode: "1",
                identificationValue: "9999"+nro
            }],
            individual: {
                givenNames: "JULL GUILIANO "+nro,
                firstFamilyName: "ELIAS "+nro,
                secondFamilyName: "PARIONA "+nro,
                legalName: "JULL GUILIANO CASTAÑEDA PARIONA "+nro,
                birthDate: "1987-11-17",
                gender: "",
                civilStatus: "",
                nationalityCode: "PER"
            },
            contactMediums: [],
            addresses: [{
                countryCode: "PER",
                provinceCode: "51-11-3",
                departmentCode: "51-11",
                districtCode: "51-11-3-5",
                city: "",
                streetName: "CASN CALLE CHINCHA 457",
                streetNrFirst: "",
                postalCode: "01",
                additionalData: " CASN CALLE CHINCHA 457  ,VISTA ALEGRE ,NAZCA ,ICA ,PERU"
            }],
            additionalInfo:{
                dataInfo1: "",
                dataInfo2: "",
                dataInfo3: ""
            },
            accounts: [{
                action: "save",
                referenceCode: "6BSCSIX-9999"+nro,                
                provider: "BSCSIX",
                additionalData: "",
                creationDate: "2016-08-12",
                endDate: "",
                billCycle: "14",
                creditorCode: "AMX",
                subscriptions: [{
                    action: "save",
                    referenceCode: "6CO_ID_9999"+nro,
                    contractNumber: "15034014",
                    name: "1-B-MAX 75.00-(claroMax_Internacional_75_CROne)",
                    type: "S",
                    subType:"001",
                    serialNumber: "9999"+nro,
                    activationDate: "2016-08-12",
                    deactivationDate: "2021-10-29",
                    productOfferingId: "SP02396",
                    productBundleId: ""
                }],
                paymentResponsibles: [{
                    action: "save",
                    referenceCode: "6DEB-9999"+nro,                    
                    givenNames: "JULL GUILIANO "+nro,
                    firstFamilyName: "ELIAS "+nro,
                    secondFamilyName:"PARIONA "+nro,
                    legalName: "JULL GUILIANO CASTA�EDA PARIONA "+nro,
                    order: "1",
                    paymentMethod: {
                        type: "00",
                        account: "",
                        bank: "",
                        cardExpirationYear: "",
                        cardExpirationMonth: "",
                        cardName: "",
                        cardNumber: ""
                    },
                    contactMediums: [],
                    addresses: [{
											countryCode: "PER",
											provinceCode: "51-11-3",
											departmentCode: "51-11",
											districtCode: "51-11-3-5",
											city: "",
											streetName: "CASN CALLE CHINCHA 457",
											streetNrFirst: "",
											postalCode: "01",
											additionalData: " CASN CALLE CHINCHA 457  ,VISTA ALEGRE ,NAZCA ,ICA ,PERU"
									}]
                }],
                additionalInfo:{
                    dataInfo1: "",
                    dataInfo2: "",
                    dataInfo3: ""
                }
            }]
        }
	}
}

async function execute () {
	try {
		await orm.init(`${sourcePath}/workspace/lambdaorm.yaml`)
		// await updateLocMapping()
		// await updatePmMapping()
		// await updatePrMapping()
		// await updateLamMapping()
		// await updateDbMapping()
		await _import()
		// await exportLocal()
		// await sentence()
		// await createFile('020', 10000)
		// await createFile('021', 10000)
		// await createFile('022', 10000)
		// await createFile('023',5000)
		// await createFile('024',5000)
		// await createFile('025',5000)
	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
}

execute()
