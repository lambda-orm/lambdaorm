
import { Node, Operand, Expressions } from 'js-expressions'
import { Data, Query, Include, DataSource } from '../model'
import { SchemaManager } from '../manager'
import { Language } from './language'
import { OperandManager } from '../manager/operandManager'
import { Sentence } from '../model/operands'
import { DialectMetadata } from './dialectMetadata'
import { LanguageDMLBuilder } from '../manager/dmlBuilder'
import { LanguageDDLBuilder } from '../manager/ddlBuilder'

export class LanguageManager {
	public dialects: any
	private schema: SchemaManager
	private expressions:Expressions
	private languages:any
	private operandManager: OperandManager

	constructor (schema: SchemaManager, expressions:Expressions) {
		this.schema = schema
		this.expressions = expressions
		this.operandManager = new OperandManager(schema.model, this.expressions.config, this.expressions)
		this.languages = {}
		this.dialects = {}
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

	public constraints (sentence:Sentence):any {
		return this.operandManager.constraints(sentence)
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
