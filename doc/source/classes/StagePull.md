[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StagePull

# Class: StagePull

## Extends

- [`StageActionDDL`](StageActionDDL.md)

## Constructors

### new StagePull()

> **new StagePull**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StagePull`](StagePull.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

• **stageModelService**: [`StageModelService`](StageModelService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StagePull`](StagePull.md)

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`constructor`](StageActionDDL.md#constructors)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute()

> **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`execute`](StageActionDDL.md#execute)

#### Source

[src/lib/stage/application/useCases/pull.ts:11](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/useCases/pull.ts#L11)

***

### queries()

> **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`queries`](StageActionDDL.md#queries)

#### Source

[src/lib/stage/application/useCases/pull.ts:6](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/useCases/pull.ts#L6)

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`sentence`](StageActionDDL.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/ae41e9f29a20e534dbb23bd57233d0aca1040204/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
