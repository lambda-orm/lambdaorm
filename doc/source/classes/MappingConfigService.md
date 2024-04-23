[Lambda ORM](../README.md) / MappingConfigService

# Class: MappingConfigService

## Hierarchy

- `DomainConfigServiceBase`\<[`EntityMapping`](../interfaces/EntityMapping.md), [`PropertyMapping`](../interfaces/PropertyMapping.md)\>

  ↳ **`MappingConfigService`**

## Table of contents

### Constructors

- [constructor](MappingConfigService.md#constructor)

### Properties

- [enums](MappingConfigService.md#enums)

### Accessors

- [entities](MappingConfigService.md#entities)
- [format](MappingConfigService.md#format)
- [name](MappingConfigService.md#name)

### Methods

- [entityMapping](MappingConfigService.md#entitymapping)
- [existsProperty](MappingConfigService.md#existsproperty)
- [get](MappingConfigService.md#get)
- [getAutoIncrement](MappingConfigService.md#getautoincrement)
- [getEntity](MappingConfigService.md#getentity)
- [getEnum](MappingConfigService.md#getenum)
- [getFieldIds](MappingConfigService.md#getfieldids)
- [getForcedEntity](MappingConfigService.md#getforcedentity)
- [getProperty](MappingConfigService.md#getproperty)
- [getRelation](MappingConfigService.md#getrelation)
- [isChild](MappingConfigService.md#ischild)
- [listEntities](MappingConfigService.md#listentities)
- [set](MappingConfigService.md#set)
- [sortByDependencies](MappingConfigService.md#sortbydependencies)
- [sortByRelations](MappingConfigService.md#sortbyrelations)

## Constructors

### constructor

• **new MappingConfigService**(`mapping`, `enums?`): [`MappingConfigService`](MappingConfigService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`Mapping`](../interfaces/Mapping.md) |
| `enums?` | [`Enum`](../interfaces/Enum.md)[] |

#### Returns

[`MappingConfigService`](MappingConfigService.md)

#### Overrides

DomainConfigServiceBase\&lt;EntityMapping, PropertyMapping\&gt;.constructor

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:6

## Properties

### enums

• **enums**: [`Enum`](../interfaces/Enum.md)[]

#### Overrides

DomainConfigServiceBase.enums

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:5

## Accessors

### entities

• `get` **entities**(): [`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Overrides

DomainConfigServiceBase.entities

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:11

___

### format

• `get` **format**(): `undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

#### Returns

`undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:8

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:7

## Methods

### entityMapping

▸ **entityMapping**(`entityName`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| `string`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:12

___

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

### get

▸ **get**(): [`Mapping`](../interfaces/Mapping.md)

#### Returns

[`Mapping`](../interfaces/Mapping.md)

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:9

___

### getAutoIncrement

▸ **getAutoIncrement**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Inherited from

DomainConfigServiceBase.getAutoIncrement

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:11

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/EntityMapping.md)

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

▸ **getFieldIds**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/PropertyMapping.md)[]

#### Inherited from

DomainConfigServiceBase.getFieldIds

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:12

___

### getForcedEntity

▸ **getForcedEntity**(`name`): [`EntityMapping`](../interfaces/EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)

#### Inherited from

DomainConfigServiceBase.getForcedEntity

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:6

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`PropertyMapping`](../interfaces/PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`PropertyMapping`](../interfaces/PropertyMapping.md)

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

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Mapping`](../interfaces/Mapping.md) |

#### Returns

`void`

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/mappingConfigService.d.ts:10

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `mainEntities` | `string`[] | - |
| `allEntities` | `string`[] | entities to order |

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

DomainConfigServiceBase.sortByRelations

#### Defined in

node_modules/lambdaorm-base/schema/application/services/config/domainConfigServiceBase.d.ts:19
