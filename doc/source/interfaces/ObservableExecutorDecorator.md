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

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/executor.ts#L46)

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

[src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/executor.ts#L47)

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

[src/lib/execution/domain/executor.ts:52](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/executor.ts#L52)

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

[src/lib/execution/domain/executor.ts:48](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/executor.ts#L48)

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

[src/lib/execution/domain/executor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/execution/domain/executor.ts#L53)
