[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / LanguagesService

# Class: LanguagesService

Defined in: [src/lib/language/application/services/languagesService.ts:4](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L4)

## Constructors

### Constructor

> **new LanguagesService**(): `LanguagesService`

Defined in: [src/lib/language/application/services/languagesService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L8)

#### Returns

`LanguagesService`

## Properties

### dialects

> **dialects**: `any`

Defined in: [src/lib/language/application/services/languagesService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L5)

## Methods

### add()

> **add**(`language`): `LanguagesService`

Defined in: [src/lib/language/application/services/languagesService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L13)

#### Parameters

##### language

[`Language`](../interfaces/Language.md)

#### Returns

`LanguagesService`

***

### get()

> **get**(`name`): [`Language`](../interfaces/Language.md)

Defined in: [src/lib/language/application/services/languagesService.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L23)

#### Parameters

##### name

`string`

#### Returns

[`Language`](../interfaces/Language.md)

***

### getByDialect()

> **getByDialect**(`dialect`): [`Language`](../interfaces/Language.md)

Defined in: [src/lib/language/application/services/languagesService.ts:31](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L31)

#### Parameters

##### dialect

`string`

#### Returns

[`Language`](../interfaces/Language.md)

***

### getDialect()

> **getDialect**(`name`): [`DialectService`](../interfaces/DialectService.md)

Defined in: [src/lib/language/application/services/languagesService.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/language/application/services/languagesService.ts#L42)

#### Parameters

##### name

`string`

#### Returns

[`DialectService`](../interfaces/DialectService.md)
