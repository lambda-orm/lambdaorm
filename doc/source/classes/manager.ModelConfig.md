[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ModelConfig

# Class: ModelConfig

[manager](../modules/manager.md).ModelConfig

## Hierarchy

- `_ModelConfig`<[`Entity`](../interfaces/model.Entity.md), [`Property`](../interfaces/model.Property.md)\>

  ↳ **`ModelConfig`**

## Table of contents

### Constructors

- [constructor](manager.ModelConfig.md#constructor)

### Accessors

- [entities](manager.ModelConfig.md#entities)

### Methods

- [existsProperty](manager.ModelConfig.md#existsproperty)
- [get](manager.ModelConfig.md#get)
- [getAutoincrement](manager.ModelConfig.md#getautoincrement)
- [getEntity](manager.ModelConfig.md#getentity)
- [getProperty](manager.ModelConfig.md#getproperty)
- [getRelation](manager.ModelConfig.md#getrelation)
- [isChild](manager.ModelConfig.md#ischild)
- [listEntities](manager.ModelConfig.md#listentities)
- [set](manager.ModelConfig.md#set)
- [sortEntities](manager.ModelConfig.md#sortentities)

## Constructors

### constructor

• **new ModelConfig**(`model`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](../interfaces/model.Model.md) |

#### Overrides

\_ModelConfig&lt;Entity, Property\&gt;.constructor

#### Defined in

[src/lib/manager/schema.ts:132](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L132)

## Accessors

### entities

• `get` **entities**(): [`Entity`](../interfaces/model.Entity.md)[]

#### Returns

[`Entity`](../interfaces/model.Entity.md)[]

#### Overrides

\_ModelConfig.entities

#### Defined in

[src/lib/manager/schema.ts:145](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L145)

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

\_ModelConfig.existsProperty

#### Defined in

[src/lib/manager/schema.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L26)

___

### get

▸ **get**(): [`Model`](../interfaces/model.Model.md)

#### Returns

[`Model`](../interfaces/model.Model.md)

#### Defined in

[src/lib/manager/schema.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L137)

___

### getAutoincrement

▸ **getAutoincrement**(`entityName`): `undefined` \| [`Property`](../interfaces/model.Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/model.Property.md)

#### Inherited from

\_ModelConfig.getAutoincrement

#### Defined in

[src/lib/manager/schema.ts:45](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L45)

___

### getEntity

▸ **getEntity**(`name`): `undefined` \| [`Entity`](../interfaces/model.Entity.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Entity`](../interfaces/model.Entity.md)

#### Inherited from

\_ModelConfig.getEntity

#### Defined in

[src/lib/manager/schema.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L7)

___

### getProperty

▸ **getProperty**(`entityName`, `name`): [`Property`](../interfaces/model.Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |
| `name` | `string` |

#### Returns

[`Property`](../interfaces/model.Property.md)

#### Inherited from

\_ModelConfig.getProperty

#### Defined in

[src/lib/manager/schema.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L33)

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

[src/lib/manager/schema.ts:103](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L103)

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

[src/lib/manager/schema.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L15)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Inherited from

\_ModelConfig.listEntities

#### Defined in

[src/lib/manager/schema.ts:53](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L53)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Model`](../interfaces/model.Model.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:141](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L141)

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

[src/lib/manager/schema.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/schema.ts#L57)
