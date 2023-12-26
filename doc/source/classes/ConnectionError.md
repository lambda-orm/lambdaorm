[Lambda ORM](../README.md) / ConnectionError

# Class: ConnectionError

## Hierarchy

- `Error`

  ↳ **`ConnectionError`**

## Table of contents

### Constructors

- [constructor](ConnectionError.md#constructor)

### Properties

- [message](ConnectionError.md#message)
- [name](ConnectionError.md#name)
- [stack](ConnectionError.md#stack)
- [prepareStackTrace](ConnectionError.md#preparestacktrace)
- [stackTraceLimit](ConnectionError.md#stacktracelimit)

### Methods

- [captureStackTrace](ConnectionError.md#capturestacktrace)

## Constructors

### constructor

• **new ConnectionError**(`message`): [`ConnectionError`](ConnectionError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`ConnectionError`](ConnectionError.md)

#### Overrides

Error.constructor

#### Defined in

[src/lib/connection/domain/errors.ts:2](https://github.com/FlavioLionelRita/lambdaorm/blob/6f505321/src/lib/connection/domain/errors.ts#L2)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1075

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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
