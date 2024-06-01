[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageActionDDL

# Class: `abstract` StageActionDDL

## Extended by

- [`StageDrop`](StageDrop.md)
- [`StagePush`](StagePush.md)
- [`StageTruncate`](StageTruncate.md)
- [`StagePull`](StagePull.md)

## Constructors

### new StageActionDDL()

> **new StageActionDDL**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StageActionDDL`](StageActionDDL.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

• **stageModelService**: [`StageModelService`](StageModelService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageActionDDL`](StageActionDDL.md)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute()

> `abstract` **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:17](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/base/actionDDL.ts#L17)

***

### queries()

> `abstract` **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:18](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/base/actionDDL.ts#L18)

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
