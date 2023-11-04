[Lambda ORM](../README.md) / SchemaError

# Class: SchemaError

## Hierarchy

- `Error`

  ↳ **`SchemaError`**

## Table of contents

### Constructors

- [constructor](SchemaError.md#constructor)

### Properties

- [message](SchemaError.md#message)
- [name](SchemaError.md#name)
- [stack](SchemaError.md#stack)
- [prepareStackTrace](SchemaError.md#preparestacktrace)
- [stackTraceLimit](SchemaError.md#stacktracelimit)

### Methods

- [captureStackTrace](SchemaError.md#capturestacktrace)

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

[src/lib/schema/domain/errors.ts:2](https://github.com/FlavioLionelRita/lambdaorm/blob/1e58311b/lib/src/lib/schema/domain/errors.ts#L2)

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
