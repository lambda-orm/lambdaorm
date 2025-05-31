[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Transaction

# Class: Transaction

Defined in: [src/lib/execution/domain/transaction.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/transaction.ts#L6)

## Constructors

### Constructor

> **new Transaction**(`queryExecutor`): `Transaction`

Defined in: [src/lib/execution/domain/transaction.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/transaction.ts#L7)

#### Parameters

##### queryExecutor

[`QueryExecutor`](../interfaces/QueryExecutor.md)

#### Returns

`Transaction`

## Accessors

### options

#### Get Signature

> **get** **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

Defined in: [src/lib/execution/domain/transaction.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/transaction.ts#L15)

##### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

## Methods

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/execution/domain/transaction.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/transaction.ts#L11)

#### Parameters

##### query

[`Query`](Query.md)

##### data

`any` = `{}`

#### Returns

`Promise`\<`any`\>
