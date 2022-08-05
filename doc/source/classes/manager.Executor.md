[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Executor

# Class: Executor

[manager](../modules/manager.md).Executor

## Table of contents

### Constructors

- [constructor](manager.Executor.md#constructor)

### Methods

- [execute](manager.Executor.md#execute)
- [executeList](manager.Executor.md#executelist)
- [transaction](manager.Executor.md#transaction)

## Constructors

### constructor

• **new Executor**(`connectionManager`, `languages`, `schemaManager`, `expressionManager`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) |
| `languages` | [`Languages`](manager.Languages.md) |
| `schemaManager` | [`SchemaManager`](manager.SchemaManager.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/executor.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/executor.ts#L15)

## Methods

### execute

▸ **execute**(`query`, `data`, `options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/executor.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/executor.ts#L23)

___

### executeList

▸ **executeList**(`options`, `queries`): `Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |
| `queries` | [`Query`](model.Query.md)[] |

#### Returns

`Promise`<[`ExecuteResult`](../interfaces/model.ExecuteResult.md)[]\>

#### Defined in

[src/lib/manager/executor.ts:46](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/executor.ts#L46)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`<`void`\>

Create a transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`OrmOptions`](../interfaces/model.OrmOptions.md) | - |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Code to be executed in transaction |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/executor.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/executor.ts#L77)
