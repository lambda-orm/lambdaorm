[Lambda ORM](../README.md) / [language](../modules/language.md) / Language

# Class: Language

[language](../modules/language.md).Language

## Table of contents

### Constructors

- [constructor](language.Language.md#constructor)

### Properties

- [dialects](language.Language.md#dialects)

### Methods

- [ddlBuilder](language.Language.md#ddlbuilder)
- [dialectMetadata](language.Language.md#dialectmetadata)
- [dmlBuilder](language.Language.md#dmlbuilder)

## Constructors

### constructor

• **new Language**(`dialects`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialects` | `any` |

#### Defined in

[src/lib/language/language.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/language/language.ts#L6)

## Properties

### dialects

• **dialects**: `any`

#### Defined in

[src/lib/language/language.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/language/language.ts#L5)

## Methods

### ddlBuilder

▸ `Abstract` **ddlBuilder**(`dataSource`, `dialect`, `mapping`): [`LanguageDDLBuilder`](language.LanguageDDLBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `string` |
| `dialect` | `string` |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |

#### Returns

[`LanguageDDLBuilder`](language.LanguageDDLBuilder.md)

#### Defined in

[src/lib/language/language.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/language/language.ts#L20)

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

[src/lib/language/language.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/language/language.ts#L16)

___

### dmlBuilder

▸ `Abstract` **dmlBuilder**(`dataSource`, `dialect`, `mapping`): [`LanguageDMLBuilder`](language.LanguageDMLBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `string` |
| `dialect` | `string` |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |

#### Returns

[`LanguageDMLBuilder`](language.LanguageDMLBuilder.md)

#### Defined in

[src/lib/language/language.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/language/language.ts#L22)
