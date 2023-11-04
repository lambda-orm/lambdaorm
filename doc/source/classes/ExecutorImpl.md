[Lambda ORM](../README.md) / ExecutorImpl

# Class: ExecutorImpl

## Implements

- [`Executor`](../interfaces/Executor.md)

## Table of contents

### Constructors

- [constructor](ExecutorImpl.md#constructor)

### Methods

- [execute](ExecutorImpl.md#execute)
- [executeList](ExecutorImpl.md#executelist)
- [transaction](ExecutorImpl.md#transaction)

## Constructors

### constructor

• **new ExecutorImpl**(`connectionFacade`, `languages`, `schemaFacade`, `expressions`, `helper`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionFacade` | [`ConnectionFacade`](ConnectionFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `expressions` | `Expressions` |
| `helper` | [`Helper`](Helper.md) |

#### Defined in

[src/lib/execution/application/services/executor.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/executor.ts#L12)

## Methods

### execute

▸ **execute**(`query`, `data`, `options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`<`any`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[execute](../interfaces/Executor.md#execute)

#### Defined in

[src/lib/execution/application/services/executor.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/executor.ts#L19)

___

### executeList

▸ **executeList**(`queries`, `options`): `Promise`<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `queries` | [`Query`](Query.md)[] |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Implementation of

[Executor](../interfaces/Executor.md).[executeList](../interfaces/Executor.md#executelist)

#### Defined in

[src/lib/execution/application/services/executor.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/executor.ts#L42)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`<`void`\>

Create a transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) | - |
| `callback` | (`tr`: [`Transaction`](Transaction.md)) => `Promise`<`void`\> | Code to be executed in transaction |

#### Returns

`Promise`<`void`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[transaction](../interfaces/Executor.md#transaction)

#### Defined in

[src/lib/execution/application/services/executor.ts:73](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/executor.ts#L73)
