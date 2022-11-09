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



class CollectionMigration {
	constructor(private readonly orm:IOrm){}

	public async createPmMapping():Promise<void> {

		const options = { stage: beeStage }
		const genders = await this.orm.execute(() => PmGenders, {}, options)
		const industryTypes = await this.orm.execute(() => PmIndustryTypes, {},options )
		const partyStatuses = await this.orm.execute(() => PmPartyStatuses, {}, options)
		const maritalStatuses = await this.orm.execute(() => PmMaritalStatuses, {}, options)
		const identificationTypes = await this.orm.execute(() => PmIdentificationTypes, {}, options)
		const contactMediumTypes = await this.orm.execute(() => PmContactMediumTypes, {}, options)
		const nationalReferences = await this.orm.execute(() => PmNationalReferences, {}, options)
			
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
		await helper.fs.write(sourcePath + '/confidential_data/pmMapping.json', JSON.stringify(mapping))

	}

}




async function execute () {
	try {
		await orm.init(`${sourcePath}/workspace/lambdaORM.yaml`)

		const migration = new CollectionMigration(orm)
		await migration.createPmMapping()	

	} catch (error: any) {
		console.error(error)
	} finally {
		await orm.end()
	}
}

execute()