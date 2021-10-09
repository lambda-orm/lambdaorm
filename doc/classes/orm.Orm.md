[Lambda ORM](../README.md) / [orm](../modules/orm.md) / Orm

# Class: Orm

[orm](../modules/orm.md).Orm

Facade through which you can access all the functionalities of the library.

## Implements

- [`IOrm`](../interfaces/model.IOrm.md)

## Table of contents

### Constructors

- [constructor](orm.Orm.md#constructor)

### Properties

- [config](orm.Orm.md#config)

### Accessors

- [cache](orm.Orm.md#cache)
- [connection](orm.Orm.md#connection)
- [database](orm.Orm.md#database)
- [language](orm.Orm.md#language)
- [parser](orm.Orm.md#parser)
- [schema](orm.Orm.md#schema)
- [instance](orm.Orm.md#instance)

### Methods

- [build](orm.Orm.md#build)
- [complete](orm.Orm.md#complete)
- [end](orm.Orm.md#end)
- [eval](orm.Orm.md#eval)
- [execute](orm.Orm.md#execute)
- [executeSentence](orm.Orm.md#executesentence)
- [expression](orm.Orm.md#expression)
- [init](orm.Orm.md#init)
- [lambda](orm.Orm.md#lambda)
- [query](orm.Orm.md#query)
- [transaction](orm.Orm.md#transaction)

## Constructors

### constructor

• **new Orm**()

#### Defined in

[orm.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L43)

## Properties

### config

• **config**: [`Config`](../interfaces/model.Config.md)

Property that exposes the configuration

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[config](../interfaces/model.IOrm.md#config)

#### Defined in

[orm.ts:32](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L32)

## Accessors

### cache

• `get` **cache**(): [`Cache`](../interfaces/model.Cache.md)

Get reference to cache manager

#### Returns

[`Cache`](../interfaces/model.Cache.md)

#### Defined in

[orm.ts:166](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L166)

• `set` **cache**(`value`): `void`

set to cache manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Cache`](../interfaces/model.Cache.md) |

#### Returns

`void`

#### Defined in

[orm.ts:173](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L173)

___

### connection

• `get` **connection**(): [`ConnectionManager`](connection.ConnectionManager.md)

Get reference to connection manager

#### Returns

[`ConnectionManager`](connection.ConnectionManager.md)

#### Defined in

[orm.ts:159](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L159)

___

### database

• `get` **database**(): [`DatabaseManager`](database.DatabaseManager.md)

Get reference to database manager

#### Returns

[`DatabaseManager`](database.DatabaseManager.md)

#### Defined in

[orm.ts:152](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L152)

___

### language

• `get` **language**(): [`LanguageManager`](language.LanguageManager.md)

Get reference to language manager

#### Returns

[`LanguageManager`](language.LanguageManager.md)

#### Defined in

[orm.ts:145](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L145)

___

### parser

• `get` **parser**(): [`ParserManager`](parser.ParserManager.md)

Get reference to parser manager

#### Returns

[`ParserManager`](parser.ParserManager.md)

#### Defined in

[orm.ts:131](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L131)

___

### schema

• `get` **schema**(): [`SchemaManager`](schema.SchemaManager.md)

Get reference to schema manager

#### Returns

[`SchemaManager`](schema.SchemaManager.md)

#### Defined in

[orm.ts:138](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L138)

___

### instance

• `Static` `get` **instance**(): [`Orm`](orm.Orm.md)

Singleton

#### Returns

[`Orm`](orm.Orm.md)

#### Defined in

[orm.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L36)

## Methods

### build

▸ **build**(`expression`, `schema`): `Promise`<[`Operand`](language.Operand.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `schema` | `string` |

#### Returns

`Promise`<[`Operand`](language.Operand.md)\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[build](../interfaces/model.IOrm.md#build)

#### Defined in

[orm.ts:195](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L195)

___

### complete

▸ **complete**(`expression`, `schema`): `string`

complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression that can be simplified |
| `schema` | `string` | schema name |

#### Returns

`string`

full expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[complete](../interfaces/model.IOrm.md#complete)

#### Defined in

[orm.ts:183](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L183)

___

### end

▸ **end**(): `Promise`<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`<`void`\>

#### Defined in

[orm.ts:124](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L124)

___

### eval

▸ **eval**(`expression`, `context`, `schema`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | `any` |
| `schema` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[eval](../interfaces/model.IOrm.md#eval)

#### Defined in

[orm.ts:245](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L245)

___

### execute

▸ **execute**(`expression`, `database`, `context?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `database` | `string` |
| `context` | `any` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

[orm.ts:251](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L251)

___

### executeSentence

▸ **executeSentence**(`sentence`, `database`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | `any` |
| `database` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[executeSentence](../interfaces/model.IOrm.md#executesentence)

#### Defined in

[orm.ts:279](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L279)

___

### expression

▸ **expression**(`expression`): [`Expression`](manager.Expression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Expression`](manager.Expression.md)

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[expression](../interfaces/model.IOrm.md#expression)

#### Defined in

[orm.ts:227](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L227)

___

### init

▸ **init**(`configPath?`): `Promise`<`void`\>

metodo para incializar la libreria de orm

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configPath?` | `string` | optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project |

#### Returns

`Promise`<`void`\>

promise void

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[init](../interfaces/model.IOrm.md#init)

#### Defined in

[orm.ts:74](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L74)

___

### lambda

▸ **lambda**(`func`): [`Expression`](manager.Expression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `Function` |

#### Returns

[`Expression`](manager.Expression.md)

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[lambda](../interfaces/model.IOrm.md#lambda)

#### Defined in

[orm.ts:235](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L235)

___

### query

▸ **query**(`expression`, `dialect`, `schema`): `Promise`<[`Query`](language.Query.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `dialect` | `string` |
| `schema` | `string` |

#### Returns

`Promise`<[`Query`](language.Query.md)\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[query](../interfaces/model.IOrm.md#query)

#### Defined in

[orm.ts:212](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L212)

___

### transaction

▸ **transaction**(`database`, `callback`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `database` | `string` |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[transaction](../interfaces/model.IOrm.md#transaction)

#### Defined in

[orm.ts:284](https://github.com/FlavioLionelRita/lambda-orm/blob/eec4cd3/src/orm/orm.ts#L284)
