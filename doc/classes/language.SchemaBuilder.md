[Lambda ORM](../README.md) / [language](../modules/language.md) / SchemaBuilder

# Class: SchemaBuilder

[language](../modules/language.md).SchemaBuilder

## Table of contents

### Constructors

- [constructor](language.SchemaBuilder.md#constructor)

### Properties

- [database](language.SchemaBuilder.md#database)

### Methods

- [drop](language.SchemaBuilder.md#drop)
- [sync](language.SchemaBuilder.md#sync)
- [truncate](language.SchemaBuilder.md#truncate)

## Constructors

### constructor

• **new SchemaBuilder**(`configManager`, `languageManager`, `database`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configManager` | [`ConfigManager`](manager.ConfigManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `database` | [`Database`](../interfaces/model.Database.md) |

#### Defined in

[manager/schemaBuilder.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L9)

## Properties

### database

• **database**: [`Database`](../interfaces/model.Database.md)

#### Defined in

[manager/schemaBuilder.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L8)

## Methods

### drop

▸ **drop**(`schema`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[manager/schemaBuilder.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L15)

___

### sync

▸ **sync**(`delta`, `schema`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | [`Delta`](model.Delta.md) |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[manager/schemaBuilder.ts:64](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L64)

___

### truncate

▸ **truncate**(`schema`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[manager/schemaBuilder.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L52)
