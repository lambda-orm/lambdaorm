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
- [workspace](orm.Orm.md#workspace)

### Accessors

- [cache](orm.Orm.md#cache)
- [connection](orm.Orm.md#connection)
- [database](orm.Orm.md#database)
- [language](orm.Orm.md#language)
- [lib](orm.Orm.md#lib)
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

• **new Orm**(`workspace?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

[orm.ts:46](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L46)

## Properties

### config

• **config**: [`Config`](../interfaces/model.Config.md)

Property that exposes the configuration

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[config](../interfaces/model.IOrm.md#config)

#### Defined in

[orm.ts:33](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L33)

___

### workspace

• **workspace**: `string`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[workspace](../interfaces/model.IOrm.md#workspace)

#### Defined in

[orm.ts:35](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L35)

## Accessors

### cache

• `get` **cache**(): [`Cache`](../interfaces/model.Cache.md)

Get reference to cache manager

#### Returns

[`Cache`](../interfaces/model.Cache.md)

#### Defined in

[orm.ts:163](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L163)

• `set` **cache**(`value`): `void`

set to cache manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Cache`](../interfaces/model.Cache.md) |

#### Returns

`void`

#### Defined in

[orm.ts:170](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L170)

___

### connection

• `get` **connection**(): [`ConnectionManager`](connection.ConnectionManager.md)

Get reference to connection manager

#### Returns

[`ConnectionManager`](connection.ConnectionManager.md)

#### Defined in

[orm.ts:156](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L156)

___

### database

• `get` **database**(): [`DatabaseManager`](database.DatabaseManager.md)

Get reference to database manager

#### Returns

[`DatabaseManager`](database.DatabaseManager.md)

#### Defined in

[orm.ts:149](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L149)

___

### language

• `get` **language**(): [`LanguageManager`](language.LanguageManager.md)

Get reference to language manager

#### Returns

[`LanguageManager`](language.LanguageManager.md)

#### Defined in

[orm.ts:142](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L142)

___

### lib

• `get` **lib**(): [`LibManager`](manager.LibManager.md)

Get reference to config manager

#### Returns

[`LibManager`](manager.LibManager.md)

#### Defined in

[orm.ts:121](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L121)

___

### parser

• `get` **parser**(): [`ParserManager`](parser.ParserManager.md)

Get reference to parser manager

#### Returns

[`ParserManager`](parser.ParserManager.md)

#### Defined in

[orm.ts:128](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L128)

___

### schema

• `get` **schema**(): [`SchemaManager`](schema.SchemaManager.md)

Get reference to schema manager

#### Returns

[`SchemaManager`](schema.SchemaManager.md)

#### Defined in

[orm.ts:135](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L135)

___

### instance

• `Static` `get` **instance**(): [`Orm`](orm.Orm.md)

Singleton

#### Returns

[`Orm`](orm.Orm.md)

#### Defined in

[orm.ts:39](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L39)

## Methods

### build

▸ **build**(`expression`, `schema`): `Promise`<[`Operand`](language.Operand.md)\>

Build expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression to build |
| `schema` | `string` | schema name |

#### Returns

`Promise`<[`Operand`](language.Operand.md)\>

Operand

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[build](../interfaces/model.IOrm.md#build)

#### Defined in

[orm.ts:199](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L199)

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

[orm.ts:180](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L180)

___

### end

▸ **end**(): `Promise`<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`<`void`\>

#### Defined in

[orm.ts:114](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L114)

___

### eval

▸ **eval**(`expression`, `context`, `schema`): `Promise`<`any`\>

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `context` | `any` | Context with variables |
| `schema` | `string` | Schema name |

#### Returns

`Promise`<`any`\>

Result of the evaluale expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[eval](../interfaces/model.IOrm.md#eval)

#### Defined in

[orm.ts:285](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L285)

___

### execute

▸ **execute**(`expression`, `context?`, `database?`): `Promise`<`any`\>

Execute expression and return result

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `context` | `any` | Context with variables |
| `database?` | `string` | Database name |

#### Returns

`Promise`<`any`\>

result of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

[orm.ts:298](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L298)

___

### executeSentence

▸ **executeSentence**(`sentence`, `database`): `Promise`<`any`\>

Execute Sentence

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sentence` | `any` | Sentence |
| `database` | `string` | Database name |

#### Returns

`Promise`<`any`\>

result of sentence

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[executeSentence](../interfaces/model.IOrm.md#executesentence)

#### Defined in

[orm.ts:335](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L335)

___

### expression

▸ **expression**(`expression`): [`Expression`](manager.Expression.md)

Read expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |

#### Returns

[`Expression`](manager.Expression.md)

Expression manager

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[expression](../interfaces/model.IOrm.md#expression)

#### Defined in

[orm.ts:245](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L245)

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

[orm.ts:80](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L80)

___

### lambda

▸ **lambda**(`func`): [`Expression`](manager.Expression.md)

Read lambda expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `Function` | lambda expression |

#### Returns

[`Expression`](manager.Expression.md)

Expression manager

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[lambda](../interfaces/model.IOrm.md#lambda)

#### Defined in

[orm.ts:258](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L258)

___

### query

▸ **query**(`expression`, `dialect`, `schema`): `Promise`<[`Query`](language.Query.md)\>

Build expression and convert in Query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression to build |
| `dialect` | `string` | Dialect name |
| `schema` | `string` | Schema name |

#### Returns

`Promise`<[`Query`](language.Query.md)\>

Query

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[query](../interfaces/model.IOrm.md#query)

#### Defined in

[orm.ts:225](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L225)

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

[orm.ts:345](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/orm.ts#L345)
