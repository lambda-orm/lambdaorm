[Lambda ORM](../README.md) / [connection](../modules/connection.md) / Transaction

# Class: Transaction

[connection](../modules/connection.md).Transaction

## Hierarchy

- [`Executor`](connection.Executor.md)

  ↳ **`Transaction`**

## Table of contents

### Constructors

- [constructor](connection.Transaction.md#constructor)

### Properties

- [connectionName](connection.Transaction.md#connectionname)

### Methods

- [begin](connection.Transaction.md#begin)
- [bulkInsert](connection.Transaction.md#bulkinsert)
- [commit](connection.Transaction.md#commit)
- [delete](connection.Transaction.md#delete)
- [execute](connection.Transaction.md#execute)
- [insert](connection.Transaction.md#insert)
- [rollback](connection.Transaction.md#rollback)
- [select](connection.Transaction.md#select)
- [update](connection.Transaction.md#update)

## Constructors

### constructor

• **new Transaction**(`connectionManager`, `connectionName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) |
| `connectionName` | `string` |

#### Inherited from

[Executor](connection.Executor.md).[constructor](connection.Executor.md#constructor)

#### Defined in

[connection/executor.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/executor.ts#L7)

## Properties

### connectionName

• **connectionName**: `string`

#### Inherited from

[Executor](connection.Executor.md).[connectionName](connection.Executor.md#connectionname)

#### Defined in

[connection/executor.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/executor.ts#L6)

## Methods

### begin

▸ **begin**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/transaction.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L8)

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

[Executor](connection.Executor.md).[bulkInsert](connection.Executor.md#bulkinsert)

#### Defined in

[connection/transaction.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L23)

___

### commit

▸ **commit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/transaction.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L43)

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

[Executor](connection.Executor.md).[delete](connection.Executor.md#delete)

#### Defined in

[connection/transaction.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L33)

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

[Executor](connection.Executor.md).[execute](connection.Executor.md#execute)

#### Defined in

[connection/transaction.ts:38](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L38)

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

[Executor](connection.Executor.md).[insert](connection.Executor.md#insert)

#### Defined in

[connection/transaction.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L18)

___

### rollback

▸ **rollback**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[connection/transaction.ts:49](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L49)

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

[Executor](connection.Executor.md).[select](connection.Executor.md#select)

#### Defined in

[connection/transaction.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L13)

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

[Executor](connection.Executor.md).[update](connection.Executor.md#update)

#### Defined in

[connection/transaction.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/connection/transaction.ts#L28)
