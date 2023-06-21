import { Primitive } from 'typ3s'
import { ISentenceBuilder, MetadataParameter, Sentence } from '../../domain'

export class GetParameters {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly sentenceBuilder:ISentenceBuilder) {}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): MetadataParameter[] {
		const sentence = this.sentenceBuilder.build(expression)
		return this.parametersFromSentence(sentence)
	}

	private parametersFromSentence (sentence: Sentence): MetadataParameter[] {
		const parameters: MetadataParameter[] = []
		for (const parameter of sentence.parameters) {
			if (parameters.find(p => p.name === parameter.name) === undefined) {
				parameters.push({ name: parameter.name, type: parameter.type ? parameter.type : Primitive.any })
			}
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationParameter: MetadataParameter = {
				name: include.relation.name,
				type: include.relation.entity,
				children: []
			}
			const children = this.parametersFromSentence(include.children[0] as Sentence)
			for (const q in children) {
				const child = children[q]
				relationParameter.children?.push(child)
			}
			parameters.push(relationParameter)
		}
		return parameters
	}
}
