[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MySqlConnection

# Class: MySqlConnection

[connection](../modules/connection.md).MySqlConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`MySqlConnection`**

## Table of contents

### Constructors

- [constructor](connection.MySqlConnection.md#constructor)

### Properties

- [cnx](connection.MySqlConnection.md#cnx)
- [inTransaction](connection.MySqlConnection.md#intransaction)
- [pool](connection.MySqlConnection.md#pool)

### Accessors

- [config](connection.MySqlConnection.md#config)

### Methods

- [beginTransaction](connection.MySqlConnection.md#begintransaction)
- [bulkInsert](connection.MySqlConnection.md#bulkinsert)
- [commit](connection.MySqlConnection.md#commit)
- [delete](connection.MySqlConnection.md#delete)
- [execute](connection.MySqlConnection.md#execute)
- [insert](connection.MySqlConnection.md#insert)
- [rollback](connection.MySqlConnection.md#rollback)
- [select](connection.MySqlConnection.md#select)
- [update](connection.MySqlConnection.md#update)

## Constructors

### constructor

• **new MySqlConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connection.ts#L9)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[connection/connection.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connection.ts#L6)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connection.ts#L8)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connection.ts#L7)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Defined in

[connection/connection.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/connection.ts#L15)

## Methods

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[connection/dialects/mysql.ts:119](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L119)

___

### bulkInsert

▸ **bulkInsert**(`sql`, `array`, `params`, `fieldId?`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `array` | `any`[] |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |
| `fieldId?` | `string` |

#### Returns

`Promise`<`number`[]\>

#### Overrides

[Connection](connection.Connection.md).[bulkInsert](connection.Connection.md#bulkinsert)

#### Defined in

[connection/dialects/mysql.ts:86](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L86)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[connection/dialects/mysql.ts:124](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L124)

___

### delete

▸ **delete**(`sql`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[delete](connection.Connection.md#delete)

#### Defined in

[connection/dialects/mysql.ts:110](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L110)

___

### execute

▸ **execute**(`sql`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[execute](connection.Connection.md#execute)

#### Defined in

[connection/dialects/mysql.ts:115](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L115)

___

### insert

▸ **insert**(`sql`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[insert](connection.Connection.md#insert)

#### Defined in

[connection/dialects/mysql.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L80)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[connection/dialects/mysql.ts:129](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L129)

___

### select

▸ **select**(`sql`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`any`\>

#### Overrides

[Connection](connection.Connection.md).[select](connection.Connection.md#select)

#### Defined in

[connection/dialects/mysql.ts:76](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L76)

___

### update

▸ **update**(`sql`, `params`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `params` | [`Parameter`](../interfaces/model.Parameter.md)[] |

#### Returns

`Promise`<`number`\>

#### Overrides

[Connection](connection.Connection.md).[update](connection.Connection.md#update)

#### Defined in

[connection/dialects/mysql.ts:105](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/mysql.ts#L105)
