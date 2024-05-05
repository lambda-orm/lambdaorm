[Lambda ORM](../README.md) / QueryInternalExecutor

# Interface: QueryInternalExecutor

## Implemented by

- [`QueryExecutorImpl`](../classes/QueryExecutorImpl.md)

## Table of contents

### Methods

- [\_execute](QueryInternalExecutor.md#_execute)

## Methods

### \_execute

▸ **_execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../classes/Query.md) |
| `data` | [`Data`](../classes/Data.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/execution/application/services/queryExecutor/queryInternalExecutor.ts:5](https://github.com/lambda-orm/lambdaorm/blob/3c17256b9419faa917072d7fb3b43e0f2c37ecca/src/lib/execution/application/services/queryExecutor/queryInternalExecutor.ts#L5)
