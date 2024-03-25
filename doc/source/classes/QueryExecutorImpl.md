[Lambda ORM](../README.md) / QueryExecutorImpl

# Class: QueryExecutorImpl

## Implements

- [`QueryExecutor`](../interfaces/QueryExecutor.md)
- [`QueryInternalExecutor`](../interfaces/QueryInternalExecutor.md)

## Table of contents

### Constructors

- [constructor](QueryExecutorImpl.md#constructor)

### Accessors

- [options](QueryExecutorImpl.md#options)

### Methods

- [\_execute](QueryExecutorImpl.md#_execute)
- [commit](QueryExecutorImpl.md#commit)
- [execute](QueryExecutorImpl.md#execute)
- [release](QueryExecutorImpl.md#release)
- [rollback](QueryExecutorImpl.md#rollback)

## Constructors

### constructor

• **new QueryExecutorImpl**(`connectionFacade`, `languages`, `schemaFacade`, `expressions`, `_options`, `helper`, `transactional?`): [`QueryExecutorImpl`](QueryExecutorImpl.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `connectionFacade` | [`ConnectionFacade`](ConnectionFacade.md) | `undefined` |
| `languages` | [`LanguagesService`](LanguagesService.md) | `undefined` |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) | `undefined` |
| `expressions` | `Expressions` | `undefined` |
| `_options` | [`QueryOptions`](../interfaces/QueryOptions.md) | `undefined` |
| `helper` | [`Helper`](Helper.md) | `undefined` |
| `transactional` | `boolean` | `false` |

#### Returns

[`QueryExecutorImpl`](QueryExecutorImpl.md)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:24](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L24)

## Accessors

### options

• `get` **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Implementation of

QueryExecutor.options

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:41](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L41)

## Methods

### \_execute

▸ **_execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | [`Data`](Data.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[QueryInternalExecutor](../interfaces/QueryInternalExecutor.md).[_execute](../interfaces/QueryInternalExecutor.md#_execute)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:110](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L110)

___

### commit

▸ **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[QueryExecutor](../interfaces/QueryExecutor.md).[commit](../interfaces/QueryExecutor.md#commit)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:57](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L57)

___

### execute

▸ **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[QueryExecutor](../interfaces/QueryExecutor.md).[execute](../interfaces/QueryExecutor.md#execute)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:79](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L79)

___

### release

▸ **release**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[QueryExecutor](../interfaces/QueryExecutor.md).[release](../interfaces/QueryExecutor.md#release)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:71](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L71)

___

### rollback

▸ **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[QueryExecutor](../interfaces/QueryExecutor.md).[rollback](../interfaces/QueryExecutor.md#rollback)

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryExecutor.ts:64](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/execution/application/services/queryExecutor/queryExecutor.ts#L64)
