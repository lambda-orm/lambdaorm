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
| `on` | [`SentenceAction`](../enums/SentenceAction.md)[] |
| `condition?` | `string` |
| `transactional?` | `boolean` |

#### Returns

[`ActionObserver`](ActionObserver.md)

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:20](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L20)
=======
[src/lib/execution/domain/executor.ts:20](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L20)
>>>>>>> release/1.2.0

## Properties

### condition

• `Optional` **condition**: `string`

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:18](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L18)
=======
[src/lib/execution/domain/executor.ts:18](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L18)
>>>>>>> release/1.2.0

___

### on

• **on**: [`SentenceAction`](../enums/SentenceAction.md)[]

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:17](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L17)
=======
[src/lib/execution/domain/executor.ts:17](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L17)
>>>>>>> release/1.2.0

___

### transactional

• `Optional` **transactional**: `boolean`

#### Defined in

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L19)
=======
[src/lib/execution/domain/executor.ts:19](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L19)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:27](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L27)
=======
[src/lib/execution/domain/executor.ts:27](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L27)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:26](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L26)
=======
[src/lib/execution/domain/executor.ts:26](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L26)
>>>>>>> release/1.2.0

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

<<<<<<< HEAD
[src/lib/execution/domain/executor.ts:28](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/execution/domain/executor.ts#L28)
=======
[src/lib/execution/domain/executor.ts:28](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/execution/domain/executor.ts#L28)
>>>>>>> release/1.2.0
