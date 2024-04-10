import { ICache } from 'h3lp'
import { ISentenceCompleteBuilder, Sentence, SentenceSerializer, ViewConfigService } from 'lambdaorm-base'
import { OrmH3lp } from '../../../shared/application'

export class SentenceCompleteBuilderCacheDecorator implements ISentenceCompleteBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder: ISentenceCompleteBuilder,
	private readonly cache: ICache<string, string>,
	private readonly serializer:SentenceSerializer,
	private readonly helper:OrmH3lp) {}

	public build (expression: string, view: ViewConfigService, stage:string): Sentence {
		const expressionKey = this.helper.utils.hashCode(expression)
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
