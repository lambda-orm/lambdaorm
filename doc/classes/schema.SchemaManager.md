[Lambda ORM](../README.md) / [schema](../modules/schema.md) / SchemaManager

# Class: SchemaManager

[schema](../modules/schema.md).SchemaManager

## Table of contents

### Constructors

- [constructor](schema.SchemaManager.md#constructor)

### Properties

- [schemas](schema.SchemaManager.md#schemas)

### Methods

- [delete](schema.SchemaManager.md#delete)
- [drop](schema.SchemaManager.md#drop)
- [export](schema.SchemaManager.md#export)
- [get](schema.SchemaManager.md#get)
- [getInstance](schema.SchemaManager.md#getinstance)
- [import](schema.SchemaManager.md#import)
- [list](schema.SchemaManager.md#list)
- [load](schema.SchemaManager.md#load)
- [model](schema.SchemaManager.md#model)
- [sync](schema.SchemaManager.md#sync)
- [transform](schema.SchemaManager.md#transform)
- [truncate](schema.SchemaManager.md#truncate)
- [untransform](schema.SchemaManager.md#untransform)

## Constructors

### constructor

• **new SchemaManager**(`orm`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |

#### Defined in

[schema/schemaManager.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L13)

## Properties

### schemas

• **schemas**: `any`

#### Defined in

[schema/schemaManager.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L11)

## Methods

### delete

▸ **delete**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Defined in

[schema/schemaManager.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L22)

___

### drop

▸ **drop**(`schema`): [`SchemaDrop`](schema.SchemaDrop.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

[`SchemaDrop`](schema.SchemaDrop.md)

#### Defined in

[schema/schemaManager.ts:55](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L55)

___

### export

▸ **export**(`schema`): [`SchemaExport`](schema.SchemaExport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

[`SchemaExport`](schema.SchemaExport.md)

#### Defined in

[schema/schemaManager.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L67)

___

### get

▸ **get**(`name`): [`Schema`](../interfaces/model.Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Schema`](../interfaces/model.Schema.md)

#### Defined in

[schema/schemaManager.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L26)

___

### getInstance

▸ **getInstance**(`name`): [`SchemaHelper`](schema.SchemaHelper.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`SchemaHelper`](schema.SchemaHelper.md)

#### Defined in

[schema/schemaManager.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L40)

___

### import

▸ **import**(`schema`): `SchemaImport`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`SchemaImport`

#### Defined in

[schema/schemaManager.ts:73](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L73)

___

### list

▸ **list**(): [`Schema`](../interfaces/model.Schema.md)[]

#### Returns

[`Schema`](../interfaces/model.Schema.md)[]

#### Defined in

[schema/schemaManager.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L32)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`void`

#### Defined in

[schema/schemaManager.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L18)

___

### model

▸ **model**(`source`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`string`

#### Defined in

[schema/schemaManager.ts:79](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L79)

___

### sync

▸ **sync**(`current`, `old?`): [`SchemaSync`](schema.SchemaSync.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `current` | [`Schema`](../interfaces/model.Schema.md) |
| `old?` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

[`SchemaSync`](schema.SchemaSync.md)

#### Defined in

[schema/schemaManager.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L46)

___

### transform

▸ **transform**(`source`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`any`

#### Defined in

[schema/schemaManager.ts:116](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L116)

___

### truncate

▸ **truncate**(`current`): `SchemaTruncate`

#### Parameters

| Name | Type |
| :------ | :------ |
| `current` | [`Schema`](../interfaces/model.Schema.md) |

#### Returns

`SchemaTruncate`

#### Defined in

[schema/schemaManager.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L61)

___

### untransform

▸ **untransform**(`source`): [`Schema`](../interfaces/model.Schema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `any` |

#### Returns

[`Schema`](../interfaces/model.Schema.md)

#### Defined in

[schema/schemaManager.ts:149](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/schema/schemaManager.ts#L149)
