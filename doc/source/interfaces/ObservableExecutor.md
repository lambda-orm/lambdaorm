[Lambda ORM](../README.md) / ObservableExecutor

# Interface: ObservableExecutor

## Hierarchy

- **`ObservableExecutor`**

  ↳ [`ObservableExecutorDecorator`](ObservableExecutorDecorator.md)

## Implemented by

- [`ExecutorImpl`](../classes/ExecutorImpl.md)

## Table of contents

### Methods

- [subscribe](ObservableExecutor.md#subscribe)
- [unsubscribe](ObservableExecutor.md#unsubscribe)

## Methods

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/execution/domain/executor.ts#L46)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/7c2a88327de4f968eecbd2fa893e92af74e120dc/src/lib/execution/domain/executor.ts#L47)
