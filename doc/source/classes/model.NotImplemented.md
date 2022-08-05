[Lambda ORM](../README.md) / [model](../modules/model.md) / NotImplemented

# Class: NotImplemented

[model](../modules/model.md).NotImplemented

## Hierarchy

- `Error`

  ↳ **`NotImplemented`**

## Table of contents

### Constructors

- [constructor](model.NotImplemented.md#constructor)

### Properties

- [message](model.NotImplemented.md#message)
- [name](model.NotImplemented.md#name)
- [stack](model.NotImplemented.md#stack)
- [stackTraceLimit](model.NotImplemented.md#stacktracelimit)

### Methods

- [captureStackTrace](model.NotImplemented.md#capturestacktrace)
- [prepareStackTrace](model.NotImplemented.md#preparestacktrace)

## Constructors

### constructor

• **new NotImplemented**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/model/error.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/error.ts#L17)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

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

___

### prepareStackTrace

▸ `Static` `Optional` **prepareStackTrace**(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11
