[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageImport

# Class: StageImport

Defined in: [src/lib/stage/application/useCases/import.ts:6](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/import.ts#L6)

## Extends

- [`StageActionDML`](StageActionDML.md)

## Constructors

### Constructor

> **new StageImport**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): `StageImport`

Defined in: [src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDML.ts#L15)

#### Parameters

##### stageMappingService

[`StageMappingService`](StageMappingService.md)

##### domain

[`DomainConfigService`](DomainConfigService.md)

##### expressionFacade

[`ExpressionFacade`](ExpressionFacade.md)

##### executor

[`Executor`](../interfaces/Executor.md)

##### options

[`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

`StageImport`

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`constructor`](StageActionDML.md#constructor)

## Methods

### execute()

> **execute**(`data`): `Promise`\<`void`\>

Defined in: [src/lib/stage/application/useCases/import.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/import.ts#L7)

#### Parameters

##### data

[`SchemaData`](../interfaces/SchemaData.md)

#### Returns

`Promise`\<`void`\>

***

### queries()

> **queries**(): [`Query`](Query.md)[]

Defined in: [src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDML.ts#L33)

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`queries`](StageActionDML.md#queries)

***

### sentence()

> **sentence**(): `Promise`\<`any`\>

Defined in: [src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDML.ts#L24)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`sentence`](StageActionDML.md#sentence)
