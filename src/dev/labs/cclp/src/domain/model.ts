/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Queryable, OneToMany, ManyToOne, OneToOne } from 'lambdaorm'
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
	areas: ManyToOne<QryLocArea> & LocArea[]
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
	type: QryLocAreaType & OneToMany<QryLocAreaType> & LocAreaType
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
	country: QryLocCountry & OneToMany<QryLocCountry> & LocCountry
	areas: ManyToOne<QryLocAddressArea> & LocAddressArea[]
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
	address: QryLocAddress & OneToMany<QryLocAddress> & LocAddress
	area: QryLocArea & OneToMany<QryLocArea> & LocArea
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
export class PmReference {
	id?: number
	refType?: string
	refId?: string
	name?: string
}
export interface QryPmReference {
	id: number
	refType: string
	refId: string
	name: string
}
export class PmNationalReference {
	refType?: string
	id?: number
	refId?: string
	name?: string
}
export interface QryPmNationalReference {
	refType: string
	id: number
	refId: string
	name: string
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
	registredDate?: Date
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
	registredDate: Date
	status: QryPmPartyStatus & OneToMany<QryPmPartyStatus> & PmPartyStatus
	indentifications: ManyToOne<QryPmIdentification> & PmIdentification[]
	contactMediums: ManyToOne<QryPmPartyContactMedium> & PmPartyContactMedium[]
	organization: QryPmOrganization & OneToOne<QryPmOrganization> & PmOrganization
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
	identificationType: QryPmIdentificationType & OneToMany<QryPmIdentificationType> & PmIdentificationType
	party: QryPmParty & OneToMany<QryPmParty> & PmParty
}
export class PmPartyContactMedium {
	id?: number
	contactMediumTypeId?: number
	partyId?: number
	mediumValue?: string
	validFrom?: Date
	validTo?: Date
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
	validFrom: Date
	validTo: Date
	isMain: boolean
	isFavorite: boolean
	source: string
	createdBy: string
	contactMediumType: QryPmContactMediumType & OneToMany<QryPmContactMediumType> & PmContactMediumType
	party: QryPmParty & OneToMany<QryPmParty> & PmParty
}
export class PmIndividual {
	constructor () {
		this.names = []
	}

	id?: number
	partyId?: number
	genderId?: number
	birthDate?: Date
	deathDate?: Date
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
	birthDate: Date
	deathDate: Date
	nationalityRefId: number
	currentNameId: number
	party: QryPmParty & OneToOne<QryPmParty> & PmParty
	currentName: QryPmIndividualName & OneToMany<QryPmIndividualName> & PmIndividualName
	nationalityRef: QryPmNationalReference & OneToMany<QryPmNationalReference> & PmNationalReference
	names: ManyToOne<QryPmIndividualName> & PmIndividualName[]
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
	individual: QryPmIndividual & OneToMany<QryPmIndividual> & PmIndividual
}
export class PmOrganization {
	constructor () {
		this.names = []
	}

	id?: number
	partyId?: number
	legalPeriodFrom?: Date
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
	legalPeriodFrom: Date
	currentNameId: number
	industyTypeId: number
	commercialDescription: string
	party: QryPmParty & OneToOne<QryPmParty> & PmParty
	currentName: QryPmOrganizationName & OneToMany<QryPmOrganizationName> & PmOrganizationName
	industyType: QryPmIndustryType & OneToMany<QryPmIndustryType> & PmIndustryType
	names: ManyToOne<QryPmOrganizationName> & PmOrganizationName[]
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
	organization: QryPmOrganization & OneToMany<QryPmOrganization> & PmOrganization
}
export class PrPartyRoleSpec {
	id?: number
	code?: string
	name?: string
	validFrom?: Date
}
export interface QryPrPartyRoleSpec {
	id: number
	code: string
	name: string
	validFrom: Date
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
export class PrReference {
	id?: number
	refType?: string
	refId?: string
	name?: string
}
export interface QryPrReference {
	id: number
	refType: string
	refId: string
	name: string
}
export class PrIndividualReference {
	refType?: string
	refId?: string
	id?: number
	name?: string
	individual?: PmIndividual
}
export interface QryPrIndividualReference {
	refType: string
	refId: string
	id: number
	name: string
	individual: QryPmIndividual & OneToOne<QryPmIndividual> & PmIndividual
}
export class PrOrganizationReference {
	refType?: string
	refId?: string
	id?: number
	name?: string
	organization?: PmOrganization
}
export interface QryPrOrganizationReference {
	refType: string
	refId: string
	id: number
	name: string
	organization: QryPmOrganization & OneToOne<QryPmOrganization> & PmOrganization
}
export class PrAddressReference {
	refType?: string
	refId?: string
	id?: number
	name?: string
	address?: LocAddress
}
export interface QryPrAddressReference {
	refType: string
	refId: string
	id: number
	name: string
	address: QryLocAddress & OneToOne<QryLocAddress> & LocAddress
}
export class PrPartyRole {
	constructor () {
		this.places = []
	}

	id?: number
	statusId?: number
	name?: string
	partyId?: number
	validFrom?: Date
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
	validFrom: Date
	partyRoleSpecId: number
	status: QryPrPartyRoleStatus & OneToMany<QryPrPartyRoleStatus> & PrPartyRoleStatus
	partyRoleSpec: QryPrPartyRoleSpec & OneToMany<QryPrPartyRoleSpec> & PrPartyRoleSpec
	individualReference: QryPrIndividualReference & OneToOne<QryPrIndividualReference> & PrIndividualReference
	organizationReference: QryPrOrganizationReference & OneToOne<QryPrOrganizationReference> & PrOrganizationReference
	places: ManyToOne<QryPrPartyRolePlace> & PrPartyRolePlace[]
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
	partyRole: QryPrPartyRole & OneToMany<QryPrPartyRole> & PrPartyRole
	placeRef: QryPrAddressReference & OneToOne<QryPrAddressReference> & PrAddressReference
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
export class LamReference {
	id?: number
	refType?: string
	refId?: string
	name?: string
}
export interface QryLamReference {
	id: number
	refType: string
	refId: string
	name: string
}
export class LamCurrencyReference {
	refType?: string
	id?: number
	refId?: string
	name?: string
}
export interface QryLamCurrencyReference {
	refType: string
	id: number
	refId: string
	name: string
}
export class LamUserReference {
	refType?: string
	id?: number
	refId?: string
	name?: string
}
export interface QryLamUserReference {
	refType: string
	id: number
	refId: string
	name: string
}
export class LamAccountHolderReference {
	refType?: string
	id?: number
	refId?: string
	name?: string
}
export interface QryLamAccountHolderReference {
	refType: string
	id: number
	refId: string
	name: string
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
	balance?: number
	statementCycleId?: number
	registrationDate?: Date
	creditorId?: number
	accountType?: LamAccountType
	currencyRef?: LamCurrencyReference
	accountStatus?: LamAccountStatusHistory
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
	balance: number
	statementCycleId: number
	registrationDate: Date
	creditorId: number
	accountType: QryLamAccountType & OneToMany<QryLamAccountType> & LamAccountType
	currencyRef: QryLamCurrencyReference & OneToMany<QryLamCurrencyReference> & LamCurrencyReference
	accountStatus: QryLamAccountStatusHistory & OneToMany<QryLamAccountStatusHistory> & LamAccountStatusHistory
	statementCycle: QryLamStatementCycle & OneToMany<QryLamStatementCycle> & LamStatementCycle
	creditor: QryLamCreditor & OneToMany<QryLamCreditor> & LamCreditor
	statusHistories: ManyToOne<QryLamAccountStatusHistory> & LamAccountStatusHistory[]
}
export class LamAccountStatusHistory {
	id?: number
	accountStatus?: number
	registerDate?: Date
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
	registerDate: Date
	userRefId: number
	reason: string
	remarks: string
	accountId: number
	userRef: QryLamUserReference & OneToOne<QryLamUserReference> & LamUserReference
	account: QryLamAccount & OneToMany<QryLamAccount> & LamAccount
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
export class DbReference {
	id?: number
	refType?: string
	refId?: string
	name?: string
}
export interface QryDbReference {
	id: number
	refType: string
	refId: string
	name: string
}
export class DbIndividualReference {
	refType?: string
	refId?: string
	id?: number
	name?: string
	individual?: PmIndividual
}
export interface QryDbIndividualReference {
	refType: string
	refId: string
	id: number
	name: string
	individual: QryPmIndividual & OneToOne<QryPmIndividual> & PmIndividual
}
export class DbLedgerAccountReference {
	refType?: string
	refId?: string
	id?: number
	name?: string
	ledgerAccount?: LamAccount
}
export interface QryDbLedgerAccountReference {
	refType: string
	refId: string
	id: number
	name: string
	ledgerAccount: QryLamAccount & OneToOne<QryLamAccount> & LamAccount
}
export class DbUserReference {
	refType?: string
	id?: number
	refId?: string
	name?: string
}
export interface QryDbUserReference {
	refType: string
	id: number
	refId: string
	name: string
}
export class DbAddressReference {
	refType?: string
	refId?: string
	id?: number
	name?: string
	address?: LocAddress
}
export interface QryDbAddressReference {
	refType: string
	refId: string
	id: number
	name: string
	address: QryLocAddress & OneToOne<QryLocAddress> & LocAddress
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
	lastModificationDate?: Date
	registrationDate?: Date
	identificationValue?: string
	identificationType?: string
	additionalInfo1?: string
	additionalInfo2?: string
	additionalInfo3?: string
	partyRef?: DbIndividualReference
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
	lastModificationDate: Date
	registrationDate: Date
	identificationValue: string
	identificationType: string
	additionalInfo1: string
	additionalInfo2: string
	additionalInfo3: string
	partyRef: QryDbIndividualReference & OneToOne<QryDbIndividualReference> & DbIndividualReference
	statusHistories: ManyToOne<QryDbDebtorStatusHistory> & DbDebtorStatusHistory[]
	accounts: ManyToOne<QryDbDebtorAccount> & DbDebtorAccount[]
}
export class DbDebtorStatusHistory {
	id?: number
	debtorStatus?: number
	registrationDate?: Date
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
	registrationDate: Date
	userRefId: number
	reason: string
	remarks: string
	debtorId: number
	userRef: QryDbUserReference & OneToOne<QryDbUserReference> & DbUserReference
	debtor: QryDbDebtor & OneToMany<QryDbDebtor> & DbDebtor
}
export class DbAccountService {
	id?: number
	name?: string
	referenceNumber?: string
	accountId?: number
	serialNumber?: string
	registrationDate?: Date
	activationDate?: Date
	deactivationDate?: Date
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
	registrationDate: Date
	activationDate: Date
	deactivationDate: Date
	contractNumber: string
	serviceExternalCode: string
	productLine: string
	subType: string
	account: QryDbDebtorAccount & OneToMany<QryDbDebtorAccount> & DbDebtorAccount
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
	providerId?: number
	accountLedgerRefId?: number
	lastModificationDate?: Date
	referenceNumber?: string
	accountStatusId?: number
	registrationDate?: Date
	currencyRefId?: number
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
	providerId: number
	accountLedgerRefId: number
	lastModificationDate: Date
	referenceNumber: string
	accountStatusId: number
	registrationDate: Date
	currencyRefId: number
	activeSegmentId: number
	debtor: QryDbDebtor & OneToMany<QryDbDebtor> & DbDebtor
	accountLedgerRef: QryDbLedgerAccountReference & OneToOne<QryDbLedgerAccountReference> & DbLedgerAccountReference
	services: ManyToOne<QryDbAccountService> & DbAccountService[]
	statusHistories: ManyToOne<QryDbAccountStatusHistory> & DbAccountStatusHistory[]
	accountPaymentResps: ManyToOne<QryDbAccountPaymentResp> & DbAccountPaymentResp[]
}
export class DbAccountStatusHistory {
	id?: number
	accountStatus?: number
	registrationDate?: Date
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
	registrationDate: Date
	userRefId: number
	isActive: boolean
	reason: string
	remarks: string
	accountId: number
	userRef: QryDbUserReference & OneToOne<QryDbUserReference> & DbUserReference
	account: QryDbDebtorAccount & OneToMany<QryDbDebtorAccount> & DbDebtorAccount
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
	debtorAccount: QryDbDebtorAccount & OneToMany<QryDbDebtorAccount> & DbDebtorAccount
	paymentResponsible: QryDbPaymentResponsible & OneToOne<QryDbPaymentResponsible> & DbPaymentResponsible
	locAddressRef: QryDbAddressReference & OneToOne<QryDbAddressReference> & DbAddressReference
	paymentMethodRef: QryDbPaymentResponsibleMethod & OneToOne<QryDbPaymentResponsibleMethod> & DbPaymentResponsibleMethod
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
	accountPaymentResps: QryDbAccountPaymentResp & OneToOne<QryDbAccountPaymentResp> & DbAccountPaymentResp
	paymentMethods: ManyToOne<QryDbPaymentResponsibleMethod> & DbPaymentResponsibleMethod[]
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
	paymentMethodType: QryDbPaymentMethodType & OneToMany<QryDbPaymentMethodType> & DbPaymentMethodType
	paymentResponsible: QryDbPaymentResponsible & OneToMany<QryDbPaymentResponsible> & DbPaymentResponsible
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
export let DbIndividualReferences: Queryable<QryDbIndividualReference>
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
