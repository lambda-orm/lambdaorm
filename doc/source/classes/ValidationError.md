[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ValidationError

# Class: ValidationError

## Extends

- `Error`

## Constructors

### new ValidationError()

> **new ValidationError**(`source`, `entity`, `expression`, `sentence`, `message`, `data`): [`ValidationError`](ValidationError.md)

#### Parameters

• **source**: `string`

• **entity**: `string`

• **expression**: `string`

• **sentence**: `string`

• **message**: `string`

• **data**: `any`= `{}`

#### Returns

[`ValidationError`](ValidationError.md)

#### Overrides

`Error.constructor`

#### Source

[src/lib/execution/domain/errors.ts:2](https://github.com/lambda-orm/lambdaorm/blob/a18b8b74c6a37e9bf429123d2232fbfd3236757c/src/lib/execution/domain/errors.ts#L2)

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
