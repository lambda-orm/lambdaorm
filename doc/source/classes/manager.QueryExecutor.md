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

• **new QueryExecutor**(`connectionManager`, `languageManager`, `routing`, `schemaConfig`, `stage`, `transactionable?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) | `undefined` |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) | `undefined` |
| `routing` | [`Routing`](manager.Routing.md) | `undefined` |
| `schemaConfig` | [`SchemaConfig`](manager.SchemaConfig.md) | `undefined` |
| `stage` | `string` | `undefined` |
| `transactionable` | `boolean` | `false` |

#### Defined in

[src/lib/manager/queryExecutor.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/queryExecutor.ts#L17)

## Properties

### stage

• **stage**: `string`

#### Defined in

[src/lib/manager/queryExecutor.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/queryExecutor.ts#L10)

## Methods

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/queryExecutor.ts#L39)

___

### execute

▸ **execute**(`query`, `data`, `context`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:79](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/queryExecutor.ts#L79)

___

### release

▸ **release**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:53](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/queryExecutor.ts#L53)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/queryExecutor.ts#L46)
