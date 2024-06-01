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

[src/lib/execution/domain/transaction.ts:7](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/transaction.ts#L7)

## Accessors

### options

> `get` **options**(): [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Source

[src/lib/execution/domain/transaction.ts:15](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/transaction.ts#L15)

## Methods

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](Query.md)

• **data**: `any`= `{}`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/execution/domain/transaction.ts:11](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/transaction.ts#L11)
