/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
import { Queryable } from '../../../../../../../../lib'
export enum PartyType{
	Individual = 'IND',
	Organization = 'ORG'
}
export enum PartyStatus{
	Created = 'CREATED',
	Active = 'ACTIVE',
	InProgress = 'IN_PROGRESS',
	Inactive = 'INACTIVE'
}
export enum IdentificationType{
	NotAvailable = 'NO DISPONIBLE',
	DNI = 'DNI',
	RUC = 'RUC',
	Passport = 'PASAPORTE',
	CIP = 'CIP',
	CE = 'CE',
	CDI = 'CDI'
}
export enum Gender{
	Male = 'M',
	Female = 'F',
	Undefined = 'U'
}
export enum MaritalStatus{
	Married = 'CASADO',
	Divorced = 'DIVORCIADO',
	Single = 'SOLTERO',
	Widower = 'VIUDO',
	Concubinage = 'CONCUBINATO',
	Separation = 'SEPARACION',
	Undefined = 'UNDEFINED'
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
	Skype = 'Skype',
	MainMobile = 'MainMobile',
	MainPhone = 'MainPhone',
	SecPhone = 'SecPhone'
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
	code?: string
	name?: string
}
export interface QryPmIndustryType {
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
	type?: PartyType
	status?: PartyStatus
	registeredDate?: Date
	identifications: PmIdentification[]
	contactMediums: PmPartyContactMedium[]
}
export interface QryPmParty extends QryBasic {
	id: number
	type: PartyType
	status: PartyStatus
	registeredDate: Date
	identifications: ManyToOne<PmIdentification> & PmIdentification[]
	contactMediums: ManyToOne<PmPartyContactMedium> & PmPartyContactMedium[]
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
	value?: string
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
	value: string
	isMain: boolean
	isFavorite: boolean
	source: string
	createdBy: string
	party: PmParty & OneToMany<PmParty> & PmParty
}
export class PmIndividual extends Basic {
	constructor () {
		super()
		this.identifications = []
		this.contactMediums = []
	}

	partyId?: number
	code?: string
	gender?: Gender
	birthDate?: Date
	deathDate?: Date
	nationalityCode?: string
	givenNames?: string
	middleNames?: string
	familyNames?: string
	legalName?: string
	party?: PmParty
	identifications: PmIdentification[]
	contactMediums: PmPartyContactMedium[]
}
export interface QryPmIndividual extends QryBasic {
	partyId: number
	code: string
	gender: Gender
	birthDate: Date
	deathDate: Date
	nationalityCode: string
	givenNames: string
	middleNames: string
	familyNames: string
	legalName: string
	party: PmParty & OneToOne<PmParty> & PmParty
	identifications: ManyToOne<PmIdentification> & PmIdentification[]
	contactMediums: ManyToOne<PmPartyContactMedium> & PmPartyContactMedium[]
}
export class PmOrganization extends Basic {
	constructor () {
		super()
		this.identifications = []
		this.contactMediums = []
		this.children = []
		this.descendants = []
	}

	partyId?: number
	code?: string
	rootId?: number
	parentId?: number
	legalPeriodFrom?: Date
	industryTypeCode?: string
	commercialDescription?: string
	tradingName?: string
	party?: PmParty
	parent?: PmOrganization
	root?: PmOrganization
	industryType?: PmIndustryType
	identifications: PmIdentification[]
	contactMediums: PmPartyContactMedium[]
	children: PmOrganization[]
	descendants: PmOrganization[]
}
export interface QryPmOrganization extends QryBasic {
	partyId: number
	code: string
	rootId: number
	parentId: number
	legalPeriodFrom: Date
	industryTypeCode: string
	commercialDescription: string
	tradingName: string
	party: PmParty & OneToOne<PmParty> & PmParty
	parent: PmOrganization & OneToMany<PmOrganization> & PmOrganization
	root: PmOrganization & OneToMany<PmOrganization> & PmOrganization
	industryType: PmIndustryType & OneToMany<PmIndustryType> & PmIndustryType
	identifications: ManyToOne<PmIdentification> & PmIdentification[]
	contactMediums: ManyToOne<PmPartyContactMedium> & PmPartyContactMedium[]
	children: ManyToOne<PmOrganization> & PmOrganization[]
	descendants: ManyToOne<PmOrganization> & PmOrganization[]
}
export let PmIndustryTypes: Queryable<QryPmIndustryType>
export let PmParties: Queryable<QryPmParty>
export let PmIdentifications: Queryable<QryPmIdentification>
export let PmPartyContactMediums: Queryable<QryPmPartyContactMedium>
export let PmIndividuals: Queryable<QryPmIndividual>
export let PmOrganizations: Queryable<QryPmOrganization>
