[Lambda ORM](../README.md) / [language](../modules/language.md) / DMLBuilder

# Class: DMLBuilder

[language](../modules/language.md).DMLBuilder

## Table of contents

### Constructors

- [constructor](language.DMLBuilder.md#constructor)

### Properties

- [stage](language.DMLBuilder.md#stage)

### Methods

- [build](language.DMLBuilder.md#build)

## Constructors

### constructor

• **new DMLBuilder**(`schema`, `routing`, `languageManager`, `stage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `stage` | `string` |

#### Defined in

[src/lib/manager/dmlBuilder.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/dmlBuilder.ts#L29)

## Properties

### stage

• **stage**: `string`

#### Defined in

[src/lib/manager/dmlBuilder.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/dmlBuilder.ts#L26)

## Methods

### build

▸ **build**(`sentence`): `Promise`<[`Query`](model.Query.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

`Promise`<[`Query`](model.Query.md)\>

#### Defined in

[src/lib/manager/dmlBuilder.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/dmlBuilder.ts#L43)
