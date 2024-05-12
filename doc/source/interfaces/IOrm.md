[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / IOrm

# Interface: IOrm

## Properties

### exp

> **exp**: `Expressions`

#### Source

[src/lib/orm/application/orm.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L11)

***

### schema

> **schema**: [`SchemaFacade`](../classes/SchemaFacade.md)

#### Source

[src/lib/orm/application/orm.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L9)

***

### stage

> **stage**: [`StageFacade`](../classes/StageFacade.md)

#### Source

[src/lib/orm/application/orm.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L8)

***

### state

> **state**: [`SchemaState`](../classes/SchemaState.md)

#### Source

[src/lib/orm/application/orm.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L10)

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

[src/lib/orm/application/orm.ts:43](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L43)

#### constraints(query)

> **constraints**(`query`): [`MetadataConstraint`](MetadataConstraint.md)

##### Parameters

• **query**: `string`

##### Returns

[`MetadataConstraint`](MetadataConstraint.md)

##### Source

[src/lib/orm/application/orm.ts:44](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L44)

***

### dialect()

> **dialect**(`source`): [`Dialect`](../enumerations/Dialect.md)

#### Parameters

• **source**: `string`

#### Returns

[`Dialect`](../enumerations/Dialect.md)

#### Source

[src/lib/orm/application/orm.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L13)

***

### end()

> **end**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/orm/application/orm.ts:17](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L17)

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

[src/lib/orm/application/orm.ts:68](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L68)

#### execute(query, data, options)

> **execute**(`query`, `data`?, `options`?): `Promise`\<`any`\>

##### Parameters

• **query**: `string`

• **data?**: `any`

• **options?**: [`QueryOptions`](QueryOptions.md)

##### Returns

`Promise`\<`any`\>

##### Source

[src/lib/orm/application/orm.ts:69](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L69)

***

### init()

> **init**(`configPath`?, `connect`?): `Promise`\<[`Schema`](Schema.md)\>

#### Parameters

• **configPath?**: `string`

• **connect?**: `boolean`

#### Returns

`Promise`\<[`Schema`](Schema.md)\>

#### Source

[src/lib/orm/application/orm.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L16)

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

[src/lib/orm/application/orm.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L50)

#### metadata(query)

> **metadata**(`query`): [`Metadata`](Metadata.md)

##### Parameters

• **query**: `string`

##### Returns

[`Metadata`](Metadata.md)

##### Source

[src/lib/orm/application/orm.ts:51](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L51)

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

[src/lib/orm/application/orm.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L29)

#### model(query)

> **model**(`query`): [`MetadataModel`](MetadataModel.md)[]

##### Parameters

• **query**: `string`

##### Returns

[`MetadataModel`](MetadataModel.md)[]

##### Source

[src/lib/orm/application/orm.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L30)

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

[src/lib/orm/application/orm.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L22)

#### normalize(query)

> **normalize**(`query`): `string`

##### Parameters

• **query**: `string`

##### Returns

`string`

##### Source

[src/lib/orm/application/orm.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L23)

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

[src/lib/orm/application/orm.ts:36](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L36)

#### parameters(query)

> **parameters**(`query`): [`MetadataParameter`](MetadataParameter.md)[]

##### Parameters

• **query**: `string`

##### Returns

[`MetadataParameter`](MetadataParameter.md)[]

##### Source

[src/lib/orm/application/orm.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L37)

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

[src/lib/orm/application/orm.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L58)

#### plan(query, options)

> **plan**(`query`, `options`?): [`QueryPlan`](QueryPlan.md)

##### Parameters

• **query**: `string`

• **options?**: [`QueryOptions`](QueryOptions.md)

##### Returns

[`QueryPlan`](QueryPlan.md)

##### Source

[src/lib/orm/application/orm.ts:59](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L59)

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

[src/lib/orm/application/orm.ts:75](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/orm/application/orm.ts#L75)
