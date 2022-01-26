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

[src/lib/manager/schema.ts:148](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L148)

## Accessors

### entities

• `get` **entities**(): [`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Returns

[`EntityMapping`](../interfaces/model.EntityMapping.md)[]

#### Overrides

\_ModelConfig.entities

#### Defined in

[src/lib/manager/schema.ts:172](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L172)

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/manager/schema.ts:153](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L153)

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

[src/lib/manager/schema.ts:176](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L176)

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

[src/lib/manager/schema.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L31)

___

### get

▸ **get**(): [`Mapping`](../interfaces/model.Mapping.md)

#### Returns

[`Mapping`](../interfaces/model.Mapping.md)

#### Defined in

[src/lib/manager/schema.ts:164](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L164)

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

[src/lib/manager/schema.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L50)

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

[src/lib/manager/schema.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L12)

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

[src/lib/manager/schema.ts:38](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L38)

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

[src/lib/manager/schema.ts:109](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L109)

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

[src/lib/manager/schema.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L20)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

\_ModelConfig.listEntities

#### Defined in

[src/lib/manager/schema.ts:58](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L58)

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

[src/lib/manager/schema.ts:168](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L168)

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

[src/lib/manager/schema.ts:62](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L62)
