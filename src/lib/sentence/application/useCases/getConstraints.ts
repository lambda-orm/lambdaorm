
import { ISentenceBuilder, MetadataConstraint, Sentence } from '../../domain'

export class GetConstraints {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly sentenceBuilder:ISentenceBuilder) {}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string): MetadataConstraint {
		const sentence = this.sentenceBuilder.build(expression)
		return this.constraintsFromSentence(sentence)
	}

	private constraintsFromSentence (sentence: Sentence): MetadataConstraint {
		const result: MetadataConstraint = { entity: sentence.entity, constraints: sentence.constraints }
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const child = this.constraintsFromSentence(include.children[0] as Sentence)
			if (!result.children) {
				result.children = []
			}
			result.children.push(child)
		}
		return result
	}
}
