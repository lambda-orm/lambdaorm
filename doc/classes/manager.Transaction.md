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

• **new Transaction**(`expressionManager`, `queryExecutor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `queryExecutor` | [`QueryExecutor`](manager.QueryExecutor.md) |

#### Defined in

[manager/transaction.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/transaction.ts#L7)

## Methods

### execute

▸ **execute**(`query`, `dataContext?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `dataContext` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/transaction.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/transaction.ts#L23)

___

### expression

▸ **expression**(`expression`, `context`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/transaction.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/transaction.ts#L18)

___

### lambda

▸ **lambda**(`lambda`, `dataContext`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lambda` | `Function` |
| `dataContext` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/transaction.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/transaction.ts#L13)
