import { Orm, helper, IOrm, QueryOptions } from '../../../../lib'
import {sourcePath } from './common'
import {
	PmIndividuals, PmOrganizations,	LocCountries, LocAreaTypes, PmIndustryTypes, PmPartyStatuses, PmMaritalStatuses,
	PmIdentificationTypes, PmContactMediumTypes, PmGenders,  PmIndividual, PmOrganization, PmParty, PmNationalReferences, PmIndustryType, LocAreas, LocAddresses
} from './workspace/src/model'
import * as c  from './collections/workspace/src/model/model'

interface PmMapping { 
	industryTypes: any
	partyStatuses: any
	maritalStatuses: any
	identificationTypes: any
	contactMediumTypes:any
	nationalReferences:any
	genders: any 
}
interface LocMapping { 	
	areaTypes: any
}
interface ExportData {
	pmMapping:PmMapping
	locMapping: LocMapping
	individuals:PmIndividual[]
	organizations:PmOrganization[]
}
interface ImportData {	
	industryTypes?:c.PmIndustryType[]
	individuals?:c.PmIndividual[]
	organizations?:c.PmOrganization[]
}
class CollectionExporter {
	private orm: IOrm
	constructor(workspace:string, private readonly options:QueryOptions ){
		this.orm = new Orm(workspace)
	}
	public async export(): Promise<any> {
		try {
			await this.orm.init()
			
			// const locMapping = await this.getLocMapping()
			// const countries = await this.orm.execute(() => LocCountries, {}, this.options)
			// const areas = await this.orm.execute(() => LocAreas, {}, this.options)
			// const addresses = await this.orm.execute(() => LocAddresses, {}, this.options)
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/locMapping.json`, JSON.stringify(locMapping))
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/countries.json`, JSON.stringify(countries))
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/areas.json`, JSON.stringify(areas))
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/addresses.json`, JSON.stringify(addresses))

			// const pmMapping = await this.getPmMapping()
			const individuals = await this.getIndividuals()
			const organizations = await this.getOrganizations()
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/pmMapping.json`, JSON.stringify(pmMapping))			
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/individuals.json`, JSON.stringify(individuals))
			// await helper.fs.write(`${this.orm.workspace}/confidential_data/organizations.json`, JSON.stringify(organizations))
		} catch (error: any) {
			console.error(error)
		} finally {
			await this.orm.end()
		}
	}
	public async getExportData(): Promise<ExportData> {
		return {
			pmMapping: JSON.parse(await helper.fs.read(`${this.orm.workspace}/confidential_data/pmMapping.json`) as string),
			locMapping: JSON.parse(await helper.fs.read(`${this.orm.workspace}/confidential_data/locMapping.json`) as string),
			individuals:JSON.parse(await helper.fs.read(`${this.orm.workspace}/confidential_data/individuals.json`) as string),
			organizations:JSON.parse(await helper.fs.read(`${this.orm.workspace}/confidential_data/organizations.json`) as string)
		}
	}
	private async getLocMapping(): Promise<LocMapping> {
		// const countries = await this.orm.execute(() => LocCountries, {}, this.options)
		const areaTypes = await this.orm.execute(() => LocAreaTypes, {}, this.options)
		const mapping: LocMapping = { areaTypes: {}}
		// for (const source of countries) {
		// 	mapping.countries[source.id] = source
		// }
		for (const areaType of areaTypes) {
			mapping.areaTypes[areaType.id] = areaType
		}
		return mapping
	}
	private async getPmMapping():Promise<PmMapping> {		
		const genders = await this.orm.execute(() => PmGenders, {}, this.options)
		const industryTypes = await this.orm.execute(() => PmIndustryTypes, {},this.options )
		const partyStatuses = await this.orm.execute(() => PmPartyStatuses, {}, this.options)
		const maritalStatuses = await this.orm.execute(() => PmMaritalStatuses, {}, this.options)
		const identificationTypes = await this.orm.execute(() => PmIdentificationTypes, {}, this.options)
		const contactMediumTypes = await this.orm.execute(() => PmContactMediumTypes, {}, this.options)
		const nationalReferences = await this.orm.execute(() => PmNationalReferences, {}, this.options)
			
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
	private async getIndividuals():Promise<PmIndividual[]> {
		return await this.orm.execute(() => PmIndividuals.include(p=> [ p.party.include( p=> [p.indentifications, p.contactMediums]).map(p=> [p.status, p.registredDate ] ) , p.currentName ]).map( p=> p.deathDate ), {}, this.options)
	}
	private async getOrganizations():Promise<PmOrganization[]> {
		return await this.orm.execute(() => PmOrganizations.include(p=> [ p.party.include( p=> [p.indentifications, p.contactMediums] ), p.currentName ]), {}, this.options)
	}
}
class CollectionImporter {
	private orm: IOrm
	constructor(workspace:string, private readonly options:QueryOptions ){
		this.orm = new Orm(workspace)
	}
	public async import(exportData:ExportData): Promise<ImportData> {
		const importData:ImportData = {}
		try {
			await this.orm.init()
			await this.orm.stage.clean(this.options).execute()
			await this.orm.stage.sync(this.options).execute()			
			let industryTypes = this.getIndustryTypes(exportData)
			let individuals = this.getIndividuals(exportData)
			let organizations = this.getOrganizations(exportData)
			importData.industryTypes = await this.insertIndustryTypes(industryTypes)
			importData.individuals = await this.insertIndividuals(individuals)
			importData.organizations = await this.insertOrganizations(organizations)
			const stageData = await this.orm.stage.export(this.options).execute()
			
			await helper.fs.write(`${this.orm.workspace}/confidential_data/industryTypes.json`, JSON.stringify(industryTypes))
			await helper.fs.write(`${this.orm.workspace}/confidential_data/individuals.json`, JSON.stringify(individuals))
			await helper.fs.write(`${this.orm.workspace}/confidential_data/organizations.json`, JSON.stringify(organizations))
			await helper.fs.write(`${this.orm.workspace}/confidential_data/data.json`, JSON.stringify(importData))
			await helper.fs.write(`${this.orm.workspace}/confidential_data/export.json`, JSON.stringify(stageData))
						
		} catch (error: any) {
			console.error(error)
		} finally {
			await this.orm.end()
			return importData
		}
	}
  private getIndustryTypes(exportData:ExportData) : c.PmIndustryType[] {
		const pmMapping = exportData.pmMapping
		const industryTypes:c.PmIndustryType[] = []
		for(const sIndustryType of Object.values(pmMapping.industryTypes) as PmIndustryType[]) {	
			const tIndustryType = new c.PmIndustryType()
			tIndustryType.code = sIndustryType.code
			tIndustryType.name = sIndustryType.name
			industryTypes.push(tIndustryType)
		}
		return industryTypes
	}
	private getIndividuals(exportData:ExportData) : c.PmIndividual[] {
		const individuals:c.PmIndividual[] = []
		const pmMapping = exportData.pmMapping
		for(const sIndividual of exportData.individuals) {			
			const tIndividual = new c.PmIndividual()			 
			tIndividual.birthDate = sIndividual.birthDate? new Date(sIndividual.birthDate): undefined
			tIndividual.deathDate = sIndividual.deathDate? new Date(sIndividual.deathDate): undefined
			tIndividual.gender =  sIndividual.genderId ? pmMapping.genders[sIndividual.genderId].code: undefined
			tIndividual.nationalityCode = sIndividual.nationalityRefId ? pmMapping.nationalReferences[sIndividual.nationalityRefId].refId : undefined
			if(sIndividual.currentName) {
				tIndividual.familyNames = sIndividual.currentName.familyNames
				tIndividual.givenNames = sIndividual.currentName.givenNames
				tIndividual.legalName = sIndividual.currentName.legalName
				tIndividual.middleNames = sIndividual.currentName.middleNames
			}			
			if(sIndividual.party) { 
				tIndividual.party = this.getParty(sIndividual.party, pmMapping,c.PartyType.Individual)
			}
			individuals.push(tIndividual)
		}
		return individuals
	}
	private getOrganizations(exportData:ExportData) : c.PmOrganization[] {
		const organizations:c.PmOrganization[] = []
		const pmMapping = exportData.pmMapping
		for(const sOrganization of exportData.organizations) {			
			const tOrganization= new c.PmOrganization()
			tOrganization.commercialDescription = sOrganization.commercialDescription
			tOrganization.legalPeriodFrom = sOrganization.legalPeriodFrom? new Date(sOrganization.legalPeriodFrom): undefined
			tOrganization.industryTypeCode = sOrganization.industyTypeId ? pmMapping.industryTypes[sOrganization.industyTypeId].code : undefined
			if(sOrganization.currentName) {
				tOrganization.tradingName = sOrganization.currentName.tradingName
			}			
			if(sOrganization.party) { 
				tOrganization.party = this.getParty(sOrganization.party, pmMapping,c.PartyType.Organization)
			}
			organizations.push(tOrganization)
		}
		return organizations
	}
	private getParty(sParty:PmParty,pmMapping:PmMapping,type: c.PartyType):c.PmParty {
		const tParty = new c.PmParty()
		tParty.type = type 	
		tParty.status =  sParty.statusId ? pmMapping.partyStatuses[sParty.statusId].code : undefined
			
		tParty.contactMediums = []
		if (sParty.contactMediums) {
			for(const sContactMedium of sParty.contactMediums) {
					const tContactMedium = new c.PmContactMedium()
					tContactMedium.isFavorite = sContactMedium.isFavorite
					tContactMedium.isMain = sContactMedium.isMain
					tContactMedium.type = sContactMedium.contactMediumTypeId ? pmMapping.contactMediumTypes[sContactMedium.contactMediumTypeId].code : undefined
					tContactMedium.source = sContactMedium.source
					tContactMedium.createdBy = sContactMedium.createdBy
					tParty.contactMediums.push(tContactMedium)
				}
		}
		tParty.identifications = []
		if (sParty.indentifications) {
			for(const sIdentification of sParty.indentifications) {
					if(sIdentification.identificationTypeId === undefined || pmMapping.identificationTypes[sIdentification.identificationTypeId].name === c.IdentificationType.NotAvailable) {
						continue
					}
					const tIdentification = new c.PmIdentification()
					tIdentification.type = pmMapping.identificationTypes[sIdentification.identificationTypeId].name
					tIdentification.value = sIdentification.indentificationValue
					tIdentification.source = sIdentification.source
					tParty.identifications.push(tIdentification)
			}
		}
		return tParty
	}	
	private async insertIndustryTypes(industryTypes:c.PmIndustryType[]): Promise<c.PmIndustryType[]> {
		return this.orm.execute('PmIndustryTypes.bulkInsert()',industryTypes,this.options)	
	}
	private async insertIndividuals(individuals:c.PmIndividual[]): Promise<c.PmIndividual[]> {
		return this.orm.execute('PmIndividuals.bulkInsert().include(p=>p.party.include(p=> [p.identifications,p.contactMediums]))',individuals,this.options)	
	}
	private async insertOrganizations(organizations:c.PmOrganization[]): Promise<c.PmOrganization[]> {
		return this.orm.execute('PmOrganizations.bulkInsert().include(p=>p.party.include(p=> [p.identifications,p.contactMediums]))',organizations,this.options)	
	}
}	
async function execute () {	
	try {
		const exporter =  new CollectionExporter(`${sourcePath}/workspace`, { stage: 'beesion' })
		const importer =  new CollectionImporter(`${sourcePath}/collections/workspace`, { stage: 'PostgreSQL', tryAllCan: true})
		await exporter.export()
		const exportData = await exporter.getExportData()
		const importData = await importer.import(exportData)
	} catch (error: any) {
		console.error(error)
	} 
}
execute()