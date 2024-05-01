[Lambda ORM](../README.md) / LanguageError

# Class: LanguageError

## Hierarchy

- `Error`

  ↳ **`LanguageError`**

## Table of contents

### Constructors

- [constructor](LanguageError.md#constructor)

### Properties

- [message](LanguageError.md#message)
- [name](LanguageError.md#name)
- [stack](LanguageError.md#stack)
- [prepareStackTrace](LanguageError.md#preparestacktrace)
- [stackTraceLimit](LanguageError.md#stacktracelimit)

### Methods

- [captureStackTrace](LanguageError.md#capturestacktrace)

## Constructors

### constructor

• **new LanguageError**(`message`): [`LanguageError`](LanguageError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`LanguageError`](LanguageError.md)

#### Overrides

Error.constructor

#### Defined in

[src/lib/language/domain/errors.ts:2](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/domain/errors.ts#L2)

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
