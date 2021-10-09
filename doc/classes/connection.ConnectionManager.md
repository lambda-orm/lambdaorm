[Lambda ORM](../README.md) / [connection](../modules/connection.md) / ConnectionManager

# Class: ConnectionManager

[connection](../modules/connection.md).ConnectionManager

## Table of contents

### Constructors

- [constructor](connection.ConnectionManager.md#constructor)

### Methods

- [acquire](connection.ConnectionManager.md#acquire)
- [addType](connection.ConnectionManager.md#addtype)
- [createExecutor](connection.ConnectionManager.md#createexecutor)
- [createTransaction](connection.ConnectionManager.md#createtransaction)
- [end](connection.ConnectionManager.md#end)
- [get](connection.ConnectionManager.md#get)
- [load](connection.ConnectionManager.md#load)
- [release](connection.ConnectionManager.md#release)

## Constructors

### constructor

• **new ConnectionManager**()

#### Defined in

[connection/connectionManager.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L13)

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

[connection/connectionManager.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L46)

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

[connection/connectionManager.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L18)

___

### createExecutor

▸ **createExecutor**(`connectionName`): [`Executor`](connection.Executor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionName` | `string` |

#### Returns

[`Executor`](connection.Executor.md)

#### Defined in

[connection/connectionManager.ts:57](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L57)

___

### createTransaction

▸ **createTransaction**(`connectionName`): [`Transaction`](connection.Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionName` | `string` |

#### Returns

[`Transaction`](connection.Transaction.md)

#### Defined in

[connection/connectionManager.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L61)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/connectionManager.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L35)

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

[connection/connectionManager.ts:42](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L42)

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

[connection/connectionManager.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L22)

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

[connection/connectionManager.ts:53](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connectionManager.ts#L53)
