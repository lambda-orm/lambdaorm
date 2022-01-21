[Lambda ORM](../README.md) / [manager](../modules/manager.md) / MappingConfig

# Class: MappingConfig

[manager](../modules/manager.md).MappingConfig

## Hierarchy

- `_ModelConfig`<[`EntityMapping`](../interfaces/model.EntityMapping.md), [`PropertyMapping`](../interfaces/model.PropertyMapping.md)\>

  ↳ **`MappingConfig`**

## Table of contents

### Constructors

- [constructor](manager.MappingConfig.md#constructor)

### Accessors

- [entities](manager.MappingConfig.md#entities)
- [name](manager.MappingConfig.md#name)

### Methods

- [entityMapping](manager.MappingConfig.md#entitymapping)
- [existsProperty](manager.MappingConfig.md#existsproperty)
- [get](manager.MappingConfig.md#get)
- [getAutoincrement](manager.MappingConfig.md#getautoincrement)
- [getEntity](manager.MappingConfig.md#getentity)
- [getProperty](manager.MappingConfig.md#getproperty)
- [getRelation](manager.MappingConfig.md#getrelation)
- [isChild](manager.MappingConfig.md#ischild)
- [listEntities](manager.MappingConfig.md#listentities)
- [set](manager.MappingConfig.md#set)
- [sortEntities](manager.MappingConfig.md#sortentities)

## Constructors

### constructor

• **new MappingConfig**(`mapping`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapping` | [`Mapping`](../interfaces/model.Mapping.md) |

#### Overrides

\_ModelConfig&lt;EntityMapping, PropertyMapping\&gt;.constructor

#### Defined in

[src/lib/manager/schema.ts:152](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L152)

## Accessors

### entities

• `get` **entities**(): [`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Overrides

\_ModelConfig.entities

#### Defined in

[src/lib/manager/schema.ts:176](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L176)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/manager/schema.ts:157](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L157)

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

[src/lib/manager/schema.ts:180](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L180)

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

\_ModelConfig.existsProperty

#### Defined in

[src/lib/manager/schema.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L26)

___

### get

▸ **get**(): [`Mapping`](../interfaces/model.Mapping.md)

#### Returns

[`Mapping`](../interfaces/model.Mapping.md)

#### Defined in

[src/lib/manager/schema.ts:168](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L168)

___

### getAutoincrement

▸ **getAutoincrement**(`entityName`): `undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`PropertyMapping`](../interfaces/model.PropertyMapping.md)

#### Inherited from

\_ModelConfig.getAutoincrement

#### Defined in

[src/lib/manager/schema.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L45)

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

\_ModelConfig.getEntity

#### Defined in

[src/lib/manager/schema.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L7)

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

\_ModelConfig.getProperty

#### Defined in

[src/lib/manager/schema.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L33)

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

\_ModelConfig.getRelation

#### Defined in

[src/lib/manager/schema.ts:103](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L103)

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

\_ModelConfig.isChild

#### Defined in

[src/lib/manager/schema.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L15)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

\_ModelConfig.listEntities

#### Defined in

[src/lib/manager/schema.ts:53](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L53)

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

[src/lib/manager/schema.ts:172](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L172)

___

### sortEntities

▸ **sortEntities**(`entities?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entities` | `string`[] | `[]` |

#### Returns

`string`[]

#### Inherited from

\_ModelConfig.sortEntities

#### Defined in

[src/lib/manager/schema.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/schema.ts#L57)
