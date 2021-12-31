[Lambda ORM](../README.md) / [language](../modules/language.md) / DDLBuilder

# Class: DDLBuilder

[language](../modules/language.md).DDLBuilder

## Table of contents

### Constructors

- [constructor](language.DDLBuilder.md#constructor)

### Properties

- [stage](language.DDLBuilder.md#stage)

### Methods

- [drop](language.DDLBuilder.md#drop)
- [sync](language.DDLBuilder.md#sync)
- [truncate](language.DDLBuilder.md#truncate)

## Constructors

### constructor

• **new DDLBuilder**(`schema`, `routing`, `languageManager`, `stage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaConfig`](manager.SchemaConfig.md) |
| `routing` | [`Routing`](manager.Routing.md) |
| `languageManager` | [`LanguageManager`](language.LanguageManager.md) |
| `stage` | `string` |

#### Defined in

[src/lib/manager/ddlBuilder.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/ddlBuilder.ts#L11)

## Properties

### stage

• **stage**: `string`

#### Defined in

[src/lib/manager/ddlBuilder.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/ddlBuilder.ts#L10)

## Methods

### drop

▸ **drop**(`entities`): `Promise`<[`Query`](model.Query.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `string`[] |

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Defined in

[src/lib/manager/ddlBuilder.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/ddlBuilder.ts#L19)

___

### sync

▸ **sync**(`delta`): `Promise`<[`Query`](model.Query.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | [`Delta`](model.Delta.md) |

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Defined in

[src/lib/manager/ddlBuilder.ts:72](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/ddlBuilder.ts#L72)

___

### truncate

▸ **truncate**(`entities`): `Promise`<[`Query`](model.Query.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `string`[] |

#### Returns

`Promise`<[`Query`](model.Query.md)[]\>

#### Defined in

[src/lib/manager/ddlBuilder.ts:60](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/ddlBuilder.ts#L60)
