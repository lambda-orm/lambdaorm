[Lambda ORM](../README.md) / [model](../modules/model.md) / MethodNotImplemented

# Class: MethodNotImplemented

[model](../modules/model.md).MethodNotImplemented

## Hierarchy

- `Error`

  ↳ **`MethodNotImplemented`**

## Table of contents

### Constructors

- [constructor](model.MethodNotImplemented.md#constructor)

### Properties

- [message](model.MethodNotImplemented.md#message)
- [name](model.MethodNotImplemented.md#name)
- [stack](model.MethodNotImplemented.md#stack)
- [stackTraceLimit](model.MethodNotImplemented.md#stacktracelimit)

### Methods

- [captureStackTrace](model.MethodNotImplemented.md#capturestacktrace)
- [prepareStackTrace](model.MethodNotImplemented.md#preparestacktrace)

## Constructors

### constructor

• **new MethodNotImplemented**(`_class`, `method`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_class` | `string` |
| `method` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/model/error.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/model/error.ts#L10)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1029

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1028

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1030

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
