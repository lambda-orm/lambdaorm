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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mapping` | [`Mapping`](../interfaces/Mapping.md) | `undefined` |
| `enums` | [`Enum`](../interfaces/Enum.md)[] | `[]` |

#### Returns

[`MappingConfigService`](MappingConfigService.md)

#### Overrides

DomainConfigServiceBase\&lt;EntityMapping, PropertyMapping\&gt;.constructor

#### Defined in

[src/lib/schema/application/services/config/mappingConfigService.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L7)

## Properties

### enums

• **enums**: [`Enum`](../interfaces/Enum.md)[]

#### Overrides

DomainConfigServiceBase.enums

#### Defined in

[src/lib/schema/application/services/config/mappingConfigService.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L6)

## Accessors

### entities

• `get` **entities**(): [`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/EntityMapping.md)[]

#### Overrides

DomainConfigServiceBase.entities

#### Defined in

[src/lib/schema/application/services/config/mappingConfigService.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L29)

___

### format

• `get` **format**(): `undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

#### Returns

`undefined` \| [`FormatMapping`](../interfaces/FormatMapping.md)

#### Defined in

[src/lib/schema/application/services/config/mappingConfigService.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L17)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/schema/application/services/config/mappingConfigService.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L13)

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

[src/lib/schema/application/services/config/mappingConfigService.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L33)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L38)

___

### get

▸ **get**(): [`Mapping`](../interfaces/Mapping.md)

#### Returns

[`Mapping`](../interfaces/Mapping.md)

#### Defined in

[src/lib/schema/application/services/config/mappingConfigService.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L21)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:57](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L57)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L11)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:23](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L23)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L65)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L15)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:45](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L45)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:281](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L281)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:27](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L27)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

DomainConfigServiceBase.listEntities

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:73](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L73)

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

[src/lib/schema/application/services/config/mappingConfigService.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/mappingConfigService.ts#L25)

___

### sortByDependencies

▸ **sortByDependencies**(`entities?`): `string`[]

Sort a list of entities according to their dependencies

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `entities` | `string`[] | `[]` | entities to order |

#### Returns

`string`[]

returns the sorted entities

#### Inherited from

DomainConfigServiceBase.sortByDependencies

#### Defined in

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:136](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L136)

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

[src/lib/schema/application/services/config/domainConfigServiceBase.ts:82](https://github.com/FlavioLionelRita/lambdaorm/blob/f3081132/src/lib/schema/application/services/config/domainConfigServiceBase.ts#L82)
