[Lambda ORM](../README.md) / [connection](../modules/connection.md) / Connection

# Class: Connection

[connection](../modules/connection.md).Connection

## Hierarchy

- **`Connection`**

  ↳ [`MySqlConnection`](connection.MySqlConnection.md)

  ↳ [`PostgresConnection`](connection.PostgresConnection.md)

  ↳ [`MssqlConnection`](connection.MssqlConnection.md)

## Table of contents

### Constructors

- [constructor](connection.Connection.md#constructor)

### Properties

- [cnx](connection.Connection.md#cnx)
- [inTransaction](connection.Connection.md#intransaction)
- [pool](connection.Connection.md#pool)

### Accessors

- [config](connection.Connection.md#config)

### Methods

- [beginTransaction](connection.Connection.md#begintransaction)
- [bulkInsert](connection.Connection.md#bulkinsert)
- [commit](connection.Connection.md#commit)
- [delete](connection.Connection.md#delete)
- [execute](connection.Connection.md#execute)
- [insert](connection.Connection.md#insert)
- [rollback](connection.Connection.md#rollback)
- [select](connection.Connection.md#select)
- [update](connection.Connection.md#update)

## Constructors

### constructor

• **new Connection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Defined in

[connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L9)

## Properties

### cnx

• **cnx**: `any`

#### Defined in

[connection/connection.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L6)

___

### inTransaction

• **inTransaction**: `boolean`

#### Defined in

[connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L8)

___

### pool

• **pool**: `any`

#### Defined in

[connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L7)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Defined in

[connection/connection.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L15)

## Methods

### beginTransaction

▸ `Abstract` **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/connection.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L25)

___

### bulkInsert

▸ `Abstract` **bulkInsert**(`sql`, `array`, `parameters`, `fieldId?`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `array` | `any`[] |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] |
| `fieldId?` | `string` |

#### Returns

`Promise`<`number`[]\>

#### Defined in

[connection/connection.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L24)

___

### commit

▸ `Abstract` **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/connection.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L26)

___

### delete

▸ `Abstract` **delete**(`sql`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[connection/connection.ts:22](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L22)

___

### execute

▸ `Abstract` **execute**(`sql`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[connection/connection.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L23)

___

### insert

▸ `Abstract` **insert**(`sql`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[connection/connection.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L20)

___

### rollback

▸ `Abstract` **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/connection.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L27)

___

### select

▸ `Abstract` **select**(`sql`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`any`\>

#### Defined in

[connection/connection.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L19)

___

### update

▸ `Abstract` **update**(`sql`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[connection/connection.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/connection.ts#L21)
