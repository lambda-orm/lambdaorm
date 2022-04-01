import { Helper, orm } from '../../../../lib'
import {
	DbDebtor, DbPaymentResponsible, PrPartyRole, LocAddress, DbAccountPaymentResp, PrPartyRolePlace, PrAddressReference,
	DbPartyRoleReference, PrIndividualReference, PmIndividual, PmParty, DbDebtorAccount
} from './workspace/src/model'

export const sourcePath = 'src/dev/labs/performance/cclp'
export const beeStage = 'beesion'
export const locStage = 'localOracle'// 'local'
export const view = 'default'

// .page(1,10)
export const expDebtorsExport =
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
																							.include(p=> [p.statusHistories,p.accountHolderRef])),
															 p.services,
															 p.accountPaymentResps
															  .include(p=> [p.locAddressRef.include(p=> p.address.include(p=> p.areas)),
																							p.paymentResponsible.include(p=> p.paymentMethods),
																							p.paymentMethodRef
																				]),
															p.statusHistories
												]),
								p.statusHistories
						])
		`
export const expDebtorsImport =
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
																            .include(p=> [p.statusHistories,p.accountHolderRef] )),
															p.services,
															p.statusHistories
												]),
								p.statusHistories
						])
		`
export const expPaymentRespsImport =
	`DbPaymentResponsibles.bulkInsert()
	.include(p=> p.paymentMethods)
	`
export const expAccountPaymentRespsImport =
	`DbAccountPaymentResps.bulkInsert()
	.include(p=> [p.locAddressRef,
								p.paymentResponsible.include(p=> p.paymentMethods)
					])
	`

export async function createLocal () {
	// create DDL
	await orm.stage.clean(locStage).execute(true)
	await orm.stage.sync(locStage).execute()
}

export function preImportDebtors (debtors:DbDebtor[], mapping:any) {
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
						individual.genderId = individual.genderId ? mapping.genders[individual.genderId] : undefined
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
								} else {
									console.log(statusHistory)
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
				if (dbAccount.statusHistories) {
					for (const k in dbAccount.statusHistories) {
						const statusHistory = dbAccount.statusHistories[k]
						statusHistory.id = undefined
						statusHistory.accountId = undefined
						statusHistory.userRefId = statusHistory.userRefId ? mapping.lamUserReferences[statusHistory.userRefId] : undefined
						if (!statusHistory.userRefId) {
							// TODO: hay que ver por que vienen Ids de usuario que no corresponden con los usuarios de lamUserReferences
							statusHistory.userRefId = mapping.lamUserReferences[Object.keys(mapping.lamUserReferences)[0]]
						}
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
									paymentMethod.paymentMethodTypeId = paymentMethod.paymentMethodTypeId ? mapping.paymentMethodTypes[paymentMethod.paymentMethodTypeId] : undefined
									paymentMethod.bankId = paymentMethod.bankId ? mapping.banks[paymentMethod.bankId] : undefined
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
				statusHistory.userRefId = statusHistory.userRefId ? mapping.dbUserReferences[statusHistory.userRefId] : undefined
				if (!statusHistory.userRefId) {
					console.log(statusHistory)
				}
			}
		}
	}
}
export function getPaymentResponsibles (debtors: DbDebtor[]):DbPaymentResponsible[] {
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
export function preImportAccountPaymentRest (debtors:DbDebtor[]) {
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
export function getAccountPaymentRest (debtors: DbDebtor[]):DbAccountPaymentResp[] {
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
export function equalAddress (value1: LocAddress, value2: LocAddress): boolean {
	if (value1.additionalData && value2.additionalData) {
		return value1.additionalData === value2.additionalData
	} else {
		return value1.city === value2.city && value1.postalCode === value2.postalCode && value1.streetName === value2.streetName && value1.streetNrFirst === value2.streetNrFirst
	}
}
export async function sentence () {
	const sentences = orm.sentence(expDebtorsImport, view, locStage)
	await Helper.writeFile(sourcePath + '/sentences.json', JSON.stringify(sentences))
}
export async function exportLocal () {
	const start = new Date().getTime()
	const debtors = await orm.execute(expDebtorsExport, {}, view, locStage)
	const get = new Date().getTime()
	console.log(`export Local: ${get - start}`)
	await Helper.writeFile(sourcePath + '/confidentional_data/localDebtors.json', JSON.stringify(debtors))
}
export async function validate () {
	const bDebtors:DbDebtor[] = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/beesionDebtors.json') as string)
	const lDebtors:DbDebtor[] = JSON.parse(await Helper.readFile(sourcePath + '/confidentional_data/localDebtors.json') as string)

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
