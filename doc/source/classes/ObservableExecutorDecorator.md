[Lambda ORM](../README.md) / ObservableExecutorDecorator

# Class: ObservableExecutorDecorator

## Implements

- [`Executor`](../interfaces/Executor.md)
- [`ObservableExecutor`](../interfaces/ObservableExecutor.md)

## Table of contents

### Constructors

- [constructor](ObservableExecutorDecorator.md#constructor)

### Methods

- [execute](ObservableExecutorDecorator.md#execute)
- [executeList](ObservableExecutorDecorator.md#executelist)
- [subscribe](ObservableExecutorDecorator.md#subscribe)
- [transaction](ObservableExecutorDecorator.md#transaction)
- [unsubscribe](ObservableExecutorDecorator.md#unsubscribe)

## Constructors

### constructor

• **new ObservableExecutorDecorator**(`expressions`, `executor`, `helper`): [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | `Expressions` |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

#### Defined in

[src/lib/execution/application/services/observableExecutorDecorator.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/daad6f63/src/lib/execution/application/services/observableExecutorDecorator.ts#L8)

## Methods

### execute

▸ **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[execute](../interfaces/Executor.md#execute)

#### Defined in

[src/lib/execution/application/services/observableExecutorDecorator.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/daad6f63/src/lib/execution/application/services/observableExecutorDecorator.ts#L16)

___

### executeList

▸ **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queries` | [`Query`](Query.md)[] |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Implementation of

[Executor](../interfaces/Executor.md).[executeList](../interfaces/Executor.md#executelist)

#### Defined in

[src/lib/execution/application/services/observableExecutorDecorator.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/daad6f63/src/lib/execution/application/services/observableExecutorDecorator.ts#L38)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Implementation of

[ObservableExecutor](../interfaces/ObservableExecutor.md).[subscribe](../interfaces/ObservableExecutor.md#subscribe)

#### Defined in

[src/lib/execution/application/services/observableExecutorDecorator.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/daad6f63/src/lib/execution/application/services/observableExecutorDecorator.ts#L47)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |
| `callback` | (`tr`: [`Transaction`](Transaction.md)) => `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[transaction](../interfaces/Executor.md#transaction)

#### Defined in

[src/lib/execution/application/services/observableExecutorDecorator.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/daad6f63/src/lib/execution/application/services/observableExecutorDecorator.ts#L42)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Implementation of

[ObservableExecutor](../interfaces/ObservableExecutor.md).[unsubscribe](../interfaces/ObservableExecutor.md#unsubscribe)

#### Defined in

[src/lib/execution/application/services/observableExecutorDecorator.ts:51](https://github.com/FlavioLionelRita/lambdaorm/blob/daad6f63/src/lib/execution/application/services/observableExecutorDecorator.ts#L51)
