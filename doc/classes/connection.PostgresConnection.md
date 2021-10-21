[Lambda ORM](../README.md) / [connection](../modules/connection.md) / PostgresConnection

# Class: PostgresConnection

[connection](../modules/connection.md).PostgresConnection

## Hierarchy

- [`Connection`](connection.Connection.md)

  ↳ **`PostgresConnection`**

## Table of contents

### Constructors

- [constructor](connection.PostgresConnection.md#constructor)

### Properties

- [cnx](connection.PostgresConnection.md#cnx)
- [inTransaction](connection.PostgresConnection.md#intransaction)
- [pool](connection.PostgresConnection.md#pool)

### Accessors

- [config](connection.PostgresConnection.md#config)

### Methods

- [beginTransaction](connection.PostgresConnection.md#begintransaction)
- [bulkInsert](connection.PostgresConnection.md#bulkinsert)
- [commit](connection.PostgresConnection.md#commit)
- [delete](connection.PostgresConnection.md#delete)
- [execute](connection.PostgresConnection.md#execute)
- [insert](connection.PostgresConnection.md#insert)
- [rollback](connection.PostgresConnection.md#rollback)
- [select](connection.PostgresConnection.md#select)
- [update](connection.PostgresConnection.md#update)

## Constructors

### constructor

• **new PostgresConnection**(`cnx`, `pool`)

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

[connection/dialects/postgres.ts:137](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L137)

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

[connection/dialects/postgres.ts:76](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L76)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[commit](connection.Connection.md#commit)

#### Defined in

[connection/dialects/postgres.ts:142](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L142)

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

[connection/dialects/postgres.ts:128](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L128)

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

[connection/dialects/postgres.ts:133](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L133)

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

[connection/dialects/postgres.ts:66](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L66)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[Connection](connection.Connection.md).[rollback](connection.Connection.md#rollback)

#### Defined in

[connection/dialects/postgres.ts:147](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L147)

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

[connection/dialects/postgres.ts:61](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L61)

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

[connection/dialects/postgres.ts:123](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/dialects/postgres.ts#L123)
