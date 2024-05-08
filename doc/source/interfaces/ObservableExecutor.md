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

[src/lib/execution/domain/executor.ts:52](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/execution/domain/executor.ts#L52)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/execution/domain/executor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/execution/domain/executor.ts#L53)
