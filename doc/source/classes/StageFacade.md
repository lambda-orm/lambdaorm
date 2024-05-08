[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageFacade

# Class: StageFacade

## Constructors

### new StageFacade()

> **new StageFacade**(`workspace`, `schemaState`, `expression`, `executor`, `languages`, `helper`): [`StageFacade`](StageFacade.md)

#### Parameters

• **workspace**: `string`

• **schemaState**: [`SchemaState`](SchemaState.md)

• **expression**: [`ExpressionFacade`](ExpressionFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageFacade`](StageFacade.md)

#### Source

[src/lib/stage/application/facade.ts:22](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L22)

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

[src/lib/stage/application/facade.ts:77](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L77)

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

[src/lib/stage/application/facade.ts:57](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L57)

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

[src/lib/stage/application/facade.ts:37](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L37)

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

[src/lib/stage/application/facade.ts:87](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L87)

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

[src/lib/stage/application/facade.ts:107](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L107)

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

[src/lib/stage/application/facade.ts:97](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L97)

***

### incorporate()

> **incorporate**(`data`, `name`, `options`?): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

Update and Push Schema and import data

#### Parameters

• **data**: `any`

any|any[]

• **name**: `string`

string

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Source

[src/lib/stage/application/facade.ts:144](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L144)

***

### introspect()

> **introspect**(`data`, `name`, `options`?): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

Update and Push Schema with data

#### Parameters

• **data**: `any`

any|any[]

• **name**: `string`

string

• **options?**: [`QueryOptions`](../interfaces/QueryOptions.md)

QueryOptions

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Source

[src/lib/stage/application/facade.ts:131](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L131)

***

### pull()

> **pull**(`options`): `Promise`\<`void`\>

Pull the stage with the sources

#### Parameters

• **options**: [`StagePullOptions`](../interfaces/StagePullOptions.md)= `undefined`

StagePullOptions

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/stage/application/facade.ts:117](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L117)

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

[src/lib/stage/application/facade.ts:47](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L47)

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

[src/lib/stage/application/facade.ts:67](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/facade.ts#L67)
