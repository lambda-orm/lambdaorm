[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Language

# Class: Language

[manager](../modules/manager.md).Language

## Table of contents

### Constructors

- [constructor](manager.Language.md#constructor)

### Properties

- [dialects](manager.Language.md#dialects)
- [name](manager.Language.md#name)
- [solveComposite](manager.Language.md#solvecomposite)

### Methods

- [ddlBuilder](manager.Language.md#ddlbuilder)
- [dmlBuild](manager.Language.md#dmlbuild)
- [getDialect](manager.Language.md#getdialect)

## Constructors

### constructor

• **new Language**(`name`, `dialects`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `dialects` | `any` |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/language.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L12)

## Properties

### dialects

• **dialects**: [`Dialect`](manager.Dialect.md)[]

#### Defined in

[src/lib/manager/language.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L7)

___

### name

• **name**: `string`

#### Defined in

[src/lib/manager/language.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L8)

___

### solveComposite

• `Optional` **solveComposite**: `boolean`

#### Defined in

[src/lib/manager/language.ts:9](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L9)

## Methods

### ddlBuilder

▸ `Abstract` **ddlBuilder**(`source`, `mapping`): [`LanguageDDLBuilder`](manager.LanguageDDLBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`source`](../interfaces/model.source.md) |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |

#### Returns

[`LanguageDDLBuilder`](manager.LanguageDDLBuilder.md)

#### Defined in

[src/lib/manager/language.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L32)

___

### dmlBuild

▸ `Abstract` **dmlBuild**(`source`, `mapping`, `sentence`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`source`](../interfaces/model.source.md) |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `sentence` | [`Sentence`](model.Sentence.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/language.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L34)

___

### getDialect

▸ **getDialect**(`name`): [`Dialect`](manager.Dialect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Dialect`](manager.Dialect.md)

#### Defined in

[src/lib/manager/language.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/language.ts#L24)
