[Lambda ORM](../README.md) / ObservableExecutorDecorator

# Interface: ObservableExecutorDecorator

## Hierarchy

- [`Executor`](Executor.md)

- [`ObservableExecutor`](ObservableExecutor.md)

  ↳ **`ObservableExecutorDecorator`**

## Table of contents

### Methods

- [execute](ObservableExecutorDecorator.md#execute)
- [executeList](ObservableExecutorDecorator.md#executelist)
- [subscribe](ObservableExecutorDecorator.md#subscribe)
- [transaction](ObservableExecutorDecorator.md#transaction)
- [unsubscribe](ObservableExecutorDecorator.md#unsubscribe)

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

#### Inherited from

[Executor](Executor.md).[execute](Executor.md#execute)

#### Defined in

[src/lib/execution/domain/executor.ts:40](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/execution/domain/executor.ts#L40)

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

#### Inherited from

[Executor](Executor.md).[executeList](Executor.md#executelist)

#### Defined in

[src/lib/execution/domain/executor.ts:41](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/execution/domain/executor.ts#L41)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Inherited from

[ObservableExecutor](ObservableExecutor.md).[subscribe](ObservableExecutor.md#subscribe)

#### Defined in

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/execution/domain/executor.ts#L46)

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

#### Inherited from

[Executor](Executor.md).[transaction](Executor.md#transaction)

#### Defined in

[src/lib/execution/domain/executor.ts:42](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/execution/domain/executor.ts#L42)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Inherited from

[ObservableExecutor](ObservableExecutor.md).[unsubscribe](ObservableExecutor.md#unsubscribe)

#### Defined in

[src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/execution/domain/executor.ts#L47)
