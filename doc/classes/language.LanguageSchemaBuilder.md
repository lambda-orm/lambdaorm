[Lambda ORM](../README.md) / [language](../modules/language.md) / LanguageSchemaBuilder

# Class: LanguageSchemaBuilder

[language](../modules/language.md).LanguageSchemaBuilder

## Table of contents

### Constructors

- [constructor](language.LanguageSchemaBuilder.md#constructor)

### Methods

- [addColumn](language.LanguageSchemaBuilder.md#addcolumn)
- [addFk](language.LanguageSchemaBuilder.md#addfk)
- [addPk](language.LanguageSchemaBuilder.md#addpk)
- [addUk](language.LanguageSchemaBuilder.md#adduk)
- [alterColumn](language.LanguageSchemaBuilder.md#altercolumn)
- [createEntity](language.LanguageSchemaBuilder.md#createentity)
- [createFk](language.LanguageSchemaBuilder.md#createfk)
- [createIndex](language.LanguageSchemaBuilder.md#createindex)
- [dropColumn](language.LanguageSchemaBuilder.md#dropcolumn)
- [dropEntity](language.LanguageSchemaBuilder.md#dropentity)
- [dropFk](language.LanguageSchemaBuilder.md#dropfk)
- [dropIndex](language.LanguageSchemaBuilder.md#dropindex)
- [dropPk](language.LanguageSchemaBuilder.md#droppk)
- [dropUk](language.LanguageSchemaBuilder.md#dropuk)
- [truncateEntity](language.LanguageSchemaBuilder.md#truncateentity)

## Constructors

### constructor

• **new LanguageSchemaBuilder**()

## Methods

### addColumn

▸ `Abstract` **addColumn**(`database`, `entity`, `property`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `property` | [`Property`](../interfaces/model.Property.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:411](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L411)

___

### addFk

▸ `Abstract` **addFk**(`database`, `schema`, `entity`, `relation`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |
| `entity` | `any` |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:416](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L416)

___

### addPk

▸ `Abstract` **addPk**(`database`, `entity`, `primaryKey`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `primaryKey` | `string`[] |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:414](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L414)

___

### addUk

▸ `Abstract` **addUk**(`database`, `entity`, `uniqueKey`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `uniqueKey` | `string`[] |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:415](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L415)

___

### alterColumn

▸ `Abstract` **alterColumn**(`database`, `entity`, `property`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `property` | [`Property`](../interfaces/model.Property.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:412](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L412)

___

### createEntity

▸ `Abstract` **createEntity**(`database`, `entity`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:410](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L410)

___

### createFk

▸ `Abstract` **createFk**(`database`, `schema`, `entity`, `relation`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `schema` | [`SchemaHelper`](manager.SchemaHelper.md) |
| `entity` | `any` |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:417](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L417)

___

### createIndex

▸ `Abstract` **createIndex**(`database`, `entity`, `index`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `index` | [`Index`](../interfaces/model.Index.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:418](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L418)

___

### dropColumn

▸ `Abstract` **dropColumn**(`database`, `entity`, `property`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `property` | [`Property`](../interfaces/model.Property.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:413](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L413)

___

### dropEntity

▸ `Abstract` **dropEntity**(`database`, `entity`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:407](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L407)

___

### dropFk

▸ `Abstract` **dropFk**(`database`, `entity`, `relation`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:405](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L405)

___

### dropIndex

▸ `Abstract` **dropIndex**(`database`, `entity`, `index`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `index` | [`Index`](../interfaces/model.Index.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:406](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L406)

___

### dropPk

▸ `Abstract` **dropPk**(`database`, `entity`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:408](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L408)

___

### dropUk

▸ `Abstract` **dropUk**(`database`, `entity`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:409](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L409)

___

### truncateEntity

▸ `Abstract` **truncateEntity**(`database`, `entity`, `metadata`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `entity` | `any` |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[manager/schemaBuilder.ts:404](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/manager/schemaBuilder.ts#L404)
