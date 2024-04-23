[Lambda ORM](../README.md) / ValidationError

# Class: ValidationError

## Hierarchy

- `Error`

  ↳ **`ValidationError`**

## Table of contents

### Constructors

- [constructor](ValidationError.md#constructor)

### Properties

- [message](ValidationError.md#message)
- [name](ValidationError.md#name)
- [stack](ValidationError.md#stack)
- [prepareStackTrace](ValidationError.md#preparestacktrace)
- [stackTraceLimit](ValidationError.md#stacktracelimit)

### Methods

- [captureStackTrace](ValidationError.md#capturestacktrace)

## Constructors

### constructor

• **new ValidationError**(`source`, `entity`, `expression`, `sentence`, `message`, `data?`): [`ValidationError`](ValidationError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |
| `entity` | `string` |
| `expression` | `string` |
| `sentence` | `string` |
| `message` | `string` |
| `data` | `any` |

#### Returns

[`ValidationError`](ValidationError.md)

#### Overrides

Error.constructor

#### Defined in

[src/lib/execution/domain/errors.ts:2](https://github.com/lambda-orm/lambdaorm/blob/a1b2a8bd3335f82dbdf370484a84aa1caac0f9fa/src/lib/execution/domain/errors.ts#L2)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1078

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

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
