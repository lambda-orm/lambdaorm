[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageTruncate

# Class: StageTruncate

## Extends

- [`StageActionDDL`](StageActionDDL.md)

## Constructors

### new StageTruncate()

> **new StageTruncate**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StageTruncate`](StageTruncate.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

• **stageModelService**: [`StageModelService`](StageModelService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageTruncate`](StageTruncate.md)

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`constructor`](StageActionDDL.md#constructors)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute()

> **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`execute`](StageActionDDL.md#execute)

#### Source

[src/lib/stage/application/useCases/truncate.ts:13](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/truncate.ts#L13)

***

### queries()

> **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`queries`](StageActionDDL.md#queries)

#### Source

[src/lib/stage/application/useCases/truncate.ts:5](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/truncate.ts#L5)

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`sentence`](StageActionDDL.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2cf2f2464c4fe66901565772c5ae4881d9c605d1/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
