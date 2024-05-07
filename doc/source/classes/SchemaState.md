[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SchemaState

# Class: SchemaState

## Constructors

### new SchemaState()

> **new SchemaState**(`source`, `domain`, `mapping`, `stage`, `view`, `routeService`, `facade`, `loadSchema`, `helper`): [`SchemaState`](SchemaState.md)

#### Parameters

• **source**: [`DataSourceConfigService`](DataSourceConfigService.md)

• **domain**: [`DomainConfigService`](DomainConfigService.md)

• **mapping**: [`MappingsConfigService`](MappingsConfigService.md)

• **stage**: [`StageConfigService`](StageConfigService.md)

• **view**: [`ViewsConfigService`](ViewsConfigService.md)

• **routeService**: [`RouteService`](RouteService.md)

• **facade**: [`SchemaFacade`](SchemaFacade.md)

• **loadSchema**: [`LoadSchema`](LoadSchema.md)

• **helper**: [`OrmBaseH3lp`](OrmBaseH3lp.md)

#### Returns

[`SchemaState`](SchemaState.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:24

## Properties

### domain

> `readonly` **domain**: [`DomainConfigService`](DomainConfigService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:13

***

### mapping

> `readonly` **mapping**: [`MappingsConfigService`](MappingsConfigService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:14

***

### originalSchema

> **originalSchema**: [`Schema`](../interfaces/Schema.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:22

***

### schema

> **schema**: [`Schema`](../interfaces/Schema.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:21

***

### schemaPath?

> `optional` **schemaPath**: `string`

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:23

***

### source

> `readonly` **source**: [`DataSourceConfigService`](DataSourceConfigService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:12

***

### stage

> `readonly` **stage**: [`StageConfigService`](StageConfigService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:15

***

### view

> `readonly` **view**: [`ViewsConfigService`](ViewsConfigService.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:16

## Methods

### evalSourceRule()

> **evalSourceRule**(`rule`, `info`): `boolean`

#### Parameters

• **rule**: [`SourceRule`](../interfaces/SourceRule.md)

• **info**: [`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Returns

`boolean`

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:29

***

### getSchemaDomain()

> **getSchemaDomain**(): [`DomainSchema`](../interfaces/DomainSchema.md)

#### Returns

[`DomainSchema`](../interfaces/DomainSchema.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:42

***

### getSchemaEntities()

> **getSchemaEntities**(): [`Entity`](../interfaces/Entity.md)[]

#### Returns

[`Entity`](../interfaces/Entity.md)[]

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:43

***

### getSchemaEntity()

> **getSchemaEntity**(`entity`): `undefined` \| [`Entity`](../interfaces/Entity.md)

#### Parameters

• **entity**: `string`

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:44

***

### getSchemaEntityMapping()

> **getSchemaEntityMapping**(`mapping`, `entity`): `undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Parameters

• **mapping**: `string`

• **entity**: `string`

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:49

***

### getSchemaEnum()

> **getSchemaEnum**(`_enum`): `undefined` \| [`Enum`](../interfaces/Enum.md)

#### Parameters

• **\_enum**: `string`

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:46

***

### getSchemaEnums()

> **getSchemaEnums**(): [`Enum`](../interfaces/Enum.md)[]

#### Returns

[`Enum`](../interfaces/Enum.md)[]

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:45

***

### getSchemaMapping()

> **getSchemaMapping**(`mapping`): `undefined` \| [`Mapping`](../interfaces/Mapping.md)

#### Parameters

• **mapping**: `string`

#### Returns

`undefined` \| [`Mapping`](../interfaces/Mapping.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:48

***

### getSchemaMappings()

> **getSchemaMappings**(): [`Mapping`](../interfaces/Mapping.md)[]

#### Returns

[`Mapping`](../interfaces/Mapping.md)[]

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:47

***

### getSchemaSource()

> **getSchemaSource**(`source`): `object`

#### Parameters

• **source**: `string`

#### Returns

`object`

##### dialect

> **dialect**: `string`

##### name

> **name**: `string`

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:35

***

### getSchemaSources()

> **getSchemaSources**(): `object`[]

#### Returns

`object`[]

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:31

***

### getSchemaStage()

> **getSchemaStage**(`stage`): `undefined` \| [`Stage`](../interfaces/Stage.md)

#### Parameters

• **stage**: `string`

#### Returns

`undefined` \| [`Stage`](../interfaces/Stage.md)

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:51

***

### getSchemaStages()

> **getSchemaStages**(): [`Stage`](../interfaces/Stage.md)[]

#### Returns

[`Stage`](../interfaces/Stage.md)[]

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:50

***

### getSchemaVersion()

> **getSchemaVersion**(): `object`

#### Returns

`object`

##### version

> **version**: `string`

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:39

***

### getSchemaViews()

> **getSchemaViews**(): `string`[]

#### Returns

`string`[]

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:52

***

### getSource()

> **getSource**(`info`, `stage`?): `string`

#### Parameters

• **info**: [`SentenceInfo`](../interfaces/SentenceInfo.md)

• **stage?**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:30

***

### initialize()

> **initialize**(`args`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Parameters

• **args**: [`InitializeSchemaArgs`](../interfaces/InitializeSchemaArgs.md)

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:25

***

### introspect()

> **introspect**(`data`, `name`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Parameters

• **data**: `any`

• **name**: `string`

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:27

***

### load()

> **load**(`source`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Parameters

• **source**: `string` \| [`Schema`](../interfaces/Schema.md)

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:26

***

### match()

> **match**(`mappings`, `options`?): `Promise`\<`void`\>

#### Parameters

• **mappings**: [`Mapping`](../interfaces/Mapping.md)[]

• **options?**: [`MatchOptions`](../interfaces/MatchOptions.md)

#### Returns

`Promise`\<`void`\>

#### Source

node\_modules/lambdaorm-base/schema/application/state.d.ts:28
