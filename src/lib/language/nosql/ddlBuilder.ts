/* eslint-disable @typescript-eslint/no-unused-vars */
import { Property, Relation, Index, Query, EntityMapping } from '../../model'
import { LanguageDDLBuilder } from './../../manager'

export class NoSqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity (entity:EntityMapping): Query | undefined {
		return undefined
	}

	public createEntity (entity:EntityMapping): Query | undefined {
		return undefined
	}

	public createFk (entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public createSequence (entity: EntityMapping): Query | undefined {
		return undefined
	}

	public createIndex (entity:EntityMapping, index:Index): Query | undefined {
		return undefined
	}

	public alterColumn (entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public addColumn (entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public addPk (entity: EntityMapping, primaryKey: string[]): Query | undefined {
		return undefined
	}

	public addUk (entity:EntityMapping, uniqueKey:string[]): Query | undefined {
		return undefined
	}

	public addFk (entity:EntityMapping, relation:Relation): Query | undefined {
		return undefined
	}

	public dropEntity (entity: EntityMapping): Query | undefined {
		return undefined
	}

	public dropColumn (entity: EntityMapping, property: Property): Query | undefined {
		return undefined
	}

	public dropPk (entity: EntityMapping): Query | undefined {
		return undefined
	}

	public dropUk (entity: EntityMapping): Query | undefined {
		return undefined
	}

	public setNull (entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropFk (entity: EntityMapping, relation: Relation): Query | undefined {
		return undefined
	}

	public dropIndex (entity: EntityMapping, index: Index): Query | undefined {
		return undefined
	}

	public dropSequence (entity: EntityMapping): Query | undefined {
		return undefined
	}
}
