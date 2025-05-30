[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ObservableExecutor

# Interface: ObservableExecutor

Defined in: [src/lib/execution/domain/executor.ts:51](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L51)

## Extended by

- [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Methods

### subscribe()

> **subscribe**(`observer`): `void`

Defined in: [src/lib/execution/domain/executor.ts:52](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L52)

#### Parameters

##### observer

[`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

Defined in: [src/lib/execution/domain/executor.ts:53](https://github.com/lambda-orm/lambdaorm/blob/d458bba636206871821586fca1a7822cc50e2446/src/lib/execution/domain/executor.ts#L53)

#### Parameters

##### observer

[`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`
