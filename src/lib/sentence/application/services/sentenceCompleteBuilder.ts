import { Expressions } from '3xpr'
import { ISentenceBuilder, ISentenceCompleteBuilder, Sentence, SchemaState, ViewConfigService } from 'lambdaorm-base'
import { SentenceCompleter } from './sentenceCompleter'
import { SentenceHelper } from './sentenceHelper'

export class SentenceCompleteBuilder implements ISentenceCompleteBuilder {
	private completer: SentenceCompleter
	constructor (
		private readonly sentenceBuilder:ISentenceBuilder,
		private readonly schemaState: SchemaState,
		private readonly sentenceHelper: SentenceHelper,
		private readonly expressions: Expressions
	) {
		this.completer = new SentenceCompleter(this.expressions)
	}

	public build (expression: string, view: ViewConfigService, stage:string): Sentence {
		const sentence = this.sentenceBuilder.build(expression)
		this.completeSentence(sentence, view, stage)
		return sentence
	}

	private completeSentence (sentence: Sentence, view: ViewConfigService, stage: string): void {
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			this.completeSentence(sentenceInclude.children[0] as Sentence, view, stage)
		}
		const source = this.sentenceHelper.getSource(sentence, stage)
		const mapping = this.schemaState.mapping.getInstance(source.mapping)
		this.completer.complete(mapping, view, sentence)
	}
}
