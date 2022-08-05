[Lambda ORM](../README.md) / [manager](../modules/manager.md) / QueryExecutor

# Class: QueryExecutor

[manager](../modules/manager.md).QueryExecutor

## Table of contents

### Constructors

- [constructor](manager.QueryExecutor.md#constructor)

### Properties

- [options](manager.QueryExecutor.md#options)

### Methods

- [commit](manager.QueryExecutor.md#commit)
- [execute](manager.QueryExecutor.md#execute)
- [release](manager.QueryExecutor.md#release)
- [rollback](manager.QueryExecutor.md#rollback)

## Constructors

### constructor

• **new QueryExecutor**(`connectionManager`, `languages`, `schemaManager`, `expressions`, `options`, `transactional?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) | `undefined` |
| `languages` | [`Languages`](manager.Languages.md) | `undefined` |
| `schemaManager` | [`SchemaManager`](manager.SchemaManager.md) | `undefined` |
| `expressions` | `Expressions` | `undefined` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) | `undefined` |
| `transactional` | `boolean` | `false` |

#### Defined in

[src/lib/manager/queryExecutor.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/queryExecutor.ts#L17)

## Properties

### options

• **options**: [`OrmOptions`](../interfaces/model.OrmOptions.md)

#### Defined in

[src/lib/manager/queryExecutor.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/queryExecutor.ts#L9)

## Methods

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/queryExecutor.ts#L39)

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

[src/lib/manager/queryExecutor.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/queryExecutor.ts#L61)

___

### release

▸ **release**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:53](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/queryExecutor.ts#L53)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/queryExecutor.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/queryExecutor.ts#L46)
