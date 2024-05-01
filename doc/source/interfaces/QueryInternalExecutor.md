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

[src/lib/execution/application/services/queryExecutor/queryInternalExecutor.ts:5](https://github.com/lambda-orm/lambdaorm/blob/c8a0e534c9d6eda9a8e27bfb1f14f4ac43be5ecf/src/lib/execution/application/services/queryExecutor/queryInternalExecutor.ts#L5)
