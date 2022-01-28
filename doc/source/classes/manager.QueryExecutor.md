[Lambda ORM](../README.md) / [manager](../modules/manager.md) / QueryExecutor

# Class: QueryExecutor

[manager](../modules/manager.md).QueryExecutor

## Table of contents

### Constructors

- [constructor](manager.QueryExecutor.md#constructor)

### Properties

- [stage](manager.QueryExecutor.md#stage)

### Methods

- [commit](manager.QueryExecutor.md#commit)
- [execute](manager.QueryExecutor.md#execute)
- [release](manager.QueryExecutor.md#release)
- [rollback](manager.QueryExecutor.md#rollback)

## Constructors

### constructor

• **new QueryExecutor**(`connectionManager`, `languageManager`, `schemaManager`, `stage`, `transactionable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) | `undefined` |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) | `undefined` |
| `schemaManager` | [`SchemaManager`](manager.SchemaManager.md) | `undefined` |
| `stage` | `string` | `undefined` |
| `transactionable` | `boolean` | `false` |

#### Defined in

[src/lib/manager/queryExecutor.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/queryExecutor.ts#L17)

## Properties

### stage

• **stage**: `string`

#### Defined in

[src/lib/manager/queryExecutor.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/queryExecutor.ts#L10)

## Methods

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:38](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/queryExecutor.ts#L38)

___

### execute

▸ **execute**(`query`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:60](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/queryExecutor.ts#L60)

___

### release

▸ **release**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/queryExecutor.ts#L52)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/queryExecutor.ts#L45)
