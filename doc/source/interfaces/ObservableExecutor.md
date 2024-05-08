[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ObservableExecutor

# Interface: ObservableExecutor

## Extended by

- [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Methods

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/execution/domain/executor.ts:45](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L45)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/15952b17a2af20fc678f913dd5cbf226a467196b/src/lib/execution/domain/executor.ts#L46)
