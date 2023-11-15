[Lambda ORM](../README.md) / DataSourceConfigService

# Class: DataSourceConfigService

## Table of contents

### Constructors

- [constructor](DataSourceConfigService.md#constructor)

### Properties

- [default](DataSourceConfigService.md#default)
- [sources](DataSourceConfigService.md#sources)

### Methods

- [get](DataSourceConfigService.md#get)
- [load](DataSourceConfigService.md#load)

## Constructors

### constructor

• **new DataSourceConfigService**(): [`DataSourceConfigService`](DataSourceConfigService.md)

#### Returns

[`DataSourceConfigService`](DataSourceConfigService.md)

#### Defined in

[src/lib/schema/application/services/config/dataSourceConfigService.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/schema/application/services/config/dataSourceConfigService.ts#L7)

## Properties

### default

• `Optional` **default**: `string`

#### Defined in

[src/lib/schema/application/services/config/dataSourceConfigService.ts:5](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/schema/application/services/config/dataSourceConfigService.ts#L5)

___

### sources

• **sources**: [`Source`](../interfaces/Source.md)[]

#### Defined in

[src/lib/schema/application/services/config/dataSourceConfigService.ts:4](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/schema/application/services/config/dataSourceConfigService.ts#L4)

## Methods

### get

▸ **get**(`name?`): [`Source`](../interfaces/Source.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Source`](../interfaces/Source.md)

#### Defined in

[src/lib/schema/application/services/config/dataSourceConfigService.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/schema/application/services/config/dataSourceConfigService.ts#L22)

___

### load

▸ **load**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Source`](../interfaces/Source.md) |

#### Returns

`void`

#### Defined in

[src/lib/schema/application/services/config/dataSourceConfigService.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/dc415d06/src/lib/schema/application/services/config/dataSourceConfigService.ts#L11)
