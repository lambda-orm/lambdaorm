[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Executor

# Interface: Executor

## Extended by

- [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Methods

### execute()

> **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](../classes/Query.md)

• **data**: `any`

• **options**: [`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/execution/domain/executor.ts:39](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L39)

***

### executeList()

> **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Parameters

• **queries**: [`Query`](../classes/Query.md)[]

• **options**: [`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Source

[src/lib/execution/domain/executor.ts:40](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L40)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

#### Parameters

• **options**: [`QueryOptions`](QueryOptions.md)

• **callback**

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/execution/domain/executor.ts:41](https://github.com/lambda-orm/lambdaorm/blob/8a01b53f47623b9bd9ec972811e7799ca3c023c6/src/lib/execution/domain/executor.ts#L41)
