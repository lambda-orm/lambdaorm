[Lambda ORM](../README.md) / Executor

# Interface: Executor

## Implemented by

- [`ExecutorImpl`](../classes/ExecutorImpl.md)
- [`ObservableExecutorDecorator`](../classes/ObservableExecutorDecorator.md)

## Table of contents

### Methods

- [execute](Executor.md#execute)
- [executeList](Executor.md#executelist)
- [transaction](Executor.md#transaction)

## Methods

### execute

▸ **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](../classes/Query.md) |
| `data` | `any` |
| `options` | [`QueryOptions`](QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/execution/domain/executor.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/execution/domain/executor.ts#L32)

___

### executeList

▸ **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queries` | [`Query`](../classes/Query.md)[] |
| `options` | [`QueryOptions`](QueryOptions.md) |

#### Returns

`Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Defined in

[src/lib/execution/domain/executor.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/execution/domain/executor.ts#L33)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`QueryOptions`](QueryOptions.md) |
| `callback` | (`tr`: [`Transaction`](../classes/Transaction.md)) => `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/execution/domain/executor.ts#L34)
