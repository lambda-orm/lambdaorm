[Lambda ORM](../README.md) / [manager](../modules/manager.md) / DDLBuilder

# Class: DDLBuilder

[manager](../modules/manager.md).DDLBuilder

## Table of contents

### Constructors

- [constructor](manager.DDLBuilder.md#constructor)

### Properties

- [stage](manager.DDLBuilder.md#stage)

### Methods

- [drop](manager.DDLBuilder.md#drop)
- [sync](manager.DDLBuilder.md#sync)
- [truncate](manager.DDLBuilder.md#truncate)

## Constructors

### constructor

• **new DDLBuilder**(`schema`, `routing`, `languages`, `stage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaManager`](manager.SchemaManager.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languages` | [`Languages`](manager.Languages.md) |
| `stage` | `string` |

#### Defined in

[src/lib/manager/ddlBuilder.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/ddlBuilder.ts#L11)

## Properties

### stage

• **stage**: `string`

#### Defined in

[src/lib/manager/ddlBuilder.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/ddlBuilder.ts#L10)

## Methods

### drop

▸ **drop**(`mappings`): [`Query`](model.Query.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/model.Mapping.md)[] |

#### Returns

[`Query`](model.Query.md)[]

#### Defined in

[src/lib/manager/ddlBuilder.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/ddlBuilder.ts#L19)

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

[src/lib/manager/ddlBuilder.ts:45](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/ddlBuilder.ts#L45)

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

[src/lib/manager/ddlBuilder.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/ddlBuilder.ts#L32)
