[Lambda ORM](../README.md) / [language](../modules/language.md) / LanguageManager

# Class: LanguageManager

[language](../modules/language.md).LanguageManager

## Table of contents

### Constructors

- [constructor](language.LanguageManager.md#constructor)

### Properties

- [dialects](language.LanguageManager.md#dialects)
- [languageModel](language.LanguageManager.md#languagemodel)
- [metadata](language.LanguageManager.md#metadata)

### Methods

- [add](language.LanguageManager.md#add)
- [addLibrary](language.LanguageManager.md#addlibrary)
- [build](language.LanguageManager.md#build)
- [deserialize](language.LanguageManager.md#deserialize)
- [dialectMetadata](language.LanguageManager.md#dialectmetadata)
- [eval](language.LanguageManager.md#eval)
- [get](language.LanguageManager.md#get)
- [model](language.LanguageManager.md#model)
- [parameters](language.LanguageManager.md#parameters)
- [queryBuilder](language.LanguageManager.md#querybuilder)
- [schemaBuilder](language.LanguageManager.md#schemabuilder)
- [sentence](language.LanguageManager.md#sentence)
- [serialize](language.LanguageManager.md#serialize)

## Constructors

### constructor

• **new LanguageManager**(`languageModel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `languageModel` | [`Model`](parser.Model.md) |

#### Defined in

[language/languageManager.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L21)

## Properties

### dialects

• **dialects**: `any`

#### Defined in

[language/languageManager.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L15)

___

### languageModel

• **languageModel**: [`Model`](parser.Model.md)

#### Defined in

[language/languageManager.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L16)

___

### metadata

• **metadata**: `OperandMetadata`

#### Defined in

[language/languageManager.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L17)

## Methods

### add

▸ **add**(`language`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](language.Language.md) |

#### Returns

`void`

#### Defined in

[language/languageManager.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L34)

___

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | `Library` |

#### Returns

`void`

#### Defined in

[language/languageManager.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L30)

___

### build

▸ **build**(`node`, `schema`): [`Operand`](language.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |

#### Returns

[`Operand`](language.Operand.md)

#### Defined in

[language/languageManager.ts:48](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L48)

___

### deserialize

▸ **deserialize**(`serialized`): [`Operand`](language.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serialized` | `any` |

#### Returns

[`Operand`](language.Operand.md)

#### Defined in

[language/languageManager.ts:87](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L87)

___

### dialectMetadata

▸ **dialectMetadata**(`dialect`): [`DialectMetadata`](language.DialectMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`DialectMetadata`](language.DialectMetadata.md)

#### Defined in

[language/languageManager.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L44)

___

### eval

▸ **eval**(`operand`, `dataContext`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](language.Operand.md) |
| `dataContext` | [`DataContext`](model.DataContext.md) |

#### Returns

`any`

#### Defined in

[language/languageManager.ts:91](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L91)

___

### get

▸ **get**(`dialect`): [`Language`](language.Language.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`Language`](language.Language.md)

#### Defined in

[language/languageManager.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L39)

___

### model

▸ **model**(`sentence`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

`any`

#### Defined in

[language/languageManager.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L52)

___

### parameters

▸ **parameters**(`sentence`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

`any`

#### Defined in

[language/languageManager.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L56)

___

### queryBuilder

▸ **queryBuilder**(`dialect`): [`LanguageQueryBuilder`](language.LanguageQueryBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`LanguageQueryBuilder`](language.LanguageQueryBuilder.md)

#### Defined in

[language/languageManager.ts:60](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L60)

___

### schemaBuilder

▸ **schemaBuilder**(`dialect`): [`LanguageSchemaBuilder`](language.LanguageSchemaBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`LanguageSchemaBuilder`](language.LanguageSchemaBuilder.md)

#### Defined in

[language/languageManager.ts:64](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L64)

___

### sentence

▸ **sentence**(`query`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Query`](model.Query.md) |

#### Returns

`any`

#### Defined in

[language/languageManager.ts:73](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L73)

___

### serialize

▸ **serialize**(`operand`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](language.Operand.md) |

#### Returns

`any`

#### Defined in

[language/languageManager.ts:83](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/language/languageManager.ts#L83)
