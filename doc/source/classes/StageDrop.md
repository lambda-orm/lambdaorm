[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageDrop

# Class: StageDrop

## Extends

- [`StageActionDDL`](StageActionDDL.md)

## Constructors

### new StageDrop()

> **new StageDrop**(`executor`, `stateService`, `mappingService`, `schemaState`, `languages`, `options`, `helper`): [`StageDrop`](StageDrop.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

• **stateService**: [`StageModelService`](StageModelService.md)

• **mappingService**: [`StageMappingService`](StageMappingService.md)

• **schemaState**: [`SchemaState`](SchemaState.md)

• **languages**: [`LanguagesService`](LanguagesService.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

• **helper**: [`OrmH3lp`](OrmH3lp.md)

#### Returns

[`StageDrop`](StageDrop.md)

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`constructor`](StageActionDDL.md#constructors)

#### Source

[src/lib/stage/application/useCases/drop.ts:11](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/stage/application/useCases/drop.ts#L11)

## Methods

### execute()

> **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`execute`](StageActionDDL.md#execute)

#### Source

[src/lib/stage/application/useCases/drop.ts:24](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/stage/application/useCases/drop.ts#L24)

***

### queries()

> **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`queries`](StageActionDDL.md#queries)

#### Source

[src/lib/stage/application/useCases/drop.ts:16](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/stage/application/useCases/drop.ts#L16)

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`sentence`](StageActionDDL.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/b641a316566df55ad8177b62e40fe267b1442b03/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
