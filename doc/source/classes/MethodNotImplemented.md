[Lambda ORM](../README.md) / MethodNotImplemented

# Class: MethodNotImplemented

## Hierarchy

- `Error`

  ↳ **`MethodNotImplemented`**

## Table of contents

### Constructors

- [constructor](MethodNotImplemented.md#constructor)

### Properties

- [message](MethodNotImplemented.md#message)
- [name](MethodNotImplemented.md#name)
- [stack](MethodNotImplemented.md#stack)
- [prepareStackTrace](MethodNotImplemented.md#preparestacktrace)
- [stackTraceLimit](MethodNotImplemented.md#stacktracelimit)

### Methods

- [captureStackTrace](MethodNotImplemented.md#capturestacktrace)

## Constructors

### constructor

• **new MethodNotImplemented**(`_class`, `method`): [`MethodNotImplemented`](MethodNotImplemented.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_class` | `string` |
| `method` | `string` |

#### Returns

[`MethodNotImplemented`](MethodNotImplemented.md)

#### Overrides

Error.constructor

#### Defined in

[src/lib/shared/domain/error.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/4a9a349e/src/lib/shared/domain/error.ts#L9)

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
