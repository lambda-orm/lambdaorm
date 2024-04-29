[Lambda ORM](../README.md) / ExecutionActionObserver

# Class: ExecutionActionObserver

## Hierarchy

- [`ActionObserver`](ActionObserver.md)

  ↳ **`ExecutionActionObserver`**

## Table of contents

### Constructors

- [constructor](ExecutionActionObserver.md#constructor)

### Properties

- [condition](ExecutionActionObserver.md#condition)
- [on](ExecutionActionObserver.md#on)
- [transactional](ExecutionActionObserver.md#transactional)

### Methods

- [after](ExecutionActionObserver.md#after)
- [before](ExecutionActionObserver.md#before)
- [error](ExecutionActionObserver.md#error)

## Constructors

### constructor

• **new ExecutionActionObserver**(`config`, `expressions`): [`ExecutionActionObserver`](ExecutionActionObserver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ListenerConfig`](../interfaces/ListenerConfig.md) |
| `expressions` | `Expressions` |

#### Returns

[`ExecutionActionObserver`](ExecutionActionObserver.md)

#### Overrides

[ActionObserver](ActionObserver.md).[constructor](ActionObserver.md#constructor)

#### Defined in

[src/lib/execution/application/services/observer.ts:6](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/application/services/observer.ts#L6)

## Properties

### condition

• `Optional` **condition**: `string`

#### Inherited from

[ActionObserver](ActionObserver.md).[condition](ActionObserver.md#condition)

#### Defined in

[src/lib/execution/domain/executor.ts:18](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/domain/executor.ts#L18)

___

### on

• **on**: [`SentenceAction`](../enums/SentenceAction.md)[]

#### Inherited from

[ActionObserver](ActionObserver.md).[on](ActionObserver.md#on)

#### Defined in

[src/lib/execution/domain/executor.ts:17](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/domain/executor.ts#L17)

___

### transactional

• `Optional` **transactional**: `boolean`

#### Inherited from

[ActionObserver](ActionObserver.md).[transactional](ActionObserver.md#transactional)

#### Defined in

[src/lib/execution/domain/executor.ts:19](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/domain/executor.ts#L19)

## Methods

### after

▸ **after**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[ActionObserver](ActionObserver.md).[after](ActionObserver.md#after)

#### Defined in

[src/lib/execution/application/services/observer.ts:16](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/application/services/observer.ts#L16)

___

### before

▸ **before**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[ActionObserver](ActionObserver.md).[before](ActionObserver.md#before)

#### Defined in

[src/lib/execution/application/services/observer.ts:10](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/application/services/observer.ts#L10)

___

### error

▸ **error**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[ActionObserver](ActionObserver.md).[error](ActionObserver.md#error)

#### Defined in

[src/lib/execution/application/services/observer.ts:22](https://github.com/lambda-orm/lambdaorm/blob/7e116b97708c36fe07c6c3e95513f0adb881478b/src/lib/execution/application/services/observer.ts#L22)
