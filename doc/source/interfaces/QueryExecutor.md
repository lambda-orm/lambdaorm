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

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L32)
=======
[src/lib/execution/domain/executor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L32)
>>>>>>> release/1.2.0

## Methods

### commit

▸ **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L33)
=======
[src/lib/execution/domain/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L33)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:36](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L36)
=======
[src/lib/execution/domain/executor.ts:36](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L36)
>>>>>>> release/1.2.0

___

### release

▸ **release**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:35](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L35)
=======
[src/lib/execution/domain/executor.ts:35](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L35)
>>>>>>> release/1.2.0

___

### rollback

▸ **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:34](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L34)
=======
[src/lib/execution/domain/executor.ts:34](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L34)
>>>>>>> release/1.2.0
