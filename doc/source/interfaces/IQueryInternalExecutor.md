[Lambda ORM](../README.md) / IQueryInternalExecutor

# Interface: IQueryInternalExecutor

## Implemented by

- [`QueryExecutor`](../classes/QueryExecutor.md)

## Table of contents

### Methods

- [\_execute](IQueryInternalExecutor.md#_execute)

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

[src/lib/execution/application/services/queryExecutor/iQueryInternalExecutor.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/afffa105/src/lib/execution/application/services/queryExecutor/iQueryInternalExecutor.ts#L4)
