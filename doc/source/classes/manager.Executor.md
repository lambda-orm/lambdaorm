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

• **new Executor**(`connectionManager`, `languageManager`, `routing`, `schemaConfig`, `expressionManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `schemaConfig` | [`SchemaConfig`](manager.SchemaConfig.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |

#### Defined in

[src/lib/manager/executor.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/executor.ts#L14)

## Methods

### execute

▸ **execute**(`query`, `data`, `context`, `stage`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `context` | `any` |
| `stage` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/executor.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/executor.ts#L22)

___

### executeList

▸ **executeList**(`stage`, `queries`, `context`, `tryAllCan?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stage` | `string` | `undefined` |
| `queries` | [`Query`](model.Query.md)[] | `undefined` |
| `context` | `any` | `undefined` |
| `tryAllCan` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/executor.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/executor.ts#L45)

___

### transaction

▸ **transaction**(`stage`, `context`, `callback`): `Promise`<`void`\>

Crea una transaccion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stage` | `string` | - |
| `context` | `any` | - |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Codigo que se ejecutara en transaccion |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/executor.ts:78](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/executor.ts#L78)
