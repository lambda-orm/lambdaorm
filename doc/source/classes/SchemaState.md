[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / SchemaState

# Class: SchemaState

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:11

## Constructors

### Constructor

> **new SchemaState**(`source`, `domain`, `mapping`, `stage`, `view`, `routeService`, `facade`, `loadSchema`, `helper`): `SchemaState`

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:24

#### Parameters

##### source

[`DataSourceConfigService`](DataSourceConfigService.md)

##### domain

[`DomainConfigService`](DomainConfigService.md)

##### mapping

[`MappingsConfigService`](MappingsConfigService.md)

##### stage

[`StageConfigService`](StageConfigService.md)

##### view

[`ViewsConfigService`](ViewsConfigService.md)

##### routeService

[`RouteService`](RouteService.md)

##### facade

[`SchemaFacade`](SchemaFacade.md)

##### loadSchema

[`LoadSchema`](LoadSchema.md)

##### helper

[`OrmBaseH3lp`](OrmBaseH3lp.md)

#### Returns

`SchemaState`

## Properties

### domain

> `readonly` **domain**: [`DomainConfigService`](DomainConfigService.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:13

***

### mapping

> `readonly` **mapping**: [`MappingsConfigService`](MappingsConfigService.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:14

***

### originalSchema

> **originalSchema**: [`Schema`](../interfaces/Schema.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:22

***

### schema

> **schema**: [`Schema`](../interfaces/Schema.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:21

***

### schemaPath?

> `optional` **schemaPath**: `string`

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:23

***

### source

> `readonly` **source**: [`DataSourceConfigService`](DataSourceConfigService.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:12

***

### stage

> `readonly` **stage**: [`StageConfigService`](StageConfigService.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:15

***

### view

> `readonly` **view**: [`ViewsConfigService`](ViewsConfigService.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:16

## Methods

### evalSourceRule()

> **evalSourceRule**(`rule`, `info`): `boolean`

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:29

#### Parameters

##### rule

[`SourceRule`](../interfaces/SourceRule.md)

##### info

[`SentenceInfo`](../interfaces/SentenceInfo.md)

#### Returns

`boolean`

***

### getSchemaDomain()

> **getSchemaDomain**(): [`DomainSchema`](../interfaces/DomainSchema.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:42

#### Returns

[`DomainSchema`](../interfaces/DomainSchema.md)

***

### getSchemaEntities()

> **getSchemaEntities**(): [`Entity`](../interfaces/Entity.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:43

#### Returns

[`Entity`](../interfaces/Entity.md)[]

***

### getSchemaEntity()

> **getSchemaEntity**(`entity`): `undefined` \| [`Entity`](../interfaces/Entity.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:44

#### Parameters

##### entity

`string`

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

***

### getSchemaEntityMapping()

> **getSchemaEntityMapping**(`mapping`, `entity`): `undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:49

#### Parameters

##### mapping

`string`

##### entity

`string`

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

***

### getSchemaEnum()

> **getSchemaEnum**(`_enum`): `undefined` \| [`Enum`](../interfaces/Enum.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:46

#### Parameters

##### \_enum

`string`

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

***

### getSchemaEnums()

> **getSchemaEnums**(): [`Enum`](../interfaces/Enum.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:45

#### Returns

[`Enum`](../interfaces/Enum.md)[]

***

### getSchemaMapping()

> **getSchemaMapping**(`mapping`): `undefined` \| [`Mapping`](../interfaces/Mapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:48

#### Parameters

##### mapping

`string`

#### Returns

`undefined` \| [`Mapping`](../interfaces/Mapping.md)

***

### getSchemaMappings()

> **getSchemaMappings**(): [`Mapping`](../interfaces/Mapping.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:47

#### Returns

[`Mapping`](../interfaces/Mapping.md)[]

***

### getSchemaSource()

> **getSchemaSource**(`source`): `object`

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:35

#### Parameters

##### source

`string`

#### Returns

`object`

##### dialect

> **dialect**: `string`

##### name

> **name**: `string`

***

### getSchemaSources()

> **getSchemaSources**(): `object`[]

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:31

#### Returns

`object`[]

***

### getSchemaStage()

> **getSchemaStage**(`stage`): `undefined` \| [`Stage`](../interfaces/Stage.md)

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:51

#### Parameters

##### stage

`string`

#### Returns

`undefined` \| [`Stage`](../interfaces/Stage.md)

***

### getSchemaStages()

> **getSchemaStages**(): [`Stage`](../interfaces/Stage.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:50

#### Returns

[`Stage`](../interfaces/Stage.md)[]

***

### getSchemaVersion()

> **getSchemaVersion**(): `object`

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:39

#### Returns

`object`

##### version

> **version**: `string`

***

### getSchemaViews()

> **getSchemaViews**(): `string`[]

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:52

#### Returns

`string`[]

***

### getSource()

> **getSource**(`info`, `stage?`): `string`

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:30

#### Parameters

##### info

[`SentenceInfo`](../interfaces/SentenceInfo.md)

##### stage?

`string`

#### Returns

`string`

***

### initialize()

> **initialize**(`args`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:25

#### Parameters

##### args

[`InitializeSchemaArgs`](../interfaces/InitializeSchemaArgs.md)

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

***

### introspect()

> **introspect**(`data`, `name`): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:27

#### Parameters

##### data

`any`

##### name

`string`

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

***

### load()

> **load**(`source`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:26

#### Parameters

##### source

`string` | [`Schema`](../interfaces/Schema.md)

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

***

### match()

> **match**(`mappings`, `options?`): `Promise`\<`void`\>

Defined in: node\_modules/lambdaorm-base/schema/application/state.d.ts:28

#### Parameters

##### mappings

[`Mapping`](../interfaces/Mapping.md)[]

##### options?

[`MatchOptions`](../interfaces/MatchOptions.md)

#### Returns

`Promise`\<`void`\>
