[Lambda ORM](../README.md) / [manager](../modules/manager.md) / DataSourceConfig

# Class: DataSourceConfig

[manager](../modules/manager.md).DataSourceConfig

## Table of contents

### Constructors

- [constructor](manager.DataSourceConfig.md#constructor)

### Properties

- [dataSources](manager.DataSourceConfig.md#datasources)
- [default](manager.DataSourceConfig.md#default)

### Methods

- [get](manager.DataSourceConfig.md#get)
- [load](manager.DataSourceConfig.md#load)

## Constructors

### constructor

• **new DataSourceConfig**()

#### Defined in

[src/lib/manager/schema.ts:228](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L228)

## Properties

### dataSources

• **dataSources**: [`DataSource`](../interfaces/model.DataSource.md)[]

#### Defined in

[src/lib/manager/schema.ts:225](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L225)

___

### default

• `Optional` **default**: `string`

#### Defined in

[src/lib/manager/schema.ts:226](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L226)

## Methods

### get

▸ **get**(`name?`): [`DataSource`](../interfaces/model.DataSource.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`DataSource`](../interfaces/model.DataSource.md)

#### Defined in

[src/lib/manager/schema.ts:243](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L243)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`DataSource`](../interfaces/model.DataSource.md) |

#### Returns

`void`

#### Defined in

[src/lib/manager/schema.ts:232](https://github.com/FlavioLionelRita/lambda-orm/blob/c4a0e00/src/lib/manager/schema.ts#L232)
