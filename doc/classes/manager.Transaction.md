[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Transaction

# Class: Transaction

[manager](../modules/manager.md).Transaction

## Table of contents

### Constructors

- [constructor](manager.Transaction.md#constructor)

### Methods

- [executeSentence](manager.Transaction.md#executesentence)
- [expression](manager.Transaction.md#expression)
- [lambda](manager.Transaction.md#lambda)

## Constructors

### constructor

• **new Transaction**(`orm`, `database`, `transaction`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `database` | [`Database`](../interfaces/model.Database.md) |
| `transaction` | [`Transaction`](connection.Transaction.md) |

#### Defined in

[manager/transaction.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/transaction.ts#L8)

## Methods

### executeSentence

▸ **executeSentence**(`sentence`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/transaction.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/transaction.ts#L25)

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

[manager/transaction.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/transaction.ts#L14)

___

### lambda

▸ **lambda**(`lambda`, `context`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lambda` | `Function` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[manager/transaction.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/manager/transaction.ts#L21)
