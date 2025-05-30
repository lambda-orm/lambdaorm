[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / MappingConfigService

# Class: MappingConfigService

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:3

## Extends

- `DomainConfigServiceBase`\<[`EntityMapping`](../interfaces/EntityMapping.md), [`PropertyMapping`](../interfaces/PropertyMapping.md)\>

## Constructors

### Constructor

> **new MappingConfigService**(`mapping`, `enums?`): `MappingConfigService`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:6

#### Parameters

##### mapping

[`Mapping`](../interfaces/Mapping.md)

##### enums?

[`Enum`](../interfaces/Enum.md)[]

#### Returns

`MappingConfigService`

#### Overrides

`DomainConfigServiceBase<EntityMapping, PropertyMapping>.constructor`

## Properties

### enums

> **enums**: [`Enum`](../interfaces/Enum.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:5

#### Overrides

`DomainConfigServiceBase.enums`

## Accessors

### entities

#### Get Signature

> **get** **entities**(): [`EntityMapping`](../interfaces/EntityMapping.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:11

##### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Overrides

`DomainConfigServiceBase.entities`

***

### format

#### Get Signature

> **get** **format**(): `undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:8

##### Returns

`undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:7

##### Returns

`string`

## Methods

### entityMapping()

> **entityMapping**(`entityName`): `undefined` \| `string`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:12

#### Parameters

##### entityName

`string`

#### Returns

`undefined` \| `string`

***

### existsProperty()

> **existsProperty**(`entityName`, `name`): `boolean`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:9

#### Parameters

##### entityName

`string`

##### name

`string`

#### Returns

`boolean`

#### Inherited from

`DomainConfigServiceBase.existsProperty`

***

### get()

> **get**(): [`Mapping`](../interfaces/Mapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:9

#### Returns

[`Mapping`](../interfaces/Mapping.md)

***

### getAutoIncrement()

> **getAutoIncrement**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:11

#### Parameters

##### entityName

`string`

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Inherited from

`DomainConfigServiceBase.getAutoIncrement`

***

### getEntity()

> **getEntity**(`name`): `undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:5

#### Parameters

##### name

`string`

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Inherited from

`DomainConfigServiceBase.getEntity`

***

### getEnum()

> **getEnum**(`name`): `undefined` \| [`Enum`](../interfaces/Enum.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:7

#### Parameters

##### name

`string`

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

#### Inherited from

`DomainConfigServiceBase.getEnum`

***

### getFieldIds()

> **getFieldIds**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:12

#### Parameters

##### entityName

`string`

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)[]

#### Inherited from

`DomainConfigServiceBase.getFieldIds`

***

### getForcedEntity()

> **getForcedEntity**(`name`): [`EntityMapping`](../interfaces/EntityMapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:6

#### Parameters

##### name

`string`

#### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)

#### Inherited from

`DomainConfigServiceBase.getForcedEntity`

***

### getProperty()

> **getProperty**(`entityName`, `name`): [`PropertyMapping`](../interfaces/PropertyMapping.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:10

#### Parameters

##### entityName

`string`

##### name

`string`

#### Returns

[`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Inherited from

`DomainConfigServiceBase.getProperty`

***

### getRelation()

> **getRelation**(`entity`, `relation`): [`RelationInfo`](../interfaces/RelationInfo.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:44

#### Parameters

##### entity

`string`

##### relation

`string`

#### Returns

[`RelationInfo`](../interfaces/RelationInfo.md)

#### Inherited from

`DomainConfigServiceBase.getRelation`

***

### isChild()

> **isChild**(`entityName`): `boolean`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:8

#### Parameters

##### entityName

`string`

#### Returns

`boolean`

#### Inherited from

`DomainConfigServiceBase.isChild`

***

### listEntities()

> **listEntities**(): `string`[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:13

#### Returns

`string`[]

#### Inherited from

`DomainConfigServiceBase.listEntities`

***

### set()

> **set**(`value`): `void`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:10

#### Parameters

##### value

[`Mapping`](../interfaces/Mapping.md)

#### Returns

`void`

***

### sortByDependencies()

> **sortByDependencies**(`entities?`): `string`[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:25

Sort a list of entities according to their dependencies

#### Parameters

##### entities?

`string`[]

entities to order

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

`DomainConfigServiceBase.sortByDependencies`

***

### sortByRelations()

> **sortByRelations**(`mainEntities`, `allEntities`): `string`[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:19

Sort a list of entities according to their relationships

#### Parameters

##### mainEntities

`string`[]

##### allEntities

`string`[]

entities to order

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

`DomainConfigServiceBase.sortByRelations`
