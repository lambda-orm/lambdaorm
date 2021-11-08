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

• **new Executor**(`connectionManager`, `languageManager`, `expressionManager`, `configManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `configManager` | [`ConfigManager`](manager.ConfigManager.md) |

#### Defined in

[manager/executor.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/executor.ts#L13)

## Methods

### execute

▸ **execute**(`database`, `query`, `dataContext?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | [`Database`](../interfaces/model.Database.md) |
| `query` | [`Query`](model.Query.md) |
| `dataContext` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/executor.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/executor.ts#L20)

___

### executeList

▸ **executeList**(`database`, `queries`, `tryAllCan?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `database` | [`Database`](../interfaces/model.Database.md) | `undefined` |
| `queries` | [`Query`](model.Query.md)[] | `undefined` |
| `tryAllCan` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/executor.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/executor.ts#L44)

___

### transaction

▸ **transaction**(`database`, `callback`): `Promise`<`void`\>

Crea una transaccion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `database` | [`Database`](../interfaces/model.Database.md) | Database name |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Codigo que se ejecutara en transaccion |

#### Returns

`Promise`<`void`\>

#### Defined in

[manager/executor.ts:78](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/executor.ts#L78)
