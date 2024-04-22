[Lambda ORM](../README.md) / SchemaState

# Class: SchemaState

## Table of contents

### Constructors

- [constructor](SchemaState.md#constructor)

### Properties

- [domain](SchemaState.md#domain)
- [mapping](SchemaState.md#mapping)
- [originalSchema](SchemaState.md#originalschema)
- [schema](SchemaState.md#schema)
- [schemaPath](SchemaState.md#schemapath)
- [source](SchemaState.md#source)
- [stage](SchemaState.md#stage)
- [view](SchemaState.md#view)

### Methods

- [evalSourceRule](SchemaState.md#evalsourcerule)
- [getSchemaDomain](SchemaState.md#getschemadomain)
- [getSchemaEntities](SchemaState.md#getschemaentities)
- [getSchemaEntity](SchemaState.md#getschemaentity)
- [getSchemaEntityMapping](SchemaState.md#getschemaentitymapping)
- [getSchemaEnum](SchemaState.md#getschemaenum)
- [getSchemaEnums](SchemaState.md#getschemaenums)
- [getSchemaMapping](SchemaState.md#getschemamapping)
- [getSchemaMappings](SchemaState.md#getschemamappings)
- [getSchemaSource](SchemaState.md#getschemasource)
- [getSchemaSources](SchemaState.md#getschemasources)
- [getSchemaStage](SchemaState.md#getschemastage)
- [getSchemaStages](SchemaState.md#getschemastages)
- [getSchemaVersion](SchemaState.md#getschemaversion)
- [getSchemaViews](SchemaState.md#getschemaviews)
- [getSource](SchemaState.md#getsource)
- [initialize](SchemaState.md#initialize)
- [introspect](SchemaState.md#introspect)
- [load](SchemaState.md#load)
- [match](SchemaState.md#match)

## Constructors

### constructor

• **new SchemaState**(`source`, `domain`, `mapping`, `stage`, `view`, `routeService`, `facade`, `loadSchema`, `helper`): [`SchemaState`](SchemaState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DataSourceConfigService`](DataSourceConfigService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `mapping` | [`MappingsConfigService`](MappingsConfigService.md) |
| `stage` | [`StageConfigService`](StageConfigService.md) |
| `view` | [`ViewsConfigService`](ViewsConfigService.md) |
| `routeService` | [`RouteService`](RouteService.md) |
| `facade` | [`SchemaFacade`](SchemaFacade.md) |
| `loadSchema` | [`LoadSchema`](LoadSchema.md) |
| `helper` | [`OrmBaseH3lp`](OrmBaseH3lp.md) |

#### Returns

[`SchemaState`](SchemaState.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:24

## Properties

### domain

• `Readonly` **domain**: [`DomainConfigService`](DomainConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:13

___

### mapping

• `Readonly` **mapping**: [`MappingsConfigService`](MappingsConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:14

___

### originalSchema

• **originalSchema**: [`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:22

___

### schema

• **schema**: [`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:21

___

### schemaPath

• `Optional` **schemaPath**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:23

___

### source

• `Readonly` **source**: [`DataSourceConfigService`](DataSourceConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:12

___

### stage

• `Readonly` **stage**: [`StageConfigService`](StageConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:15

___

### view

• `Readonly` **view**: [`ViewsConfigService`](ViewsConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:16

## Methods

### evalSourceRule

▸ **evalSourceRule**(`rule`, `info`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | [`SourceRule`](../interfaces/SourceRule.md) |
| `info` | [`SentenceInfo`](../interfaces/SentenceInfo.md) |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:29

___

### getSchemaDomain

▸ **getSchemaDomain**(): [`DomainSchema`](../interfaces/DomainSchema.md)

#### Returns

[`DomainSchema`](../interfaces/DomainSchema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:42

___

### getSchemaEntities

▸ **getSchemaEntities**(): [`Entity`](../interfaces/Entity.md)[]

#### Returns

[`Entity`](../interfaces/Entity.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:43

___

### getSchemaEntity

▸ **getSchemaEntity**(`entity`): `undefined` \| [`Entity`](../interfaces/Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:44

___

### getSchemaEntityMapping

▸ **getSchemaEntityMapping**(`mapping`, `entity`): `undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | `string` |
| `entity` | `string` |

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:49

___

### getSchemaEnum

▸ **getSchemaEnum**(`_enum`): `undefined` \| [`Enum`](../interfaces/Enum.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_enum` | `string` |

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:46

___

### getSchemaEnums

▸ **getSchemaEnums**(): [`Enum`](../interfaces/Enum.md)[]

#### Returns

[`Enum`](../interfaces/Enum.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:45

___

### getSchemaMapping

▸ **getSchemaMapping**(`mapping`): `undefined` \| [`Mapping`](../interfaces/Mapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | `string` |

#### Returns

`undefined` \| [`Mapping`](../interfaces/Mapping.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:48

___

### getSchemaMappings

▸ **getSchemaMappings**(): [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Mapping`](../interfaces/Mapping.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:47

___

### getSchemaSource

▸ **getSchemaSource**(`source`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |
| `name` | `string` |

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:35

___

### getSchemaSources

▸ **getSchemaSources**(): \{ `dialect`: `string` ; `name`: `string`  }[]

#### Returns

\{ `dialect`: `string` ; `name`: `string`  }[]

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:31

___

### getSchemaStage

▸ **getSchemaStage**(`stage`): `undefined` \| [`Stage`](../interfaces/Stage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stage` | `string` |

#### Returns

`undefined` \| [`Stage`](../interfaces/Stage.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:51

___

### getSchemaStages

▸ **getSchemaStages**(): [`Stage`](../interfaces/Stage.md)[]

#### Returns

[`Stage`](../interfaces/Stage.md)[]

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:50

___

### getSchemaVersion

▸ **getSchemaVersion**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `version` | `string` |

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:39

___

### getSchemaViews

▸ **getSchemaViews**(): `string`[]

#### Returns

`string`[]

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:52

___

### getSource

▸ **getSource**(`info`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | [`SentenceInfo`](../interfaces/SentenceInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:30

___

### initialize

▸ **initialize**(`args`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`InitializeSchemaArgs`](../interfaces/InitializeSchemaArgs.md) |

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:25

___

### introspect

▸ **introspect**(`data`, `name`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `name` | `string` |

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:27

___

### load

▸ **load**(`source`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` \| [`Schema`](../interfaces/Schema.md) |

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:26

___

### match

▸ **match**(`mappings`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |
| `options?` | [`MatchOptions`](../interfaces/MatchOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:28
