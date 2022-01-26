[Lambda ORM](../README.md) / [manager](../modules/manager.md) / ModelConfig

# Class: ModelConfig

[manager](../modules/manager.md).ModelConfig

## Hierarchy

- `_ModelConfig`<[`Entity`](../interfaces/model.Entity.md), [`Property`](../interfaces/model.Property.md)\>

  ↳ **`ModelConfig`**

## Table of contents

### Constructors

- [constructor](manager.ModelConfig.md#constructor)

### Properties

- [entities](manager.ModelConfig.md#entities)
- [enums](manager.ModelConfig.md#enums)

### Methods

- [existsProperty](manager.ModelConfig.md#existsproperty)
- [getAutoincrement](manager.ModelConfig.md#getautoincrement)
- [getEntity](manager.ModelConfig.md#getentity)
- [getProperty](manager.ModelConfig.md#getproperty)
- [getRelation](manager.ModelConfig.md#getrelation)
- [isChild](manager.ModelConfig.md#ischild)
- [listEntities](manager.ModelConfig.md#listentities)
- [sortEntities](manager.ModelConfig.md#sortentities)

## Constructors

### constructor

• **new ModelConfig**(`entities?`, `enums?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entities` | [`Entity`](../interfaces/model.Entity.md)[] | `[]` |
| `enums` | [`Enum`](../interfaces/model.Enum.md)[] | `[]` |

#### Overrides

\_ModelConfig&lt;Entity, Property\&gt;.constructor

#### Defined in

[src/lib/manager/schema.ts:139](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L139)

## Properties

### entities

• **entities**: [`Entity`](../interfaces/model.Entity.md)[]

#### Overrides

\_ModelConfig.entities

#### Defined in

[src/lib/manager/schema.ts:136](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L136)

___

### enums

• **enums**: [`Enum`](../interfaces/model.Enum.md)[]

#### Defined in

[src/lib/manager/schema.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L137)

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

[src/lib/manager/schema.ts:31](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L31)

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

[src/lib/manager/schema.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L50)

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

[src/lib/manager/schema.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/c5c7261/src/lib/manager/schema.ts#L12)

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
