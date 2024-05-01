[Lambda ORM](../README.md) / LanguagesService

# Class: LanguagesService

## Table of contents

### Constructors

- [constructor](LanguagesService.md#constructor)

### Properties

- [dialects](LanguagesService.md#dialects)

### Methods

- [add](LanguagesService.md#add)
- [get](LanguagesService.md#get)
- [getByDialect](LanguagesService.md#getbydialect)
- [getDialect](LanguagesService.md#getdialect)

## Constructors

### constructor

• **new LanguagesService**(): [`LanguagesService`](LanguagesService.md)

#### Returns

[`LanguagesService`](LanguagesService.md)

#### Defined in

[src/lib/language/application/services/languagesService.ts:9](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/application/services/languagesService.ts#L9)

## Properties

### dialects

• **dialects**: `any`

#### Defined in

[src/lib/language/application/services/languagesService.ts:6](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/application/services/languagesService.ts#L6)

## Methods

### add

▸ **add**(`language`): [`LanguagesService`](LanguagesService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](../interfaces/Language.md) |

#### Returns

[`LanguagesService`](LanguagesService.md)

#### Defined in

[src/lib/language/application/services/languagesService.ts:14](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/application/services/languagesService.ts#L14)

___

### get

▸ **get**(`name`): [`Language`](../interfaces/Language.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Language`](../interfaces/Language.md)

#### Defined in

[src/lib/language/application/services/languagesService.ts:24](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/application/services/languagesService.ts#L24)

___

### getByDialect

▸ **getByDialect**(`dialect`): [`Language`](../interfaces/Language.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`Language`](../interfaces/Language.md)

#### Defined in

[src/lib/language/application/services/languagesService.ts:32](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/application/services/languagesService.ts#L32)

___

### getDialect

▸ **getDialect**(`name`): [`DialectService`](DialectService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DialectService`](DialectService.md)

#### Defined in

[src/lib/language/application/services/languagesService.ts:43](https://github.com/lambda-orm/lambdaorm/blob/8022ee3bce9daa6285e0a90cb60d21de8b6aa8b6/src/lib/language/application/services/languagesService.ts#L43)
