import { Entity } from '../../../../schema/domain'
import { Query, QueryOptions } from '../../../../query/domain'
import { ModelConfigService } from '../../../../schema/application'
import { QueryService } from '../../../../expressions/application'
import { StageMappingService } from '../../services/stateService'
import { SentenceService } from '../../../../sentence/application'
export abstract class StageActionDML {
	protected stateService: StageMappingService
	protected model: ModelConfigService
	protected queryService: QueryService
	protected options: QueryOptions
	protected sentenceService: SentenceService
	protected arrowVariables = ['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o']
	constructor (stateService: StageMappingService, model: ModelConfigService, queryService: QueryService, sentenceService: SentenceService, options: QueryOptions) {
		this.stateService = stateService
		this.model = model
		this.queryService = queryService
		this.options = options
		this.sentenceService = sentenceService
	}

	public async sentence (): Promise<any> {
		const sentences: any[] = []
		const queries = this.queries()
		for (const query of queries) {
			sentences.push(query.sentence)
		}
		return sentences
	}

	public queries (): Query[] {
		const queries: Query[] = []
		for (const i in this.model.entities) {
			const entity = this.model.entities[i]
			if (!this.model.isChild(entity.name)) {
				const query = this.createQuery(entity)
				queries.push(query)
			}
		}
		return queries
	}

	protected abstract createQuery(entity: Entity): Query

	protected createInclude (entity: Entity, level = 0): string {
		const arrowVariable = this.arrowVariables[level]
		const includes: string[] = []
		for (const i in entity.relations) {
			const relation = entity.relations[i]
			if (relation.composite) {
				const childEntity = this.model.getEntity(relation.entity)
				if (childEntity !== undefined) {
					const childInclude = this.createInclude(childEntity, level + 1)
					includes.push(`${arrowVariable}.${relation.name}${childInclude}`)
				}
			}
		}
		return includes.length === 0
			? ''
			: `.include(${arrowVariable}=>[${includes.join(',')}])`
	}

	protected getAllEntities (queries: Query[]): string[] {
		const entities: string[] = []
		for (const p in queries) {
			const query = queries[p]
			entities.push(query.entity)
			if (query.includes && query.includes.length > 0) {
				const include = query.includes.map(q => q.query)
				const childrenEntities = this.getAllEntities(include)
				for (const i in childrenEntities) {
					entities.push(childrenEntities[i])
				}
			}
		}
		return entities
	}
}
