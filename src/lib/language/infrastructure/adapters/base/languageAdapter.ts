import { NotImplemented } from '../../../../shared/domain'
import { Source } from '../../../../schema/domain'
import { MappingConfigService } from '../../../../schema/application'
import { DialectService, LanguagePort, DDLBuilderPort, DMLBuilderPort } from '../../../application'

export abstract class LanguageAdapter implements LanguagePort {
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

	public abstract ddlBuilder(source: Source, mapping: MappingConfigService): DDLBuilderPort
	public abstract dmlBuilder(source: Source, mapping: MappingConfigService): DMLBuilderPort
	// public abstract dmlBuild(source: Source, mapping: MappingConfigService, sentence: Sentence): Query
}
