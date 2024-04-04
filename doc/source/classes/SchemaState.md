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
- [getSource](SchemaState.md#getsource)
- [load](SchemaState.md#load)
- [updateFromData](SchemaState.md#updatefromdata)
- [updateFromMapping](SchemaState.md#updatefrommapping)

## Constructors

### constructor

• **new SchemaState**(`source`, `domain`, `mapping`, `stage`, `view`, `routeService`, `loadSchema`, `facade`, `schemaService`, `fileService`, `helper`): [`SchemaState`](SchemaState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`DataSourceConfigService`](DataSourceConfigService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `mapping` | [`MappingsConfigService`](MappingsConfigService.md) |
| `stage` | [`StageConfigService`](StageConfigService.md) |
| `view` | [`ViewsConfigService`](ViewsConfigService.md) |
| `routeService` | [`RouteService`](RouteService.md) |
| `loadSchema` | [`LoadSchema`](LoadSchema.md) |
| `facade` | [`SchemaFacade`](SchemaFacade.md) |
| `schemaService` | `SchemaService` |
| `fileService` | [`IFileSchemaService`](../interfaces/IFileSchemaService.md) |
| `helper` | `H3lp` |

#### Returns

[`SchemaState`](SchemaState.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:28

## Properties

### domain

• `Readonly` **domain**: [`DomainConfigService`](DomainConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:15

___

### mapping

• `Readonly` **mapping**: [`MappingsConfigService`](MappingsConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:16

___

### originalSchema

• **originalSchema**: [`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:26

___

### schema

• **schema**: [`Schema`](../interfaces/Schema.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:25

___

### schemaPath

• `Optional` **schemaPath**: `string`

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:27

___

### source

• `Readonly` **source**: [`DataSourceConfigService`](DataSourceConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:14

___

### stage

• `Readonly` **stage**: [`StageConfigService`](StageConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:17

___

### view

• `Readonly` **view**: [`ViewsConfigService`](ViewsConfigService.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:18

## Methods

### evalSourceRule

▸ **evalSourceRule**(`rule`, `clauseInfo`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rule` | [`SourceRule`](../interfaces/SourceRule.md) |
| `clauseInfo` | [`ClauseInfo`](../interfaces/ClauseInfo.md) |

#### Returns

`boolean`

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:32

___

### getSource

▸ **getSource**(`clauseInfo`, `stage?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clauseInfo` | [`ClauseInfo`](../interfaces/ClauseInfo.md) |
| `stage?` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:33

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

node_modules/lambdaorm-base/schema/application/state.d.ts:29

___

### updateFromData

▸ **updateFromData**(`data`, `name`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `name` | `string` |

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:30

___

### updateFromMapping

▸ **updateFromMapping**(`mappings`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappings` | [`Mapping`](../interfaces/Mapping.md)[] |
| `options?` | [`MatchOptions`](../interfaces/MatchOptions.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

node_modules/lambdaorm-base/schema/application/state.d.ts:31
