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

[src/lib/execution/domain/executor.ts:52](https://github.com/lambda-orm/lambdaorm/blob/500b65f534ab1bcb8cf5af2781a7f18794a4944e/src/lib/execution/domain/executor.ts#L52)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/execution/domain/executor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/500b65f534ab1bcb8cf5af2781a7f18794a4944e/src/lib/execution/domain/executor.ts#L53)
