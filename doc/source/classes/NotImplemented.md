[Lambda ORM](../README.md) / NotImplemented

# Class: NotImplemented

## Hierarchy

- `Error`

  ↳ **`NotImplemented`**

## Table of contents

### Constructors

- [constructor](NotImplemented.md#constructor)

### Properties

- [message](NotImplemented.md#message)
- [name](NotImplemented.md#name)
- [stack](NotImplemented.md#stack)
- [prepareStackTrace](NotImplemented.md#preparestacktrace)
- [stackTraceLimit](NotImplemented.md#stacktracelimit)

### Methods

- [captureStackTrace](NotImplemented.md#capturestacktrace)

## Constructors

### constructor

• **new NotImplemented**(`message`): [`NotImplemented`](NotImplemented.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`NotImplemented`](NotImplemented.md)

#### Overrides

Error.constructor

#### Defined in

node_modules/lambdaorm-base/shared/domain/error.d.ts:8

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
