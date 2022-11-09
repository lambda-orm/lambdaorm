import { orm, helper, IOrm } from '../../../../lib'
import {
	sourcePath, locStage, beeStage, view, expDebtorsImport, expPaymentRespsImport, expAccountPaymentRespsImport,
	getPaymentResponsibles, preImportAccountPaymentRest, getAccountPaymentRest, exportLocal, sentence
} from './common'

import {
	LocCountries, LocAreaTypes, PmIndustryTypes, PmPartyStatuses, PmMaritalStatuses, PmIdentificationTypes, PrPartyRoleSpecs, PrPartyRoleStatuses,
	LamAccountTypes, LamStatementCycles, LamCurrencyReferences, DbDebtorTypes, DbPaymentMethodTypes, DbDebtorStages, DbDebtor,
	LamUserReferences, DbUserReferences,PmNationalReferences, PmContactMediumTypes, LamCreditors, PmGenders, DbBanks
} from './workspace/src/model'

interface PmMapping { 
	industryTypes: any
	partyStatuses: any
	maritalStatuses: any
	identificationTypes: any
	contactMediumTypes:any
	nationalReferences:any
	genders: any 
}


class CollectionMigration {
	constructor(private readonly orm:IOrm){}

	public async createPmMapping():Promise<PmMapping> {

		const options = { stage: beeStage }
		const genders = await this.orm.execute(() => PmGenders, {}, options)
		const industryTypes = await this.orm.execute(() => PmIndustryTypes, {},options )
		const partyStatuses = await this.orm.execute(() => PmPartyStatuses, {}, options)
		const maritalStatuses = await this.orm.execute(() => PmMaritalStatuses, {}, options)
		const identificationTypes = await this.orm.execute(() => PmIdentificationTypes, {}, options)
		const contactMediumTypes = await this.orm.execute(() => PmContactMediumTypes, {}, options)
		const nationalReferences = await this.orm.execute(() => PmNationalReferences, {}, options)
			
		const mapping: PmMapping = { industryTypes: {}, partyStatuses: {}, maritalStatuses: {}, identificationTypes: {}, contactMediumTypes: {}, nationalReferences: {}, genders: {} }
		for (const source of industryTypes) {
			mapping.industryTypes[source.id] = source
		}
		for (const source of partyStatuses) {
			mapping.partyStatuses[source.id] = source
		}
		for (const source of  maritalStatuses) {
			mapping.maritalStatuses[source.id] = source
		}
		for (const source of  identificationTypes) {
			mapping.identificationTypes[source.id] = source
		}
		for (const source of  contactMediumTypes) {
			mapping.contactMediumTypes[source.id] = source
		}
		for (const source of  nationalReferences) {
			mapping.nationalReferences[source.id] = source
		}
		for (const source of  genders) {
			mapping.genders[source.id] = source
		}
		return mapping
	}



}

async function execute () {
	try {
		await orm.init(`${sourcePath}/workspace/cclpSchema.yaml`)

		const migration = new CollectionMigration(orm)
		const pmMapping = await migration.createPmMapping()	

		await helper.fs.write(sourcePath + '/confidential_data/pmMapping.json', JSON.stringify(pmMapping))

	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
}

execute()