[Lambda ORM](../README.md) / [language](../modules/language.md) / QueryBuilder

# Class: QueryBuilder

[language](../modules/language.md).QueryBuilder

## Table of contents

### Constructors

- [constructor](language.QueryBuilder.md#constructor)

### Properties

- [database](language.QueryBuilder.md#database)

### Methods

- [build](language.QueryBuilder.md#build)

## Constructors

### constructor

• **new QueryBuilder**(`configManager`, `schema`, `languageManager`, `database`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configManager` | [`ConfigManager`](manager.ConfigManager.md) |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `database` | [`Database`](../interfaces/model.Database.md) |

#### Defined in

[manager/queryBuilder.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryBuilder.ts#L17)

## Properties

### database

• **database**: [`Database`](../interfaces/model.Database.md)

#### Defined in

[manager/queryBuilder.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryBuilder.ts#L15)

## Methods

### build

▸ **build**(`sentence`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/queryBuilder.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryBuilder.ts#L34)
