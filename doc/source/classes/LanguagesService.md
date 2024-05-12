[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / LanguagesService

# Class: LanguagesService

## Constructors

### new LanguagesService()

> **new LanguagesService**(): [`LanguagesService`](LanguagesService.md)

#### Returns

[`LanguagesService`](LanguagesService.md)

#### Source

[src/lib/language/application/services/languagesService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/language/application/services/languagesService.ts#L9)

## Properties

### dialects

> **dialects**: `any`

#### Source

[src/lib/language/application/services/languagesService.ts:6](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/language/application/services/languagesService.ts#L6)

## Methods

### add()

> **add**(`language`): [`LanguagesService`](LanguagesService.md)

#### Parameters

• **language**: [`Language`](../interfaces/Language.md)

#### Returns

[`LanguagesService`](LanguagesService.md)

#### Source

[src/lib/language/application/services/languagesService.ts:14](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/language/application/services/languagesService.ts#L14)

***

### get()

> **get**(`name`): [`Language`](../interfaces/Language.md)

#### Parameters

• **name**: `string`

#### Returns

[`Language`](../interfaces/Language.md)

#### Source

[src/lib/language/application/services/languagesService.ts:24](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/language/application/services/languagesService.ts#L24)

***

### getByDialect()

> **getByDialect**(`dialect`): [`Language`](../interfaces/Language.md)

#### Parameters

• **dialect**: `string`

#### Returns

[`Language`](../interfaces/Language.md)

#### Source

[src/lib/language/application/services/languagesService.ts:32](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/language/application/services/languagesService.ts#L32)

***

### getDialect()

> **getDialect**(`name`): [`DialectService`](DialectService.md)

#### Parameters

• **name**: `string`

#### Returns

[`DialectService`](DialectService.md)

#### Source

[src/lib/language/application/services/languagesService.ts:43](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/language/application/services/languagesService.ts#L43)
