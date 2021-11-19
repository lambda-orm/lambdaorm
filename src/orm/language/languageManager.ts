
import { Node, ExpressionConfig } from './../parser/index'
import { Data, Query, Include } from './../model'
import { ConfigManager } from './../manager'
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
	private config: ConfigManager
	public expressionConfig:ExpressionConfig
	public metadata:OperandMetadata
	private languages:any
	private operandManager: OperandManager

	constructor (config: ConfigManager, expressionConfig: ExpressionConfig) {
		this.config = config
		this.expressionConfig = expressionConfig
		this.metadata = new OperandMetadata()
		this.operandManager = new OperandManager(config, this)

		this.languages = {}
		this.dialects = {}
	}

	public addLibrary (library:Library):void {
		this.metadata.addLibrary(library)
	}

	public add (language:Language) {
		this.languages[language.name] = language
		for (const name in language.dialects) { this.dialects[name] = { name: name, language: language.name } }
	}

	public get (dialect:string):Language {
		const info = this.dialects[dialect]
		return this.languages[info.language] as Language
	}

	public dialectMetadata (dialect:string):DialectMetadata {
		return this.get(dialect).metadata(dialect)
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

	public dmlBuilder (dialect: string): LanguageDMLBuilder {
		return this.get(dialect).dml
	}

	public ddlBuilder (dialect: string): LanguageDDLBuilder {
		return this.get(dialect).ddl
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
