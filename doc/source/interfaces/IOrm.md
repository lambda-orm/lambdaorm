[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / IOrm

# Interface: IOrm

## Properties

### expressions

> **expressions**: `Expressions`

#### Source

[src/lib/orm/application/orm.ts:12](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L12)

***

### schema

> **schema**: [`SchemaFacade`](../classes/SchemaFacade.md)

#### Source

[src/lib/orm/application/orm.ts:10](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L10)

***

### stage

> **stage**: [`StageFacade`](../classes/StageFacade.md)

#### Source

[src/lib/orm/application/orm.ts:9](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L9)

***

### state

> **state**: [`SchemaState`](../classes/SchemaState.md)

#### Source

[src/lib/orm/application/orm.ts:11](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L11)

## Accessors

### workspace

> `get` **workspace**(): `string`

#### Returns

`string`

#### Source

[src/lib/orm/application/orm.ts:8](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L8)

## Methods

### constraints()

#### constraints(query)

> **constraints**(`query`): [`MetadataConstraint`](MetadataConstraint.md)

Get constraints of query

##### Parameters

• **query**: `Function`

##### Returns

[`MetadataConstraint`](MetadataConstraint.md)

Constraints of query

##### Source

[src/lib/orm/application/orm.ts:44](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L44)

#### constraints(query)

> **constraints**(`query`): [`MetadataConstraint`](MetadataConstraint.md)

##### Parameters

• **query**: `string`

##### Returns

[`MetadataConstraint`](MetadataConstraint.md)

##### Source

[src/lib/orm/application/orm.ts:45](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L45)

***

### dialect()

> **dialect**(`source`): [`Dialect`](../enumerations/Dialect.md)

#### Parameters

• **source**: `string`

#### Returns

[`Dialect`](../enumerations/Dialect.md)

#### Source

[src/lib/orm/application/orm.ts:14](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L14)

***

### end()

> **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/orm/application/orm.ts:18](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L18)

***

### execute()

#### execute(query, data, options)

> **execute**(`query`, `data`?, `options`?): `Promise`\<`any`\>

Execute query

##### Parameters

• **query**: `Function`

Query to execute

• **data?**: `any`

Data with variables

• **options?**: [`QueryOptions`](QueryOptions.md)

query options

##### Returns

`Promise`\<`any`\>

Result of execution

##### Source

[src/lib/orm/application/orm.ts:69](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L69)

#### execute(query, data, options)

> **execute**(`query`, `data`?, `options`?): `Promise`\<`any`\>

##### Parameters

• **query**: `string`

• **data?**: `any`

• **options?**: [`QueryOptions`](QueryOptions.md)

##### Returns

`Promise`\<`any`\>

##### Source

[src/lib/orm/application/orm.ts:70](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L70)

***

### init()

> **init**(`configPath`?, `connect`?): `Promise`\<[`Schema`](Schema.md)\>

#### Parameters

• **configPath?**: `string`

• **connect?**: `boolean`

#### Returns

`Promise`\<[`Schema`](Schema.md)\>

#### Source

[src/lib/orm/application/orm.ts:17](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L17)

***

### metadata()

#### metadata(query)

> **metadata**(`query`): [`Metadata`](Metadata.md)

Get metadata of query

##### Parameters

• **query**: `Function`

##### Returns

[`Metadata`](Metadata.md)

metadata of query

##### Source

[src/lib/orm/application/orm.ts:51](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L51)

#### metadata(query)

> **metadata**(`query`): [`Metadata`](Metadata.md)

##### Parameters

• **query**: `string`

##### Returns

[`Metadata`](Metadata.md)

##### Source

[src/lib/orm/application/orm.ts:52](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L52)

***

### model()

#### model(query)

> **model**(`query`): [`MetadataModel`](MetadataModel.md)[]

Get model of query

##### Parameters

• **query**: `Function`

##### Returns

[`MetadataModel`](MetadataModel.md)[]

Model of query

##### Source

[src/lib/orm/application/orm.ts:30](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L30)

#### model(query)

> **model**(`query`): [`MetadataModel`](MetadataModel.md)[]

##### Parameters

• **query**: `string`

##### Returns

[`MetadataModel`](MetadataModel.md)[]

##### Source

[src/lib/orm/application/orm.ts:31](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L31)

***

### normalize()

#### normalize(query)

> **normalize**(`query`): `string`

Normalize query

##### Parameters

• **query**: `Function`

##### Returns

`string`

Expression normalized

##### Source

[src/lib/orm/application/orm.ts:23](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L23)

#### normalize(query)

> **normalize**(`query`): `string`

##### Parameters

• **query**: `string`

##### Returns

`string`

##### Source

[src/lib/orm/application/orm.ts:24](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L24)

***

### parameters()

#### parameters(query)

> **parameters**(`query`): [`MetadataParameter`](MetadataParameter.md)[]

Get parameters of query

##### Parameters

• **query**: `Function`

##### Returns

[`MetadataParameter`](MetadataParameter.md)[]

Parameters of query

##### Source

[src/lib/orm/application/orm.ts:37](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L37)

#### parameters(query)

> **parameters**(`query`): [`MetadataParameter`](MetadataParameter.md)[]

##### Parameters

• **query**: `string`

##### Returns

[`MetadataParameter`](MetadataParameter.md)[]

##### Source

[src/lib/orm/application/orm.ts:38](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L38)

***

### plan()

#### plan(query, options)

> **plan**(`query`, `options`?): [`QueryPlan`](QueryPlan.md)

##### Parameters

• **query**: `Function`

• **options?**: [`QueryOptions`](QueryOptions.md)

##### Returns

[`QueryPlan`](QueryPlan.md)

##### Source

[src/lib/orm/application/orm.ts:59](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L59)

#### plan(query, options)

> **plan**(`query`, `options`?): [`QueryPlan`](QueryPlan.md)

##### Parameters

• **query**: `string`

• **options?**: [`QueryOptions`](QueryOptions.md)

##### Returns

[`QueryPlan`](QueryPlan.md)

##### Source

[src/lib/orm/application/orm.ts:60](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L60)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

transaction

#### Parameters

• **options**: `undefined` \| [`QueryOptions`](QueryOptions.md)

query options

• **callback**

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/orm/application/orm.ts:76](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/orm/application/orm.ts#L76)
