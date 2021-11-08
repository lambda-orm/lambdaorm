[Lambda ORM](../README.md) / [manager](../modules/manager.md) / SchemaHelper

# Class: SchemaHelper

[manager](../modules/manager.md).SchemaHelper

## Table of contents

### Constructors

- [constructor](manager.SchemaHelper.md#constructor)

### Accessors

- [entity](manager.SchemaHelper.md#entity)
- [mapping](manager.SchemaHelper.md#mapping)
- [name](manager.SchemaHelper.md#name)

### Methods

- [entityMapping](manager.SchemaHelper.md#entitymapping)
- [existsProperty](manager.SchemaHelper.md#existsproperty)
- [getAutoincrement](manager.SchemaHelper.md#getautoincrement)
- [getEntity](manager.SchemaHelper.md#getentity)
- [getProperty](manager.SchemaHelper.md#getproperty)
- [getRelation](manager.SchemaHelper.md#getrelation)
- [isChild](manager.SchemaHelper.md#ischild)
- [listEntities](manager.SchemaHelper.md#listentities)
- [sortEntities](manager.SchemaHelper.md#sortentities)

## Constructors

### constructor

• **new SchemaHelper**(`schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `any` |

#### Defined in

[manager/schemaHelper.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L5)

## Accessors

### entity

• `get` **entity**(): `any`

#### Returns

`any`

#### Defined in

[manager/schemaHelper.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L17)

___

### mapping

• `get` **mapping**(): `any`

#### Returns

`any`

#### Defined in

[manager/schemaHelper.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L13)

___

### name

• `get` **name**(): `any`

#### Returns

`any`

#### Defined in

[manager/schemaHelper.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L9)

## Methods

### entityMapping

▸ **entityMapping**(`entityName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`string`

#### Defined in

[manager/schemaHelper.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L47)

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

#### Defined in

[manager/schemaHelper.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L32)

___

### getAutoincrement

▸ **getAutoincrement**(`entityName`): `undefined` \| [`Property`](../interfaces/model.Property.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`undefined` \| [`Property`](../interfaces/model.Property.md)

#### Defined in

[manager/schemaHelper.ts:60](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L60)

___

### getEntity

▸ **getEntity**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[manager/schemaHelper.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L52)

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

#### Defined in

[manager/schemaHelper.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L39)

___

### getRelation

▸ **getRelation**(`entity`, `relation`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string` |
| `relation` | `string` |

#### Returns

`any`

#### Defined in

[manager/schemaHelper.ts:70](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L70)

___

### isChild

▸ **isChild**(`entityName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityName` | `string` |

#### Returns

`boolean`

#### Defined in

[manager/schemaHelper.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L21)

___

### listEntities

▸ **listEntities**(): `string`[]

#### Returns

`string`[]

#### Defined in

[manager/schemaHelper.ts:95](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L95)

___

### sortEntities

▸ **sortEntities**(`entities?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entities` | `string`[] | `[]` |

#### Returns

`string`[]

#### Defined in

[manager/schemaHelper.ts:103](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaHelper.ts#L103)
