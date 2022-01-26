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

• **new Executor**(`connectionManager`, `languageManager`, `schemaManager`, `expressionManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `schemaManager` | [`SchemaManager`](manager.SchemaManager.md) |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |

#### Defined in

[src/lib/manager/executor.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/executor.ts#L13)

## Methods

### execute

▸ **execute**(`query`, `data`, `stage`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |
| `stage` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/executor.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/executor.ts#L20)

___

### executeList

▸ **executeList**(`stage`, `queries`, `tryAllCan?`): `Promise`<`any`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `stage` | `string` | `undefined` |
| `queries` | [`Query`](model.Query.md)[] | `undefined` |
| `tryAllCan` | `boolean` | `false` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/executor.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/executor.ts#L43)

___

### transaction

▸ **transaction**(`stage`, `callback`): `Promise`<`void`\>

Crea una transaccion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stage` | `string` | - |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Codigo que se ejecutara en transaccion |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/manager/executor.ts:76](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/executor.ts#L76)
