
export interface Individual {
	givenNames: string
	firstFamilyName: string
	secondFamilyName: string
	legalName: string
	birthDate: string
	gender: string
	civilStatus: string
	nationalityCode: string
}

export interface Organization {
	industyType: string
	commercialDescription: string
	legalPeriodFrom: string
}
export interface Identification {
	identificationTypeCode:string
	identificationValue: string
}

export interface ContactMedium {
	todo:string
}

export interface Address {
	countryCode: string
	provinceCode: string
	departmentCode: string
	districtCode: string
	city?: string
	streetName: string
	streetNrFirst?: string
	postalCode: string
	additionalData: string
}
export interface AdditionalInfo {
	dataInfo1: string
	dataInfo2: string
	dataInfo3: string
}
export interface Subscription {
	action: string
	referenceCode: string
	contractNumber: string
	name: string
	type: string
	subType: string
	serialNumber: string
	activationDate: string
	deactivationDate: string
	productOfferingId: string
	productBundleId: string
}

export interface PaymentMethod {
	type: string
	account: string
	bank: string
	cardExpirationYear: string
	cardExpirationMonth: string
	cardName: string
	cardNumber: string
}

export interface PaymentResponsible {
	action: string
	referenceCode: string
	givenNames: string
	firstFamilyName: string
	secondFamilyName: string
	legalName: string
	order: string
	paymentMethod: PaymentMethod
	contactMediums: ContactMedium[],
	addresses: Address[]
}

export interface Account {
	action: string
	referenceCode: string
	provider: string
	additionalData: string
	creationDate: string
	endDate?: string
	billCycle:string
	creditorCode: string
	subscriptions:Subscription [],
	paymentResponsibles: PaymentResponsible[],
	additionalInfo: AdditionalInfo
}

export interface Debtor {
	referenceCode: string
	provider: string
	debtorType: string
	debtorSubtype: string
	identifications: Identification[],
	individual?: Individual,
	organization?: Organization,
	contactMediums: ContactMedium[],
	addresses:Address [],
	additionalInfo: AdditionalInfo,
	accounts: Account[]
}

export interface Message {
  businessData: Debtor
}
