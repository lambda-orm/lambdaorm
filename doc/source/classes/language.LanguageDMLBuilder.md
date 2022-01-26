[Lambda ORM](../README.md) / [language](../modules/language.md) / LanguageDMLBuilder

# Class: LanguageDMLBuilder

[language](../modules/language.md).LanguageDMLBuilder

## Table of contents

### Constructors

- [constructor](language.LanguageDMLBuilder.md#constructor)

### Methods

- [build](language.LanguageDMLBuilder.md#build)

## Constructors

### constructor

• **new LanguageDMLBuilder**(`dataSource`, `mapping`, `metadata`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `string` |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Defined in

[src/lib/manager/dmlBuilder.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/dmlBuilder.ts#L12)

## Methods

### build

▸ `Abstract` **build**(`sentence`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](language.Sentence.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/dmlBuilder.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/dmlBuilder.ts#L19)
