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

[src/lib/manager/schema.ts:416](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L416)

## Properties

### dataSources

• **dataSources**: [`DataSource`](../interfaces/model.DataSource.md)[]

#### Defined in

[src/lib/manager/schema.ts:413](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L413)

___

### default

• `Optional` **default**: `string`

#### Defined in

[src/lib/manager/schema.ts:414](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L414)

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

[src/lib/manager/schema.ts:431](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L431)

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

[src/lib/manager/schema.ts:420](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/manager/schema.ts#L420)
