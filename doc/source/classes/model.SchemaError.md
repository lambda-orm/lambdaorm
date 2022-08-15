[Lambda ORM](../README.md) / [model](../modules/model.md) / SchemaError

# Class: SchemaError

[model](../modules/model.md).SchemaError

## Hierarchy

- `Error`

  ↳ **`SchemaError`**

## Table of contents

### Constructors

- [constructor](model.SchemaError.md#constructor)

### Properties

- [message](model.SchemaError.md#message)
- [name](model.SchemaError.md#name)
- [stack](model.SchemaError.md#stack)
- [stackTraceLimit](model.SchemaError.md#stacktracelimit)

### Methods

- [captureStackTrace](model.SchemaError.md#capturestacktrace)
- [prepareStackTrace](model.SchemaError.md#preparestacktrace)

## Constructors

### constructor

• **new SchemaError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/model/error.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/model/error.ts#L24)

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
