[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageFacade

# Class: StageFacade

## Constructors

### new StageFacade()

> **new StageFacade**(`schemaState`, `expression`, `executor`, `languages`, `helper`): [`StageFacade`](StageFacade.md)

#### Parameters

• **schemaState**: [`SchemaState`](SchemaState.md)

• **expression**: [`ExpressionFacade`](ExpressionFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageFacade`](StageFacade.md)

#### Source

[src/lib/stage/application/facade.ts:23](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L23)

## Methods

### delete()

> **delete**(`options`?): [`StageDelete`](StageDelete.md)

Delete source entities related to the stage

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageDelete`](StageDelete.md)

#### Source

[src/lib/stage/application/facade.ts:78](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L78)

***

### drop()

> **drop**(`options`?): [`StageActionDDL`](StageActionDDL.md)

Drop source entities related to the stage

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Source

[src/lib/stage/application/facade.ts:58](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L58)

***

### exists()

> **exists**(`name`): `Promise`\<`boolean`\>

Check if the stage exists

#### Parameters

• **name**: `string`

string

#### Returns

`Promise`\<`boolean`\>

#### Source

[src/lib/stage/application/facade.ts:38](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L38)

***

### export()

> **export**(`options`?): [`StageExport`](StageExport.md)

Export source entities related to the stage

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageExport`](StageExport.md)

#### Source

[src/lib/stage/application/facade.ts:88](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L88)

***

### fetch()

> **fetch**(`options`?): `Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

Fetch all mappings from the stage

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`Mapping`](../interfaces/Mapping.md)[]\>

#### Source

[src/lib/stage/application/facade.ts:108](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L108)

***

### import()

> **import**(`options`?): [`StageImport`](StageImport.md)

Import data into source entities related to the stage

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageImport`](StageImport.md)

#### Source

[src/lib/stage/application/facade.ts:98](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L98)

***

### incorporate()

> **incorporate**(`data`, `name`, `options`?): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Update and Push Schema and import data

#### Parameters

• **data**: `any`

any|any[]

• **name**: `string`

string

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Source

[src/lib/stage/application/facade.ts:144](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L144)

***

### introspect()

> **introspect**(`data`, `name`, `options`?): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Update and Push Schema with data

#### Parameters

• **data**: `any`

any|any[]

• **name**: `string`

string

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Source

[src/lib/stage/application/facade.ts:132](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L132)

***

### pull()

> **pull**(`options`): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Pull the stage with the sources

#### Parameters

• **options**: [`StagePullOptions`](../interfaces/StagePullOptions.md)= `undefined`

StagePullOptions

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Source

[src/lib/stage/application/facade.ts:118](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L118)

***

### push()

> **push**(`options`?): [`StageActionDDL`](StageActionDDL.md)

Push the stage with sources

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Source

[src/lib/stage/application/facade.ts:48](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L48)

***

### truncate()

> **truncate**(`options`?): [`StageActionDDL`](StageActionDDL.md)

Truncate source entities related to the stage

#### Parameters

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Source

[src/lib/stage/application/facade.ts:68](https://github.com/lambda-orm/lambdaorm/blob/d1e7e058f2cd0335e56c0044cc0cb5e2e2d5878e/src/lib/stage/application/facade.ts#L68)
