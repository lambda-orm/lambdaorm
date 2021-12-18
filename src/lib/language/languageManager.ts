
import { Node, ExpressionConfig } from '../parser/index'
import { Data, Query, Include, DataSource } from '../model'
import { SchemaConfig } from '../manager'
import { Language } from './language'
import { OperandManager } from './operandManager'
import { Operand, Sentence } from './operands'
import { OperandMetadata } from './operandMetadata'
import { Library } from './library'
import { DialectMetadata } from './dialectMetadata'
import { LanguageDMLBuilder } from '../manager/dmlBuilder'
import { LanguageDDLBuilder } from '../manager/ddlBuilder'

export class LanguageManager {
	public dialects: any
	private schema: SchemaConfig
	public expressionConfig:ExpressionConfig
	public metadata:OperandMetadata
	private languages:any
	private operandManager: OperandManager

	constructor (schema: SchemaConfig) {
		this.schema = schema
		this.expressionConfig = new ExpressionConfig()
		this.metadata = new OperandMetadata()
		this.operandManager = new OperandManager(schema, this)
		this.languages = {}
		this.dialects = {}
	}

	public addLibrary (library:Library):void {
		this.metadata.addLibrary(library)
	}

	public addLanguage (name:string, language:Language) {
		this.languages[name] = language
		for (const dialectName in language.dialects) {
			this.dialects[dialectName] = { name: dialectName, language: name }
		}
	}

	public get (dialect:string):Language {
		const info = this.dialects[dialect]
		return this.languages[info.language] as Language
	}

	public build (node:Node): Operand {
		return this.operandManager.build(node)
	}

	public model (sentence:Sentence):any {
		return this.operandManager.model(sentence)
	}

	public parameters (sentence:Sentence):any {
		return this.operandManager.parameters(sentence)
	}

	public dialectMetadata (dialect: string): DialectMetadata {
		return this.get(dialect).dialectMetadata(dialect)
	}

	public dmlBuilder (dataSource: DataSource): LanguageDMLBuilder {
		// TODO: agregar un cache de DMLBuilder por dataSource
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		return this.get(dataSource.dialect).dmlBuilder(dataSource.name, dataSource.dialect, mapping)
	}

	public ddlBuilder (dataSource: DataSource): LanguageDDLBuilder {
		// TODO: agregar un cache de DMLBuilder por dataSource
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		return this.get(dataSource.dialect).ddlBuilder(dataSource.name, dataSource.dialect, mapping)
	}

	public sentence (query:Query):any {
		let mainSentence = query.sentence + ''
		for (const p in query.children) {
			const include = query.children[p] as Include
			const includeSentence = this.sentence(include.children[0] as Query)
			mainSentence = mainSentence + '\n' + includeSentence
		}
		return mainSentence
	}

	public serialize (operand:Operand):any {
		return this.operandManager.serialize(operand)
	}

	public deserialize (serialized:any) {
		return this.operandManager.deserialize(serialized)
	}

	public eval (operand:Operand, data:Data):any {
		return this.operandManager.eval(operand, data)
	}
}
