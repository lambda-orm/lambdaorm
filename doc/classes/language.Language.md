[Lambda ORM](../README.md) / [language](../modules/language.md) / Language

# Class: Language

[language](../modules/language.md).Language

## Table of contents

### Constructors

- [constructor](language.Language.md#constructor)

### Properties

- [dialects](language.Language.md#dialects)
- [hadQuery](language.Language.md#hadquery)
- [libraries](language.Language.md#libraries)
- [name](language.Language.md#name)

### Accessors

- [query](language.Language.md#query)
- [schema](language.Language.md#schema)

### Methods

- [addLibrary](language.Language.md#addlibrary)
- [metadata](language.Language.md#metadata)

## Constructors

### constructor

• **new Language**(`name`, `queryBuilder`, `schemaBuilder`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `queryBuilder` | [`LanguageQueryBuilder`](language.LanguageQueryBuilder.md) |
| `schemaBuilder` | [`LanguageSchemaBuilder`](language.LanguageSchemaBuilder.md) |

#### Defined in

[language/language.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L12)

## Properties

### dialects

• **dialects**: `any`

#### Defined in

[language/language.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L8)

___

### hadQuery

• **hadQuery**: `boolean`

#### Defined in

[language/language.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L9)

___

### libraries

• **libraries**: `any`

#### Defined in

[language/language.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L7)

___

### name

• **name**: `string`

#### Defined in

[language/language.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L6)

## Accessors

### query

• `get` **query**(): [`LanguageQueryBuilder`](language.LanguageQueryBuilder.md)

#### Returns

[`LanguageQueryBuilder`](language.LanguageQueryBuilder.md)

#### Defined in

[language/language.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L35)

___

### schema

• `get` **schema**(): [`LanguageSchemaBuilder`](language.LanguageSchemaBuilder.md)

#### Returns

[`LanguageSchemaBuilder`](language.LanguageSchemaBuilder.md)

#### Defined in

[language/language.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L31)

## Methods

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | `any` |

#### Returns

`void`

#### Defined in

[language/language.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L21)

___

### metadata

▸ **metadata**(`dialect`): [`DialectMetadata`](language.DialectMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`DialectMetadata`](language.DialectMetadata.md)

#### Defined in

[language/language.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/language.ts#L39)
