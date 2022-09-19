[Lambda ORM](../README.md) / [model](../modules/model.md) / ActionObserver

# Class: ActionObserver

[model](../modules/model.md).ActionObserver

## Table of contents

### Constructors

- [constructor](model.ActionObserver.md#constructor)

### Properties

- [action](model.ActionObserver.md#action)
- [condition](model.ActionObserver.md#condition)

### Methods

- [after](model.ActionObserver.md#after)
- [before](model.ActionObserver.md#before)
- [error](model.ActionObserver.md#error)

## Constructors

### constructor

• **new ActionObserver**(`action`, `condition?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ObservableAction`](../enums/model.ObservableAction.md) |
| `condition?` | `string` |

#### Defined in

[src/lib/model/observer.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/observer.ts#L25)

## Properties

### action

• **action**: [`ObservableAction`](../enums/model.ObservableAction.md)

#### Defined in

[src/lib/model/observer.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/observer.ts#L23)

___

### condition

• `Optional` **condition**: `string`

#### Defined in

[src/lib/model/observer.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/observer.ts#L24)

## Methods

### after

▸ `Abstract` **after**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/model.ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/observer.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/observer.ts#L31)

___

### before

▸ `Abstract` **before**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/model.ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/observer.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/observer.ts#L30)

___

### error

▸ `Abstract` **error**(`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/model.ActionObserverArgs.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/observer.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/observer.ts#L32)
