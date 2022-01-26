[Lambda ORM](../README.md) / [language](../modules/language.md) / DDLBuilder

# Class: DDLBuilder

[language](../modules/language.md).DDLBuilder

## Table of contents

### Constructors

- [constructor](language.DDLBuilder.md#constructor)

### Properties

- [stage](language.DDLBuilder.md#stage)

### Methods

- [\_sync](language.DDLBuilder.md#_sync)
- [drop](language.DDLBuilder.md#drop)
- [sync](language.DDLBuilder.md#sync)
- [truncate](language.DDLBuilder.md#truncate)

## Constructors

### constructor

• **new DDLBuilder**(`schema`, `routing`, `languageManager`, `stage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `stage` | `string` |

#### Defined in

[src/lib/manager/ddlBuilder.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/ddlBuilder.ts#L12)

## Properties

### stage

• **stage**: `string`

#### Defined in

[src/lib/manager/ddlBuilder.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/ddlBuilder.ts#L11)

## Methods

### \_sync

▸ **_sync**(`dataSource`, `ruleDataSource`, `delta`, `queries`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | [`DataSource`](../interfaces/model.DataSource.md) |
| `ruleDataSource` | [`RuleDataSource`](../interfaces/model.RuleDataSource.md) |
| `delta` | [`Delta`](model.Delta.md) |
| `queries` | [`Query`](model.Query.md)[] |

#### Returns

`void`

#### Defined in

[src/lib/manager/ddlBuilder.ts:131](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/ddlBuilder.ts#L131)

___

### drop

▸ **drop**(`mappings`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/model.Mapping.md)[] |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[src/lib/manager/ddlBuilder.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/ddlBuilder.ts#L20)

___

### sync

▸ **sync**(`mappings`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/model.Mapping.md)[] |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[src/lib/manager/ddlBuilder.ts:48](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/ddlBuilder.ts#L48)

___

### truncate

▸ **truncate**(`mappings`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/model.Mapping.md)[] |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[src/lib/manager/ddlBuilder.ts:34](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/ddlBuilder.ts#L34)
