[Lambda ORM](../README.md) / DDLBuilderService

# Class: DDLBuilderService

## Table of contents

### Constructors

- [constructor](DDLBuilderService.md#constructor)

### Properties

- [stage](DDLBuilderService.md#stage)

### Methods

- [drop](DDLBuilderService.md#drop)
- [sync](DDLBuilderService.md#sync)
- [truncate](DDLBuilderService.md#truncate)

## Constructors

### constructor

• **new DDLBuilderService**(`schemaFacade`, `languages`, `stage`, `helper`): [`DDLBuilderService`](DDLBuilderService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `stage` | `string` |
| `helper` | [`Helper`](Helper.md) |

#### Returns

[`DDLBuilderService`](DDLBuilderService.md)

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/language/application/services/ddlBuilder.ts#L14)

## Properties

### stage

• `Readonly` **stage**: `string`

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/language/application/services/ddlBuilder.ts#L16)

## Methods

### drop

▸ **drop**(`mappings`): [`Query`](Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |

#### Returns

[`Query`](Query.md)[]

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/language/application/services/ddlBuilder.ts#L22)

___

### sync

▸ **sync**(`mappings`): [`Query`](Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |

#### Returns

[`Query`](Query.md)[]

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:48](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/language/application/services/ddlBuilder.ts#L48)

___

### truncate

▸ **truncate**(`mappings`): [`Query`](Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |

#### Returns

[`Query`](Query.md)[]

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/01807f7a/src/lib/language/application/services/ddlBuilder.ts#L35)
