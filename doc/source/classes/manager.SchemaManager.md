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

[src/lib/manager/schema.ts:554](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L554)

## Properties

### dataSource

• **dataSource**: [`DataSourceConfig`](manager.DataSourceConfig.md)

#### Defined in

[src/lib/manager/schema.ts:545](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L545)

___

### mapping

• **mapping**: [`MappingsConfig`](manager.MappingsConfig.md)

#### Defined in

[src/lib/manager/schema.ts:547](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L547)

___

### model

• **model**: [`ModelConfig`](manager.ModelConfig.md)

#### Defined in

[src/lib/manager/schema.ts:546](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L546)

___

### schema

• **schema**: [`Schema`](../interfaces/model.Schema.md)

#### Defined in

[src/lib/manager/schema.ts:549](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L549)

___

### stage

• **stage**: [`StageConfig`](manager.StageConfig.md)

#### Defined in

[src/lib/manager/schema.ts:548](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L548)

___

### workspace

• **workspace**: `string`

#### Defined in

[src/lib/manager/schema.ts:550](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L550)

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

[src/lib/manager/schema.ts:652](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L652)

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

[src/lib/manager/schema.ts:656](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L656)

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

[src/lib/manager/schema.ts:581](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L581)

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

[src/lib/manager/schema.ts:640](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L640)

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

[src/lib/manager/schema.ts:565](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L565)

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

[src/lib/manager/schema.ts:660](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L660)
