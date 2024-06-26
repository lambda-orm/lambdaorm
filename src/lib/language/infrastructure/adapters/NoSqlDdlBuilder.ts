/* eslint-disable @typescript-eslint/no-unused-vars */
import { SentenceAction, PropertyMapping, Property, Relation, Index, EntityMapping, SchemaError } from 'lambdaorm-base'
import { Query } from '../../../query/domain'
import { DdlBuilderBase } from './DdlBuilderBase'

export class NoSqlDDLBuilder extends DdlBuilderBase {
	public truncateEntity (entity: EntityMapping): Query | undefined {
		// https://www.codegrepper.com/code-examples/c/truncate+collection+MongoDB
		return this.createQuery(SentenceAction.truncateEntity, '', entity.name, `truncate collection ${entity.name}`)
	}

	public createEntity (entity: EntityMapping): Query | undefined {
		return this.createQuery(SentenceAction.createEntity, '', entity.name, `create collection ${entity.name}`)
	}

	public createFk (_entity: EntityMapping, _relation: Relation): Query | undefined {
		return undefined
	}

	public createSequence (entity: EntityMapping): Query | undefined {
		// https://www.tutorialspoint.com/MongoDB/mongodb_autoincrement_sequence.htm
		if (entity.sequence === undefined) {
			return undefined
		}
		const sentence = `{ "_id" : "${this.dialect.delimiter(entity.sequence)}", "sequence_value": 1 }`
		return this.createQuery(SentenceAction.createSequence, sentence, entity.name, `create sequence ${entity.sequence}`)
	}

	public createIndex (entity: EntityMapping, index: Index): Query | undefined {
		const columns: string[] = []
		for (const field of index.fields) {
			const propertyMapping = entity.properties?.find(p => p.name === field) as PropertyMapping
			columns.push(this.dialect.delimiter(propertyMapping.mapping))
		}
		const properties: any = {}
		for (const i in columns) {
			properties[columns[i]] = 1
		}
		const sentence = JSON.stringify({
			properties,
			options: { name: this.dialect.delimiter(entity.mapping + '_' + index.name) }
		})
		return this.createQuery(SentenceAction.createIndex, sentence, entity.name, `create index ${entity.mapping + '_' + index.name}`)
	}

	public alterProperty (_entity: EntityMapping, _property: Property): Query | undefined {
		return undefined
	}

	public alterPropertyType (entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public alterPropertyRequired (_entity: EntityMapping, _property: Property): Query | undefined {
		return undefined
	}

	public addProperty (_entity: EntityMapping, _property: Property): Query | undefined {
		return undefined
	}

	public addPk (entity: EntityMapping, primaryKey: string[]): Query | undefined {
		const columns: string[] = []
		for (const primaryKeyItem of primaryKey) {
			const property = entity.properties?.find(p => p.name === primaryKeyItem) as PropertyMapping
			columns.push(this.dialect.delimiter(property.mapping))
		}
		const properties: any = {}
		for (const i in columns) {
			if (columns[i] !== '_id') {
				properties[columns[i]] = 1
			}
		}
		const sentence = JSON.stringify({
			properties,
			options: { name: this.dialect.delimiter(entity.mapping + '_PK'), unique: true }
		})
		return this.createQuery(SentenceAction.addPk, sentence, entity.name, 'add primary key')
	}

	public addUk (entity: EntityMapping, uniqueKey: string[]): Query | undefined {
		// https://www.MongoDB.com/docs/drivers/node/current/fundamentals/indexes/#:~:text=By%20default%2C%20MongoDB%20creates%20a,the%20unique%20option%20to%20true%20.
		const columns: string[] = []
		for (const uniqueKeyItem of uniqueKey) {
			const property = entity.properties?.find(p => p.name === uniqueKeyItem) as PropertyMapping
			columns.push(this.dialect.delimiter(property.mapping))
		}
		const properties: any = {}
		for (const i in columns) {
			properties[columns[i]] = 1
		}
		const sentence = JSON.stringify({
			properties,
			options: { name: this.dialect.delimiter(entity.mapping + '_UK'), unique: true }
		})
		return this.createQuery(SentenceAction.addUk, sentence, entity.name, `add unique key ${entity.mapping + '_UK'}`)
	}

	public addFk (_entity: EntityMapping, _relation: Relation): Query | undefined {
		return undefined
	}

	public dropEntity (entity: EntityMapping): Query | undefined {
		return this.createQuery(SentenceAction.dropEntity, '', entity.name, `drop collection ${entity.name}`)
	}

	public dropProperty (_entity: EntityMapping, _property: Property): Query | undefined {
		return undefined
	}

	public dropPk (entity: EntityMapping): Query | undefined {
		// https://www.MongoDB.com/docs/manual/reference/method/db.collection.dropIndex/
		const sentence = this.dialect.delimiter(entity.mapping + '_PK')
		return this.createQuery(SentenceAction.dropPk, sentence, entity.name, `drop primary key ${entity.mapping + '_PK'}`)
	}

	public dropUk (entity: EntityMapping): Query | undefined {
		// https://www.MongoDB.com/docs/manual/reference/method/db.collection.dropIndex/
		const sentence = this.dialect.delimiter(entity.mapping + '_UK')
		return this.createQuery(SentenceAction.dropUk, sentence, entity.name, `drop unique key ${entity.mapping + '_UK'}`)
	}

	public setNull (_entity: EntityMapping, _relation: Relation): Query | undefined {
		return undefined
	}

	public dropFk (_entity: EntityMapping, _relation: Relation): Query | undefined {
		return undefined
	}

	public dropIndex (entity: EntityMapping, index: Index): Query | undefined {
		// https://www.MongoDB.com/docs/manual/reference/method/db.collection.dropIndex/
		const sentence = this.dialect.delimiter(entity.mapping + '_' + index.name)
		return this.createQuery(SentenceAction.dropIndex, sentence, entity.name, `drop index ${entity.mapping + '_' + index.name}`)
	}

	public dropSequence (entity: EntityMapping): Query | undefined {
		if (entity.sequence === undefined) {
			return undefined
		}
		const sentence = JSON.stringify({
			_id: this.dialect.delimiter(entity.sequence)
		})
		return this.createQuery(SentenceAction.dropSequence, sentence, entity.name, `drop sequence ${entity.sequence}`)
	}
}
