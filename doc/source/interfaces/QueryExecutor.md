[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryExecutor

# Interface: QueryExecutor

## Accessors

### options

> `get` **options**(): [`QueryOptions`](QueryOptions.md)

#### Returns

[`QueryOptions`](QueryOptions.md)

#### Source

[src/lib/execution/domain/executor.ts:31](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L31)

## Methods

### commit()

> **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:32](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L32)

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](../classes/Query.md)

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/execution/domain/executor.ts:35](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L35)

***

### release()

> **release**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:34](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L34)

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:33](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L33)
