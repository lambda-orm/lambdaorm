[Lambda ORM](../README.md) / [manager](../modules/manager.md) / SchemaManager

# Class: SchemaManager

[manager](../modules/manager.md).SchemaManager

## Table of contents

### Constructors

- [constructor](manager.SchemaManager.md#constructor)

### Properties

- [source](manager.SchemaManager.md#source)
- [mapping](manager.SchemaManager.md#mapping)
- [model](manager.SchemaManager.md#model)
- [schema](manager.SchemaManager.md#schema)
- [stage](manager.SchemaManager.md#stage)
- [view](manager.SchemaManager.md#view)
- [workspace](manager.SchemaManager.md#workspace)

### Methods

- [complete](manager.SchemaManager.md#complete)
- [extend](manager.SchemaManager.md#extend)
- [get](manager.SchemaManager.md#get)
- [getConfigFileName](manager.SchemaManager.md#getconfigfilename)
- [init](manager.SchemaManager.md#init)
- [load](manager.SchemaManager.md#load)
- [solveOptions](manager.SchemaManager.md#solveoptions)

## Constructors

### constructor

• **new SchemaManager**(`workspace`, `expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |
| `expressions` | `Expressions` |

#### Defined in

[src/lib/manager/schema.ts:884](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L884)

## Properties

### source

• **source**: [`DataSourceConfig`](manager.DataSourceConfig.md)

#### Defined in

[src/lib/manager/schema.ts:874](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L874)

___

### mapping

• **mapping**: [`MappingsConfig`](manager.MappingsConfig.md)

#### Defined in

[src/lib/manager/schema.ts:876](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L876)

___

### model

• **model**: [`ModelConfig`](manager.ModelConfig.md)

#### Defined in

[src/lib/manager/schema.ts:875](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L875)

___

### schema

• **schema**: [`Schema`](../interfaces/model.Schema.md)

#### Defined in

[src/lib/manager/schema.ts:879](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L879)

___

### stage

• **stage**: [`StageConfig`](manager.StageConfig.md)

#### Defined in

[src/lib/manager/schema.ts:877](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L877)

___

### view

• **view**: [`ViewsConfig`](manager.ViewsConfig.md)

#### Defined in

[src/lib/manager/schema.ts:878](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L878)

___

### workspace

• **workspace**: `string`

#### Defined in

[src/lib/manager/schema.ts:880](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L880)

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

[src/lib/manager/schema.ts:996](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L996)

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

[src/lib/manager/schema.ts:1000](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L1000)

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

[src/lib/manager/schema.ts:910](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L910)

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

[src/lib/manager/schema.ts:984](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L984)

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

[src/lib/manager/schema.ts:896](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L896)

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

[src/lib/manager/schema.ts:1004](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L1004)

___

### solveOptions

▸ **solveOptions**(`options?`): [`OrmOptions`](../interfaces/model.OrmOptions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

[`OrmOptions`](../interfaces/model.OrmOptions.md)

#### Defined in

[src/lib/manager/schema.ts:1035](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L1035)
