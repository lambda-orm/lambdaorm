[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / IOrm

# Interface: IOrm

Defined in: [src/lib/orm/application/orm.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L6)

## Properties

### exp

> **exp**: `Expressions`

Defined in: [src/lib/orm/application/orm.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L11)

***

### schema

> **schema**: [`SchemaFacade`](../classes/SchemaFacade.md)

Defined in: [src/lib/orm/application/orm.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L9)

***

### stage

> **stage**: [`StageFacade`](../classes/StageFacade.md)

Defined in: [src/lib/orm/application/orm.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L8)

***

### state

> **state**: [`SchemaState`](../classes/SchemaState.md)

Defined in: [src/lib/orm/application/orm.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L10)

## Methods

### constraints()

#### Call Signature

> **constraints**(`query`): [`MetadataConstraint`](MetadataConstraint.md)

Defined in: [src/lib/orm/application/orm.ts:43](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L43)

Get constraints of query

##### Parameters

###### query

`Function`

##### Returns

[`MetadataConstraint`](MetadataConstraint.md)

Constraints of query

#### Call Signature

> **constraints**(`query`): [`MetadataConstraint`](MetadataConstraint.md)

Defined in: [src/lib/orm/application/orm.ts:44](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L44)

##### Parameters

###### query

`string`

##### Returns

[`MetadataConstraint`](MetadataConstraint.md)

***

### dialect()

> **dialect**(`source`): [`Dialect`](../enumerations/Dialect.md)

Defined in: [src/lib/orm/application/orm.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L13)

#### Parameters

##### source

`string`

#### Returns

[`Dialect`](../enumerations/Dialect.md)

***

### end()

> **end**(): `Promise`\<`void`\>

Defined in: [src/lib/orm/application/orm.ts:17](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L17)

#### Returns

`Promise`\<`void`\>

***

### execute()

#### Call Signature

> **execute**(`query`, `data?`, `options?`): `Promise`\<`any`\>

Defined in: [src/lib/orm/application/orm.ts:68](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L68)

Execute query

##### Parameters

###### query

`Function`

Query to execute

###### data?

`any`

Data with variables

###### options?

[`QueryOptions`](QueryOptions.md)

query options

##### Returns

`Promise`\<`any`\>

Result of execution

#### Call Signature

> **execute**(`query`, `data?`, `options?`): `Promise`\<`any`\>

Defined in: [src/lib/orm/application/orm.ts:69](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L69)

##### Parameters

###### query

`string`

###### data?

`any`

###### options?

[`QueryOptions`](QueryOptions.md)

##### Returns

`Promise`\<`any`\>

***

### init()

> **init**(`configPath?`, `connect?`): `Promise`\<[`Schema`](Schema.md)\>

Defined in: [src/lib/orm/application/orm.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L16)

#### Parameters

##### configPath?

`string`

##### connect?

`boolean`

#### Returns

`Promise`\<[`Schema`](Schema.md)\>

***

### metadata()

#### Call Signature

> **metadata**(`query`): [`Metadata`](Metadata.md)

Defined in: [src/lib/orm/application/orm.ts:50](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L50)

Get metadata of query

##### Parameters

###### query

`Function`

##### Returns

[`Metadata`](Metadata.md)

metadata of query

#### Call Signature

> **metadata**(`query`): [`Metadata`](Metadata.md)

Defined in: [src/lib/orm/application/orm.ts:51](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L51)

##### Parameters

###### query

`string`

##### Returns

[`Metadata`](Metadata.md)

***

### model()

#### Call Signature

> **model**(`query`): [`MetadataModel`](MetadataModel.md)[]

Defined in: [src/lib/orm/application/orm.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L29)

Get model of query

##### Parameters

###### query

`Function`

##### Returns

[`MetadataModel`](MetadataModel.md)[]

Model of query

#### Call Signature

> **model**(`query`): [`MetadataModel`](MetadataModel.md)[]

Defined in: [src/lib/orm/application/orm.ts:30](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L30)

##### Parameters

###### query

`string`

##### Returns

[`MetadataModel`](MetadataModel.md)[]

***

### normalize()

#### Call Signature

> **normalize**(`query`): `string`

Defined in: [src/lib/orm/application/orm.ts:22](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L22)

Normalize query

##### Parameters

###### query

`Function`

##### Returns

`string`

Expression normalized

#### Call Signature

> **normalize**(`query`): `string`

Defined in: [src/lib/orm/application/orm.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L23)

##### Parameters

###### query

`string`

##### Returns

`string`

***

### parameters()

#### Call Signature

> **parameters**(`query`): [`MetadataParameter`](MetadataParameter.md)[]

Defined in: [src/lib/orm/application/orm.ts:36](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L36)

Get parameters of query

##### Parameters

###### query

`Function`

##### Returns

[`MetadataParameter`](MetadataParameter.md)[]

Parameters of query

#### Call Signature

> **parameters**(`query`): [`MetadataParameter`](MetadataParameter.md)[]

Defined in: [src/lib/orm/application/orm.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L37)

##### Parameters

###### query

`string`

##### Returns

[`MetadataParameter`](MetadataParameter.md)[]

***

### plan()

#### Call Signature

> **plan**(`query`, `options?`): [`QueryPlan`](QueryPlan.md)

Defined in: [src/lib/orm/application/orm.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L58)

##### Parameters

###### query

`Function`

###### options?

[`QueryOptions`](QueryOptions.md)

##### Returns

[`QueryPlan`](QueryPlan.md)

#### Call Signature

> **plan**(`query`, `options?`): [`QueryPlan`](QueryPlan.md)

Defined in: [src/lib/orm/application/orm.ts:59](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L59)

##### Parameters

###### query

`string`

###### options?

[`QueryOptions`](QueryOptions.md)

##### Returns

[`QueryPlan`](QueryPlan.md)

***

### transaction()

> **transaction**(`options`, `callback`): `Promise`\<`void`\>

Defined in: [src/lib/orm/application/orm.ts:75](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/orm/application/orm.ts#L75)

transaction

#### Parameters

##### options

query options

`undefined` | [`QueryOptions`](QueryOptions.md)

##### callback

(`tr`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
