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

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/execution/domain/executor.ts#L46)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/execution/domain/executor.ts#L47)
