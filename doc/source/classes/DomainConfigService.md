[Lambda ORM](../README.md) / DomainConfigService

# Class: DomainConfigService

## Hierarchy

- `DomainConfigServiceBase`\<[`Entity`](../interfaces/Entity.md), [`Property`](../interfaces/Property.md)\>

  ↳ **`DomainConfigService`**

## Table of contents

### Constructors

- [constructor](DomainConfigService.md#constructor)

### Properties

- [entities](DomainConfigService.md#entities)
- [enums](DomainConfigService.md#enums)

### Methods

- [existsProperty](DomainConfigService.md#existsproperty)
- [getAutoIncrement](DomainConfigService.md#getautoincrement)
- [getEntity](DomainConfigService.md#getentity)
- [getEnum](DomainConfigService.md#getenum)
- [getFieldIds](DomainConfigService.md#getfieldids)
- [getForcedEntity](DomainConfigService.md#getforcedentity)
- [getProperty](DomainConfigService.md#getproperty)
- [getRelation](DomainConfigService.md#getrelation)
- [isChild](DomainConfigService.md#ischild)
- [listEntities](DomainConfigService.md#listentities)
- [sortByDependencies](DomainConfigService.md#sortbydependencies)
- [sortByRelations](DomainConfigService.md#sortbyrelations)

## Constructors

### constructor

• **new DomainConfigService**(`entities?`, `enums?`): [`DomainConfigService`](DomainConfigService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities?` | [`Entity`](../interfaces/Entity.md)[] |
| `enums?` | [`Enum`](../interfaces/Enum.md)[] |

#### Returns

[`DomainConfigService`](DomainConfigService.md)

#### Overrides

DomainConfigServiceBase\&lt;Entity, Property\&gt;.constructor

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:6

## Properties

### entities

• **entities**: [`Entity`](../interfaces/Entity.md)[]

#### Overrides

DomainConfigServiceBase.entities

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:4

___

### enums

• **enums**: [`Enum`](../interfaces/Enum.md)[]

#### Overrides

DomainConfigServiceBase.enums

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigService.d.ts:5

## Methods

### existsProperty

▸ **existsProperty**(`entityName`, `name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

`boolean`

#### Inherited from

DomainConfigServiceBase.existsProperty

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:9

___

### getAutoIncrement

▸ **getAutoIncrement**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)

#### Inherited from

DomainConfigServiceBase.getAutoIncrement

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:11

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`Entity`](../interfaces/Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Entity`](../interfaces/Entity.md)

#### Inherited from

DomainConfigServiceBase.getEntity

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:5

___

### getEnum

▸ **getEnum**(`name`): `undefined` \| [`Enum`](../interfaces/Enum.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Enum`](../interfaces/Enum.md)

#### Inherited from

DomainConfigServiceBase.getEnum

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:7

___

### getFieldIds

▸ **getFieldIds**(`entityName`): `undefined` \| [`Property`](../interfaces/Property.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/Property.md)[]

#### Inherited from

DomainConfigServiceBase.getFieldIds

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:12

___

### getForcedEntity

▸ **getForcedEntity**(`name`): [`Entity`](../interfaces/Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Entity`](../interfaces/Entity.md)

#### Inherited from

DomainConfigServiceBase.getForcedEntity

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:6

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`Property`](../interfaces/Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`Property`](../interfaces/Property.md)

#### Inherited from

DomainConfigServiceBase.getProperty

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:10

___

### getRelation

▸ **getRelation**(`entity`, `relation`): [`RelationInfo`](../interfaces/RelationInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `relation` | `string` |

#### Returns

[`RelationInfo`](../interfaces/RelationInfo.md)

#### Inherited from

DomainConfigServiceBase.getRelation

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:44

___

### isChild

▸ **isChild**(`entityName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`boolean`

#### Inherited from

DomainConfigServiceBase.isChild

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:8

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

DomainConfigServiceBase.listEntities

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:13

___

### sortByDependencies

▸ **sortByDependencies**(`entities?`): `string`[]

Sort a list of entities according to their dependencies

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entities?` | `string`[] | entities to order |

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

DomainConfigServiceBase.sortByDependencies

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:25

___

### sortByRelations

▸ **sortByRelations**(`mainEntities`, `allEntities`): `string`[]

Sort a list of entities according to their relationships

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainEntities` | `string`[] |
| `allEntities` | `string`[] |

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

DomainConfigServiceBase.sortByRelations

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:19
