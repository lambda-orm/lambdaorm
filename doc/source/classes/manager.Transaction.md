[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Transaction

# Class: Transaction

[manager](../modules/manager.md).Transaction

## Table of contents

### Constructors

- [constructor](manager.Transaction.md#constructor)

### Methods

- [execute](manager.Transaction.md#execute)
- [executeQuery](manager.Transaction.md#executequery)

## Constructors

### constructor

• **new Transaction**(`expressionManager`, `queryExecutor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionManager` | [`ExpressionManager`](manager.ExpressionManager.md) |
| `queryExecutor` | [`QueryExecutor`](manager.QueryExecutor.md) |

#### Defined in

[src/lib/manager/transaction.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/transaction.ts#L8)

## Methods

### execute

▸ **execute**(`expression`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `data?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/transaction.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/transaction.ts#L13)

▸ **execute**(`expression`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/transaction.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/transaction.ts#L14)

___

### executeQuery

▸ **executeQuery**(`query`, `data?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/manager/transaction.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/manager/transaction.ts#L23)
