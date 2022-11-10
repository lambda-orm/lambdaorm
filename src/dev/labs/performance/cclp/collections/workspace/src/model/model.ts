/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
import { Queryable } from 'lambdaorm'
export enum PartyStatus{
	Created = 'CREATED',
	Active = 'ACTIVE',
	InProgress = 'IN_PROGRESS',
	Inactive = 'INACTIVE'
}
export enum IdentificationType{
	NotAvailable = 'NOT_AVAILABLE',
	DNI = 'DNI',
	RUC = 'RUC',
	Passport = 'PASSPORT',
	CIP = 'CIP',
	CE = 'CE',
	CDI = 'CDI'
}
export enum Gender{
	Male = 'MALE',
	Female = 'FEMALE'
}
export enum MaritalStatus{
	Married = 'MARRIED',
	Divorced = 'DIVORCED',
	Single = 'SINGLE',
	Widower = 'WIDOWER',
	Concubinage = 'CONCUBINAGE',
	Separation = 'SEPARATION'
}
export enum ContactMediumType{
	Phone = 'Phone',
	CellPhone = 'CellPhone',
	SecondaryPhone = 'SecondaryPhone',
	WorkPhone = 'WorkPhone',
	Email = 'Email',
	WorkEmail = 'WorkEmail',
	Twitter = 'Twitter',
	Instagram = 'Instagram',
	Facebook = 'Facebook',
	Skype = 'Skype'
}
export abstract class Basic {
	created?: Date
	createdBy?: string
}
export interface QryBasic {
	created: Date
	createdBy: string
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
export class PmParty extends Basic {
	constructor () {
		super()
		this.identifications = []
		this.contactMediums = []
	}

	id?: number
	individualId?: number
	organizationId?: number
	status?: PartyStatus
	registeredDate?: Date
	identifications: PmIdentification[]
	contactMediums: PmPartyContactMedium[]
	organization?: PmOrganization
}
export interface QryPmParty extends QryBasic {
	id: number
	individualId: number
	organizationId: number
	status: PartyStatus
	registeredDate: Date
	identifications: ManyToOne<PmIdentification> & PmIdentification[]
	contactMediums: ManyToOne<PmPartyContactMedium> & PmPartyContactMedium[]
	organization: PmOrganization & OneToOne<PmOrganization> & PmOrganization
}
export class PmIdentification extends Basic {
	id?: number
	type?: IdentificationType
	partyId?: number
	value?: string
	source?: string
	party?: PmParty
}
export interface QryPmIdentification extends QryBasic {
	id: number
	type: IdentificationType
	partyId: number
	value: string
	source: string
	party: PmParty & OneToMany<PmParty> & PmParty
}
export class PmPartyContactMedium extends Basic {
	id?: number
	type?: ContactMediumType
	partyId?: number
	mediumValue?: string
	isMain?: boolean
	isFavorite?: boolean
	source?: string
	createdBy?: string
	party?: PmParty
}
export interface QryPmPartyContactMedium extends QryBasic {
	id: number
	type: ContactMediumType
	partyId: number
	mediumValue: string
	isMain: boolean
	isFavorite: boolean
	source: string
	createdBy: string
	party: PmParty & OneToMany<PmParty> & PmParty
}
export class PmIndividual extends Basic {
	id?: number
	partyId?: number
	gender?: Gender
	maritalStatus?: MaritalStatus
	birthDate?: Date
	deathDate?: Date
	nationalityCode?: string
	givenNames?: string
	middleNames?: string
	familyNames?: string
	legalName?: string
	party?: PmParty
}
export interface QryPmIndividual extends QryBasic {
	id: number
	partyId: number
	gender: Gender
	maritalStatus: MaritalStatus
	birthDate: Date
	deathDate: Date
	nationalityCode: string
	givenNames: string
	middleNames: string
	familyNames: string
	legalName: string
	party: PmParty & OneToOne<PmParty> & PmParty
}
export class PmOrganization extends Basic {
	id?: number
	partyId?: number
	legalPeriodFrom?: Date
	industryTypeCode?: string
	commercialDescription?: string
	tradingName?: string
	party?: PmParty
	industryType?: PmIndustryType
}
export interface QryPmOrganization extends QryBasic {
	id: number
	partyId: number
	legalPeriodFrom: Date
	industryTypeCode: string
	commercialDescription: string
	tradingName: string
	party: PmParty & OneToOne<PmParty> & PmParty
	industryType: PmIndustryType & OneToMany<PmIndustryType> & PmIndustryType
}
export let PmIndustryTypes: Queryable<QryPmIndustryType>
export let PmParties: Queryable<QryPmParty>
export let PmIdentifications: Queryable<QryPmIdentification>
export let PmPartyContactMediums: Queryable<QryPmPartyContactMedium>
export let PmIndividuals: Queryable<QryPmIndividual>
export let PmOrganizations: Queryable<QryPmOrganization>
