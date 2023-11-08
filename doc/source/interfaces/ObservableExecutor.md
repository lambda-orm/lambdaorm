[Lambda ORM](../README.md) / ObservableExecutor

# Interface: ObservableExecutor

## Implemented by

- [`ObservableExecutorDecorator`](../classes/ObservableExecutorDecorator.md)

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

[src/lib/execution/domain/executor.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/f4aa3e79/src/lib/execution/domain/executor.ts#L38)

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

[src/lib/execution/domain/executor.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/f4aa3e79/src/lib/execution/domain/executor.ts#L39)
