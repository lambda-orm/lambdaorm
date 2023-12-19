[Lambda ORM](../README.md) / Executor

# Interface: Executor

## Hierarchy

- **`Executor`**

  ↳ [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Implemented by

- [`ExecutorImpl`](../classes/ExecutorImpl.md)

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

[src/lib/execution/domain/executor.ts:40](https://github.com/FlavioLionelRita/lambdaorm/blob/b2f3850a/src/lib/execution/domain/executor.ts#L40)

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

[src/lib/execution/domain/executor.ts:41](https://github.com/FlavioLionelRita/lambdaorm/blob/b2f3850a/src/lib/execution/domain/executor.ts#L41)

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

[src/lib/execution/domain/executor.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/b2f3850a/src/lib/execution/domain/executor.ts#L42)
