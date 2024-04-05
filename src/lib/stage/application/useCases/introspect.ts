import { DDLBuilderPort, LanguagesService } from '../../../language/application'
import { SchemaState, QueryOptions, Source, EntityMapping, Mapping, RelationType, SchemaHelper } from 'lambdaorm-base'
import { Executor } from '../../../execution/domain'

export class StageIntrospect {
// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly executor: Executor,
		private readonly schemaState: SchemaState,
		private readonly languages: LanguagesService,
		private readonly helper: SchemaHelper,
		private readonly options:QueryOptions
	) {}

	public async execute (): Promise<Mapping[]> {
		const stageName = this.options.stage as string
		const stage = this.schemaState.stage.get(stageName)
		const mappings:Mapping[] = []
		for (const ruleDataSource of stage.sources) {
			const source = this.schemaState.source.get(ruleDataSource.name)
			let mapping = mappings.find(p => this.helper.equalName(p.name, source.mapping))
			if (mapping === undefined) {
				mapping = { name: source.mapping, entities: [] }
				mappings.push(mapping)
			}
			if (mapping.entities === undefined) mapping.entities = []
			await this.introspectSource(source, mapping.entities)
		}
		return mappings
	}

	private async introspectSource (source: Source, entities:EntityMapping[]): Promise<void> {
		const rows = await this.sourceObjects(source)
		const tableNames = rows.filter((row: any) => row.type === 'table').map((row: any) => row.name)
		const viewNames = rows.filter((row: any) => row.type === 'view').map((row: any) => row.name)
		if (tableNames.length > 0) {
			await this.introspectEntities(source, tableNames, entities)
		}
		if (viewNames.length > 0) {
			await this.introspectViews(source, viewNames, entities)
		}
	}

	private async sourceObjects (source: Source): Promise<any[]> {
		const objectsQuery = this.builder(source).objects()
		return await this.executor.execute(objectsQuery, {}, this.options)
	}

	private async introspectEntities (source: Source, names:string[], entities:EntityMapping[]): Promise<void> {
		const query = this.builder(source).tables(names)
		const rows = await this.executor.execute(query, {}, this.options)
		this.completeEntities(source, rows, entities)
		const toRemove = entities.filter(e => !e.view && e.mapping !== undefined && !names.includes(e.mapping))
		for (const entity of toRemove) {
			const index = entities.indexOf(entity)
			entities.splice(index, 1)
		}
		await this.solvePrimaryKeys(source, names, entities)
		await this.solveUniqueKeys(source, names, entities)
		await this.solveIndexes(source, names, entities)
		await this.solveRelations(source, names, entities)
	}

	private async introspectViews (source: Source, names:string[], entities:EntityMapping[]): Promise<void> {
		const query = this.builder(source).views(names)
		const rows = await this.executor.execute(query, {}, this.options)
		this.completeEntities(source, rows, entities)
		const toRemove = entities.filter(e => e.view && e.mapping !== undefined && !names.includes(e.mapping))
		for (const entity of toRemove) {
			const index = entities.indexOf(entity)
			entities.splice(index, 1)
		}
	}

	private completeEntities (source: Source, rows:any[], entities: EntityMapping[]): void {
		const dialect = this.languages.getDialect(source.dialect)
		const columnsByTable: {[key: string]: string[]} = {}
		// create or update entities
		for (const row of rows) {
			if (columnsByTable[row.tableName] === undefined) {
				columnsByTable[row.tableName] = []
			}
			columnsByTable[row.tableName].push(row.columnName)
			let entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName))
			if (entity === undefined) {
				entity = { name: this.helper.entityName(row.tableName), mapping: row.tableName, properties: [] }
				entities.push(entity)
			}
			let property = entity.properties?.find(p => this.helper.equalName(p.mapping, row.columnName))
			const _type = dialect.type(row.dbType)
			const _length = row.length && row.length !== 80 ? row.length : undefined
			if (property === undefined) {
				property = {
					name: this.helper.propertyName(row.columnName),
					mapping: row.columnName,
					type: _type,
					required: row.required ? true : undefined,
					autoIncrement: row.autoIncrement ? true : undefined,
					length: _length
				}
				entity.properties?.push(property)
			} else {
				property.required = row.required ? true : undefined
				property.autoIncrement = row.autoIncrement ? true : undefined
				property.length = _length
				property.type = _type
			}
		}
	}

	private async solvePrimaryKeys (source: Source, names:string[], entities:EntityMapping[]) : Promise<void> {
		const query = this.builder(source).primaryKeys(names)
		const rows = await this.executor.execute(query, {}, this.options)
		for (const row of rows) {
			const entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName))
			if (entity) {
				const property = entity.properties?.find(p => this.helper.equalName(p.mapping, row.columnName))
				if (property) {
					if (entity.primaryKey === undefined) entity.primaryKey = []
					entity.primaryKey.push(this.helper.propertyName(row.columnName))
					property.primaryKey = true
				}
			}
		}
	}

	private async solveUniqueKeys (source: Source, names:string[], entities:EntityMapping[]): Promise<void> {
		const query = this.builder(source).uniqueKeys(names)
		const rows = await this.executor.execute(query, {}, this.options)
		for (const row of rows) {
			const entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName))
			if (entity) {
				const property = entity.properties?.find(p => this.helper.equalName(p.mapping, row.columnName))
				if (property) {
					if (entity.uniqueKey === undefined) entity.uniqueKey = []
					entity.uniqueKey.push(this.helper.propertyName(row.columnName))
				}
			}
		}
	}

	private async solveIndexes (source: Source, names:string[], entities:EntityMapping[]): Promise<void> {
		const query = this.builder(source).indexes(names)
		const rows = await this.executor.execute(query, {}, this.options)
		for (const row of rows) {
			const entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName))
			if (entity) {
				const property = entity.properties?.find(p => this.helper.equalName(p.mapping, row.columnName))
				if (property) {
					if (entity.indexes === undefined) entity.indexes = []
					const index = entity.indexes.find(i => this.helper.equalName(i.name, row.indexName))
					if (index) {
						index.fields.push(this.helper.propertyName(row.columnName))
					} else {
						entity.indexes.push({ name: this.helper.indexName(row.indexName), fields: [this.helper.propertyName(row.columnName)] })
					}
				}
			}
		}
	}

	private async solveRelations (source: Source, names:string[], entities:EntityMapping[]): Promise<void> {
		const query = this.builder(source).foreignKeys(names)
		const rows = await this.executor.execute(query, {}, this.options)
		for (const row of rows) {
			const entity = entities.find(e => e.mapping === row.tableName)
			const referenceEntity = entities.find(e => this.helper.equalName(e.mapping, row.refTableName))
			if (entity && referenceEntity) {
				const property = entity.properties?.find(p => this.helper.equalName(p.mapping, row.columnName))
				const referenceProperty = referenceEntity?.properties?.find(p => this.helper.equalName(p.mapping, row.refColumnName))
				if (property && referenceProperty) {
					if (entity.relations === undefined) entity.relations = []
					const relationName = this.helper.relationName(row.constraintName.split('_')[1])
					const relation = {
						name: relationName,
						from: property.name,
						entity: referenceEntity.name,
						to: referenceProperty.name,
						type: RelationType.oneToMany
					}
					entity.relations.push(relation)
				}
			}
		}
	}

	private builder (source: Source): DDLBuilderPort {
		const language = this.languages.getByDialect(source.dialect)
		const mapping = this.schemaState.mapping.getInstance(source.mapping)
		return language.ddlBuilder(source, mapping)
	}
}
