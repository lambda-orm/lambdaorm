[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Transaction

# Class: Transaction

[manager](../modules/manager.md).Transaction

## Table of contents

### Constructors

- [constructor](manager.Transaction.md#constructor)

### Methods

- [execute](manager.Transaction.md#execute)
- [expression](manager.Transaction.md#expression)
- [lambda](manager.Transaction.md#lambda)

## Constructors

### constructor

• **new Transaction**(`context`, `expressionManager`, `queryExecutor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `queryExecutor` | [`QueryExecutor`](manager.QueryExecutor.md) |

#### Defined in

[src/lib/manager/transaction.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/transaction.ts#L8)

## Methods

### execute

▸ **execute**(`query`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/transaction.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/transaction.ts#L25)

___

### expression

▸ **expression**(`expression`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/transaction.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/transaction.ts#L20)

___

### lambda

▸ **lambda**(`lambda`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lambda` | `Function` |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/transaction.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/transaction.ts#L15)
