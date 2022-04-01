/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
import { Queryable } from 'lambdaorm'
export abstract class SrbReference {
	id?: number
	refType?: string
	refId?: string
	name?: string
}
export interface QrySrbReference {
	id: number
	refType: string
	refId: string
	name: string
}
export class LocCountry {
	id?: number
	name?: string
	iso?: string
	iso3?: string
	numericCode?: string
}
export interface QryLocCountry {
	id: number
	name: string
	iso: string
	iso3: string
	numericCode: string
}
export class LocAreaType {
	constructor () {
		this.areas = []
	}

	id?: number
	code?: string
	name?: string
	areas: LocArea[]
}
export interface QryLocAreaType {
	id: number
	code: string
	name: string
	areas: ManyToOne<LocArea> & LocArea[]
}
export class LocArea {
	id?: number
	typeId?: number
	code?: string
	name?: string
	type?: LocAreaType
}
export interface QryLocArea {
	id: number
	typeId: number
	code: string
	name: string
	type: LocAreaType & OneToMany<LocAreaType> & LocAreaType
}
export class LocAddress {
	constructor () {
		this.areas = []
	}

	id?: number
	countryId?: number
	streetName?: string
	streetNrFirst?: string
	postalCode?: string
	city?: string
	additionalData?: string
	country?: LocCountry
	areas: LocAddressArea[]
}
export interface QryLocAddress {
	id: number
	countryId: number
	streetName: string
	streetNrFirst: string
	postalCode: string
	city: string
	additionalData: string
	country: LocCountry & OneToMany<LocCountry> & LocCountry
	areas: ManyToOne<LocAddressArea> & LocAddressArea[]
}
export class LocAddressArea {
	id?: number
	addressId?: number
	areaId?: number
	address?: LocAddress
	area?: LocArea
}
export interface QryLocAddressArea {
	id: number
	addressId: number
	areaId: number
	address: LocAddress & OneToMany<LocAddress> & LocAddress
	area: LocArea & OneToMany<LocArea> & LocArea
}
export class PmPartyStatus {
	id?: number
	code?: string
	name?: string
	exclusiveType?: string
}
export interface QryPmPartyStatus {
	id: number
	code: string
	name: string
	exclusiveType: string
}
export class PmMaritalStatus {
	id?: number
	code?: string
	name?: string
}
export interface QryPmMaritalStatus {
	id: number
	code: string
	name: string
}
export class PmIdentificationType {
	id?: number
	code?: string
	name?: string
}
export interface QryPmIdentificationType {
	id: number
	code: string
	name: string
}
export class PmIndustryType {
	id?: number
	code?: string
	name?: string
}
export interface QryPmIndustryType {
	id: number
	code: string
	name: string
}
export class PmContactMediumType {
	id?: number
	code?: string
	name?: string
}
export interface QryPmContactMediumType {
	id: number
	code: string
	name: string
}
export class PmGender {
	id?: number
	code?: string
	name?: string
}
export interface QryPmGender {
	id: number
	code: string
	name: string
}
export class PmReference extends SrbReference {
}
export type QryPmReference = QrySrbReference
export class PmNationalReference extends SrbReference {
	refType?: string
}
export interface QryPmNationalReference extends QrySrbReference {
	refType: string
}
export class PmParty {
	constructor () {
		this.indentifications = []
		this.contactMediums = []
	}

	id?: number
	individualId?: number
	organizationId?: number
	statusId?: number
	registredDate?: string
	status?: PmPartyStatus
	indentifications: PmIdentification[]
	contactMediums: PmPartyContactMedium[]
	organization?: PmOrganization
}
export interface QryPmParty {
	id: number
	individualId: number
	organizationId: number
	statusId: number
	registredDate: string
	status: PmPartyStatus & OneToMany<PmPartyStatus> & PmPartyStatus
	indentifications: ManyToOne<PmIdentification> & PmIdentification[]
	contactMediums: ManyToOne<PmPartyContactMedium> & PmPartyContactMedium[]
	organization: PmOrganization & OneToOne<PmOrganization> & PmOrganization
}
export class PmIdentification {
	id?: number
	identificationTypeId?: number
	partyId?: number
	indentificationValue?: string
	source?: string
	identificationType?: PmIdentificationType
	party?: PmParty
}
export interface QryPmIdentification {
	id: number
	identificationTypeId: number
	partyId: number
	indentificationValue: string
	source: string
	identificationType: PmIdentificationType & OneToMany<PmIdentificationType> & PmIdentificationType
	party: PmParty & OneToMany<PmParty> & PmParty
}
export class PmPartyContactMedium {
	id?: number
	contactMediumTypeId?: number
	partyId?: number
	mediumValue?: string
	validFrom?: string
	validTo?: string
	isMain?: boolean
	isFavorite?: boolean
	source?: string
	createdBy?: string
	contactMediumType?: PmContactMediumType
	party?: PmParty
}
export interface QryPmPartyContactMedium {
	id: number
	contactMediumTypeId: number
	partyId: number
	mediumValue: string
	validFrom: string
	validTo: string
	isMain: boolean
	isFavorite: boolean
	source: string
	createdBy: string
	contactMediumType: PmContactMediumType & OneToMany<PmContactMediumType> & PmContactMediumType
	party: PmParty & OneToMany<PmParty> & PmParty
}
export class PmIndividual {
	constructor () {
		this.names = []
	}

	id?: number
	partyId?: number
	genderId?: number
	birthDate?: string
	deathDate?: string
	nationalityRefId?: number
	currentNameId?: number
	party?: PmParty
	currentName?: PmIndividualName
	nationalityRef?: PmNationalReference
	names: PmIndividualName[]
}
export interface QryPmIndividual {
	id: number
	partyId: number
	genderId: number
	birthDate: string
	deathDate: string
	nationalityRefId: number
	currentNameId: number
	party: PmParty & OneToOne<PmParty> & PmParty
	currentName: PmIndividualName & OneToMany<PmIndividualName> & PmIndividualName
	nationalityRef: PmNationalReference & OneToMany<PmNationalReference> & PmNationalReference
	names: ManyToOne<PmIndividualName> & PmIndividualName[]
}
export class PmIndividualName {
	id?: number
	individualId?: number
	givenNames?: string
	middleNames?: string
	familyNames?: string
	legalName?: string
	individual?: PmIndividual
}
export interface QryPmIndividualName {
	id: number
	individualId: number
	givenNames: string
	middleNames: string
	familyNames: string
	legalName: string
	individual: PmIndividual & OneToMany<PmIndividual> & PmIndividual
}
export class PmOrganization {
	constructor () {
		this.names = []
	}

	id?: number
	partyId?: number
	legalPeriodFrom?: string
	currentNameId?: number
	industyTypeId?: number
	commercialDescription?: string
	party?: PmParty
	currentName?: PmOrganizationName
	industyType?: PmIndustryType
	names: PmOrganizationName[]
}
export interface QryPmOrganization {
	id: number
	partyId: number
	legalPeriodFrom: string
	currentNameId: number
	industyTypeId: number
	commercialDescription: string
	party: PmParty & OneToOne<PmParty> & PmParty
	currentName: PmOrganizationName & OneToMany<PmOrganizationName> & PmOrganizationName
	industyType: PmIndustryType & OneToMany<PmIndustryType> & PmIndustryType
	names: ManyToOne<PmOrganizationName> & PmOrganizationName[]
}
export class PmOrganizationName {
	id?: number
	organizationId?: number
	tradingName?: string
	organization?: PmOrganization
}
export interface QryPmOrganizationName {
	id: number
	organizationId: number
	tradingName: string
	organization: PmOrganization & OneToMany<PmOrganization> & PmOrganization
}
export class PrPartyRoleSpec {
	id?: number
	code?: string
	name?: string
	validFrom?: string
}
export interface QryPrPartyRoleSpec {
	id: number
	code: string
	name: string
	validFrom: string
}
export class PrPartyRoleStatus {
	id?: number
	code?: string
	name?: string
}
export interface QryPrPartyRoleStatus {
	id: number
	code: string
	name: string
}
export class PrReference extends SrbReference {
}
export type QryPrReference = QrySrbReference
export class PrIndividualReference extends SrbReference {
	refType?: string
	refId?: string
	individual?: PmIndividual
}
export interface QryPrIndividualReference extends QrySrbReference {
	refType: string
	refId: string
	individual: PmIndividual & OneToOne<PmIndividual> & PmIndividual
}
export class PrOrganizationReference extends SrbReference {
	refType?: string
	refId?: string
	organization?: PmOrganization
}
export interface QryPrOrganizationReference extends QrySrbReference {
	refType: string
	refId: string
	organization: PmOrganization & OneToOne<PmOrganization> & PmOrganization
}
export class PrAddressReference extends SrbReference {
	refType?: string
	refId?: string
	address?: LocAddress
}
export interface QryPrAddressReference extends QrySrbReference {
	refType: string
	refId: string
	address: LocAddress & OneToOne<LocAddress> & LocAddress
}
export class PrPartyRole {
	constructor () {
		this.places = []
	}

	id?: number
	statusId?: number
	name?: string
	partyId?: number
	validFrom?: string
	partyRoleSpecId?: number
	status?: PrPartyRoleStatus
	partyRoleSpec?: PrPartyRoleSpec
	individualReference?: PrIndividualReference
	organizationReference?: PrOrganizationReference
	places: PrPartyRolePlace[]
}
export interface QryPrPartyRole {
	id: number
	statusId: number
	name: string
	partyId: number
	validFrom: string
	partyRoleSpecId: number
	status: PrPartyRoleStatus & OneToMany<PrPartyRoleStatus> & PrPartyRoleStatus
	partyRoleSpec: PrPartyRoleSpec & OneToMany<PrPartyRoleSpec> & PrPartyRoleSpec
	individualReference: PrIndividualReference & OneToOne<PrIndividualReference> & PrIndividualReference
	organizationReference: PrOrganizationReference & OneToOne<PrOrganizationReference> & PrOrganizationReference
	places: ManyToOne<PrPartyRolePlace> & PrPartyRolePlace[]
}
export class PrPartyRolePlace {
	id?: number
	partyRoleId?: number
	placeRefId?: number
	partyRole?: PrPartyRole
	placeRef?: PrAddressReference
}
export interface QryPrPartyRolePlace {
	id: number
	partyRoleId: number
	placeRefId: number
	partyRole: PrPartyRole & OneToMany<PrPartyRole> & PrPartyRole
	placeRef: PrAddressReference & OneToOne<PrAddressReference> & PrAddressReference
}
export class LamAccountType {
	id?: number
	code?: string
	name?: string
	description?: string
	disabled?: boolean
	balanceType?: number
	incresedBy?: number
}
export interface QryLamAccountType {
	id: number
	code: string
	name: string
	description: string
	disabled: boolean
	balanceType: number
	incresedBy: number
}
export class LamStatementCycle {
	id?: number
	code?: string
	name?: string
	cycleDay?: number
	description?: string
	disabled?: boolean
}
export interface QryLamStatementCycle {
	id: number
	code: string
	name: string
	cycleDay: number
	description: string
	disabled: boolean
}
export class LamReference extends SrbReference {
}
export type QryLamReference = QrySrbReference
export class LamCurrencyReference extends SrbReference {
	refType?: string
}
export interface QryLamCurrencyReference extends QrySrbReference {
	refType: string
}
export class LamUserReference extends SrbReference {
	refType?: string
}
export interface QryLamUserReference extends QrySrbReference {
	refType: string
}
export class LamAccountHolderReference extends SrbReference {
	refType?: string
}
export interface QryLamAccountHolderReference extends QrySrbReference {
	refType: string
}
export class LamCreditor {
	id?: number
	creditorCode?: string
	name?: string
	partyRoleId?: number
	locAddressId?: number
	streetName?: string
	streetNumber?: string
	postalCode?: string
	cityName?: string
	country?: string
	contactName?: string
	contactEmail?: string
	contactPartyId?: number
}
export interface QryLamCreditor {
	id: number
	creditorCode: string
	name: string
	partyRoleId: number
	locAddressId: number
	streetName: string
	streetNumber: string
	postalCode: string
	cityName: string
	country: string
	contactName: string
	contactEmail: string
	contactPartyId: number
}
export class LamAccount {
	constructor () {
		this.statusHistories = []
	}

	id?: number
	accountNumber?: string
	name?: string
	currencyRefId?: number
	accountTypeId?: number
	accountStatusId?: number
	accountHolderRefId?: number
	balance?: number
	statementCycleId?: number
	registrationDate?: string
	creditorId?: number
	accountType?: LamAccountType
	currencyRef?: LamCurrencyReference
	accountStatus?: LamAccountStatusHistory
	accountHolderRef?: LamAccountHolderReference
	statementCycle?: LamStatementCycle
	creditor?: LamCreditor
	statusHistories: LamAccountStatusHistory[]
}
export interface QryLamAccount {
	id: number
	accountNumber: string
	name: string
	currencyRefId: number
	accountTypeId: number
	accountStatusId: number
	accountHolderRefId: number
	balance: number
	statementCycleId: number
	registrationDate: string
	creditorId: number
	accountType: LamAccountType & OneToMany<LamAccountType> & LamAccountType
	currencyRef: LamCurrencyReference & OneToMany<LamCurrencyReference> & LamCurrencyReference
	accountStatus: LamAccountStatusHistory & OneToMany<LamAccountStatusHistory> & LamAccountStatusHistory
	accountHolderRef: LamAccountHolderReference & OneToMany<LamAccountHolderReference> & LamAccountHolderReference
	statementCycle: LamStatementCycle & OneToMany<LamStatementCycle> & LamStatementCycle
	creditor: LamCreditor & OneToMany<LamCreditor> & LamCreditor
	statusHistories: ManyToOne<LamAccountStatusHistory> & LamAccountStatusHistory[]
}
export class LamAccountStatusHistory {
	id?: number
	accountStatus?: number
	registerDate?: string
	userRefId?: number
	reason?: string
	remarks?: string
	accountId?: number
	userRef?: LamUserReference
	account?: LamAccount
}
export interface QryLamAccountStatusHistory {
	id: number
	accountStatus: number
	registerDate: string
	userRefId: number
	reason: string
	remarks: string
	accountId: number
	userRef: LamUserReference & OneToOne<LamUserReference> & LamUserReference
	account: LamAccount & OneToMany<LamAccount> & LamAccount
}
export class DbDebtorType {
	id?: number
	code?: string
	name?: string
	description?: string
	disabled?: boolean
}
export interface QryDbDebtorType {
	id: number
	code: string
	name: string
	description: string
	disabled: boolean
}
export class DbBank {
	id?: number
	bic?: string
	name?: string
	disabled?: boolean
}
export interface QryDbBank {
	id: number
	bic: string
	name: string
	disabled: boolean
}
export class DbPaymentMethodType {
	id?: number
	code?: string
	name?: string
	description?: string
	disabled?: boolean
	autoPay?: boolean
}
export interface QryDbPaymentMethodType {
	id: number
	code: string
	name: string
	description: string
	disabled: boolean
	autoPay: boolean
}
export class DbDebtorStage {
	id?: number
	code?: string
	name?: string
	description?: string
	color?: string
	stagePosition?: number
	disabled?: boolean
}
export interface QryDbDebtorStage {
	id: number
	code: string
	name: string
	description: string
	color: string
	stagePosition: number
	disabled: boolean
}
export class DbReference extends SrbReference {
}
export type QryDbReference = QrySrbReference
export class DbPartyRoleReference extends SrbReference {
	refType?: string
	refId?: string
	partyRole?: PrPartyRole
}
export interface QryDbPartyRoleReference extends QrySrbReference {
	refType: string
	refId: string
	partyRole: PrPartyRole & OneToOne<PrPartyRole> & PrPartyRole
}
export class DbLedgerAccountReference extends SrbReference {
	refType?: string
	refId?: string
	ledgerAccount?: LamAccount
}
export interface QryDbLedgerAccountReference extends QrySrbReference {
	refType: string
	refId: string
	ledgerAccount: LamAccount & OneToOne<LamAccount> & LamAccount
}
export class DbUserReference extends SrbReference {
	refType?: string
}
export interface QryDbUserReference extends QrySrbReference {
	refType: string
}
export class DbAddressReference extends SrbReference {
	refType?: string
	refId?: string
	address?: LocAddress
}
export interface QryDbAddressReference extends QrySrbReference {
	refType: string
	refId: string
	address: LocAddress & OneToOne<LocAddress> & LocAddress
}
export class DbDebtor {
	constructor () {
		this.statusHistories = []
		this.accounts = []
	}

	id?: number
	debtorNumber?: string
	name?: string
	partyRoleRefId?: number
	debtorStatusId?: number
	partyRefId?: number
	mainAccountRefId?: number
	stageId?: number
	debtorTypeId?: number
	referenceNumber?: string
	lastModificationDate?: string
	registrationDate?: string
	identificationValue?: string
	identificationType?: string
	additionalInfo1?: string
	additionalInfo2?: string
	additionalInfo3?: string
	partyRoleRef?: DbPartyRoleReference
	statusHistories: DbDebtorStatusHistory[]
	accounts: DbDebtorAccount[]
}
export interface QryDbDebtor {
	id: number
	debtorNumber: string
	name: string
	partyRoleRefId: number
	debtorStatusId: number
	partyRefId: number
	mainAccountRefId: number
	stageId: number
	debtorTypeId: number
	referenceNumber: string
	lastModificationDate: string
	registrationDate: string
	identificationValue: string
	identificationType: string
	additionalInfo1: string
	additionalInfo2: string
	additionalInfo3: string
	partyRoleRef: DbPartyRoleReference & OneToOne<DbPartyRoleReference> & DbPartyRoleReference
	statusHistories: ManyToOne<DbDebtorStatusHistory> & DbDebtorStatusHistory[]
	accounts: ManyToOne<DbDebtorAccount> & DbDebtorAccount[]
}
export class DbDebtorStatusHistory {
	id?: number
	debtorStatus?: number
	registrationDate?: string
	userRefId?: number
	reason?: string
	remarks?: string
	debtorId?: number
	userRef?: DbUserReference
	debtor?: DbDebtor
}
export interface QryDbDebtorStatusHistory {
	id: number
	debtorStatus: number
	registrationDate: string
	userRefId: number
	reason: string
	remarks: string
	debtorId: number
	userRef: DbUserReference & OneToOne<DbUserReference> & DbUserReference
	debtor: DbDebtor & OneToMany<DbDebtor> & DbDebtor
}
export class DbAccountService {
	id?: number
	name?: string
	referenceNumber?: string
	accountId?: number
	serialNumber?: string
	registrationDate?: string
	activationDate?: string
	deactivationDate?: string
	contractNumber?: string
	serviceExternalCode?: string
	productLine?: string
	subType?: string
	account?: DbDebtorAccount
}
export interface QryDbAccountService {
	id: number
	name: string
	referenceNumber: string
	accountId: number
	serialNumber: string
	registrationDate: string
	activationDate: string
	deactivationDate: string
	contractNumber: string
	serviceExternalCode: string
	productLine: string
	subType: string
	account: DbDebtorAccount & OneToMany<DbDebtorAccount> & DbDebtorAccount
}
export class DbDebtorAccount {
	constructor () {
		this.services = []
		this.statusHistories = []
		this.accountPaymentResps = []
	}

	id?: number
	accountNumber?: string
	name?: string
	debtorId?: number
	actualPastDue?: number
	writeOff?: number
	securized?: number
	unbilled?: number
	providerId?: number
	accountLedgerRefId?: number
	lastModificationDate?: string
	referenceNumber?: string
	accountStatusId?: number
	registrationDate?: string
	currencyRefId?: number
	arranged?: number
	unexpired?: number
	activeSegmentId?: number
	debtor?: DbDebtor
	accountLedgerRef?: DbLedgerAccountReference
	services: DbAccountService[]
	statusHistories: DbAccountStatusHistory[]
	accountPaymentResps: DbAccountPaymentResp[]
}
export interface QryDbDebtorAccount {
	id: number
	accountNumber: string
	name: string
	debtorId: number
	actualPastDue: number
	writeOff: number
	securized: number
	unbilled: number
	providerId: number
	accountLedgerRefId: number
	lastModificationDate: string
	referenceNumber: string
	accountStatusId: number
	registrationDate: string
	currencyRefId: number
	arranged: number
	unexpired: number
	activeSegmentId: number
	debtor: DbDebtor & OneToMany<DbDebtor> & DbDebtor
	accountLedgerRef: DbLedgerAccountReference & OneToOne<DbLedgerAccountReference> & DbLedgerAccountReference
	services: ManyToOne<DbAccountService> & DbAccountService[]
	statusHistories: ManyToOne<DbAccountStatusHistory> & DbAccountStatusHistory[]
	accountPaymentResps: ManyToOne<DbAccountPaymentResp> & DbAccountPaymentResp[]
}
export class DbAccountStatusHistory {
	id?: number
	accountStatus?: number
	registrationDate?: string
	userRefId?: number
	isActive?: boolean
	reason?: string
	remarks?: string
	accountId?: number
	userRef?: DbUserReference
	account?: DbDebtorAccount
}
export interface QryDbAccountStatusHistory {
	id: number
	accountStatus: number
	registrationDate: string
	userRefId: number
	isActive: boolean
	reason: string
	remarks: string
	accountId: number
	userRef: DbUserReference & OneToOne<DbUserReference> & DbUserReference
	account: DbDebtorAccount & OneToMany<DbDebtorAccount> & DbDebtorAccount
}
export class DbAccountPaymentResp {
	id?: number
	debtorAccountId?: number
	paymentResponsibleId?: number
	locAddressRefId?: number
	isMain?: boolean
	paymentMethodRefId?: number
	debtorAccount?: DbDebtorAccount
	paymentResponsible?: DbPaymentResponsible
	locAddressRef?: DbAddressReference
	paymentMethodRef?: DbPaymentResponsibleMethod
}
export interface QryDbAccountPaymentResp {
	id: number
	debtorAccountId: number
	paymentResponsibleId: number
	locAddressRefId: number
	isMain: boolean
	paymentMethodRefId: number
	debtorAccount: DbDebtorAccount & OneToMany<DbDebtorAccount> & DbDebtorAccount
	paymentResponsible: DbPaymentResponsible & OneToOne<DbPaymentResponsible> & DbPaymentResponsible
	locAddressRef: DbAddressReference & OneToOne<DbAddressReference> & DbAddressReference
	paymentMethodRef: DbPaymentResponsibleMethod & OneToOne<DbPaymentResponsibleMethod> & DbPaymentResponsibleMethod
}
export class DbPaymentResponsible {
	constructor () {
		this.paymentMethods = []
	}

	id?: number
	name?: string
	referenceNumber?: string
	accountPaymentResps?: DbAccountPaymentResp
	paymentMethods: DbPaymentResponsibleMethod[]
}
export interface QryDbPaymentResponsible {
	id: number
	name: string
	referenceNumber: string
	accountPaymentResps: DbAccountPaymentResp & OneToOne<DbAccountPaymentResp> & DbAccountPaymentResp
	paymentMethods: ManyToOne<DbPaymentResponsibleMethod> & DbPaymentResponsibleMethod[]
}
export class DbPaymentResponsibleMethod {
	id?: number
	methodStatus?: number
	paymentMethodTypeId?: number
	paymentResponsibleId?: number
	bankId?: number
	cardNumber?: string
	cardName?: string
	cardExpirationYear?: number
	cardExpirationMonth?: number
	paymentMethodType?: DbPaymentMethodType
	paymentResponsible?: DbPaymentResponsible
}
export interface QryDbPaymentResponsibleMethod {
	id: number
	methodStatus: number
	paymentMethodTypeId: number
	paymentResponsibleId: number
	bankId: number
	cardNumber: string
	cardName: string
	cardExpirationYear: number
	cardExpirationMonth: number
	paymentMethodType: DbPaymentMethodType & OneToMany<DbPaymentMethodType> & DbPaymentMethodType
	paymentResponsible: DbPaymentResponsible & OneToMany<DbPaymentResponsible> & DbPaymentResponsible
}
export let LocCountries: Queryable<QryLocCountry>
export let LocAreaTypes: Queryable<QryLocAreaType>
export let LocAreas: Queryable<QryLocArea>
export let LocAddresses: Queryable<QryLocAddress>
export let LocAddressAreas: Queryable<QryLocAddressArea>
export let PmPartyStatuses: Queryable<QryPmPartyStatus>
export let PmMaritalStatuses: Queryable<QryPmMaritalStatus>
export let PmIdentificationTypes: Queryable<QryPmIdentificationType>
export let PmIndustryTypes: Queryable<QryPmIndustryType>
export let PmContactMediumTypes: Queryable<QryPmContactMediumType>
export let PmGenders: Queryable<QryPmGender>
export let PmReferences: Queryable<QryPmReference>
export let PmNationalReferences: Queryable<QryPmNationalReference>
export let PmParties: Queryable<QryPmParty>
export let PmIdentifications: Queryable<QryPmIdentification>
export let PmPartyContactMediums: Queryable<QryPmPartyContactMedium>
export let PmIndividuals: Queryable<QryPmIndividual>
export let PmIndividualNames: Queryable<QryPmIndividualName>
export let PmOrganizations: Queryable<QryPmOrganization>
export let PmOrganizationNames: Queryable<QryPmOrganizationName>
export let PrPartyRoleSpecs: Queryable<QryPrPartyRoleSpec>
export let PrPartyRoleStatuses: Queryable<QryPrPartyRoleStatus>
export let PrReferences: Queryable<QryPrReference>
export let PrIndividualReferences: Queryable<QryPrIndividualReference>
export let PrOrganizationReferences: Queryable<QryPrOrganizationReference>
export let PrAddressReferences: Queryable<QryPrAddressReference>
export let PrPartyRoles: Queryable<QryPrPartyRole>
export let PrPartyRolePlaces: Queryable<QryPrPartyRolePlace>
export let LamAccountTypes: Queryable<QryLamAccountType>
export let LamStatementCycles: Queryable<QryLamStatementCycle>
export let LamReferences: Queryable<QryLamReference>
export let LamCurrencyReferences: Queryable<QryLamCurrencyReference>
export let LamUserReferences: Queryable<QryLamUserReference>
export let LamAccountHolderReferences: Queryable<QryLamAccountHolderReference>
export let LamCreditors: Queryable<QryLamCreditor>
export let LamAccounts: Queryable<QryLamAccount>
export let LamAccountStatusHistories: Queryable<QryLamAccountStatusHistory>
export let DbDebtorTypes: Queryable<QryDbDebtorType>
export let DbBanks: Queryable<QryDbBank>
export let DbPaymentMethodTypes: Queryable<QryDbPaymentMethodType>
export let DbDebtorStages: Queryable<QryDbDebtorStage>
export let DbReferences: Queryable<QryDbReference>
export let DbPartyRoleReferences: Queryable<QryDbPartyRoleReference>
export let DbLedgerAccountReferences: Queryable<QryDbLedgerAccountReference>
export let DbUserReferences: Queryable<QryDbUserReference>
export let DbAddressReferences: Queryable<QryDbAddressReference>
export let DbDebtors: Queryable<QryDbDebtor>
export let DbDebtorStatusHistories: Queryable<QryDbDebtorStatusHistory>
export let DbAccountServices: Queryable<QryDbAccountService>
export let DbDebtorAccounts: Queryable<QryDbDebtorAccount>
export let DbAccountStatusHistories: Queryable<QryDbAccountStatusHistory>
export let DbAccountPaymentResps: Queryable<QryDbAccountPaymentResp>
export let DbPaymentResponsibles: Queryable<QryDbPaymentResponsible>
export let DbPaymentResponsibleMethods: Queryable<QryDbPaymentResponsibleMethod>
