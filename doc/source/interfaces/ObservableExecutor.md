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

[src/lib/execution/domain/executor.ts:46](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/execution/domain/executor.ts#L46)

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

[src/lib/execution/domain/executor.ts:47](https://github.com/lambda-orm/lambdaorm/blob/038cc1a2543db5118b446ee9dde9bed060bf0e1f/src/lib/execution/domain/executor.ts#L47)
