[Lambda ORM](../README.md) / ExpressionTransaction

# Class: ExpressionTransaction

## Table of contents

### Constructors

- [constructor](ExpressionTransaction.md#constructor)

### Methods

- [execute](ExpressionTransaction.md#execute)
- [executeQuery](ExpressionTransaction.md#executequery)

## Constructors

### constructor

• **new ExpressionTransaction**(`transaction`, `builder`, `expressions`): [`ExpressionTransaction`](ExpressionTransaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](Transaction.md) |
| `builder` | [`IQueryBuilder`](../interfaces/IQueryBuilder.md) |
| `expressions` | `Expressions` |

#### Returns

[`ExpressionTransaction`](ExpressionTransaction.md)

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:9](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/expressions/application/useCases/transaction.ts#L9)

## Methods

### execute

▸ **execute**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:13](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/expressions/application/useCases/transaction.ts#L13)

▸ **execute**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:14](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/expressions/application/useCases/transaction.ts#L14)

___

### executeQuery

▸ **executeQuery**(`query`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](Query.md) |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:23](https://github.com/lambda-orm/lambdaorm/blob/a0d8ab272b532eb88386058135e414ac521ad4dd/src/lib/expressions/application/useCases/transaction.ts#L23)
