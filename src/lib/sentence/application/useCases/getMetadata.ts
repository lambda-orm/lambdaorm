
import { Type } from 'typ3s'
import { ISentenceBuilder, Metadata, Sentence } from '../../domain'

export class GetMetadata {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly sentenceBuilder:ISentenceBuilder) {}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string): Metadata {
		const sentence = this.sentenceBuilder.build(expression)
		return this.metadataFromSentence(sentence)
	}

	private metadataFromSentence (sentence: Sentence): Metadata {
		const children: Metadata[] = []
		for (const sentenceInclude of sentence.getIncludes()) {
			const child = this.metadataFromSentence(sentenceInclude.children[0] as Sentence)
			children.push(child)
		}
		return {
			classtype: sentence.constructor.name,
			pos: sentence.pos,
			name: sentence.name,
			children,
			type: Type.stringify(sentence.returnType),
			entity: sentence.entity,
			columns: sentence.columns,
			// property: sentence.p
			parameters: sentence.parameters,
			constraints: sentence.constraints,
			values: sentence.values,
			defaults: sentence.defaults,
			// relation: sentence.rel,
			clause: sentence.action,
			alias: sentence.alias,
			// isRoot: sentence.
			number: sentence.number
		}
	}
}
