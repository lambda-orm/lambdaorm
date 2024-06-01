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

[src/lib/language/application/services/languagesService.ts:8](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/language/application/services/languagesService.ts#L8)

## Properties

### dialects

> **dialects**: `any`

#### Source

[src/lib/language/application/services/languagesService.ts:5](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/language/application/services/languagesService.ts#L5)

## Methods

### add()

> **add**(`language`): [`LanguagesService`](LanguagesService.md)

#### Parameters

• **language**: [`Language`](../interfaces/Language.md)

#### Returns

[`LanguagesService`](LanguagesService.md)

#### Source

[src/lib/language/application/services/languagesService.ts:13](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/language/application/services/languagesService.ts#L13)

***

### get()

> **get**(`name`): [`Language`](../interfaces/Language.md)

#### Parameters

• **name**: `string`

#### Returns

[`Language`](../interfaces/Language.md)

#### Source

[src/lib/language/application/services/languagesService.ts:23](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/language/application/services/languagesService.ts#L23)

***

### getByDialect()

> **getByDialect**(`dialect`): [`Language`](../interfaces/Language.md)

#### Parameters

• **dialect**: `string`

#### Returns

[`Language`](../interfaces/Language.md)

#### Source

[src/lib/language/application/services/languagesService.ts:31](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/language/application/services/languagesService.ts#L31)

***

### getDialect()

> **getDialect**(`name`): [`DialectService`](../interfaces/DialectService.md)

#### Parameters

• **name**: `string`

#### Returns

[`DialectService`](../interfaces/DialectService.md)

#### Source

[src/lib/language/application/services/languagesService.ts:42](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/language/application/services/languagesService.ts#L42)
