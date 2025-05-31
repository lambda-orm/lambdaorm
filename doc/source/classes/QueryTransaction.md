[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / QueryTransaction

# Class: QueryTransaction

Defined in: [src/lib/expressions/application/useCases/transaction.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/useCases/transaction.ts#L7)

## Constructors

### Constructor

> **new QueryTransaction**(`transaction`, `builder`, `expressions`): `QueryTransaction`

Defined in: [src/lib/expressions/application/useCases/transaction.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/useCases/transaction.ts#L9)

#### Parameters

##### transaction

[`Transaction`](Transaction.md)

##### builder

[`IQueryBuilder`](../interfaces/IQueryBuilder.md)

##### expressions

`Expressions`

#### Returns

`QueryTransaction`

## Methods

### execute()

#### Call Signature

> **execute**(`query`, `data?`): `Promise`\<`any`\>

Defined in: [src/lib/expressions/application/useCases/transaction.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/useCases/transaction.ts#L13)

##### Parameters

###### query

`Function`

###### data?

`any`

##### Returns

`Promise`\<`any`\>

#### Call Signature

> **execute**(`query`, `data?`): `Promise`\<`any`\>

Defined in: [src/lib/expressions/application/useCases/transaction.ts:14](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/useCases/transaction.ts#L14)

##### Parameters

###### query

`string`

###### data?

`any`

##### Returns

`Promise`\<`any`\>

***

### executeQuery()

> **executeQuery**(`query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/expressions/application/useCases/transaction.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/expressions/application/useCases/transaction.ts#L23)

#### Parameters

##### query

[`Query`](Query.md)

##### data

`any` = `{}`

#### Returns

`Promise`\<`any`\>
