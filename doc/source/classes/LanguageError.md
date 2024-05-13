[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / LanguageError

# Class: LanguageError

## Extends

- `Error`

## Constructors

### new LanguageError()

> **new LanguageError**(`message`): [`LanguageError`](LanguageError.md)

#### Parameters

• **message**: `string`

#### Returns

[`LanguageError`](LanguageError.md)

#### Overrides

`Error.constructor`

#### Source

[src/lib/language/domain/errors.ts:2](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/language/domain/errors.ts#L2)

## Properties

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### Inherited from

`Error.prepareStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Source

node\_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:21
