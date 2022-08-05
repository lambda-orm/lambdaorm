[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Languages

# Class: Languages

[manager](../modules/manager.md).Languages

## Table of contents

### Constructors

- [constructor](manager.Languages.md#constructor)

### Properties

- [dialects](manager.Languages.md#dialects)

### Methods

- [add](manager.Languages.md#add)
- [get](manager.Languages.md#get)
- [getByDialect](manager.Languages.md#getbydialect)
- [getDialect](manager.Languages.md#getdialect)

## Constructors

### constructor

• **new Languages**()

#### Defined in

[src/lib/manager/languages.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/languages.ts#L10)

## Properties

### dialects

• **dialects**: `any`

#### Defined in

[src/lib/manager/languages.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/languages.ts#L7)

## Methods

### add

▸ **add**(`language`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | [`Language`](manager.Language.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/languages.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/languages.ts#L15)

___

### get

▸ **get**(`name`): [`Language`](manager.Language.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Language`](manager.Language.md)

#### Defined in

[src/lib/manager/languages.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/languages.ts#L24)

___

### getByDialect

▸ **getByDialect**(`dialect`): [`Language`](manager.Language.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dialect` | `string` |

#### Returns

[`Language`](manager.Language.md)

#### Defined in

[src/lib/manager/languages.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/languages.ts#L32)

___

### getDialect

▸ **getDialect**(`name`): [`Dialect`](manager.Dialect.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Dialect`](manager.Dialect.md)

#### Defined in

[src/lib/manager/languages.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/manager/languages.ts#L43)
