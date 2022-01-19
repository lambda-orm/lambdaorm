[Lambda ORM](../README.md) / [manager](../modules/manager.md) / SchemaConfig

# Class: SchemaConfig

[manager](../modules/manager.md).SchemaConfig

## Table of contents

### Constructors

- [constructor](manager.SchemaConfig.md#constructor)

### Properties

- [dataSource](manager.SchemaConfig.md#datasource)
- [mapping](manager.SchemaConfig.md#mapping)
- [model](manager.SchemaConfig.md#model)
- [schema](manager.SchemaConfig.md#schema)
- [stage](manager.SchemaConfig.md#stage)
- [workspace](manager.SchemaConfig.md#workspace)

### Methods

- [load](manager.SchemaConfig.md#load)

## Constructors

### constructor

• **new SchemaConfig**(`workspace`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

[src/lib/manager/schema.ts:524](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L524)

## Properties

### dataSource

• **dataSource**: [`DataSourceConfig`](manager.DataSourceConfig.md)

#### Defined in

[src/lib/manager/schema.ts:517](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L517)

___

### mapping

• **mapping**: [`MappingsConfig`](manager.MappingsConfig.md)

#### Defined in

[src/lib/manager/schema.ts:519](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L519)

___

### model

• **model**: [`ModelConfig`](manager.ModelConfig.md)

#### Defined in

[src/lib/manager/schema.ts:518](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L518)

___

### schema

• **schema**: [`Schema`](../interfaces/model.Schema.md)

#### Defined in

[src/lib/manager/schema.ts:521](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L521)

___

### stage

• **stage**: [`StageConfig`](manager.StageConfig.md)

#### Defined in

[src/lib/manager/schema.ts:520](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L520)

___

### workspace

• **workspace**: `string`

#### Defined in

[src/lib/manager/schema.ts:522](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L522)

## Methods

### load

▸ **load**(`schema`): `Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Defined in

[src/lib/manager/schema.ts:533](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L533)
