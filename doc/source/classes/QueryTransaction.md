[Lambda ORM](../README.md) / QueryTransaction

# Class: QueryTransaction

## Table of contents

### Constructors

- [constructor](QueryTransaction.md#constructor)

### Methods

- [execute](QueryTransaction.md#execute)
- [executeQuery](QueryTransaction.md#executequery)

## Constructors

### constructor

• **new QueryTransaction**(`transaction`, `builder`, `expressions`): [`QueryTransaction`](QueryTransaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](Transaction.md) |
| `builder` | [`IQueryBuilder`](../interfaces/IQueryBuilder.md) |
| `expressions` | `Expressions` |

#### Returns

[`QueryTransaction`](QueryTransaction.md)

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/useCases/transaction.ts#L9)

## Methods

### execute

▸ **execute**(`query`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Function` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/useCases/transaction.ts#L13)

▸ **execute**(`query`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expressions/application/useCases/transaction.ts:14](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/useCases/transaction.ts#L14)

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

[src/lib/expressions/application/useCases/transaction.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d48077afa1aac1ad6d8319e9805485821bafad27/src/lib/expressions/application/useCases/transaction.ts#L23)
