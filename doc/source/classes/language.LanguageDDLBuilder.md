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

[src/lib/manager/ddlBuilder.ts:436](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L436)

## Methods

### addColumn

▸ `Abstract` **addColumn**(`entity`, `property`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:450](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L450)

___

### addFk

▸ `Abstract` **addFk**(`entity`, `relation`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:455](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L455)

___

### addPk

▸ `Abstract` **addPk**(`entity`, `primaryKey`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `primaryKey` | `string`[] |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:453](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L453)

___

### addUk

▸ `Abstract` **addUk**(`entity`, `uniqueKey`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `uniqueKey` | `string`[] |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:454](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L454)

___

### alterColumn

▸ `Abstract` **alterColumn**(`entity`, `property`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:451](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L451)

___

### createEntity

▸ `Abstract` **createEntity**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:449](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L449)

___

### createFk

▸ `Abstract` **createFk**(`entity`, `relation`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:456](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L456)

___

### createIndex

▸ `Abstract` **createIndex**(`entity`, `index`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `index` | [`Index`](../interfaces/model.Index.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:457](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L457)

___

### dropColumn

▸ `Abstract` **dropColumn**(`entity`, `property`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `property` | [`PropertyMapping`](../interfaces/model.PropertyMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:452](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L452)

___

### dropEntity

▸ `Abstract` **dropEntity**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:446](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L446)

___

### dropFk

▸ `Abstract` **dropFk**(`entity`, `relation`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `relation` | [`Relation`](../interfaces/model.Relation.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:444](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L444)

___

### dropIndex

▸ `Abstract` **dropIndex**(`entity`, `index`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |
| `index` | [`Index`](../interfaces/model.Index.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:445](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L445)

___

### dropPk

▸ `Abstract` **dropPk**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:447](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L447)

___

### dropUk

▸ `Abstract` **dropUk**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:448](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L448)

___

### truncateEntity

▸ `Abstract` **truncateEntity**(`entity`): [`Query`](model.Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`EntityMapping`](../interfaces/model.EntityMapping.md) |

#### Returns

[`Query`](model.Query.md)

#### Defined in

[src/lib/manager/ddlBuilder.ts:443](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/ddlBuilder.ts#L443)
