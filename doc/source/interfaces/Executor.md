[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Executor

# Interface: Executor

Defined in: [src/lib/execution/domain/executor.ts:45](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L45)

## Extended by

- [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Methods

### execute()

> **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

Defined in: [src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L46)

#### Parameters

##### query

[`Query`](../classes/Query.md)

##### data

`any`

##### options

[`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<`any`\>

***

### executeList()

> **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

Defined in: [src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L47)

#### Parameters

##### queries

[`Query`](../classes/Query.md)[]

##### options

[`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:48](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L48)

#### Parameters

##### options

[`QueryOptions`](QueryOptions.md)

##### callback

(`tr`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
