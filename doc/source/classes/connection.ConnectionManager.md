[Lambda ORM](../README.md) / [connection](../modules/connection.md) / ConnectionManager

# Class: ConnectionManager

[connection](../modules/connection.md).ConnectionManager

## Table of contents

### Constructors

- [constructor](connection.ConnectionManager.md#constructor)

### Methods

- [acquire](connection.ConnectionManager.md#acquire)
- [addType](connection.ConnectionManager.md#addtype)
- [end](connection.ConnectionManager.md#end)
- [get](connection.ConnectionManager.md#get)
- [load](connection.ConnectionManager.md#load)
- [release](connection.ConnectionManager.md#release)

## Constructors

### constructor

• **new ConnectionManager**()

#### Defined in

[src/lib/connection/connectionManager.ts:10](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L10)

## Methods

### acquire

▸ **acquire**(`name`): `Promise`<[`Connection`](connection.Connection.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`Connection`](connection.Connection.md)\>

#### Defined in

[src/lib/connection/connectionManager.ts:47](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L47)

___

### addType

▸ **addType**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/connection/connectionManager.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L15)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connectionManager.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L36)

___

### get

▸ **get**(`name`): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Defined in

[src/lib/connection/connectionManager.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L43)

___

### load

▸ **load**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md) |

#### Returns

`void`

#### Defined in

[src/lib/connection/connectionManager.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L19)

___

### release

▸ **release**(`connection`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | [`Connection`](connection.Connection.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connectionManager.ts:54](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/connection/connectionManager.ts#L54)
