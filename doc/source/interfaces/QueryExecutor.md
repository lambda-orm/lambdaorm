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

[src/lib/execution/domain/executor.ts:38](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/domain/executor.ts#L38)

## Methods

### commit()

> **commit**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:39](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/domain/executor.ts#L39)

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](../classes/Query.md)

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/execution/domain/executor.ts:42](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/domain/executor.ts#L42)

***

### release()

> **release**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:41](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/domain/executor.ts#L41)

***

### rollback()

> **rollback**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:40](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/execution/domain/executor.ts#L40)
