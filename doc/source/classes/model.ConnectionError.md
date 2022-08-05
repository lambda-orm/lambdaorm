[Lambda ORM](../README.md) / [model](../modules/model.md) / ConnectionError

# Class: ConnectionError

[model](../modules/model.md).ConnectionError

## Hierarchy

- `Error`

  ↳ **`ConnectionError`**

## Table of contents

### Constructors

- [constructor](model.ConnectionError.md#constructor)

### Properties

- [message](model.ConnectionError.md#message)
- [name](model.ConnectionError.md#name)
- [stack](model.ConnectionError.md#stack)
- [stackTraceLimit](model.ConnectionError.md#stacktracelimit)

### Methods

- [captureStackTrace](model.ConnectionError.md#capturestacktrace)
- [prepareStackTrace](model.ConnectionError.md#preparestacktrace)

## Constructors

### constructor

• **new ConnectionError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/model/error.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/model/error.ts#L31)

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
