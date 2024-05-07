[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DomainConfigService

# Class: DomainConfigService

## Extends

- `DomainConfigServiceBase`\<[`Entity`](../interfaces/Entity.md), [`Property`](../interfaces/Property.md)\>

## Constructors

### new DomainConfigService()

> **new DomainConfigService**(`entities`?, `enums`?): [`DomainConfigService`](DomainConfigService.md)

#### Parameters

• **entities?**: [`Entity`](../interfaces/Entity.md)[]

• **enums?**: [`Enum`](../interfaces/Enum.md)[]

#### Returns

[`DomainConfigService`](DomainConfigService.md)

#### Overrides

`DomainConfigServiceBase<Entity, Property>.constructor`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:6

## Properties

### entities

> **entities**: [`Entity`](../interfaces/Entity.md)[]

#### Overrides

`DomainConfigServiceBase.entities`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:4

***

### enums

> **enums**: [`Enum`](../interfaces/Enum.md)[]

#### Overrides

`DomainConfigServiceBase.enums`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:5

## Methods

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

### getAutoIncrement()

> **getAutoIncrement**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)

#### Parameters

• **entityName**: `string`

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)

#### Inherited from

`DomainConfigServiceBase.getAutoIncrement`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:11

***

### getEntity()

> **getEntity**(`name`): `undefined` \| [`Entity`](../interfaces/Entity.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

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

> **getFieldIds**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)[]

#### Parameters

• **entityName**: `string`

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)[]

#### Inherited from

`DomainConfigServiceBase.getFieldIds`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:12

***

### getForcedEntity()

> **getForcedEntity**(`name`): [`Entity`](../interfaces/Entity.md)

#### Parameters

• **name**: `string`

#### Returns

[`Entity`](../interfaces/Entity.md)

#### Inherited from

`DomainConfigServiceBase.getForcedEntity`

#### Source

node\_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:6

***

### getProperty()

> **getProperty**(`entityName`, `name`): [`Property`](../interfaces/Property.md)

#### Parameters

• **entityName**: `string`

• **name**: `string`

#### Returns

[`Property`](../interfaces/Property.md)

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
