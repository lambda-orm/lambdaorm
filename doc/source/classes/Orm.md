[Lambda ORM](../README.md) / Orm

# Class: Orm

Facade through which you can access all the functionalities of the library.

## Implements

- [`IOrm`](../interfaces/IOrm.md)

## Table of contents

### Constructors

- [constructor](Orm.md#constructor)

### Properties

- [connection](Orm.md#connection)
- [expressions](Orm.md#expressions)
- [language](Orm.md#language)
- [schema](Orm.md#schema)
- [stage](Orm.md#stage)

### Accessors

- [defaultStage](Orm.md#defaultstage)
- [workspace](Orm.md#workspace)
- [instance](Orm.md#instance)

### Methods

- [constraints](Orm.md#constraints)
- [dialect](Orm.md#dialect)
- [end](Orm.md#end)
- [execute](Orm.md#execute)
- [init](Orm.md#init)
- [metadata](Orm.md#metadata)
- [model](Orm.md#model)
- [normalize](Orm.md#normalize)
- [parameters](Orm.md#parameters)
- [plan](Orm.md#plan)
- [subscribe](Orm.md#subscribe)
- [transaction](Orm.md#transaction)
- [unsubscribe](Orm.md#unsubscribe)

## Constructors

### constructor

• **new Orm**(`workspace?`): [`Orm`](Orm.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `workspace` | `string` |

#### Returns

[`Orm`](Orm.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:42](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L42)

## Properties

### connection

• **connection**: [`ConnectionFacade`](ConnectionFacade.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:31](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L31)

___

### expressions

• **expressions**: `Expressions`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[expressions](../interfaces/IOrm.md#expressions)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L33)

___

### language

• **language**: [`LanguagesService`](LanguagesService.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L32)

___

### schema

• **schema**: `SchemaFacade`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[schema](../interfaces/IOrm.md#schema)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L34)

___

### stage

• **stage**: [`StageFacade`](StageFacade.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[stage](../interfaces/IOrm.md#stage)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:35](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L35)

## Accessors

### defaultStage

• `get` **defaultStage**(): `Stage`

#### Returns

`Stage`

#### Defined in

[src/lib/orm/infrastructure/orm.ts:68](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L68)

___

### workspace

• `get` **workspace**(): `string`

Get workspace path

#### Returns

`string`

#### Implementation of

IOrm.workspace

#### Defined in

[src/lib/orm/infrastructure/orm.ts:134](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L134)

___

### instance

• `get` **instance**(): [`Orm`](Orm.md)

Singleton

#### Returns

[`Orm`](Orm.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:61](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L61)

## Methods

### constraints

▸ **constraints**(`expression`): `MetadataConstraint`

Get constraints of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

`MetadataConstraint`

Constraints of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[constraints](../interfaces/IOrm.md#constraints)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:188](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L188)

▸ **constraints**(`expression`): `MetadataConstraint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataConstraint`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[constraints](../interfaces/IOrm.md#constraints)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:189](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L189)

___

### dialect

▸ **dialect**(`source`): `Dialect`

Get dialect of source

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Name of source |

#### Returns

`Dialect`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[dialect](../interfaces/IOrm.md#dialect)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:143](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L143)

___

### end

▸ **end**(): `Promise`\<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`\<`void`\>

#### Implementation of

[IOrm](../interfaces/IOrm.md).[end](../interfaces/IOrm.md#end)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:118](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L118)

___

### execute

▸ **execute**(`expression`, `data?`, `options?`): `Promise`\<`any`\>

Execute expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |
| `data?` | `any` | Data with variables |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | options of execution |

#### Returns

`Promise`\<`any`\>

Result of execution

#### Implementation of

[IOrm](../interfaces/IOrm.md).[execute](../interfaces/IOrm.md#execute)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:227](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L227)

▸ **execute**(`expression`, `data?`, `options?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[IOrm](../interfaces/IOrm.md).[execute](../interfaces/IOrm.md#execute)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:228](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L228)

___

### init

▸ **init**(`source?`, `connect?`): `Promise`\<`Schema`\>

initialize the orm library

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source?` | `string` \| `Schema` | `undefined` | optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project |
| `connect` | `boolean` | `true` | - |

#### Returns

`Promise`\<`Schema`\>

promise void

#### Implementation of

[IOrm](../interfaces/IOrm.md).[init](../interfaces/IOrm.md#init)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:77](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L77)

___

### metadata

▸ **metadata**(`expression`): `Metadata`

Get metadata of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

`Metadata`

metadata of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[metadata](../interfaces/IOrm.md#metadata)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:200](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L200)

▸ **metadata**(`expression`): `Metadata`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Metadata`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[metadata](../interfaces/IOrm.md#metadata)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:201](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L201)

___

### model

▸ **model**(`expression`): `MetadataModel`[]

Get model of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

`MetadataModel`[]

Model of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[model](../interfaces/IOrm.md#model)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:164](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L164)

▸ **model**(`expression`): `MetadataModel`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataModel`[]

#### Implementation of

[IOrm](../interfaces/IOrm.md).[model](../interfaces/IOrm.md#model)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:165](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L165)

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

[IOrm](../interfaces/IOrm.md).[normalize](../interfaces/IOrm.md#normalize)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:152](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L152)

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[normalize](../interfaces/IOrm.md#normalize)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:153](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L153)

___

### parameters

▸ **parameters**(`expression`): `MetadataParameter`[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

`MetadataParameter`[]

Parameters of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[parameters](../interfaces/IOrm.md#parameters)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:176](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L176)

▸ **parameters**(`expression`): `MetadataParameter`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`MetadataParameter`[]

#### Implementation of

[IOrm](../interfaces/IOrm.md).[parameters](../interfaces/IOrm.md#parameters)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:177](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L177)

___

### plan

▸ **plan**(`expression`, `options?`): `QueryPlan`

Get getInfo of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | options of execution |

#### Returns

`QueryPlan`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[plan](../interfaces/IOrm.md#plan)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:212](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L212)

▸ **plan**(`expression`, `options?`): `QueryPlan`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

`QueryPlan`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[plan](../interfaces/IOrm.md#plan)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:213](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L213)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/orm/infrastructure/orm.ts:255](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L255)

___

### transaction

▸ **transaction**(`options`, `callback`): `Promise`\<`void`\>

Create a transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `undefined` \| [`QueryOptions`](../interfaces/QueryOptions.md) | options of execution |
| `callback` | (`tr`: [`ExpressionTransaction`](ExpressionTransaction.md)) => `Promise`\<`void`\> | Code to be executed in transaction |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[IOrm](../interfaces/IOrm.md).[transaction](../interfaces/IOrm.md#transaction)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:247](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L247)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/orm/infrastructure/orm.ts:259](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/orm/infrastructure/orm.ts#L259)
