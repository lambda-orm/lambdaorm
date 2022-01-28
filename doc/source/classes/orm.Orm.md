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

- [expressions](orm.Orm.md#expressions)

### Accessors

- [defaultStage](orm.Orm.md#defaultstage)
- [schema](orm.Orm.md#schema)
- [stage](orm.Orm.md#stage)
- [workspace](orm.Orm.md#workspace)
- [instance](orm.Orm.md#instance)

### Methods

- [complete](orm.Orm.md#complete)
- [dialect](orm.Orm.md#dialect)
- [end](orm.Orm.md#end)
- [eval](orm.Orm.md#eval)
- [execute](orm.Orm.md#execute)
- [init](orm.Orm.md#init)
- [metadata](orm.Orm.md#metadata)
- [model](orm.Orm.md#model)
- [parameters](orm.Orm.md#parameters)
- [sentence](orm.Orm.md#sentence)
- [setCache](orm.Orm.md#setcache)
- [toExpression](orm.Orm.md#toexpression)
- [transaction](orm.Orm.md#transaction)

## Constructors

### constructor

• **new Orm**(`workspace?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

src/lib/orm.ts:42

## Properties

### expressions

• **expressions**: `Expressions`

#### Defined in

src/lib/orm.ts:23

## Accessors

### defaultStage

• `get` **defaultStage**(): [`Stage`](../interfaces/model.Stage.md)

#### Returns

[`Stage`](../interfaces/model.Stage.md)

#### Defined in

src/lib/orm.ts:65

___

### schema

• `get` **schema**(): [`SchemaManager`](manager.SchemaManager.md)

Get reference to SchemaConfig

#### Returns

[`SchemaManager`](manager.SchemaManager.md)

#### Implementation of

IOrm.schema

#### Defined in

src/lib/orm.ts:110

___

### stage

• `get` **stage**(): [`StageFacade`](manager.StageFacade.md)

Get reference to stage manager

#### Returns

[`StageFacade`](manager.StageFacade.md)

#### Implementation of

IOrm.stage

#### Defined in

src/lib/orm.ts:103

___

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Implementation of

IOrm.workspace

#### Defined in

src/lib/orm.ts:92

___

### instance

• `Static` `get` **instance**(): [`Orm`](orm.Orm.md)

Singleton

#### Returns

[`Orm`](orm.Orm.md)

#### Defined in

src/lib/orm.ts:35

## Methods

### complete

▸ **complete**(`expression`): `string`

Complete expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`string`

Expression complete

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[complete](../interfaces/model.IOrm.md#complete)

#### Defined in

src/lib/orm.ts:134

▸ **complete**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[complete](../interfaces/model.IOrm.md#complete)

#### Defined in

src/lib/orm.ts:135

___

### dialect

▸ **dialect**(`dataSource`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataSource` | `string` |

#### Returns

`string`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[dialect](../interfaces/model.IOrm.md#dialect)

#### Defined in

src/lib/orm.ts:96

___

### end

▸ **end**(): `Promise`<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[end](../interfaces/model.IOrm.md#end)

#### Defined in

src/lib/orm.ts:88

___

### eval

▸ **eval**(`expression`, `data`): `Promise`<`any`\>

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `data` | `any` | Data with variables |

#### Returns

`Promise`<`any`\>

Result of the evaluale expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[eval](../interfaces/model.IOrm.md#eval)

#### Defined in

src/lib/orm.ts:188

___

### execute

▸ **execute**(`expression`, `data?`, `stage?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | - |
| `data?` | `any` | Data with variables |
| `stage?` | `string` | - |

#### Returns

`Promise`<`any`\>

Result of execution

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

src/lib/orm.ts:213

▸ **execute**(`expression`, `data?`, `stage?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `stage?` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

src/lib/orm.ts:214

___

### init

▸ **init**(`source?`, `connect?`): `Promise`<[`Schema`](../interfaces/model.Schema.md)\>

metodo para incializar la libreria de orm

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source?` | `string` \| [`Schema`](../interfaces/model.Schema.md) | `undefined` | optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project |
| `connect` | `boolean` | `true` | - |

#### Returns

`Promise`<[`Schema`](../interfaces/model.Schema.md)\>

promise void

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[init](../interfaces/model.IOrm.md#init)

#### Defined in

src/lib/orm.ts:74

___

### metadata

▸ **metadata**(`expression`): `Promise`<`any`\>

Get metadata of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Promise`<`any`\>

metadata of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[metadata](../interfaces/model.IOrm.md#metadata)

#### Defined in

src/lib/orm.ts:173

▸ **metadata**(`expression`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[metadata](../interfaces/model.IOrm.md#metadata)

#### Defined in

src/lib/orm.ts:174

___

### model

▸ **model**(`expression`): `Promise`<`any`\>

Get model of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Promise`<`any`\>

Model of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[model](../interfaces/model.IOrm.md#model)

#### Defined in

src/lib/orm.ts:147

▸ **model**(`expression`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[model](../interfaces/model.IOrm.md#model)

#### Defined in

src/lib/orm.ts:148

___

### parameters

▸ **parameters**(`expression`): `Promise`<`any`\>

Get parameters of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |

#### Returns

`Promise`<`any`\>

Parameters of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[parameters](../interfaces/model.IOrm.md#parameters)

#### Defined in

src/lib/orm.ts:160

▸ **parameters**(`expression`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[parameters](../interfaces/model.IOrm.md#parameters)

#### Defined in

src/lib/orm.ts:161

___

### sentence

▸ **sentence**(`expression`, `stage?`): `Promise`<`string`\>

Get sentence of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `stage?` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[sentence](../interfaces/model.IOrm.md#sentence)

#### Defined in

src/lib/orm.ts:197

▸ **sentence**(`expression`, `stage?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `stage?` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[sentence](../interfaces/model.IOrm.md#sentence)

#### Defined in

src/lib/orm.ts:198

___

### setCache

▸ **setCache**(`value`): `void`

set to cache manager

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Cache` |

#### Returns

`void`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[setCache](../interfaces/model.IOrm.md#setcache)

#### Defined in

src/lib/orm.ts:117

___

### toExpression

▸ **toExpression**(`lambda`): `string`

Read lambda expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lambda` | `Function` | lambda expression |

#### Returns

`string`

Expression manager

#### Defined in

src/lib/orm.ts:126

___

### transaction

▸ **transaction**(`stage`, `callback`): `Promise`<`void`\>

Crea una transaccion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stage` | `string` | Database name |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Codigo que se ejecutara en transaccion |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[transaction](../interfaces/model.IOrm.md#transaction)

#### Defined in

src/lib/orm.ts:229
