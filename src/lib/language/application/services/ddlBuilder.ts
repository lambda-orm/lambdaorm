
import {
	ObservableAction, Mapping, DataSourceRule, Index, Source, Relation,
	EntityMapping, PropertyMapping, SchemaError
} from '../../../schema/domain'
import { Query } from '../../../query/domain'
import { Delta, ChangedValue } from 'h3lp'
import { DDLBuilderPort } from '../ports/ddlBuilderPort'
import { helper } from '../../../shared/application'
import { ModelConfigService, SchemaFacade } from '../../../schema/application'
import { LanguagesService } from './languagesService'
import { DialectService } from './dialectService'

export class DDLBuilderService {
	private model: ModelConfigService
	constructor (private readonly schemaFacade: SchemaFacade,
	private readonly languages: LanguagesService,
	public readonly stage: string
	) {
		this.model = schemaFacade.model
	}

	public drop (mappings: Mapping[]): Query[] {
		const queries: Query[] = []
		const stage = this.schemaFacade.stage.get(this.stage)
		for (const ruleDataSource of stage.sources) {
			const source = this.schemaFacade.source.get(ruleDataSource.name)
			const mapping = mappings.find(p => p.name === source.mapping)
			if (mapping !== undefined) {
				this._drop(source, ruleDataSource, mapping.entities, queries)
			}
		}
		return queries
	}

	public truncate (mappings: Mapping[]): Query[] {
		const queries: Query[] = []
		const stage = this.schemaFacade.stage.get(this.stage)
		for (const ruleDataSource of stage.sources) {
			const source = this.schemaFacade.source.get(ruleDataSource.name)
			const mapping = mappings.find(p => p.name === source.mapping)
			if (mapping !== undefined) {
				this._truncate(source, ruleDataSource, mapping.entities, queries)
			}
		}
		return queries
	}

	public sync (mappings: Mapping[]): Query[] {
		const queries: Query[] = []
		const stage = this.schemaFacade.stage.get(this.stage)
		for (const ruleDataSource of stage.sources) {
			const source = this.schemaFacade.source.get(ruleDataSource.name)
			const oldMapping = mappings.find(p => p.name === source.mapping)
			const oldEntities = oldMapping !== undefined && oldMapping.entities !== undefined ? oldMapping.entities : null
			const currentMapping = this.schemaFacade.mapping.mappings.find(p => p.name === source.mapping)
			const currentEntities = currentMapping !== undefined && currentMapping.entities !== undefined ? currentMapping.entities : null
			const delta = helper.obj.delta(currentEntities, oldEntities)
			// remove for entities changes
			this._syncRemoveForEntitiesChanges(source, ruleDataSource, oldEntities || [], delta, queries)
			// remove for entities removed
			this._syncRemoveForRemovedEntities(source, ruleDataSource, delta, queries)
			// create entities
			this._syncCreateEntities(source, ruleDataSource, delta, queries)
			// create for entities changes
			this._syncCreateForEntitiesChanges(source, ruleDataSource, delta, queries)
			// create for new entities
			this._syncCreateForNewEntities(source, ruleDataSource, currentEntities || [], delta, queries)
		}
		return queries
	}

	private _drop (source: Source, ruleDataSource: DataSourceRule, entitiesMapping: EntityMapping[], queries: Query[]): void {
		const dialect = this.languages.getDialect(source.dialect)
		const entities = entitiesMapping.map(p => p.name)
		const sortedEntities = this.model.sortByDependencies(entities)
		// drop all constraint
		for (const entityName of sortedEntities) {
			// evaluate if entity apply in source
			if (this.evalDataSource(ruleDataSource, entityName)) {
				const entity = entitiesMapping.find(q => q.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for drop constraint action`)
				}
				this._dropRelations(source, ruleDataSource, entity, entitiesMapping, dialect, queries)
			}
		}
		// drop indexes and tables
		for (const entityName of sortedEntities) {
			// evaluate if entity apply in source
			if (this.evalDataSource(ruleDataSource, entityName)) {
				// const entity = this.model.getEntity(entityName) as Entity
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for drop indexes action`)
				}
				this._dropEntity(source, entity, dialect, queries)
			}
		}
	}

	private _dropRelations (source: Source, ruleDataSource: DataSourceRule, entity:EntityMapping, entitiesMapping: EntityMapping[], dialect:DialectService, queries: Query[]) {
		if (entity.relations && !entity.view && (!entity.composite || !dialect.solveComposite)) {
			for (const relation of entity.relations) {
				const relationEntity = entitiesMapping.find(r => r.name === relation.entity)
				// evaluate if entity relation is not view and apply in source
				if (relationEntity && !relationEntity.view && (!relationEntity.composite || !dialect.solveComposite) && this.evalDataSource(ruleDataSource, relation.entity)) {
					this._dropRelation(source, entity, relation, queries)
				}
			}
		}
	}

	private _dropRelation (source: Source, entity:EntityMapping, relation:Relation, queries: Query[]) {
		if (!relation.weak) {
			// look for the related property to see if the relation is not required
			const fromProperty = entity.properties.find(r => r.name === relation.from)
			if (fromProperty === undefined) {
				throw new SchemaError(`property ${relation.from} not found in ${entity.name} `)
			}
			const isNullable = !fromProperty.required
			if (isNullable) {
				this.addQuery(queries, this.builder(source).setNull(entity, relation))
			}
			this.addQuery(queries, this.builder(source).dropFk(entity, relation))
		}
	}

	private _dropEntity (source: Source, entity:EntityMapping, dialect:DialectService, queries: Query[]) {
		if (!entity.view && (!entity.composite || !dialect.solveComposite)) {
			this._dropIndexes(source, entity, queries)
			if (entity.sequence) {
				this.addQuery(queries, this.builder(source).dropSequence(entity))
			}
			this.addQuery(queries, this.builder(source).dropEntity(entity))
		}
	}

	private _dropIndexes (source: Source, entity:EntityMapping, queries: Query[]) {
		if (entity.indexes) {
			for (const index of entity.indexes) {
				this.addQuery(queries, this.builder(source).dropIndex(entity, index))
			}
		}
	}

	private _truncate (source: Source, ruleDataSource: DataSourceRule, entitiesMapping: EntityMapping[], queries: Query[]): void {
		const dialect = this.languages.getDialect(source.dialect)
		const entities = entitiesMapping.map(p => p.name)
		const sortedEntities = this.model.sortByDependencies(entities)
		for (const entityName of sortedEntities) {
			// evaluate if entity apply in source
			if (this.evalDataSource(ruleDataSource, entityName)) {
				// const entity = this.model.getEntity(entityName) as Entity
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for truncate action`)
				}
				if (!entity.view && (!entity.composite || !dialect.solveComposite)) {
					this.addQuery(queries, this.builder(source).truncateEntity(entity))
				}
			}
		}
	}

	private _syncRemoveForEntitiesChanges (source: Source, ruleDataSource: DataSourceRule, oldMapping: EntityMapping[], delta: Delta, queries: Query[]): void {
		for (const entityChanged of delta.changed) {
			// if entity is view is excluded
			// evaluate if entity apply in source
			if (!entityChanged.delta || (entityChanged.old as EntityMapping).view || (!this.evalDataSource(ruleDataSource, entityChanged.name))) continue
			for (const changed of entityChanged.delta.changed) {
				if (!changed.delta) continue
				switch (changed.name) {
				case 'primaryKey':
					this._syncRemovePrimaryKey(source, entityChanged, changed.delta, queries)
					break
				case 'uniqueKey':
					this._syncRemoveUniqueKey(source, entityChanged, changed.delta, queries)
					break
				case 'index':
					this._syncRemoveIndexForChanges(source, entityChanged, changed.delta, queries)
					break
				case 'relation':
					this._syncRemoveFkForChanges(source, ruleDataSource, oldMapping, entityChanged, changed.delta, queries)
					break
				}
			}
		}
	}

	private _syncRemovePrimaryKey (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		if (delta.remove && delta.remove.length > 0) {
			this.addQuery(queries, this.builder(source).dropPk(entityChanged.old))
		}
		if (delta.changed && delta.changed.length > 0) {
			this.addQuery(queries, this.builder(source).dropPk(entityChanged.old))
		}
	}

	private _syncRemoveUniqueKey (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		if (delta.remove && delta.remove.length > 0) {
			this.addQuery(queries, this.builder(source).dropUk(entityChanged.old))
		}
		if (delta.changed && delta.changed.length > 0) {
			this.addQuery(queries, this.builder(source).dropUk(entityChanged.old))
		}
	}

	private _syncRemoveIndexForChanges (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const oldIndex of delta.changed) {
			this.addQuery(queries, this.builder(source).dropIndex(entityChanged.new, oldIndex.old as Index))
		}
		for (const removeIndex of delta.remove) {
			this.addQuery(queries, this.builder(source).dropIndex(entityChanged.new, removeIndex.old as Index))
		}
	}

	private _syncRemoveFkForChanges (source: Source, ruleDataSource: DataSourceRule, oldMapping: EntityMapping[], entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const changedItem of delta.changed) {
			const newRelation = changedItem.new as Relation
			const oldRelation = changedItem.old as Relation
			const oldRelationEntity = oldMapping.find(r => r.name === oldRelation.entity)
			// evaluate if entity relation apply in source
			if ((oldRelationEntity && !oldRelationEntity.view) && this.evalDataSource(ruleDataSource, newRelation.entity) && this.changeRelation(oldRelation, newRelation) && !oldRelation.weak) {
				this.addQuery(queries, this.builder(source).dropFk(entityChanged.new, oldRelation))
			}
		}
		for (const removeItem of delta.remove) {
			const removeRelation = removeItem.old as Relation
			const oldRelationEntity = oldMapping.find(s => s.name === removeRelation.entity)
			// evaluate if entity relation apply in source
			if ((oldRelationEntity && !oldRelationEntity.view) && this.evalDataSource(ruleDataSource, removeRelation.entity)) {
				this.addQuery(queries, this.builder(source).dropFk(entityChanged.new, removeRelation))
			}
		}
	}

	private _syncRemoveForRemovedEntities (source: Source, ruleDataSource: DataSourceRule, delta: Delta, queries: Query[]): void {
		for (const removeItem of delta.remove) {
			const removeEntity = removeItem.old as EntityMapping
			// if entity is view is excluded
			if (removeEntity.view) continue
			// evaluate if entity apply in source
			if (this.evalDataSource(ruleDataSource, removeEntity.name)) {
				if (removeEntity.indexes) {
					for (const index of removeEntity.indexes) {
						this.addQuery(queries, this.builder(source).dropIndex(removeEntity, index))
					}
				}
				if (removeEntity.sequence) {
					this.addQuery(queries, this.builder(source).createSequence(removeEntity))
				}
				this.addQuery(queries, this.builder(source).dropEntity(removeEntity))
			}
		}
	}

	private _syncCreateEntities (source: Source, ruleDataSource: DataSourceRule, delta: Delta, queries: Query[]): void {
		const dialect = this.languages.getDialect(source.dialect)
		for (const newItem of delta.new) {
			const newEntity = newItem.new as EntityMapping
			// evaluate if entity apply in source
			if (!newEntity.view && (!newEntity.composite || !dialect.solveComposite) && this.evalDataSource(ruleDataSource, newEntity.name)) {
				if (newEntity.sequence) {
					this.addQuery(queries, this.builder(source).createSequence(newEntity))
				}
				this.addQuery(queries, this.builder(source).createEntity(newEntity))
				if (newEntity.uniqueKey && newEntity.uniqueKey.length > 0) {
					this.addQuery(queries, this.builder(source).addUk(newEntity, newEntity.uniqueKey))
				}
			}
		}
	}

	private _syncCreateForEntitiesChanges (source: Source, ruleDataSource: DataSourceRule, delta: Delta, queries: Query[]): void {
		for (const entityChanged of delta.changed) {
			// if entity is view is excluded
			// evaluate if entity apply in source
			if (!entityChanged.delta || (entityChanged.new as EntityMapping).view || (!this.evalDataSource(ruleDataSource, entityChanged.name))) continue
			for (const changed of entityChanged.delta.changed) {
				if (!changed.delta) continue
				switch (changed.name) {
				case 'property':
					this._syncAddPropertyForEntitiesChanges(source, entityChanged, changed.delta, queries)
					this._syncRemovePropertyForEntityChanges(source, entityChanged, changed.delta, queries)
					break
				case 'primaryKey':
					this._syncCreatePkForChangesInEntity(source, entityChanged, changed.delta, queries)
					break
				case 'uniqueKey':
					this._syncCreateUkForChangesInEntity(source, entityChanged, changed.delta, queries)
					break
				case 'index':
					this._syncCreateIndexesForChangesInEntity(source, entityChanged, changed.delta, queries)
					break
				case 'relation':
					this._syncCreateFksForChangesInEntity(source, ruleDataSource, entityChanged, changed.delta, queries)
					break
				case 'sequence':
					this._syncCreateSequencesForChangesInEntity(source, entityChanged, queries)
					break
				}
			}
		}
		// TODO:
		// Solve rename column: se debe resolver en cascada los indexes, Fks, Uk and Pk que esta haciendo referencia la columns
		// Solve rename table: se debe resolver en cascada los indexes, Fks, Uk and Pk que esta haciendo referencia la columns
		// en ambos casos se debe resolver que se hará con los datos para que estos no se pierdan
	}

	private _syncAddPropertyForEntitiesChanges (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const n in delta.new) {
			const newProperty = delta.new[n].new as PropertyMapping
			this.addQuery(queries, this.builder(source).addProperty(entityChanged.new, newProperty))
		}
		for (const changedItem of delta.changed) {
			const newProperty = changedItem.new as PropertyMapping
			const oldProperty = changedItem.old as PropertyMapping
			if (newProperty.mapping === oldProperty.mapping && !newProperty.view) {
				this.addQuery(queries, this.builder(source).alterProperty(entityChanged.new, newProperty))
			}
		}
	}

	private _syncRemovePropertyForEntityChanges (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const removeItem of delta.remove) {
			const oldProperty = removeItem.old as PropertyMapping
			if (!oldProperty.view) {
				this.addQuery(queries, this.builder(source).dropProperty(entityChanged.old, oldProperty))
			}
		}
	}

	private _syncCreatePkForChangesInEntity (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const newItem of delta.new) {
			const newPrimaryKey = newItem.new as string[]
			this.addQuery(queries, this.builder(source).addPk(entityChanged.new, newPrimaryKey))
		}
		for (const changedItem of delta.changed) {
			const changePrimaryKey = changedItem.new as string[]
			this.addQuery(queries, this.builder(source).addPk(entityChanged.new, changePrimaryKey))
		}
	}

	private _syncCreateUkForChangesInEntity (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const newItem of delta.new) {
			const newUniqueKey = newItem.new as string[]
			this.addQuery(queries, this.builder(source).addUk(entityChanged.new, newUniqueKey))
		}
		for (const changedItem of delta.changed) {
			const changeUniqueKey = changedItem.new as string[]
			this.addQuery(queries, this.builder(source).addUk(entityChanged.new, changeUniqueKey))
		}
	}

	private _syncCreateIndexesForChangesInEntity (source: Source, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const newItem of delta.new) {
			const newIndex = newItem.new as Index
			this.addQuery(queries, this.builder(source).createIndex(entityChanged.new, newIndex))
		}
		for (const changedItem of delta.changed) {
			const changeIndex = changedItem.new as Index
			this.addQuery(queries, this.builder(source).createIndex(entityChanged.new, changeIndex))
		}
	}

	private _syncCreateFksForChangesInEntity (source: Source, ruleDataSource: DataSourceRule, entityChanged:ChangedValue, delta: Delta, queries: Query[]): void {
		for (const newItem of delta.new) {
			const newRelation = newItem.new as Relation
			// evaluate if entity relation apply in source
			if (this.evalDataSource(ruleDataSource, newRelation.entity) && !newRelation.weak) {
				this.addQuery(queries, this.builder(source).addFk(entityChanged.new, newRelation))
			}
		}
		for (const changedItem of delta.changed) {
			const newRelation = changedItem.new as Relation
			const oldRelation = changedItem.old as Relation
			// evaluate if entity relation apply in source
			if (this.evalDataSource(ruleDataSource, newRelation.entity) && this.changeRelation(oldRelation, newRelation) && (!newRelation.weak)) {
				this.addQuery(queries, this.builder(source).addFk(entityChanged.new, newRelation))
			}
		}
	}

	private _syncCreateSequencesForChangesInEntity (source: Source, entityChanged:ChangedValue, queries: Query[]): void {
		this.addQuery(queries, this.builder(source).createSequence(entityChanged.new))
	}

	private _syncCreateForNewEntities (source: Source, ruleDataSource: DataSourceRule, newMapping: EntityMapping[], delta: Delta, queries: Query[]): void {
		for (const newItem of delta.new) {
			const newEntity = newItem.new as EntityMapping
			// if entity is view is excluded
			// evaluate if entity apply in source
			if (newEntity.view || (!this.evalDataSource(ruleDataSource, newEntity.name))) continue
			this._syncCreateIndexesForNewEntity(source, newEntity, queries)
			this._syncCreateFksForNewEntity(source, ruleDataSource, newMapping, newEntity, queries)
		}
	}

	private _syncCreateFksForNewEntity (source: Source, ruleDataSource: DataSourceRule, newMapping: EntityMapping[], newEntity: EntityMapping, queries: Query[]): void {
		if (newEntity.relations) {
			for (const relation of newEntity.relations) {
				const relationEntity = newMapping.find(q => q.name === relation.entity)
				// evaluate if entity relation apply in source
				if ((relationEntity && relationEntity.view) || (!this.evalDataSource(ruleDataSource, relation.entity)) || relation.weak) continue
				this.addQuery(queries, this.builder(source).addFk(newEntity, relation))
			}
		}
	}

	private _syncCreateIndexesForNewEntity (source: Source, newEntity: EntityMapping, queries: Query[]): void {
		if (newEntity.indexes) {
			for (const index of newEntity.indexes) {
				this.addQuery(queries, this.builder(source).createIndex(newEntity, index))
			}
		}
	}

	private evalDataSource (source: DataSourceRule, entity: string): boolean {
		return this.schemaFacade.evalDataSourceRule(source, { entity, action: ObservableAction.ddl })
	}

	private builder (source: Source): DDLBuilderPort {
		const language = this.languages.getByDialect(source.dialect)
		const mapping = this.schemaFacade.mapping.getInstance(source.mapping)
		return language.ddlBuilder(source, mapping)
	}

	private addQuery (queries: Query[], query:Query|undefined) {
		if (query) queries.push(query)
	}

	private changeRelation (a: Relation, b: Relation): boolean {
		return a.entity !== b.entity || a.from !== b.from || a.name !== b.name || a.to !== b.to || a.type !== b.type
	}
}
