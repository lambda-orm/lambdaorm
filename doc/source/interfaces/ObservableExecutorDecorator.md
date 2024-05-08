[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ObservableExecutorDecorator

# Interface: ObservableExecutorDecorator

## Extends

- [`Executor`](Executor.md).[`ObservableExecutor`](ObservableExecutor.md)

## Methods

### execute()

> **execute**(`query`, `data`, `options`): `Promise`\<`any`\>

#### Parameters

• **query**: [`Query`](../classes/Query.md)

• **data**: `any`

• **options**: [`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`Executor`](Executor.md).[`execute`](Executor.md#execute)

#### Source

[src/lib/execution/domain/executor.ts:39](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L39)

***

### executeList()

> **executeList**(`queries`, `options`): `Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Parameters

• **queries**: [`Query`](../classes/Query.md)[]

• **options**: [`QueryOptions`](QueryOptions.md)

#### Returns

`Promise`\<[`ExecuteResult`](ExecuteResult.md)[]\>

#### Inherited from

[`Executor`](Executor.md).[`executeList`](Executor.md#executelist)

#### Source

[src/lib/execution/domain/executor.ts:40](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L40)

***

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Inherited from

[`ObservableExecutor`](ObservableExecutor.md).[`subscribe`](ObservableExecutor.md#subscribe)

#### Source

[src/lib/execution/domain/executor.ts:45](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L45)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

#### Parameters

• **options**: [`QueryOptions`](QueryOptions.md)

• **callback**

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Executor`](Executor.md).[`transaction`](Executor.md#transaction)

#### Source

[src/lib/execution/domain/executor.ts:41](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L41)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Inherited from

[`ObservableExecutor`](ObservableExecutor.md).[`unsubscribe`](ObservableExecutor.md#unsubscribe)

#### Source

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L46)
