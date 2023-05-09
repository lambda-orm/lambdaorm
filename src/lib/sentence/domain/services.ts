import { ViewConfigService } from '../../schema/application'
import { Sentence } from './sentence'

export interface ISentenceBuilder {
	build(expression: string): Sentence
}

export interface ISentenceCompleteBuilder {
	build (expression: string, view: ViewConfigService, stage:string): Sentence
}
