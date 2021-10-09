[Lambda ORM](../README.md) / [schema](../modules/schema.md) / SchemaHelper

# Class: SchemaHelper

[schema](../modules/schema.md).SchemaHelper

## Table of contents

### Constructors

- [constructor](schema.SchemaHelper.md#constructor)

### Accessors

- [entity](schema.SchemaHelper.md#entity)
- [mapping](schema.SchemaHelper.md#mapping)
- [name](schema.SchemaHelper.md#name)

### Methods

- [entityMapping](schema.SchemaHelper.md#entitymapping)
- [existsProperty](schema.SchemaHelper.md#existsproperty)
- [getAutoincrement](schema.SchemaHelper.md#getautoincrement)
- [getEntity](schema.SchemaHelper.md#getentity)
- [getProperty](schema.SchemaHelper.md#getproperty)
- [getRelation](schema.SchemaHelper.md#getrelation)
- [isChild](schema.SchemaHelper.md#ischild)
- [sortEntities](schema.SchemaHelper.md#sortentities)

## Constructors

### constructor

• **new SchemaHelper**(`schema`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `any` |

#### Defined in

[schema/schemaHelper.ts:5](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L5)

## Accessors

### entity

• `get` **entity**(): `any`

#### Returns

`any`

#### Defined in

[schema/schemaHelper.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L17)

___

### mapping

• `get` **mapping**(): `any`

#### Returns

`any`

#### Defined in

[schema/schemaHelper.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L13)

___

### name

• `get` **name**(): `any`

#### Returns

`any`

#### Defined in

[schema/schemaHelper.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L9)

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

[schema/schemaHelper.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L47)

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

[schema/schemaHelper.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L32)

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

[schema/schemaHelper.ts:56](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L56)

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

[schema/schemaHelper.ts:52](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L52)

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

[schema/schemaHelper.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L39)

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

[schema/schemaHelper.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L66)

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

[schema/schemaHelper.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L21)

___

### sortEntities

▸ **sortEntities**(`entities?`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities?` | `string`[] |

#### Returns

`string`[]

#### Defined in

[schema/schemaHelper.ts:91](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaHelper.ts#L91)
