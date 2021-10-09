[Lambda ORM](../README.md) / [connection](../modules/connection.md) / MssqlConnection

# Class: MssqlConnection

[connection](../modules/connection.md).MssqlConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`MssqlConnection`**

## Table of contents

### Constructors

- [constructor](connection.MssqlConnection.md#constructor)

### Properties

- [cnx](connection.MssqlConnection.md#cnx)
- [inTransaction](connection.MssqlConnection.md#intransaction)
- [pool](connection.MssqlConnection.md#pool)

### Accessors

- [config](connection.MssqlConnection.md#config)

### Methods

- [beginTransaction](connection.MssqlConnection.md#begintransaction)
- [bulkInsert](connection.MssqlConnection.md#bulkinsert)
- [commit](connection.MssqlConnection.md#commit)
- [delete](connection.MssqlConnection.md#delete)
- [execute](connection.MssqlConnection.md#execute)
- [insert](connection.MssqlConnection.md#insert)
- [rollback](connection.MssqlConnection.md#rollback)
- [select](connection.MssqlConnection.md#select)
- [update](connection.MssqlConnection.md#update)

## Constructors

### constructor

• **new MssqlConnection**(`cnx`, `pool`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cnx` | `any` |
| `pool` | `any` |

#### Inherited from

[Connection](connection.Connection.md).[constructor](connection.Connection.md#constructor)

#### Defined in

[connection/connection.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connection.ts#L9)

## Properties

### cnx

• **cnx**: `any`

#### Inherited from

[Connection](connection.Connection.md).[cnx](connection.Connection.md#cnx)

#### Defined in

[connection/connection.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connection.ts#L6)

___

### inTransaction

• **inTransaction**: `boolean`

#### Inherited from

[Connection](connection.Connection.md).[inTransaction](connection.Connection.md#intransaction)

#### Defined in

[connection/connection.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connection.ts#L8)

___

### pool

• **pool**: `any`

#### Inherited from

[Connection](connection.Connection.md).[pool](connection.Connection.md#pool)

#### Defined in

[connection/connection.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connection.ts#L7)

## Accessors

### config

• `get` **config**(): [`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Returns

[`ConnectionConfig`](../interfaces/connection.ConnectionConfig.md)

#### Defined in

[connection/connection.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/connection.ts#L15)

## Methods

### beginTransaction

▸ **beginTransaction**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[beginTransaction](connection.Connection.md#begintransaction)

#### Defined in

[connection/dialects/mssql.ts:81](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L81)

___

### bulkInsert

▸ **bulkInsert**(`sql`, `array`, `parameters`, `fieldId?`): `Promise`<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `array` | `any`[] |
| `parameters` | [`Parameter`](../interfaces/model.Parameter.md)[] |
| `fieldId?` | `string` |

#### Returns

`Promise`<`number`[]\>

#### Overrides

[Connection](connection.Connection.md).[bulkInsert](connection.Connection.md#bulkinsert)

#### Defined in

[connection/dialects/mssql.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L61)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[connection/dialects/mssql.ts:86](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L86)

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

[connection/dialects/mssql.ts:71](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L71)

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

[connection/dialects/mssql.ts:77](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L77)

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

[connection/dialects/mssql.ts:55](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L55)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[connection/dialects/mssql.ts:91](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L91)

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

[connection/dialects/mssql.ts:51](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L51)

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

[connection/dialects/mssql.ts:65](https://github.com/FlavioLionelRita/lambda-orm/blob/daf3ab1/src/orm/connection/dialects/mssql.ts#L65)
