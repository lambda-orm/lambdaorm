[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryTransaction

# Class: QueryTransaction

## Constructors

### new QueryTransaction()

> **new QueryTransaction**(`transaction`, `builder`, `expressions`): [`QueryTransaction`](QueryTransaction.md)

#### Parameters

• **transaction**: [`Transaction`](Transaction.md)

• **builder**: [`IQueryBuilder`](../interfaces/IQueryBuilder.md)

• **expressions**: `Expressions`

#### Returns

[`QueryTransaction`](QueryTransaction.md)

#### Source

[src/lib/expressions/application/useCases/transaction.ts:9](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/expressions/application/useCases/transaction.ts#L9)

## Methods

### execute()

#### execute(query, data)

> **execute**(`query`, `data`?): `Promise`\<`any`\>

##### Parameters

• **query**: `Function`

• **data?**: `any`

##### Returns

`Promise`\<`any`\>

##### Source

[src/lib/expressions/application/useCases/transaction.ts:13](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/expressions/application/useCases/transaction.ts#L13)

#### execute(query, data)

> **execute**(`query`, `data`?): `Promise`\<`any`\>

##### Parameters

• **query**: `string`

• **data?**: `any`

##### Returns

`Promise`\<`any`\>

##### Source

[src/lib/expressions/application/useCases/transaction.ts:14](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/expressions/application/useCases/transaction.ts#L14)

***

### executeQuery()

> **executeQuery**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](Query.md)

• **data**: `any`= `{}`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/expressions/application/useCases/transaction.ts:23](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/expressions/application/useCases/transaction.ts#L23)
