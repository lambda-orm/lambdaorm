[Lambda ORM](../README.md) / [orm](../modules/orm.md) / Orm

# Class: Orm

[orm](../modules/orm.md).Orm

Facade through which you can access all the functionalities of the library.

## Implements

- [`IOrm`](../interfaces/model.IOrm.md)

## Table of contents

### Constructors

- [constructor](orm.Orm.md#constructor)

### Accessors

- [database](orm.Orm.md#database)
- [lib](orm.Orm.md#lib)
- [workspace](orm.Orm.md#workspace)
- [instance](orm.Orm.md#instance)

### Methods

- [dialect](orm.Orm.md#dialect)
- [end](orm.Orm.md#end)
- [expression](orm.Orm.md#expression)
- [init](orm.Orm.md#init)
- [lambda](orm.Orm.md#lambda)
- [setCache](orm.Orm.md#setcache)
- [transaction](orm.Orm.md#transaction)

## Constructors

### constructor

• **new Orm**(`workspace?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

[orm.ts:44](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L44)

## Accessors

### database

• `get` **database**(): [`DatabaseFacade`](manager.DatabaseFacade.md)

Get reference to database manager

#### Returns

[`DatabaseFacade`](manager.DatabaseFacade.md)

#### Implementation of

IOrm.database

#### Defined in

[orm.ts:128](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L128)

___

### lib

• `get` **lib**(): [`LibManager`](manager.LibManager.md)

Get reference to config manager

#### Returns

[`LibManager`](manager.LibManager.md)

#### Defined in

[orm.ts:121](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L121)

___

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Implementation of

IOrm.workspace

#### Defined in

[orm.ts:110](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L110)

___

### instance

• `Static` `get` **instance**(): [`Orm`](orm.Orm.md)

Singleton

#### Returns

[`Orm`](orm.Orm.md)

#### Defined in

[orm.ts:37](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L37)

## Methods

### dialect

▸ **dialect**(`database`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |

#### Returns

`string`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[dialect](../interfaces/model.IOrm.md#dialect)

#### Defined in

[orm.ts:114](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L114)

___

### end

▸ **end**(): `Promise`<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[end](../interfaces/model.IOrm.md#end)

#### Defined in

[orm.ts:106](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L106)

___

### expression

▸ **expression**(`expression`): [`ExpressionFacade`](manager.ExpressionFacade.md)

Read expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |

#### Returns

[`ExpressionFacade`](manager.ExpressionFacade.md)

Expression manager

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[expression](../interfaces/model.IOrm.md#expression)

#### Defined in

[orm.ts:144](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L144)

___

### init

▸ **init**(`source?`, `connect?`): `Promise`<`void`\>

metodo para incializar la libreria de orm

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source?` | `string` \| [`Config`](../interfaces/model.Config.md) | `undefined` | optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project |
| `connect` | `boolean` | `true` | - |

#### Returns

`Promise`<`void`\>

promise void

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[init](../interfaces/model.IOrm.md#init)

#### Defined in

[orm.ts:81](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L81)

___

### lambda

▸ **lambda**(`func`): [`ExpressionFacade`](manager.ExpressionFacade.md)

Read lambda expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `Function` | lambda expression |

#### Returns

[`ExpressionFacade`](manager.ExpressionFacade.md)

Expression manager

#### Defined in

[orm.ts:157](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L157)

___

### setCache

▸ **setCache**(`value`): `void`

set to cache manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Cache`](../interfaces/model.Cache.md) |

#### Returns

`void`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[setCache](../interfaces/model.IOrm.md#setcache)

#### Defined in

[orm.ts:135](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L135)

___

### transaction

▸ **transaction**(`database`, `callback`): `Promise`<`void`\>

Crea una transaccion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `database` | `string` | Database name |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Codigo que se ejecutara en transaccion |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[transaction](../interfaces/model.IOrm.md#transaction)

#### Defined in

[orm.ts:167](https://github.com/FlavioLionelRita/lambda-orm/blob/5fe00b8/src/orm/orm.ts#L167)
