[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageDrop

# Class: StageDrop

Defined in: [src/lib/stage/application/useCases/drop.ts:9](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/drop.ts#L9)

## Extends

- [`StageActionDDL`](StageActionDDL.md)

## Constructors

### Constructor

> **new StageDrop**(`executor`, `stateService`, `mappingService`, `schemaState`, `languages`, `options`, `helper`): `StageDrop`

Defined in: [src/lib/stage/application/useCases/drop.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/drop.ts#L11)

#### Parameters

##### executor

[`Executor`](../interfaces/Executor.md)

##### stateService

[`StageModelService`](StageModelService.md)

##### mappingService

[`StageMappingService`](StageMappingService.md)

##### schemaState

[`SchemaState`](SchemaState.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`StageDrop`

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`constructor`](StageActionDDL.md#constructor)

## Methods

### execute()

> **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/stage/application/useCases/drop.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/drop.ts#L24)

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`execute`](StageActionDDL.md#execute)

***

### queries()

> **queries**(): `Promise`\<[`Query`](Query.md)[]\>

Defined in: [src/lib/stage/application/useCases/drop.ts:16](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/drop.ts#L16)

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`queries`](StageActionDDL.md#queries)

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

Defined in: [src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDDL.ts#L19)

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`sentence`](StageActionDDL.md#sentence)
