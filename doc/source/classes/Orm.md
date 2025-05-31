[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Orm

# Class: Orm

Defined in: [src/lib/orm/infrastructure/orm.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L29)

Facade through which you can access all the functionalities of the library.

## Implements

- [`IOrm`](../interfaces/IOrm.md)

## Constructors

### Constructor

> **new Orm**(`_logger?`): `Orm`

Defined in: [src/lib/orm/infrastructure/orm.ts:42](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L42)

#### Parameters

##### \_logger?

[`Logger`](Logger.md)

#### Returns

`Orm`

## Properties

### connection

> **connection**: [`ConnectionFacade`](ConnectionFacade.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L30)

***

### exp

> **exp**: `Expressions`

Defined in: [src/lib/orm/infrastructure/orm.ts:32](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L32)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`exp`](../interfaces/IOrm.md#exp)

***

### helper

> **helper**: [`OrmH3lp`](OrmH3lp.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:36](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L36)

***

### language

> **language**: [`LanguagesService`](LanguagesService.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:31](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L31)

***

### schema

> **schema**: [`SchemaFacade`](SchemaFacade.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L33)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`schema`](../interfaces/IOrm.md#schema)

***

### stage

> **stage**: [`StageFacade`](StageFacade.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:35](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L35)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`stage`](../interfaces/IOrm.md#stage)

***

### state

> **state**: [`SchemaState`](SchemaState.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:34](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L34)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`state`](../interfaces/IOrm.md#state)

## Accessors

### defaultStage

#### Get Signature

> **get** **defaultStage**(): [`Stage`](../interfaces/Stage.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:66](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L66)

##### Returns

[`Stage`](../interfaces/Stage.md)

***

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](Logger.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L58)

##### Returns

[`Logger`](Logger.md)

#### Set Signature

> **set** **logger**(`value`): `void`

Defined in: [src/lib/orm/infrastructure/orm.ts:62](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L62)

##### Parameters

###### value

[`Logger`](Logger.md)

##### Returns

`void`

## Methods

### constraints()

#### Call Signature

> **constraints**(`query`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:179](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L179)

Get constraints of query

##### Parameters

###### query

`Function`

query expression

##### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Constraints of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`constraints`](../interfaces/IOrm.md#constraints)

#### Call Signature

> **constraints**(`query`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:180](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L180)

Get constraints of query

##### Parameters

###### query

`string`

query expression

##### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Constraints of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`constraints`](../interfaces/IOrm.md#constraints)

***

### dialect()

> **dialect**(`source`): [`Dialect`](../enumerations/Dialect.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:134](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L134)

Get dialect of source

#### Parameters

##### source

`string`

Name of source

#### Returns

[`Dialect`](../enumerations/Dialect.md)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`dialect`](../interfaces/IOrm.md#dialect)

***

### end()

> **end**(): `Promise`\<`void`\>

Defined in: [src/lib/orm/infrastructure/orm.ts:116](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L116)

Frees the resources used, for example the connection pools

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`end`](../interfaces/IOrm.md#end)

***

### execute()

#### Call Signature

> **execute**(`query`, `data?`, `options?`): `Promise`\<`any`\>

Defined in: [src/lib/orm/infrastructure/orm.ts:218](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L218)

Execute query

##### Parameters

###### query

`Function`

query expression

###### data?

`any`

Data with variables

###### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

##### Returns

`Promise`\<`any`\>

Result of execution

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`execute`](../interfaces/IOrm.md#execute)

#### Call Signature

> **execute**(`query`, `data?`, `options?`): `Promise`\<`any`\>

Defined in: [src/lib/orm/infrastructure/orm.ts:219](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L219)

Execute query

##### Parameters

###### query

`string`

query expression

###### data?

`any`

Data with variables

###### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

##### Returns

`Promise`\<`any`\>

Result of execution

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`execute`](../interfaces/IOrm.md#execute)

***

### init()

> **init**(`source?`, `connect?`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

Defined in: [src/lib/orm/infrastructure/orm.ts:75](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L75)

initialize the orm library

#### Parameters

##### source?

optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project

`string` | [`Schema`](../interfaces/Schema.md)

##### connect?

`boolean` = `true`

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

promise void

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`init`](../interfaces/IOrm.md#init)

***

### metadata()

#### Call Signature

> **metadata**(`query`): [`Metadata`](../interfaces/Metadata.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:191](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L191)

Get metadata of query

##### Parameters

###### query

`Function`

query expression

##### Returns

[`Metadata`](../interfaces/Metadata.md)

metadata of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`metadata`](../interfaces/IOrm.md#metadata)

#### Call Signature

> **metadata**(`query`): [`Metadata`](../interfaces/Metadata.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:192](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L192)

Get metadata of query

##### Parameters

###### query

`string`

query expression

##### Returns

[`Metadata`](../interfaces/Metadata.md)

metadata of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`metadata`](../interfaces/IOrm.md#metadata)

***

### model()

#### Call Signature

> **model**(`query`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

Defined in: [src/lib/orm/infrastructure/orm.ts:155](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L155)

Get model of query

##### Parameters

###### query

`Function`

query expression

##### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

Model of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`model`](../interfaces/IOrm.md#model)

#### Call Signature

> **model**(`query`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

Defined in: [src/lib/orm/infrastructure/orm.ts:156](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L156)

Get model of query

##### Parameters

###### query

`string`

query expression

##### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

Model of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`model`](../interfaces/IOrm.md#model)

***

### normalize()

#### Call Signature

> **normalize**(`query`): `string`

Defined in: [src/lib/orm/infrastructure/orm.ts:143](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L143)

Normalize query

##### Parameters

###### query

`Function`

query expression

##### Returns

`string`

Expression normalized

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`normalize`](../interfaces/IOrm.md#normalize)

#### Call Signature

> **normalize**(`query`): `string`

Defined in: [src/lib/orm/infrastructure/orm.ts:144](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L144)

Normalize query

##### Parameters

###### query

`string`

query expression

##### Returns

`string`

Expression normalized

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`normalize`](../interfaces/IOrm.md#normalize)

***

### parameters()

#### Call Signature

> **parameters**(`query`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Defined in: [src/lib/orm/infrastructure/orm.ts:167](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L167)

Get parameters of query

##### Parameters

###### query

`Function`

query expression

##### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Parameters of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`parameters`](../interfaces/IOrm.md#parameters)

#### Call Signature

> **parameters**(`query`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Defined in: [src/lib/orm/infrastructure/orm.ts:168](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L168)

Get parameters of query

##### Parameters

###### query

`string`

query expression

##### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Parameters of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`parameters`](../interfaces/IOrm.md#parameters)

***

### plan()

#### Call Signature

> **plan**(`query`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:203](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L203)

Get getInfo of query

##### Parameters

###### query

`Function`

query expression

###### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

##### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`plan`](../interfaces/IOrm.md#plan)

#### Call Signature

> **plan**(`query`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

Defined in: [src/lib/orm/infrastructure/orm.ts:204](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L204)

Get getInfo of query

##### Parameters

###### query

`string`

query expression

###### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

##### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`plan`](../interfaces/IOrm.md#plan)

***

### subscribe()

> **subscribe**(`observer`): `void`

Defined in: [src/lib/orm/infrastructure/orm.ts:246](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L246)

#### Parameters

##### observer

[`ActionObserver`](ActionObserver.md)

#### Returns

`void`

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Defined in: [src/lib/orm/infrastructure/orm.ts:238](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L238)

Create a transaction

#### Parameters

##### options

options of execution

`undefined` | [`QueryOptions`](../interfaces/QueryOptions.md)

##### callback

(`tr`) => `Promise`\<`void`\>

Code to be executed in transaction

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`transaction`](../interfaces/IOrm.md#transaction)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

Defined in: [src/lib/orm/infrastructure/orm.ts:250](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/infrastructure/orm.ts#L250)

#### Parameters

##### observer

[`ActionObserver`](ActionObserver.md)

#### Returns

`void`
