/* eslint-disable @typescript-eslint/no-unused-vars */
import { Property, Relation, Index, Query, EntityMapping, PropertyMapping, NoSqlSentence } from '../../model'
import { LanguageDDLBuilder } from './../../manager'

export class NoSqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity(entity: EntityMapping): Query | undefined {
		const sentence: NoSqlSentence = { collection: this.dialect.delimiter(entity.mapping) }
		return new Query('truncateEntity', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public createEntity(entity: EntityMapping): Query | undefined {
		const sentence: NoSqlSentence = { collection: this.dialect.delimiter(entity.mapping) }
		return new Query('createEntity', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public createFk(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public createSequence(entity: EntityMapping): Query | undefined {
		return undefined
	}

	public createIndex(entity: EntityMapping, index: Index): Query | undefined {
		const columns: string[] = []
		for (let i = 0; i < index.fields.length; i++) {
			const propertyMapping = entity.properties.find(p => p.name === index.fields[i]) as PropertyMapping
			columns.push(this.dialect.delimiter(propertyMapping.mapping))
		}
		const sentence: NoSqlSentence = {
			name: this.dialect.delimiter(entity.mapping + '_' + index.name),
			collection: this.dialect.delimiter(entity.mapping),
			columns: columns
		}
		return new Query('createIndex', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public alterColumn(entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public addColumn(entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined {
		const columns: string[] = []
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(this.dialect.delimiter(property.mapping))
		}
		const sentence: NoSqlSentence = {
			name: this.dialect.delimiter(entity.mapping + '_PK'),
			collection: this.dialect.delimiter(entity.mapping),
			columns: columns
		}
		return new Query('addPk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined {
		const columns: string[] = []
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(this.dialect.delimiter(property.mapping))
		}
		const sentence: NoSqlSentence = {
			name: this.dialect.delimiter(entity.mapping + '_UK'),
			collection: this.dialect.delimiter(entity.mapping),
			columns: columns
		}
		return new Query('addUk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public addFk(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropEntity(entity: EntityMapping): Query | undefined {
		const sentence: NoSqlSentence = {
			collection: this.dialect.delimiter(entity.mapping)
		}
		return new Query('dropEntity', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public dropColumn(entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public dropPk(entity: EntityMapping): Query | undefined {
		const sentence: NoSqlSentence = {
			name: this.dialect.delimiter(entity.mapping + '_PK'),
			collection: this.dialect.delimiter(entity.mapping)
		}
		return new Query('dropPk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public dropUk(entity: EntityMapping): Query | undefined {
		const sentence: NoSqlSentence = {
			name: this.dialect.delimiter(entity.mapping + '_UK'),
			collection: this.dialect.delimiter(entity.mapping)
		}
		return new Query('dropUk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public setNull(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropFk(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropIndex(entity: EntityMapping, index: Index): Query | undefined {
		const sentence: NoSqlSentence = {
			name: this.dialect.delimiter(entity.mapping + '_' + index.name),
			collection: this.dialect.delimiter(entity.mapping)
		}
		return new Query('dropIndex', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public dropSequence(entity: EntityMapping): Query | undefined {
		return undefined
	}
}
