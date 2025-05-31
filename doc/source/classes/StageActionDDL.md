[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageActionDDL

# Class: `abstract` StageActionDDL

Defined in: [src/lib/stage/application/useCases/base/actionDDL.ts:8](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDDL.ts#L8)

## Extended by

- [`StageDrop`](StageDrop.md)
- [`StagePush`](StagePush.md)
- [`StageTruncate`](StageTruncate.md)
- [`StagePull`](StagePull.md)

## Constructors

### Constructor

> **new StageActionDDL**(`executor`, `stageModelService`, `schemaState`, `languages`, `options`, `helper`): `StageActionDDL`

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

`StageActionDDL`

## Methods

### execute()

> `abstract` **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

Defined in: [src/lib/stage/application/useCases/base/actionDDL.ts:17](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDDL.ts#L17)

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

***

### queries()

> `abstract` **queries**(): `Promise`\<[`Query`](Query.md)[]\>

Defined in: [src/lib/stage/application/useCases/base/actionDDL.ts:18](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDDL.ts#L18)

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

***

### sentence()

> **sentence**(): `Promise`\<`any`[]\>

Defined in: [src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDDL.ts#L19)

#### Returns

`Promise`\<`any`[]\>
