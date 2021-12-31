[Lambda ORM](../README.md) / [manager](../modules/manager.md) / Orm

# Class: Orm

[manager](../modules/manager.md).Orm

Facade through which you can access all the functionalities of the library.

## Implements

- [`IOrm`](../interfaces/model.IOrm.md)

## Table of contents

### Constructors

- [constructor](manager.Orm.md#constructor)

### Accessors

- [defaultStage](manager.Orm.md#defaultstage)
- [lib](manager.Orm.md#lib)
- [stage](manager.Orm.md#stage)
- [workspace](manager.Orm.md#workspace)
- [instance](manager.Orm.md#instance)

### Methods

- [complete](manager.Orm.md#complete)
- [dialect](manager.Orm.md#dialect)
- [end](manager.Orm.md#end)
- [eval](manager.Orm.md#eval)
- [execute](manager.Orm.md#execute)
- [init](manager.Orm.md#init)
- [metadata](manager.Orm.md#metadata)
- [model](manager.Orm.md#model)
- [parameters](manager.Orm.md#parameters)
- [sentence](manager.Orm.md#sentence)
- [setCache](manager.Orm.md#setcache)
- [toExpression](manager.Orm.md#toexpression)
- [transaction](manager.Orm.md#transaction)

## Constructors

### constructor

• **new Orm**(`workspace?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

[src/lib/manager/orm.ts:43](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L43)

## Accessors

### defaultStage

• `get` **defaultStage**(): [`Stage`](../interfaces/model.Stage.md)

#### Returns

[`Stage`](../interfaces/model.Stage.md)

#### Defined in

[src/lib/manager/orm.ts:67](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L67)

___

### lib

• `get` **lib**(): [`LibManager`](manager.LibManager.md)

Get reference to schema manager

#### Returns

[`LibManager`](manager.LibManager.md)

#### Defined in

[src/lib/manager/orm.ts:117](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L117)

___

### stage

• `get` **stage**(): [`StageFacade`](manager.StageFacade.md)

Get reference to dataSource manager

#### Returns

[`StageFacade`](manager.StageFacade.md)

#### Implementation of

IOrm.stage

#### Defined in

[src/lib/manager/orm.ts:124](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L124)

___

### workspace

• `get` **workspace**(): `string`

#### Returns

`string`

#### Implementation of

IOrm.workspace

#### Defined in

[src/lib/manager/orm.ts:106](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L106)

___

### instance

• `Static` `get` **instance**(): [`Orm`](manager.Orm.md)

Singleton

#### Returns

[`Orm`](manager.Orm.md)

#### Defined in

[src/lib/manager/orm.ts:36](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L36)

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

[src/lib/manager/orm.ts:148](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L148)

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

[src/lib/manager/orm.ts:149](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L149)

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

[src/lib/manager/orm.ts:110](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L110)

___

### end

▸ **end**(): `Promise`<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[end](../interfaces/model.IOrm.md#end)

#### Defined in

[src/lib/manager/orm.ts:102](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L102)

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

[src/lib/manager/orm.ts:202](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L202)

___

### execute

▸ **execute**(`expression`, `data?`, `context?`, `stage?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | - |
| `data?` | `any` | Data with variables |
| `context?` | `any` | Context |
| `stage?` | `string` | - |

#### Returns

`Promise`<`any`\>

Result of execution

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

[src/lib/manager/orm.ts:227](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L227)

▸ **execute**(`expression`, `data?`, `context?`, `stage?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `context?` | `any` |
| `stage?` | `string` |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

[src/lib/manager/orm.ts:228](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L228)

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

[src/lib/manager/orm.ts:76](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L76)

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

[src/lib/manager/orm.ts:187](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L187)

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

[src/lib/manager/orm.ts:188](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L188)

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

[src/lib/manager/orm.ts:161](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L161)

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

[src/lib/manager/orm.ts:162](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L162)

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

[src/lib/manager/orm.ts:174](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L174)

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

[src/lib/manager/orm.ts:175](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L175)

___

### sentence

▸ **sentence**(`expression`, `stage`): `Promise`<`string`\>

Get sentence of expression

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `Function` |
| `stage` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[sentence](../interfaces/model.IOrm.md#sentence)

#### Defined in

[src/lib/manager/orm.ts:211](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L211)

▸ **sentence**(`expression`, `stage`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `stage` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[sentence](../interfaces/model.IOrm.md#sentence)

#### Defined in

[src/lib/manager/orm.ts:212](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L212)

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

[src/lib/manager/orm.ts:131](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L131)

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

[src/lib/manager/orm.ts:140](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L140)

___

### transaction

▸ **transaction**(`context`, `stage`, `callback`): `Promise`<`void`\>

Crea una transaccion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `any` | Context |
| `stage` | `string` | Database name |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Codigo que se ejecutara en transaccion |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[transaction](../interfaces/model.IOrm.md#transaction)

#### Defined in

[src/lib/manager/orm.ts:244](https://github.com/FlavioLionelRita/lambda-orm/blob/8e54723/src/lib/manager/orm.ts#L244)
