[Lambda ORM](../README.md) / ActionObserver

# Class: ActionObserver

## Hierarchy

- **`ActionObserver`**

  ↳ [`ExecutionActionObserver`](ExecutionActionObserver.md)

## Table of contents

### Constructors

- [constructor](ActionObserver.md#constructor)

### Properties

- [condition](ActionObserver.md#condition)
- [on](ActionObserver.md#on)
- [transactional](ActionObserver.md#transactional)

### Methods

- [after](ActionObserver.md#after)
- [before](ActionObserver.md#before)
- [error](ActionObserver.md#error)

## Constructors

### constructor

• **new ActionObserver**(`on`, `condition?`, `transactional?`): [`ActionObserver`](ActionObserver.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `on` | `SentenceAction`[] |
| `condition?` | `string` |
| `transactional?` | `boolean` |

#### Returns

[`ActionObserver`](ActionObserver.md)

#### Defined in

[src/lib/execution/domain/executor.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L20)

## Properties

### condition

• `Optional` **condition**: `string`

#### Defined in

[src/lib/execution/domain/executor.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L18)

___

### on

• **on**: `SentenceAction`[]

#### Defined in

[src/lib/execution/domain/executor.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L17)

___

### transactional

• `Optional` **transactional**: `boolean`

#### Defined in

[src/lib/execution/domain/executor.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L19)

## Methods

### after

▸ **after**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L27)

___

### before

▸ **before**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L26)

___

### error

▸ **error**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ActionObserverArgs`](../interfaces/ActionObserverArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/execution/domain/executor.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/execution/domain/executor.ts#L28)
