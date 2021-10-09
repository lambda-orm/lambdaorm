[Lambda ORM](../README.md) / [connection](../modules/connection.md) / Executor

# Class: Executor

[connection](../modules/connection.md).Executor

## Hierarchy

- **`Executor`**

  ↳ [`Transaction`](connection.Transaction.md)

## Table of contents

### Constructors

- [constructor](connection.Executor.md#constructor)

### Properties

- [connectionName](connection.Executor.md#connectionname)

### Methods

- [bulkInsert](connection.Executor.md#bulkinsert)
- [delete](connection.Executor.md#delete)
- [execute](connection.Executor.md#execute)
- [insert](connection.Executor.md#insert)
- [select](connection.Executor.md#select)
- [update](connection.Executor.md#update)

## Constructors

### constructor

• **new Executor**(`connectionManager`, `connectionName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionManager` | [`ConnectionManager`](connection.ConnectionManager.md) |
| `connectionName` | `string` |

#### Defined in

[connection/executor.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L7)

## Properties

### connectionName

• **connectionName**: `string`

#### Defined in

[connection/executor.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L6)

## Methods

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

#### Defined in

[connection/executor.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L26)

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

#### Defined in

[connection/executor.ts:40](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L40)

___

### execute

▸ **execute**(`sql`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[connection/executor.ts:47](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L47)

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

#### Defined in

[connection/executor.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L19)

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

#### Defined in

[connection/executor.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L12)

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

#### Defined in

[connection/executor.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/connection/executor.ts#L33)
