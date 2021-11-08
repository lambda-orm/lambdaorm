[Lambda ORM](../README.md) / [language](../modules/language.md) / LanguageQueryBuilder

# Class: LanguageQueryBuilder

[language](../modules/language.md).LanguageQueryBuilder

## Table of contents

### Constructors

- [constructor](language.LanguageQueryBuilder.md#constructor)

### Methods

- [build](language.LanguageQueryBuilder.md#build)

## Constructors

### constructor

• **new LanguageQueryBuilder**()

## Methods

### build

▸ `Abstract` **build**(`sentence`, `schema`, `database`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |
| `database` | `string` |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/queryBuilder.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/queryBuilder.ts#L8)
