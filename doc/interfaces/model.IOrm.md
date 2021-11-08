[Lambda ORM](../README.md) / [model](../modules/model.md) / IOrm

# Interface: IOrm

[model](../modules/model.md).IOrm

## Implemented by

- [`Orm`](../classes/orm.Orm.md)

## Table of contents

### Accessors

- [database](model.IOrm.md#database)
- [workspace](model.IOrm.md#workspace)

### Methods

- [dialect](model.IOrm.md#dialect)
- [end](model.IOrm.md#end)
- [expression](model.IOrm.md#expression)
- [init](model.IOrm.md#init)
- [setCache](model.IOrm.md#setcache)
- [transaction](model.IOrm.md#transaction)

## Accessors

### database

• `get` **database**(): [`DatabaseFacade`](../classes/manager.DatabaseFacade.md)

#### Returns

[`DatabaseFacade`](../classes/manager.DatabaseFacade.md)

#### Defined in

[model/iOrm.ts:8](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L8)

___

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Defined in

[model/iOrm.ts:6](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L6)

## Methods

### dialect

▸ **dialect**(`database`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |

#### Returns

`string`

#### Defined in

[model/iOrm.ts:7](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L7)

___

### end

▸ **end**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[model/iOrm.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L11)

___

### expression

▸ **expression**(`expression`): [`ExpressionFacade`](../classes/manager.ExpressionFacade.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`ExpressionFacade`](../classes/manager.ExpressionFacade.md)

#### Defined in

[model/iOrm.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L12)

___

### init

▸ **init**(`configPath?`, `connect?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configPath?` | `string` |
| `connect?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[model/iOrm.ts:10](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L10)

___

### setCache

▸ **setCache**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Cache`](model.Cache.md) |

#### Returns

`void`

#### Defined in

[model/iOrm.ts:9](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L9)

___

### transaction

▸ **transaction**(`database`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `callback` | (`tr`: [`Transaction`](../classes/manager.Transaction.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[model/iOrm.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/model/iOrm.ts#L13)
