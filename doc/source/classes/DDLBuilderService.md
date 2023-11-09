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

• **new DDLBuilderService**(`schemaFacade`, `languages`, `stage`, `helper`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `stage` | `string` |
| `helper` | [`Helper`](Helper.md) |

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/language/application/services/ddlBuilder.ts#L15)

## Properties

### stage

• `Readonly` **stage**: `string`

#### Defined in

[src/lib/language/application/services/ddlBuilder.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/language/application/services/ddlBuilder.ts#L17)

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

[src/lib/language/application/services/ddlBuilder.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/language/application/services/ddlBuilder.ts#L23)

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

[src/lib/language/application/services/ddlBuilder.ts:49](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/language/application/services/ddlBuilder.ts#L49)

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

[src/lib/language/application/services/ddlBuilder.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/9a3f2a20/src/lib/language/application/services/ddlBuilder.ts#L36)
