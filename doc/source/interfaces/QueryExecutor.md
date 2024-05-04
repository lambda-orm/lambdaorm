[Lambda ORM](../README.md) / QueryExecutor

# Interface: QueryExecutor

## Implemented by

- [`QueryExecutorImpl`](../classes/QueryExecutorImpl.md)

## Table of contents

### Accessors

- [options](QueryExecutor.md#options)

### Methods

- [commit](QueryExecutor.md#commit)
- [execute](QueryExecutor.md#execute)
- [release](QueryExecutor.md#release)
- [rollback](QueryExecutor.md#rollback)

## Accessors

### options

• `get` **options**(): [`QueryOptions`](QueryOptions.md)

#### Returns

[`QueryOptions`](QueryOptions.md)

#### Defined in

[src/lib/execution/domain/executor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/3956b91541983598296aa2d7a3e70bfb62959dfc/src/lib/execution/domain/executor.ts#L32)

## Methods

### commit

▸ **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/3956b91541983598296aa2d7a3e70bfb62959dfc/src/lib/execution/domain/executor.ts#L33)

___

### execute

▸ **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../classes/Query.md) |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/execution/domain/executor.ts:36](https://github.com/lambda-orm/lambdaorm/blob/3956b91541983598296aa2d7a3e70bfb62959dfc/src/lib/execution/domain/executor.ts#L36)

___

### release

▸ **release**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:35](https://github.com/lambda-orm/lambdaorm/blob/3956b91541983598296aa2d7a3e70bfb62959dfc/src/lib/execution/domain/executor.ts#L35)

___

### rollback

▸ **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:34](https://github.com/lambda-orm/lambdaorm/blob/3956b91541983598296aa2d7a3e70bfb62959dfc/src/lib/execution/domain/executor.ts#L34)
