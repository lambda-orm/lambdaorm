[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StagePush

# Class: StagePush

## Extends

- [`StageActionDDL`](StageActionDDL.md)

## Constructors

### new StagePush()

> **new StagePush**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): [`StagePush`](StagePush.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

• **stageModelService**: [`StageModelService`](StageModelService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StagePush`](StagePush.md)

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`constructor`](StageActionDDL.md#constructors)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/f8c82a2cc7a2807ec58a8f880e271d3fde41079e/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

## Methods

### execute()

> **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`execute`](StageActionDDL.md#execute)

#### Source

[src/lib/stage/application/useCases/push.ts:11](https://github.com/lambda-orm/lambdaorm/blob/f8c82a2cc7a2807ec58a8f880e271d3fde41079e/src/lib/stage/application/useCases/push.ts#L11)

***

### queries()

> **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`queries`](StageActionDDL.md#queries)

#### Source

[src/lib/stage/application/useCases/push.ts:6](https://github.com/lambda-orm/lambdaorm/blob/f8c82a2cc7a2807ec58a8f880e271d3fde41079e/src/lib/stage/application/useCases/push.ts#L6)

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`sentence`](StageActionDDL.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/f8c82a2cc7a2807ec58a8f880e271d3fde41079e/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
