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

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/execution/domain/executor.ts#L46)

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

[src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/efd15f74cf775a1cca0ba4f4c4fabcb10e923ec0/src/lib/execution/domain/executor.ts#L47)
