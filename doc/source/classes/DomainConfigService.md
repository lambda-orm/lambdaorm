[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / DomainConfigService

# Class: DomainConfigService

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:3

## Extends

- `DomainConfigServiceBase`\<[`Entity`](../interfaces/Entity.md), [`Property`](../interfaces/Property.md)\>

## Constructors

### Constructor

> **new DomainConfigService**(`entities?`, `enums?`): `DomainConfigService`

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:6

#### Parameters

##### entities?

[`Entity`](../interfaces/Entity.md)[]

##### enums?

[`Enum`](../interfaces/Enum.md)[]

#### Returns

`DomainConfigService`

#### Overrides

`DomainConfigServiceBase<Entity, Property>.constructor`

## Properties

### entities

> **entities**: [`Entity`](../interfaces/Entity.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:4

#### Overrides

`DomainConfigServiceBase.entities`

***

### enums

> **enums**: [`Enum`](../interfaces/Enum.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:5

#### Overrides

`DomainConfigServiceBase.enums`

## Methods

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

### getAutoIncrement()

> **getAutoIncrement**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:11

#### Parameters

##### entityName

`string`

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)

#### Inherited from

`DomainConfigServiceBase.getAutoIncrement`

***

### getEntity()

> **getEntity**(`name`): `undefined` \| [`Entity`](../interfaces/Entity.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:5

#### Parameters

##### name

`string`

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

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

> **getFieldIds**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)[]

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:12

#### Parameters

##### entityName

`string`

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)[]

#### Inherited from

`DomainConfigServiceBase.getFieldIds`

***

### getForcedEntity()

> **getForcedEntity**(`name`): [`Entity`](../interfaces/Entity.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:6

#### Parameters

##### name

`string`

#### Returns

[`Entity`](../interfaces/Entity.md)

#### Inherited from

`DomainConfigServiceBase.getForcedEntity`

***

### getProperty()

> **getProperty**(`entityName`, `name`): [`Property`](../interfaces/Property.md)

Defined in: node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:10

#### Parameters

##### entityName

`string`

##### name

`string`

#### Returns

[`Property`](../interfaces/Property.md)

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
