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

<<<<<<< HEAD
[src/lib/expressions/application/useCases/transaction.ts:9](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/useCases/transaction.ts#L9)
=======
[src/lib/expressions/application/useCases/transaction.ts:9](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/expressions/application/useCases/transaction.ts#L9)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/expressions/application/useCases/transaction.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/useCases/transaction.ts#L13)
=======
[src/lib/expressions/application/useCases/transaction.ts:13](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/expressions/application/useCases/transaction.ts#L13)
>>>>>>> release/1.2.0

▸ **execute**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

<<<<<<< HEAD
[src/lib/expressions/application/useCases/transaction.ts:14](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/useCases/transaction.ts#L14)
=======
[src/lib/expressions/application/useCases/transaction.ts:14](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/expressions/application/useCases/transaction.ts#L14)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/expressions/application/useCases/transaction.ts:23](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/expressions/application/useCases/transaction.ts#L23)
=======
[src/lib/expressions/application/useCases/transaction.ts:23](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/expressions/application/useCases/transaction.ts#L23)
>>>>>>> release/1.2.0
