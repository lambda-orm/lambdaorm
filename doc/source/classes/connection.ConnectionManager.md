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

[src/lib/connection/connectionManager.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L13)

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

[src/lib/connection/connectionManager.ts:50](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L50)

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

[src/lib/connection/connectionManager.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L18)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/connection/connectionManager.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L39)

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

[src/lib/connection/connectionManager.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L46)

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

[src/lib/connection/connectionManager.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L22)

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

[src/lib/connection/connectionManager.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/36f1fb3/src/lib/connection/connectionManager.ts#L57)
