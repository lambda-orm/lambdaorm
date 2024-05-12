[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Orm

# Class: Orm

Facade through which you can access all the functionalities of the library.

## Implements

- [`IOrm`](../interfaces/IOrm.md)

## Constructors

### new Orm()

> **new Orm**(`_logger`?): [`Orm`](Orm.md)

#### Parameters

• **\_logger?**: [`Logger`](Logger.md)

#### Returns

[`Orm`](Orm.md)

#### Source

[src/lib/orm/infrastructure/orm.ts:42](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L42)

## Properties

### connection

> **connection**: [`ConnectionFacade`](ConnectionFacade.md)

#### Source

[src/lib/orm/infrastructure/orm.ts:30](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L30)

***

### exp

> **exp**: `Expressions`

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`exp`](../interfaces/IOrm.md#exp)

#### Source

[src/lib/orm/infrastructure/orm.ts:32](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L32)

***

### helper

> **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Source

[src/lib/orm/infrastructure/orm.ts:36](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L36)

***

### language

> **language**: [`LanguagesService`](LanguagesService.md)

#### Source

[src/lib/orm/infrastructure/orm.ts:31](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L31)

***

### schema

> **schema**: [`SchemaFacade`](SchemaFacade.md)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`schema`](../interfaces/IOrm.md#schema)

#### Source

[src/lib/orm/infrastructure/orm.ts:33](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L33)

***

### stage

> **stage**: [`StageFacade`](StageFacade.md)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`stage`](../interfaces/IOrm.md#stage)

#### Source

[src/lib/orm/infrastructure/orm.ts:35](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L35)

***

### state

> **state**: [`SchemaState`](SchemaState.md)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`state`](../interfaces/IOrm.md#state)

#### Source

[src/lib/orm/infrastructure/orm.ts:34](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L34)

## Accessors

### defaultStage

> `get` **defaultStage**(): [`Stage`](../interfaces/Stage.md)

#### Returns

[`Stage`](../interfaces/Stage.md)

#### Source

[src/lib/orm/infrastructure/orm.ts:66](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L66)

***

### logger

> `get` **logger**(): [`Logger`](Logger.md)

> `set` **logger**(`value`): `void`

#### Parameters

• **value**: [`Logger`](Logger.md)

#### Returns

[`Logger`](Logger.md)

#### Source

[src/lib/orm/infrastructure/orm.ts:58](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L58)

## Methods

### constraints()

#### constraints(query)

> **constraints**(`query`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Get constraints of query

##### Parameters

• **query**: `Function`

query expression

##### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Constraints of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`constraints`](../interfaces/IOrm.md#constraints)

##### Source

[src/lib/orm/infrastructure/orm.ts:179](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L179)

#### constraints(query)

> **constraints**(`query`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

##### Parameters

• **query**: `string`

##### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`constraints`](../interfaces/IOrm.md#constraints)

##### Source

[src/lib/orm/infrastructure/orm.ts:180](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L180)

***

### dialect()

> **dialect**(`source`): [`Dialect`](../enumerations/Dialect.md)

Get dialect of source

#### Parameters

• **source**: `string`

Name of source

#### Returns

[`Dialect`](../enumerations/Dialect.md)

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`dialect`](../interfaces/IOrm.md#dialect)

#### Source

[src/lib/orm/infrastructure/orm.ts:134](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L134)

***

### end()

> **end**(): `Promise`\<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`end`](../interfaces/IOrm.md#end)

#### Source

[src/lib/orm/infrastructure/orm.ts:116](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L116)

***

### execute()

#### execute(query, data, options)

> **execute**(`query`, `data`?, `options`?): `Promise`\<`any`\>

Execute query

##### Parameters

• **query**: `Function`

query expression

• **data?**: `any`

Data with variables

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

##### Returns

`Promise`\<`any`\>

Result of execution

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`execute`](../interfaces/IOrm.md#execute)

##### Source

[src/lib/orm/infrastructure/orm.ts:218](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L218)

#### execute(query, data, options)

> **execute**(`query`, `data`?, `options`?): `Promise`\<`any`\>

##### Parameters

• **query**: `string`

• **data?**: `any`

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

##### Returns

`Promise`\<`any`\>

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`execute`](../interfaces/IOrm.md#execute)

##### Source

[src/lib/orm/infrastructure/orm.ts:219](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L219)

***

### init()

> **init**(`source`?, `connect`?): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

initialize the orm library

#### Parameters

• **source?**: `string` \| [`Schema`](../interfaces/Schema.md)

optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project

• **connect?**: `boolean`= `true`

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

promise void

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`init`](../interfaces/IOrm.md#init)

#### Source

[src/lib/orm/infrastructure/orm.ts:75](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L75)

***

### metadata()

#### metadata(query)

> **metadata**(`query`): [`Metadata`](../interfaces/Metadata.md)

Get metadata of query

##### Parameters

• **query**: `Function`

query expression

##### Returns

[`Metadata`](../interfaces/Metadata.md)

metadata of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`metadata`](../interfaces/IOrm.md#metadata)

##### Source

[src/lib/orm/infrastructure/orm.ts:191](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L191)

#### metadata(query)

> **metadata**(`query`): [`Metadata`](../interfaces/Metadata.md)

##### Parameters

• **query**: `string`

##### Returns

[`Metadata`](../interfaces/Metadata.md)

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`metadata`](../interfaces/IOrm.md#metadata)

##### Source

[src/lib/orm/infrastructure/orm.ts:192](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L192)

***

### model()

#### model(query)

> **model**(`query`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

Get model of query

##### Parameters

• **query**: `Function`

query expression

##### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

Model of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`model`](../interfaces/IOrm.md#model)

##### Source

[src/lib/orm/infrastructure/orm.ts:155](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L155)

#### model(query)

> **model**(`query`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

##### Parameters

• **query**: `string`

##### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`model`](../interfaces/IOrm.md#model)

##### Source

[src/lib/orm/infrastructure/orm.ts:156](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L156)

***

### normalize()

#### normalize(query)

> **normalize**(`query`): `string`

Normalize query

##### Parameters

• **query**: `Function`

query expression

##### Returns

`string`

Expression normalized

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`normalize`](../interfaces/IOrm.md#normalize)

##### Source

[src/lib/orm/infrastructure/orm.ts:143](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L143)

#### normalize(query)

> **normalize**(`query`): `string`

##### Parameters

• **query**: `string`

##### Returns

`string`

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`normalize`](../interfaces/IOrm.md#normalize)

##### Source

[src/lib/orm/infrastructure/orm.ts:144](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L144)

***

### parameters()

#### parameters(query)

> **parameters**(`query`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Get parameters of query

##### Parameters

• **query**: `Function`

query expression

##### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Parameters of query

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`parameters`](../interfaces/IOrm.md#parameters)

##### Source

[src/lib/orm/infrastructure/orm.ts:167](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L167)

#### parameters(query)

> **parameters**(`query`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

##### Parameters

• **query**: `string`

##### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`parameters`](../interfaces/IOrm.md#parameters)

##### Source

[src/lib/orm/infrastructure/orm.ts:168](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L168)

***

### plan()

#### plan(query, options)

> **plan**(`query`, `options`?): [`QueryPlan`](../interfaces/QueryPlan.md)

Get getInfo of query

##### Parameters

• **query**: `Function`

query expression

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

##### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`plan`](../interfaces/IOrm.md#plan)

##### Source

[src/lib/orm/infrastructure/orm.ts:203](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L203)

#### plan(query, options)

> **plan**(`query`, `options`?): [`QueryPlan`](../interfaces/QueryPlan.md)

##### Parameters

• **query**: `string`

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

##### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

##### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`plan`](../interfaces/IOrm.md#plan)

##### Source

[src/lib/orm/infrastructure/orm.ts:204](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L204)

***

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/orm/infrastructure/orm.ts:246](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L246)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Create a transaction

#### Parameters

• **options**: `undefined` \| [`QueryOptions`](../interfaces/QueryOptions.md)

options of execution

• **callback**

Code to be executed in transaction

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IOrm`](../interfaces/IOrm.md).[`transaction`](../interfaces/IOrm.md#transaction)

#### Source

[src/lib/orm/infrastructure/orm.ts:238](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L238)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Source

[src/lib/orm/infrastructure/orm.ts:250](https://github.com/lambda-orm/lambdaorm/blob/676d93b41dadb176245f63ed44eae267d94fa74f/src/lib/orm/infrastructure/orm.ts#L250)
