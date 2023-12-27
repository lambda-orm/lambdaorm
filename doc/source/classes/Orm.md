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

• **new Orm**(`_workspace?`): [`Orm`](Orm.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_workspace` | `string` |

#### Returns

[`Orm`](Orm.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:41](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L41)

## Properties

### connection

• **connection**: [`ConnectionFacade`](ConnectionFacade.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:30](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L30)

___

### expressions

• **expressions**: `Expressions`

#### Implementation of

[IOrm](../interfaces/IOrm.md).[expressions](../interfaces/IOrm.md#expressions)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:32](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L32)

___

### language

• **language**: [`LanguagesService`](LanguagesService.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:31](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L31)

___

### schema

• **schema**: [`SchemaFacade`](SchemaFacade.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[schema](../interfaces/IOrm.md#schema)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:33](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L33)

___

### stage

• **stage**: [`StageFacade`](StageFacade.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[stage](../interfaces/IOrm.md#stage)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:34](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L34)

## Accessors

### defaultStage

• `get` **defaultStage**(): [`Stage`](../interfaces/Stage.md)

#### Returns

[`Stage`](../interfaces/Stage.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:67](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L67)

___

### workspace

• `get` **workspace**(): `string`

Get workspace path

#### Returns

`string`

#### Implementation of

IOrm.workspace

#### Defined in

[src/lib/orm/infrastructure/orm.ts:133](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L133)

___

### instance

• `get` **instance**(): [`Orm`](Orm.md)

Singleton

#### Returns

[`Orm`](Orm.md)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:60](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L60)

## Methods

### constraints

▸ **constraints**(`expression`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Get constraints of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

Constraints of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[constraints](../interfaces/IOrm.md#constraints)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:187](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L187)

▸ **constraints**(`expression`): [`MetadataConstraint`](../interfaces/MetadataConstraint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataConstraint`](../interfaces/MetadataConstraint.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[constraints](../interfaces/IOrm.md#constraints)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:188](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L188)

___

### dialect

▸ **dialect**(`source`): [`Dialect`](../enums/Dialect.md)

Get dialect of source

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Name of source |

#### Returns

[`Dialect`](../enums/Dialect.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[dialect](../interfaces/IOrm.md#dialect)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:142](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L142)

___

### end

▸ **end**(): `Promise`\<`void`\>

Frees the resources used, for example the connection pools

#### Returns

`Promise`\<`void`\>

#### Implementation of

[IOrm](../interfaces/IOrm.md).[end](../interfaces/IOrm.md#end)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:117](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L117)

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

[src/lib/orm/infrastructure/orm.ts:226](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L226)

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

[src/lib/orm/infrastructure/orm.ts:227](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L227)

___

### init

▸ **init**(`source?`, `connect?`): `Promise`\<[`Schema`](../interfaces/Schema.md)\>

initialize the orm library

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source?` | `string` \| [`Schema`](../interfaces/Schema.md) | `undefined` | optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project |
| `connect` | `boolean` | `true` | - |

#### Returns

`Promise`\<[`Schema`](../interfaces/Schema.md)\>

promise void

#### Implementation of

[IOrm](../interfaces/IOrm.md).[init](../interfaces/IOrm.md#init)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:76](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L76)

___

### metadata

▸ **metadata**(`expression`): [`Metadata`](../interfaces/Metadata.md)

Get metadata of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`Metadata`](../interfaces/Metadata.md)

metadata of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[metadata](../interfaces/IOrm.md#metadata)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:199](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L199)

▸ **metadata**(`expression`): [`Metadata`](../interfaces/Metadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Metadata`](../interfaces/Metadata.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[metadata](../interfaces/IOrm.md#metadata)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:200](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L200)

___

### model

▸ **model**(`expression`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

Get model of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

Model of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[model](../interfaces/IOrm.md#model)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:163](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L163)

▸ **model**(`expression`): [`MetadataModel`](../interfaces/MetadataModel.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataModel`](../interfaces/MetadataModel.md)[]

#### Implementation of

[IOrm](../interfaces/IOrm.md).[model](../interfaces/IOrm.md#model)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:164](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L164)

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

[src/lib/orm/infrastructure/orm.ts:151](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L151)

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

[src/lib/orm/infrastructure/orm.ts:152](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L152)

___

### parameters

▸ **parameters**(`expression`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |

#### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

Parameters of expression

#### Implementation of

[IOrm](../interfaces/IOrm.md).[parameters](../interfaces/IOrm.md#parameters)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:175](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L175)

▸ **parameters**(`expression`): [`MetadataParameter`](../interfaces/MetadataParameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`MetadataParameter`](../interfaces/MetadataParameter.md)[]

#### Implementation of

[IOrm](../interfaces/IOrm.md).[parameters](../interfaces/IOrm.md#parameters)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:176](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L176)

___

### plan

▸ **plan**(`expression`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

Get getInfo of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `Function` | query expression |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) | options of execution |

#### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[plan](../interfaces/IOrm.md#plan)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:211](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L211)

▸ **plan**(`expression`, `options?`): [`QueryPlan`](../interfaces/QueryPlan.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `options?` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`QueryPlan`](../interfaces/QueryPlan.md)

#### Implementation of

[IOrm](../interfaces/IOrm.md).[plan](../interfaces/IOrm.md#plan)

#### Defined in

[src/lib/orm/infrastructure/orm.ts:212](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L212)

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

[src/lib/orm/infrastructure/orm.ts:254](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L254)

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

[src/lib/orm/infrastructure/orm.ts:246](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L246)

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

[src/lib/orm/infrastructure/orm.ts:258](https://github.com/lambda-orm/lambdaorm/blob/73ae43da/src/lib/orm/infrastructure/orm.ts#L258)
