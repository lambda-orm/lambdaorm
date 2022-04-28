/* eslint-disable @typescript-eslint/no-unused-vars */
import { Property, Relation, Index, Query, EntityMapping, PropertyMapping } from '../../model'
import { LanguageDDLBuilder } from './../../manager'

export class NoSqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity(entity: EntityMapping): Query | undefined {
		// https://www.codegrepper.com/code-examples/c/truncate+collection+mongodb
		return new Query('truncateEntity', this.dataSource.dialect, this.dataSource.name, '', entity.name)
	}

	public createEntity(entity: EntityMapping): Query | undefined {
		return new Query('createEntity', this.dataSource.dialect, this.dataSource.name, '', entity.name)
	}

	public createFk(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public createSequence(entity: EntityMapping): Query | undefined {
		// https://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm
		const sentence = `{ "_id" : "${this.dialect.delimiter(entity.sequence)}", "sequence_value": 1 }`
		return new Query('createSequence', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public createIndex(entity: EntityMapping, index: Index): Query | undefined {
		const columns: string[] = []
		for (let i = 0; i < index.fields.length; i++) {
			const propertyMapping = entity.properties.find(p => p.name === index.fields[i]) as PropertyMapping
			columns.push(this.dialect.delimiter(propertyMapping.mapping))
		}
		const properties: any = {}
		for (const i in columns) {
			properties[columns[i]] = 1
		}
		const sentence = JSON.stringify({
			properties: properties,
			options: { name: this.dialect.delimiter(entity.mapping + '_' + index.name) }
		})
		return new Query('createIndex', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public alterProperty(entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public addProperty(entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined {
		const columns: string[] = []
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(this.dialect.delimiter(property.mapping))
		}
		const properties: any = {}
		for (const i in columns) {
			if (columns[i] !== '_id') {
				properties[columns[i]] = 1
			}
		}
		const sentence = JSON.stringify({
			properties: properties,
			options: { name: this.dialect.delimiter(entity.mapping + '_PK'), unique: true }
		})
		return new Query('addPk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined {
		// https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/#:~:text=By%20default%2C%20MongoDB%20creates%20a,the%20unique%20option%20to%20true%20.
		const columns: string[] = []
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(this.dialect.delimiter(property.mapping))
		}
		const properties: any = {}
		for (const i in columns) {
			properties[columns[i]] = 1
		}
		const sentence = JSON.stringify({
			properties: properties,
			options: { name: this.dialect.delimiter(entity.mapping + '_UK'), unique: true }
		})
		return new Query('addUk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public addFk(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropEntity(entity: EntityMapping): Query | undefined {
		return new Query('dropEntity', this.dataSource.dialect, this.dataSource.name, '', entity.name)
	}

	public dropProperty(entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public dropPk(entity: EntityMapping): Query | undefined {
		// https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/
		const sentence = this.dialect.delimiter(entity.mapping + '_PK')
		return new Query('dropPk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public dropUk(entity: EntityMapping): Query | undefined {
		// https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/
		const sentence = this.dialect.delimiter(entity.mapping + '_UK')
		return new Query('dropUk', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public setNull(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropFk(entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropIndex(entity: EntityMapping, index: Index): Query | undefined {
		// https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/
		const sentence = this.dialect.delimiter(entity.mapping + '_' + index.name)
		return new Query('dropIndex', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}

	public dropSequence(entity: EntityMapping): Query | undefined {
		const sentence = JSON.stringify({
			_id: this.dialect.delimiter(entity.sequence)
		})
		return new Query('dropSequence', this.dataSource.dialect, this.dataSource.name, sentence, entity.name)
	}
}
