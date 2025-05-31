[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ObservableExecutor

# Interface: ObservableExecutor

Defined in: [src/lib/execution/domain/executor.ts:51](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L51)

## Extended by

- [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Methods

### subscribe()

> **subscribe**(`observer`): `void`

Defined in: [src/lib/execution/domain/executor.ts:52](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L52)

#### Parameters

##### observer

[`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

Defined in: [src/lib/execution/domain/executor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/de442ee62b98645313d73b81a13e3c7cf3edad24/src/lib/execution/domain/executor.ts#L53)

#### Parameters

##### observer

[`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`
