[Lambda ORM](../README.md) / [manager](../modules/manager.md) / SchemaManager

# Class: SchemaManager

[manager](../modules/manager.md).SchemaManager

## Table of contents

### Constructors

- [constructor](manager.SchemaManager.md#constructor)

### Properties

- [dataSource](manager.SchemaManager.md#datasource)
- [mapping](manager.SchemaManager.md#mapping)
- [model](manager.SchemaManager.md#model)
- [schema](manager.SchemaManager.md#schema)
- [stage](manager.SchemaManager.md#stage)
- [workspace](manager.SchemaManager.md#workspace)

### Methods

- [complete](manager.SchemaManager.md#complete)
- [extend](manager.SchemaManager.md#extend)
- [get](manager.SchemaManager.md#get)
- [getConfigFileName](manager.SchemaManager.md#getconfigfilename)
- [init](manager.SchemaManager.md#init)
- [load](manager.SchemaManager.md#load)

## Constructors

### constructor

• **new SchemaManager**(`workspace`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/schema.ts:566](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L566)

## Properties

### dataSource

• **dataSource**: [`DataSourceConfig`](manager.DataSourceConfig.md)

#### Defined in

[src/lib/manager/schema.ts:557](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L557)

___

### mapping

• **mapping**: [`MappingsConfig`](manager.MappingsConfig.md)

#### Defined in

[src/lib/manager/schema.ts:559](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L559)

___

### model

• **model**: [`ModelConfig`](manager.ModelConfig.md)

#### Defined in

[src/lib/manager/schema.ts:558](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L558)

___

### schema

• **schema**: [`Schema`](../interfaces/model.Schema.md)

#### Defined in

[src/lib/manager/schema.ts:561](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L561)

___

### stage

• **stage**: [`StageConfig`](manager.StageConfig.md)

#### Defined in

[src/lib/manager/schema.ts:560](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L560)

___

### workspace

• **workspace**: `string`

#### Defined in

[src/lib/manager/schema.ts:562](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L562)

## Methods

### complete

▸ **complete**(`schema`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:664](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L664)

___

### extend

▸ **extend**(`schema`): [`Schema`](../interfaces/model.Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

[`Schema`](../interfaces/model.Schema.md)

#### Defined in

[src/lib/manager/schema.ts:668](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L668)

___

### get

▸ **get**(`source?`): `Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source?` | `string` |

#### Returns

`Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Defined in

[src/lib/manager/schema.ts:593](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L593)

___

### getConfigFileName

▸ **getConfigFileName**(`workspace`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[src/lib/manager/schema.ts:652](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L652)

___

### init

▸ **init**(`source?`): `Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source?` | `string` \| [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`Promise`<[`Schema`](../interfaces/model.Schema.md)\>

#### Defined in

[src/lib/manager/schema.ts:577](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L577)

___

### load

▸ **load**(`schema`): [`Schema`](../interfaces/model.Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

[`Schema`](../interfaces/model.Schema.md)

#### Defined in

[src/lib/manager/schema.ts:672](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L672)
