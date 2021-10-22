[Lambda ORM](../README.md) / [language](../modules/language.md) / ISchemaBuilder

# Interface: ISchemaBuilder

[language](../modules/language.md).ISchemaBuilder

## Table of contents

### Methods

- [drop](language.ISchemaBuilder.md#drop)
- [sync](language.ISchemaBuilder.md#sync)
- [truncate](language.ISchemaBuilder.md#truncate)

## Methods

### drop

▸ **drop**(`dialect`, `schema`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |
| `schema` | [`SchemaHelper`](../classes/schema.SchemaHelper.md) |

#### Returns

`string`[]

#### Defined in

[language/iSchemaBuilder.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iSchemaBuilder.ts#L8)

___

### sync

▸ **sync**(`delta`, `dialect`, `schema`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | [`Delta`](../classes/model.Delta.md) |
| `dialect` | `string` |
| `schema` | [`SchemaHelper`](../classes/schema.SchemaHelper.md) |

#### Returns

`any`[]

#### Defined in

[language/iSchemaBuilder.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iSchemaBuilder.ts#L7)

___

### truncate

▸ **truncate**(`dialect`, `schema`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |
| `schema` | [`SchemaHelper`](../classes/schema.SchemaHelper.md) |

#### Returns

`string`[]

#### Defined in

[language/iSchemaBuilder.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/language/iSchemaBuilder.ts#L9)
