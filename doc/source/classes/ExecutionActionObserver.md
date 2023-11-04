[Lambda ORM](../README.md) / ExecutionActionObserver

# Class: ExecutionActionObserver

## Hierarchy

- [`ActionObserver`](ActionObserver.md)

  ↳ **`ExecutionActionObserver`**

## Table of contents

### Constructors

- [constructor](ExecutionActionObserver.md#constructor)

### Properties

- [actions](ExecutionActionObserver.md#actions)
- [condition](ExecutionActionObserver.md#condition)
- [transactional](ExecutionActionObserver.md#transactional)

### Methods

- [after](ExecutionActionObserver.md#after)
- [before](ExecutionActionObserver.md#before)
- [error](ExecutionActionObserver.md#error)

## Constructors

### constructor

• **new ExecutionActionObserver**(`config`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ListenerConfig`](../interfaces/ListenerConfig.md) |
| `expressions` | `Expressions` |

#### Overrides

[ActionObserver](ActionObserver.md).[constructor](ActionObserver.md#constructor)

#### Defined in

[src/lib/execution/application/services/observer.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/observer.ts#L6)

## Properties

### actions

• **actions**: [`SentenceAction`](../enums/SentenceAction.md)[]

#### Inherited from

[ActionObserver](ActionObserver.md).[actions](ActionObserver.md#actions)

#### Defined in

[src/lib/execution/domain/executor.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/domain/executor.ts#L17)

___

### condition

• `Optional` **condition**: `string`

#### Inherited from

[ActionObserver](ActionObserver.md).[condition](ActionObserver.md#condition)

#### Defined in

[src/lib/execution/domain/executor.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/domain/executor.ts#L18)

___

### transactional

• `Optional` **transactional**: `boolean`

#### Inherited from

[ActionObserver](ActionObserver.md).[transactional](ActionObserver.md#transactional)

#### Defined in

[src/lib/execution/domain/executor.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/domain/executor.ts#L19)

## Methods

### after

▸ **after**(`args`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[ActionObserver](ActionObserver.md).[after](ActionObserver.md#after)

#### Defined in

[src/lib/execution/application/services/observer.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/observer.ts#L17)

___

### before

▸ **before**(`args`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[ActionObserver](ActionObserver.md).[before](ActionObserver.md#before)

#### Defined in

[src/lib/execution/application/services/observer.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/observer.ts#L10)

___

### error

▸ **error**(`args`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[ActionObserver](ActionObserver.md).[error](ActionObserver.md#error)

#### Defined in

[src/lib/execution/application/services/observer.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/df242d69/src/lib/execution/application/services/observer.ts#L24)
