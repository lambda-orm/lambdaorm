[Lambda ORM](../README.md) / SintaxisError

# Class: SintaxisError

## Hierarchy

- `Error`

  ↳ **`SintaxisError`**

## Table of contents

### Constructors

- [constructor](SintaxisError.md#constructor)

### Properties

- [message](SintaxisError.md#message)
- [name](SintaxisError.md#name)
- [stack](SintaxisError.md#stack)
- [prepareStackTrace](SintaxisError.md#preparestacktrace)
- [stackTraceLimit](SintaxisError.md#stacktracelimit)

### Methods

- [captureStackTrace](SintaxisError.md#capturestacktrace)

## Constructors

### constructor

• **new SintaxisError**(`message`): [`SintaxisError`](SintaxisError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`SintaxisError`](SintaxisError.md)

#### Overrides

Error.constructor

#### Defined in

node_modules/lambdaorm-base/shared/domain/error.d.ts:2

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1078

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:28

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:21
