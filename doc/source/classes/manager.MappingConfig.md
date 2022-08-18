[Lambda ORM](../README.md) / [manager](../modules/manager.md) / MappingConfig

# Class: MappingConfig

[manager](../modules/manager.md).MappingConfig

## Hierarchy

- `ModelConfigBase`<[`EntityMapping`](../interfaces/model.EntityMapping.md), [`PropertyMapping`](../interfaces/model.PropertyMapping.md)\>

  ↳ **`MappingConfig`**

## Table of contents

### Constructors

- [constructor](manager.MappingConfig.md#constructor)

### Properties

- [enums](manager.MappingConfig.md#enums)

### Accessors

- [entities](manager.MappingConfig.md#entities)
- [format](manager.MappingConfig.md#format)
- [name](manager.MappingConfig.md#name)

### Methods

- [entityMapping](manager.MappingConfig.md#entitymapping)
- [existsProperty](manager.MappingConfig.md#existsproperty)
- [get](manager.MappingConfig.md#get)
- [getAutoIncrement](manager.MappingConfig.md#getautoincrement)
- [getEntity](manager.MappingConfig.md#getentity)
- [getEnum](manager.MappingConfig.md#getenum)
- [getFieldIds](manager.MappingConfig.md#getfieldids)
- [getForcedEntity](manager.MappingConfig.md#getforcedentity)
- [getProperty](manager.MappingConfig.md#getproperty)
- [getRelation](manager.MappingConfig.md#getrelation)
- [isChild](manager.MappingConfig.md#ischild)
- [listEntities](manager.MappingConfig.md#listentities)
- [set](manager.MappingConfig.md#set)
- [sortByDependencies](manager.MappingConfig.md#sortbydependencies)
- [sortByRelations](manager.MappingConfig.md#sortbyrelations)

## Constructors

### constructor

• **new MappingConfig**(`mapping`, `enums?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mapping` | [`Mapping`](../interfaces/model.Mapping.md) | `undefined` |
| `enums` | [`Enum`](../interfaces/model.Enum.md)[] | `[]` |

#### Overrides

ModelConfigBase&lt;EntityMapping, PropertyMapping\&gt;.constructor

#### Defined in

[src/lib/manager/schema.ts:257](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L257)

## Properties

### enums

• **enums**: [`Enum`](../interfaces/model.Enum.md)[]

#### Overrides

ModelConfigBase.enums

#### Defined in

[src/lib/manager/schema.ts:256](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L256)

## Accessors

### entities

• `get` **entities**(): [`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Overrides

ModelConfigBase.entities

#### Defined in

[src/lib/manager/schema.ts:279](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L279)

___

### format

• `get` **format**(): `undefined` \| [`FormatMapping`](../interfaces/model.FormatMapping.md)

#### Returns

`undefined` \| [`FormatMapping`](../interfaces/model.FormatMapping.md)

#### Defined in

[src/lib/manager/schema.ts:267](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L267)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/manager/schema.ts:263](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L263)

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

[src/lib/manager/schema.ts:283](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L283)

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

ModelConfigBase.existsProperty

#### Defined in

[src/lib/manager/schema.ts:40](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L40)

___

### get

▸ **get**(): [`Mapping`](../interfaces/model.Mapping.md)

#### Returns

[`Mapping`](../interfaces/model.Mapping.md)

#### Defined in

[src/lib/manager/schema.ts:271](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L271)

___

### getAutoIncrement

▸ **getAutoIncrement**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Inherited from

ModelConfigBase.getAutoIncrement

#### Defined in

[src/lib/manager/schema.ts:59](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L59)

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Inherited from

ModelConfigBase.getEntity

#### Defined in

[src/lib/manager/schema.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L13)

___

### getEnum

▸ **getEnum**(`name`): `undefined` \| [`Enum`](../interfaces/model.Enum.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Enum`](../interfaces/model.Enum.md)

#### Inherited from

ModelConfigBase.getEnum

#### Defined in

[src/lib/manager/schema.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L25)

___

### getFieldIds

▸ **getFieldIds**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)[]

#### Inherited from

ModelConfigBase.getFieldIds

#### Defined in

[src/lib/manager/schema.ts:67](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L67)

___

### getForcedEntity

▸ **getForcedEntity**(`name`): [`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`EntityMapping`](../interfaces/model.EntityMapping.md)

#### Inherited from

ModelConfigBase.getForcedEntity

#### Defined in

[src/lib/manager/schema.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L17)

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Inherited from

ModelConfigBase.getProperty

#### Defined in

[src/lib/manager/schema.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L47)

___

### getRelation

▸ **getRelation**(`entity`, `relation`): [`RelationInfo`](../interfaces/model.RelationInfo.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `relation` | `string` |

#### Returns

[`RelationInfo`](../interfaces/model.RelationInfo.md)

#### Inherited from

ModelConfigBase.getRelation

#### Defined in

[src/lib/manager/schema.ts:217](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L217)

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

ModelConfigBase.isChild

#### Defined in

[src/lib/manager/schema.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L29)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

ModelConfigBase.listEntities

#### Defined in

[src/lib/manager/schema.ts:75](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L75)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Mapping`](../interfaces/model.Mapping.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:275](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L275)

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

ModelConfigBase.sortByDependencies

#### Defined in

[src/lib/manager/schema.ts:106](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L106)

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

ModelConfigBase.sortByRelations

#### Defined in

[src/lib/manager/schema.ts:84](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/manager/schema.ts#L84)
