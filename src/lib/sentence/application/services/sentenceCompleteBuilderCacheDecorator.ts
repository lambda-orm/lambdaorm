
import { ICache, Autowired, IUtils } from 'h3lp'
import { ISentenceCompleteBuilder, Sentence, SentenceSerializer } from '../../domain'
import { ViewConfigService } from 'lib/schema/application'

export class SentenceCompleteBuilderCacheDecorator implements ISentenceCompleteBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder: ISentenceCompleteBuilder,
	private readonly cache: ICache<string, string>,
	private readonly serializer:SentenceSerializer) {}

	@Autowired('h3lp.utils')
	public utils!: IUtils

	public build (expression: string, view: ViewConfigService, stage:string): Sentence {
		const expressionKey = this.utils.hashCode(expression)
		const key = `${expressionKey}-${stage}-${view.name}`
		const value = this.cache.get(key)
		if (value) {
			return this.serializer.deserialize(value)
		}
		const sentence = this.builder.build(expression, view, stage)
		this.cache.set(key, this.serializer.serialize(sentence))
		return sentence
	}
}
