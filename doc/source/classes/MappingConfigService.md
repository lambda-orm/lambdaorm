[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / MappingConfigService

# Class: MappingConfigService

## Extends

- `DomainConfigServiceBase`\<[`EntityMapping`](../interfaces/EntityMapping.md), [`PropertyMapping`](../interfaces/PropertyMapping.md)\>

## Constructors

### new MappingConfigService()

> **new MappingConfigService**(`mapping`, `enums`?): [`MappingConfigService`](MappingConfigService.md)

#### Parameters

• **mapping**: [`Mapping`](../interfaces/Mapping.md)

• **enums?**: [`Enum`](../interfaces/Enum.md)[]

#### Returns

[`MappingConfigService`](MappingConfigService.md)

#### Overrides

`DomainConfigServiceBase<EntityMapping, PropertyMapping>.constructor`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:6

## Properties

### enums

> **enums**: [`Enum`](../interfaces/Enum.md)[]

#### Overrides

`DomainConfigServiceBase.enums`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:5

## Accessors

### entities

> `get` **entities**(): [`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:11

***

### format

> `get` **format**(): `undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

#### Returns

`undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:8

***

### name

> `get` **name**(): `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:7

## Methods

### entityMapping()

> **entityMapping**(`entityName`): `undefined` \| `string`

#### Parameters

• **entityName**: `string`

#### Returns

`undefined` \| `string`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:12

***

### existsProperty()

> **existsProperty**(`entityName`, `name`): `boolean`

#### Parameters

• **entityName**: `string`

• **name**: `string`

#### Returns

`boolean`

#### Inherited from

`DomainConfigServiceBase.existsProperty`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:9

***

### get()

> **get**(): [`Mapping`](../interfaces/Mapping.md)

#### Returns

[`Mapping`](../interfaces/Mapping.md)

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:9

***

### getAutoIncrement()

> **getAutoIncrement**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Parameters

• **entityName**: `string`

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Inherited from

`DomainConfigServiceBase.getAutoIncrement`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:11

***

### getEntity()

> **getEntity**(`name`): `undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Inherited from

`DomainConfigServiceBase.getEntity`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:5

***

### getEnum()

> **getEnum**(`name`): `undefined` \| [`Enum`](../interfaces/Enum.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

#### Inherited from

`DomainConfigServiceBase.getEnum`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:7

***

### getFieldIds()

> **getFieldIds**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)[]

#### Parameters

• **entityName**: `string`

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)[]

#### Inherited from

`DomainConfigServiceBase.getFieldIds`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:12

***

### getForcedEntity()

> **getForcedEntity**(`name`): [`EntityMapping`](../interfaces/EntityMapping.md)

#### Parameters

• **name**: `string`

#### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)

#### Inherited from

`DomainConfigServiceBase.getForcedEntity`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:6

***

### getProperty()

> **getProperty**(`entityName`, `name`): [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Parameters

• **entityName**: `string`

• **name**: `string`

#### Returns

[`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Inherited from

`DomainConfigServiceBase.getProperty`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:10

***

### getRelation()

> **getRelation**(`entity`, `relation`): [`RelationInfo`](../interfaces/RelationInfo.md)

#### Parameters

• **entity**: `string`

• **relation**: `string`

#### Returns

[`RelationInfo`](../interfaces/RelationInfo.md)

#### Inherited from

`DomainConfigServiceBase.getRelation`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:44

***

### isChild()

> **isChild**(`entityName`): `boolean`

#### Parameters

• **entityName**: `string`

#### Returns

`boolean`

#### Inherited from

`DomainConfigServiceBase.isChild`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:8

***

### listEntities()

> **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

`DomainConfigServiceBase.listEntities`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:13

***

### set()

> **set**(`value`): `void`

#### Parameters

• **value**: [`Mapping`](../interfaces/Mapping.md)

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:10

***

### sortByDependencies()

> **sortByDependencies**(`entities`?): `string`[]

Sort a list of entities according to their dependencies

#### Parameters

• **entities?**: `string`[]

entities to order

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

`DomainConfigServiceBase.sortByDependencies`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:25

***

### sortByRelations()

> **sortByRelations**(`mainEntities`, `allEntities`): `string`[]

Sort a list of entities according to their relationships

#### Parameters

• **mainEntities**: `string`[]

• **allEntities**: `string`[]

entities to order

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

`DomainConfigServiceBase.sortByRelations`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:19
