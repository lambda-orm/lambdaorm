[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ObservableExecutorDecorator

# Interface: ObservableExecutorDecorator

Defined in: [src/lib/execution/domain/executor.ts:56](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L56)

## Extends

- [`Executor`](Executor.md).[`ObservableExecutor`](ObservableExecutor.md)

## Methods

### execute()

> **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

Defined in: [src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L46)

#### Parameters

##### query

[`Query`](../classes/Query.md)

##### data

`any`

##### options

[`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`Executor`](Executor.md).[`execute`](Executor.md#execute)

***

### executeList()

> **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

Defined in: [src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L47)

#### Parameters

##### queries

[`Query`](../classes/Query.md)[]

##### options

[`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Inherited from

[`Executor`](Executor.md).[`executeList`](Executor.md#executelist)

***

### subscribe()

> **subscribe**(`observer`): `void`

Defined in: [src/lib/execution/domain/executor.ts:52](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L52)

#### Parameters

##### observer

[`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Inherited from

[`ObservableExecutor`](ObservableExecutor.md).[`subscribe`](ObservableExecutor.md#subscribe)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Defined in: [src/lib/execution/domain/executor.ts:48](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L48)

#### Parameters

##### options

[`QueryOptions`](QueryOptions.md)

##### callback

(`tr`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Executor`](Executor.md).[`transaction`](Executor.md#transaction)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

Defined in: [src/lib/execution/domain/executor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/execution/domain/executor.ts#L53)

#### Parameters

##### observer

[`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Inherited from

[`ObservableExecutor`](ObservableExecutor.md).[`unsubscribe`](ObservableExecutor.md#unsubscribe)
