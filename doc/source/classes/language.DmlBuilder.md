[Lambda ORM](../README.md) / [language](../modules/language.md) / DmlBuilder

# Class: DmlBuilder

[language](../modules/language.md).DmlBuilder

## Table of contents

### Constructors

- [constructor](language.DmlBuilder.md#constructor)

### Methods

- [build](language.DmlBuilder.md#build)

## Constructors

### constructor

• **new DmlBuilder**(`dataSource`, `mapping`, `dialect`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | [`DataSource`](../interfaces/model.DataSource.md) |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `dialect` | [`Dialect`](manager.Dialect.md) |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/language/dmlBuilder.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/language/dmlBuilder.ts#L12)

## Methods

### build

▸ **build**(`sentence`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Sentence`](model.Sentence.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/language/dmlBuilder.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/language/dmlBuilder.ts#L19)
