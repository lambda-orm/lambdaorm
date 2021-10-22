[Lambda ORM](../README.md) / [model](../modules/model.md) / IOrm

# Interface: IOrm

[model](../modules/model.md).IOrm

## Implemented by

- [`Orm`](../classes/orm.Orm.md)

## Table of contents

### Properties

- [config](model.IOrm.md#config)
- [workspace](model.IOrm.md#workspace)

### Accessors

- [cache](model.IOrm.md#cache)
- [connection](model.IOrm.md#connection)
- [database](model.IOrm.md#database)
- [language](model.IOrm.md#language)
- [lib](model.IOrm.md#lib)
- [parser](model.IOrm.md#parser)
- [schema](model.IOrm.md#schema)

### Methods

- [build](model.IOrm.md#build)
- [complete](model.IOrm.md#complete)
- [eval](model.IOrm.md#eval)
- [execute](model.IOrm.md#execute)
- [executeSentence](model.IOrm.md#executesentence)
- [expression](model.IOrm.md#expression)
- [init](model.IOrm.md#init)
- [lambda](model.IOrm.md#lambda)
- [query](model.IOrm.md#query)
- [transaction](model.IOrm.md#transaction)

## Properties

### config

• **config**: [`Config`](model.Config.md)

#### Defined in

[model/iOrm.ts:11](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L11)

___

### workspace

• **workspace**: `string`

#### Defined in

[model/iOrm.ts:12](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L12)

## Accessors

### cache

• `set` **cache**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Cache`](model.Cache.md) |

#### Returns

`void`

#### Defined in

[model/iOrm.ts:19](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L19)

___

### connection

• `get` **connection**(): [`ConnectionManager`](../classes/connection.ConnectionManager.md)

#### Returns

[`ConnectionManager`](../classes/connection.ConnectionManager.md)

#### Defined in

[model/iOrm.ts:17](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L17)

___

### database

• `get` **database**(): [`DatabaseManager`](../classes/database.DatabaseManager.md)

#### Returns

[`DatabaseManager`](../classes/database.DatabaseManager.md)

#### Defined in

[model/iOrm.ts:18](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L18)

___

### language

• `get` **language**(): [`LanguageManager`](../classes/language.LanguageManager.md)

#### Returns

[`LanguageManager`](../classes/language.LanguageManager.md)

#### Defined in

[model/iOrm.ts:15](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L15)

___

### lib

• `get` **lib**(): [`LibManager`](../classes/manager.LibManager.md)

#### Returns

[`LibManager`](../classes/manager.LibManager.md)

#### Defined in

[model/iOrm.ts:13](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L13)

___

### parser

• `get` **parser**(): [`ParserManager`](../classes/parser.ParserManager.md)

#### Returns

[`ParserManager`](../classes/parser.ParserManager.md)

#### Defined in

[model/iOrm.ts:14](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L14)

___

### schema

• `get` **schema**(): [`SchemaManager`](../classes/schema.SchemaManager.md)

#### Returns

[`SchemaManager`](../classes/schema.SchemaManager.md)

#### Defined in

[model/iOrm.ts:16](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L16)

## Methods

### build

▸ **build**(`expression`, `schema`): `Promise`<[`Operand`](../classes/language.Operand.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `schema` | `string` |

#### Returns

`Promise`<[`Operand`](../classes/language.Operand.md)\>

#### Defined in

[model/iOrm.ts:25](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L25)

___

### complete

▸ **complete**(`expression`, `schema`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `schema` | `string` |

#### Returns

`string`

#### Defined in

[model/iOrm.ts:24](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L24)

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

#### Defined in

[model/iOrm.ts:27](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L27)

___

### execute

▸ **execute**(`expression`, `context`, `database?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | `any` |
| `database?` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[model/iOrm.ts:28](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L28)

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

#### Defined in

[model/iOrm.ts:29](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L29)

___

### expression

▸ **expression**(`expression`): [`Expression`](../classes/manager.Expression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Expression`](../classes/manager.Expression.md)

#### Defined in

[model/iOrm.ts:21](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L21)

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

[model/iOrm.ts:20](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L20)

___

### lambda

▸ **lambda**(`lambda`): [`Expression`](../classes/manager.Expression.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lambda` | `Function` |

#### Returns

[`Expression`](../classes/manager.Expression.md)

#### Defined in

[model/iOrm.ts:23](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L23)

___

### query

▸ **query**(`expression`, `dialect`, `schema`): `Promise`<[`Query`](../classes/language.Query.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `dialect` | `string` |
| `schema` | `string` |

#### Returns

`Promise`<[`Query`](../classes/language.Query.md)\>

#### Defined in

[model/iOrm.ts:26](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L26)

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

[model/iOrm.ts:30](https://github.com/FlavioLionelRita/lambda-orm/blob/8689963/src/orm/model/iOrm.ts#L30)
