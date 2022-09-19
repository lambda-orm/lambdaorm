[Lambda ORM](../README.md) / [model](../modules/model.md) / ExecutionError

# Class: ExecutionError

[model](../modules/model.md).ExecutionError

## Hierarchy

- `Error`

  ↳ **`ExecutionError`**

## Table of contents

### Constructors

- [constructor](model.ExecutionError.md#constructor)

### Properties

- [message](model.ExecutionError.md#message)
- [name](model.ExecutionError.md#name)
- [stack](model.ExecutionError.md#stack)
- [stackTraceLimit](model.ExecutionError.md#stacktracelimit)

### Methods

- [captureStackTrace](model.ExecutionError.md#capturestacktrace)
- [prepareStackTrace](model.ExecutionError.md#preparestacktrace)

## Constructors

### constructor

• **new ExecutionError**(`source`, `entity`, `sentence`, `message`, `data?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |
| `entity` | `string` |
| `sentence` | `string` |
| `message` | `string` |
| `data` | `any` |

#### Overrides

Error.constructor

#### Defined in

[src/lib/model/error.ts:44](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/model/error.ts#L44)

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
