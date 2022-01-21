[Lambda ORM](../README.md) / [language](../modules/language.md) / LanguageDDLBuilder

# Class: LanguageDDLBuilder

[language](../modules/language.md).LanguageDDLBuilder

## Table of contents

### Constructors

- [constructor](language.LanguageDDLBuilder.md#constructor)

### Methods

- [addColumn](language.LanguageDDLBuilder.md#addcolumn)
- [addFk](language.LanguageDDLBuilder.md#addfk)
- [addPk](language.LanguageDDLBuilder.md#addpk)
- [addUk](language.LanguageDDLBuilder.md#adduk)
- [alterColumn](language.LanguageDDLBuilder.md#altercolumn)
- [createEntity](language.LanguageDDLBuilder.md#createentity)
- [createFk](language.LanguageDDLBuilder.md#createfk)
- [createIndex](language.LanguageDDLBuilder.md#createindex)
- [dropColumn](language.LanguageDDLBuilder.md#dropcolumn)
- [dropEntity](language.LanguageDDLBuilder.md#dropentity)
- [dropFk](language.LanguageDDLBuilder.md#dropfk)
- [dropIndex](language.LanguageDDLBuilder.md#dropindex)
- [dropPk](language.LanguageDDLBuilder.md#droppk)
- [dropUk](language.LanguageDDLBuilder.md#dropuk)
- [truncateEntity](language.LanguageDDLBuilder.md#truncateentity)

## Constructors

### constructor

• **new LanguageDDLBuilder**(`dataSource`, `mapping`, `metadata`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `string` |
| `mapping` | [`MappingConfig`](manager.MappingConfig.md) |
| `metadata` | [`DialectMetadata`](language.DialectMetadata.md) |

#### Defined in

[src/lib/manager/ddlBuilder.ts:377](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L377)

## Methods

### addColumn

▸ `Abstract` **addColumn**(`entity`, `property`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:391](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L391)

___

### addFk

▸ `Abstract` **addFk**(`entity`, `relation`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:396](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L396)

___

### addPk

▸ `Abstract` **addPk**(`entity`, `primaryKey`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `primaryKey` | `string`[] |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:394](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L394)

___

### addUk

▸ `Abstract` **addUk**(`entity`, `uniqueKey`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `uniqueKey` | `string`[] |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:395](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L395)

___

### alterColumn

▸ `Abstract` **alterColumn**(`entity`, `property`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:392](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L392)

___

### createEntity

▸ `Abstract` **createEntity**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:390](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L390)

___

### createFk

▸ `Abstract` **createFk**(`entity`, `relation`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:397](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L397)

___

### createIndex

▸ `Abstract` **createIndex**(`entity`, `index`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `index` | [`Index`](../interfaces/model.Index.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:398](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L398)

___

### dropColumn

▸ `Abstract` **dropColumn**(`entity`, `property`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:393](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L393)

___

### dropEntity

▸ `Abstract` **dropEntity**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:387](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L387)

___

### dropFk

▸ `Abstract` **dropFk**(`entity`, `relation`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:385](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L385)

___

### dropIndex

▸ `Abstract` **dropIndex**(`entity`, `index`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |
| `index` | [`Index`](../interfaces/model.Index.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:386](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L386)

___

### dropPk

▸ `Abstract` **dropPk**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:388](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L388)

___

### dropUk

▸ `Abstract` **dropUk**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:389](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L389)

___

### truncateEntity

▸ `Abstract` **truncateEntity**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../interfaces/model.Entity.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:384](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/manager/ddlBuilder.ts#L384)
