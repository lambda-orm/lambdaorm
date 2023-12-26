[Lambda ORM](../README.md) / ExecutorImpl

# Class: ExecutorImpl

## Implements

- [`Executor`](../interfaces/Executor.md)
- [`ObservableExecutor`](../interfaces/ObservableExecutor.md)

## Table of contents

### Constructors

- [constructor](ExecutorImpl.md#constructor)

### Methods

- [execute](ExecutorImpl.md#execute)
- [executeList](ExecutorImpl.md#executelist)
- [subscribe](ExecutorImpl.md#subscribe)
- [transaction](ExecutorImpl.md#transaction)
- [unsubscribe](ExecutorImpl.md#unsubscribe)

## Constructors

### constructor

• **new ExecutorImpl**(`connectionFacade`, `languages`, `schemaFacade`, `expressions`, `helper`): [`ExecutorImpl`](ExecutorImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionFacade` | [`ConnectionFacade`](ConnectionFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `expressions` | `Expressions` |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`ExecutorImpl`](ExecutorImpl.md)

#### Defined in

[src/lib/execution/application/services/executor.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/8667a6d5/src/lib/execution/application/services/executor.ts#L12)

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

[src/lib/execution/application/services/executor.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/8667a6d5/src/lib/execution/application/services/executor.ts#L33)

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

[src/lib/execution/application/services/executor.ts:56](https://github.com/FlavioLionelRita/lambdaorm/blob/8667a6d5/src/lib/execution/application/services/executor.ts#L56)

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

[src/lib/execution/application/services/executor.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/8667a6d5/src/lib/execution/application/services/executor.ts#L21)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`\<`void`\>

Create a transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) | - |
| `callback` | (`tr`: [`Transaction`](Transaction.md)) => `Promise`\<`void`\> | Code to be executed in transaction |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[transaction](../interfaces/Executor.md#transaction)

#### Defined in

[src/lib/execution/application/services/executor.ts:87](https://github.com/FlavioLionelRita/lambdaorm/blob/8667a6d5/src/lib/execution/application/services/executor.ts#L87)

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

[src/lib/execution/application/services/executor.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/8667a6d5/src/lib/execution/application/services/executor.ts#L25)
