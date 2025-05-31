[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageFacade

# Class: StageFacade

Defined in: [src/lib/stage/application/facade.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L19)

## Constructors

### Constructor

> **new StageFacade**(`schemaState`, `expression`, `executor`, `languages`, `helper`): `StageFacade`

Defined in: [src/lib/stage/application/facade.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L23)

#### Parameters

##### schemaState

[`SchemaState`](SchemaState.md)

##### expression

[`ExpressionFacade`](ExpressionFacade.md)

##### executor

[`Executor`](../interfaces/Executor.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`StageFacade`

## Methods

### delete()

> **delete**(`options?`): [`StageDelete`](StageDelete.md)

Defined in: [src/lib/stage/application/facade.ts:78](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L78)

Delete source entities related to the stage

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageDelete`](StageDelete.md)

***

### drop()

> **drop**(`options?`): [`StageActionDDL`](StageActionDDL.md)

Defined in: [src/lib/stage/application/facade.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L58)

Drop source entities related to the stage

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageActionDDL`](StageActionDDL.md)

***

### exists()

> **exists**(`name`): `Promise`\<`boolean`\>

Defined in: [src/lib/stage/application/facade.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L38)

Check if the stage exists

#### Parameters

##### name

`string`

string

#### Returns

`Promise`\<`boolean`\>

***

### export()

> **export**(`options?`): [`StageExport`](StageExport.md)

Defined in: [src/lib/stage/application/facade.ts:88](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L88)

Export source entities related to the stage

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageExport`](StageExport.md)

***

### fetch()

> **fetch**(`options?`): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

Defined in: [src/lib/stage/application/facade.ts:108](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L108)

Fetch all mappings from the stage

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

***

### import()

> **import**(`options?`): [`StageImport`](StageImport.md)

Defined in: [src/lib/stage/application/facade.ts:98](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L98)

Import data into source entities related to the stage

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageImport`](StageImport.md)

***

### incorporate()

> **incorporate**(`data`, `name`, `options?`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/stage/application/facade.ts:144](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L144)

Update and Push Schema and import data

#### Parameters

##### data

`any`

any|any[]

##### name

`string`

string

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

***

### introspect()

> **introspect**(`data`, `name`, `options?`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/stage/application/facade.ts:132](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L132)

Update and Push Schema with data

#### Parameters

##### data

`any`

any|any[]

##### name

`string`

string

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

***

### pull()

> **pull**(`options`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/stage/application/facade.ts:118](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L118)

Pull the stage with the sources

#### Parameters

##### options

[`StagePullOptions`](../interfaces/StagePullOptions.md) = `...`

StagePullOptions

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

***

### push()

> **push**(`options?`): [`StageActionDDL`](StageActionDDL.md)

Defined in: [src/lib/stage/application/facade.ts:48](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L48)

Push the stage with sources

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageActionDDL`](StageActionDDL.md)

***

### truncate()

> **truncate**(`options?`): [`StageActionDDL`](StageActionDDL.md)

Defined in: [src/lib/stage/application/facade.ts:68](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/facade.ts#L68)

Truncate source entities related to the stage

#### Parameters

##### options?

[`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageActionDDL`](StageActionDDL.md)
