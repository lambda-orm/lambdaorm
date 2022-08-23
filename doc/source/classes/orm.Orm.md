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

- [defaultStage](orm.Orm.md#defaultstage)
- [expressions](orm.Orm.md#expressions)
- [schema](orm.Orm.md#schema)
- [stage](orm.Orm.md#stage)
- [workspace](orm.Orm.md#workspace)
- [instance](orm.Orm.md#instance)

### Methods

- [constraints](orm.Orm.md#constraints)
- [dialect](orm.Orm.md#dialect)
- [end](orm.Orm.md#end)
- [execute](orm.Orm.md#execute)
- [init](orm.Orm.md#init)
- [metadata](orm.Orm.md#metadata)
- [model](orm.Orm.md#model)
- [normalize](orm.Orm.md#normalize)
- [parameters](orm.Orm.md#parameters)
- [sentence](orm.Orm.md#sentence)
- [setCache](orm.Orm.md#setcache)
- [subscribe](orm.Orm.md#subscribe)
- [toExpression](orm.Orm.md#toexpression)
- [transaction](orm.Orm.md#transaction)
- [unsubscribe](orm.Orm.md#unsubscribe)

## Constructors

### constructor

• **new Orm**(`workspace?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Defined in

[src/lib/orm.ts:39](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L39)

## Accessors

### defaultStage

• `get` **defaultStage**(): [`Stage`](../interfaces/model.Stage.md)

#### Returns

[`Stage`](../interfaces/model.Stage.md)

#### Defined in

[src/lib/orm.ts:65](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L65)

___

### expressions

• `get` **expressions**(): `Expressions`

Get reference to SchemaConfig

#### Returns

`Expressions`

#### Implementation of

IOrm.expressions

#### Defined in

[src/lib/orm.ts:139](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L139)

___

### schema

• `get` **schema**(): [`SchemaManager`](manager.SchemaManager.md)

Get reference to SchemaConfig

#### Returns

[`SchemaManager`](manager.SchemaManager.md)

#### Implementation of

IOrm.schema

#### Defined in

[src/lib/orm.ts:132](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L132)

___

### stage

• `get` **stage**(): [`StageFacade`](manager.StageFacade.md)

Get reference to stage manager

#### Returns

[`StageFacade`](manager.StageFacade.md)

#### Implementation of

IOrm.stage

#### Defined in

[src/lib/orm.ts:125](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L125)

___

### workspace

• `get` **workspace**(): `string`

Get workspace path

#### Returns

`string`

#### Implementation of

IOrm.workspace

#### Defined in

[src/lib/orm.ts:109](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L109)

___

### instance

• `Static` `get` **instance**(): [`Orm`](orm.Orm.md)

Singleton

#### Returns

[`Orm`](orm.Orm.md)

#### Defined in

[src/lib/orm.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L32)

## Methods

### constraints

▸ **constraints**(`expression`): [`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

Get constraints of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

Constraints of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[constraints](../interfaces/model.IOrm.md#constraints)

#### Defined in

[src/lib/orm.ts:206](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L206)

▸ **constraints**(`expression`): [`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[constraints](../interfaces/model.IOrm.md#constraints)

#### Defined in

[src/lib/orm.ts:207](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L207)

___

### dialect

▸ **dialect**(`source`): `string`

Get dialect of source

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Name of source |

#### Returns

`string`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[dialect](../interfaces/model.IOrm.md#dialect)

#### Defined in

[src/lib/orm.ts:118](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L118)

___

### end

▸ **end**(): `Promise`<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[end](../interfaces/model.IOrm.md#end)

#### Defined in

[src/lib/orm.ts:102](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L102)

___

### execute

▸ **execute**(`expression`, `data?`, `options?`): `Promise`<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |
| `data?` | `any` | Data with variables |
| `options?` | [`OrmOptions`](../interfaces/model.OrmOptions.md) | options of execution |

#### Returns

`Promise`<`any`\>

Result of execution

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

[src/lib/orm.ts:251](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L251)

▸ **execute**(`expression`, `data?`, `options?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `options?` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

`Promise`<`any`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[execute](../interfaces/model.IOrm.md#execute)

#### Defined in

[src/lib/orm.ts:252](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L252)

___

### init

▸ **init**(`source?`, `connect?`): `Promise`<[`Schema`](../interfaces/model.Schema.md)\>

initialize the orm library

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source?` | `string` \| [`Schema`](../interfaces/model.Schema.md) | `undefined` | optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project |
| `connect` | `boolean` | `true` | - |

#### Returns

`Promise`<[`Schema`](../interfaces/model.Schema.md)\>

promise void

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[init](../interfaces/model.IOrm.md#init)

#### Defined in

[src/lib/orm.ts:74](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L74)

___

### metadata

▸ **metadata**(`expression`): [`Metadata`](../interfaces/model.Metadata.md)

Get metadata of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`Metadata`](../interfaces/model.Metadata.md)

metadata of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[metadata](../interfaces/model.IOrm.md#metadata)

#### Defined in

[src/lib/orm.ts:220](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L220)

▸ **metadata**(`expression`): [`Metadata`](../interfaces/model.Metadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Metadata`](../interfaces/model.Metadata.md)

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[metadata](../interfaces/model.IOrm.md#metadata)

#### Defined in

[src/lib/orm.ts:221](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L221)

___

### model

▸ **model**(`expression`): [`MetadataModel`](../interfaces/model.MetadataModel.md)[]

Get model of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`MetadataModel`](../interfaces/model.MetadataModel.md)[]

Model of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[model](../interfaces/model.IOrm.md#model)

#### Defined in

[src/lib/orm.ts:178](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L178)

▸ **model**(`expression`): [`MetadataModel`](../interfaces/model.MetadataModel.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataModel`](../interfaces/model.MetadataModel.md)[]

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[model](../interfaces/model.IOrm.md#model)

#### Defined in

[src/lib/orm.ts:179](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L179)

___

### normalize

▸ **normalize**(`expression`): `string`

Normalize expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

`string`

Expression normalized

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[normalize](../interfaces/model.IOrm.md#normalize)

#### Defined in

[src/lib/orm.ts:164](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L164)

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[normalize](../interfaces/model.IOrm.md#normalize)

#### Defined in

[src/lib/orm.ts:165](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L165)

___

### parameters

▸ **parameters**(`expression`): [`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

Parameters of expression

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[parameters](../interfaces/model.IOrm.md#parameters)

#### Defined in

[src/lib/orm.ts:192](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L192)

▸ **parameters**(`expression`): [`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[parameters](../interfaces/model.IOrm.md#parameters)

#### Defined in

[src/lib/orm.ts:193](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L193)

___

### sentence

▸ **sentence**(`expression`, `options?`): [`MetadataSentence`](../interfaces/model.MetadataSentence.md)

Get sentence of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |
| `options?` | [`OrmOptions`](../interfaces/model.OrmOptions.md) | options of execution |

#### Returns

[`MetadataSentence`](../interfaces/model.MetadataSentence.md)

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[sentence](../interfaces/model.IOrm.md#sentence)

#### Defined in

[src/lib/orm.ts:234](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L234)

▸ **sentence**(`expression`, `options?`): [`MetadataSentence`](../interfaces/model.MetadataSentence.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`OrmOptions`](../interfaces/model.OrmOptions.md) |

#### Returns

[`MetadataSentence`](../interfaces/model.MetadataSentence.md)

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[sentence](../interfaces/model.IOrm.md#sentence)

#### Defined in

[src/lib/orm.ts:235](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L235)

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

[src/lib/orm.ts:146](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L146)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](model.ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/orm.ts:282](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L282)

___

### toExpression

▸ **toExpression**(`lambda`): `string`

Convert a lambda expression to a query expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lambda` | `Function` | lambda expression |

#### Returns

`string`

Expression manager

#### Defined in

[src/lib/orm.ts:155](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L155)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`<`void`\>

Create a transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `undefined` \| [`OrmOptions`](../interfaces/model.OrmOptions.md) | options of execution |
| `callback` | (`tr`: [`Transaction`](manager.Transaction.md)) => `Promise`<`void`\> | Code to be executed in transaction |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IOrm](../interfaces/model.IOrm.md).[transaction](../interfaces/model.IOrm.md#transaction)

#### Defined in

[src/lib/orm.ts:275](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L275)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](model.ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/orm.ts:289](https://github.com/FlavioLionelRita/lambdaorm/blob/15e828d/src/lib/orm.ts#L289)
