[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StagePull

# Class: StagePull

Defined in: [src/lib/stage/application/useCases/pull.ts:5](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/pull.ts#L5)

## Extends

- [`StageActionDDL`](StageActionDDL.md)

## Constructors

### Constructor

> **new StagePull**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): `StagePull`

Defined in: [src/lib/stage/application/useCases/base/actionDDL.ts:10](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDDL.ts#L10)

#### Parameters

##### executor

[`Executor`](../interfaces/Executor.md)

##### stageModelService

[`StageModelService`](StageModelService.md)

##### schemaState

[`SchemaState`](SchemaState.md)

##### languages

[`LanguagesService`](LanguagesService.md)

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

##### helper

[`OrmH3lp`](OrmH3lp.md)

#### Returns

`StagePull`

#### Inherited from

[`StageActionDDL`](StageActionDDL.md).[`constructor`](StageActionDDL.md#constructor)

## Methods

### execute()

> **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/stage/application/useCases/pull.ts:11](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/pull.ts#L11)

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[`StageActionDDL`](StageActionDDL.md).[`execute`](StageActionDDL.md#execute)

***

### queries()

> **queries**(): `Promise`\<[`Query`](Query.md)[]\>

Defined in: [src/lib/stage/application/useCases/pull.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/pull.ts#L6)

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
