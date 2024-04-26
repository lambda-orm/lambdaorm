import { NotImplemented, Source, MappingConfigService } from 'lambdaorm-base'
import { DialectService, Language, DDLBuilder, DMLBuilder } from '../../application'

export abstract class LanguageBase implements Language {
	public dialects: DialectService[]
	public name: string
	public solveComposite?: boolean

	constructor (name: string, dialects: any) {
		this.name = name

		this.dialects = []
		for (const p in dialects) {
			const data = dialects[p]
			const dialect = new DialectService(p, data)
			this.dialects.push(dialect)
		}
	}

	public getDialect (name: string): DialectService {
		const dialect = this.dialects.find(p => p.name === name)
		if (!dialect) {
			throw new NotImplemented(`Dialect ${name} not implemented`)
		}
		return dialect
	}

	public abstract ddlBuilder(source: Source, mapping: MappingConfigService): DDLBuilder
	public abstract dmlBuilder(source: Source, mapping: MappingConfigService): DMLBuilder
}
