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

[src/lib/shared/domain/error.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/11da7208/src/lib/shared/domain/error.ts#L16)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

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

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

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

node_modules/@types/node/globals.d.ts:4
