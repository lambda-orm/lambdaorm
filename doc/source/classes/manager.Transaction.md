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

[src/lib/manager/transaction.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/transaction.ts#L7)

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

[src/lib/manager/transaction.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/transaction.ts#L23)

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

[src/lib/manager/transaction.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/transaction.ts#L18)

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

[src/lib/manager/transaction.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/transaction.ts#L13)
