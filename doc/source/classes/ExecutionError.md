[Lambda ORM](../README.md) / ExecutionError

# Class: ExecutionError

## Hierarchy

- `Error`

  ↳ **`ExecutionError`**

## Table of contents

### Constructors

- [constructor](ExecutionError.md#constructor)

### Properties

- [message](ExecutionError.md#message)
- [name](ExecutionError.md#name)
- [stack](ExecutionError.md#stack)
- [prepareStackTrace](ExecutionError.md#preparestacktrace)
- [stackTraceLimit](ExecutionError.md#stacktracelimit)

### Methods

- [captureStackTrace](ExecutionError.md#capturestacktrace)

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

[src/lib/connection/domain/errors.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/fb7ffe05/src/lib/connection/domain/errors.ts#L9)

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

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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
