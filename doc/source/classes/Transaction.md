[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Transaction

# Class: Transaction

## Constructors

### new Transaction()

> **new Transaction**(`queryExecutor`): [`Transaction`](Transaction.md)

#### Parameters

• **queryExecutor**: [`QueryExecutor`](../interfaces/QueryExecutor.md)

#### Returns

[`Transaction`](Transaction.md)

#### Source

[src/lib/execution/domain/transaction.ts:7](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/transaction.ts#L7)

## Accessors

### options

> `get` **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Source

[src/lib/execution/domain/transaction.ts:15](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/transaction.ts#L15)

## Methods

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](Query.md)

• **data**: `any`= `{}`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/execution/domain/transaction.ts:11](https://github.com/lambda-orm/lambdaorm/blob/9190d4bf39aa6350f15661f3c45a32f5840bc656/src/lib/execution/domain/transaction.ts#L11)
