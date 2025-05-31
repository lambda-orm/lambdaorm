[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / StageActionDML

# Class: `abstract` StageActionDML

Defined in: [src/lib/stage/application/useCases/base/actionDML.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDML.ts#L7)

## Extended by

- [`StageDelete`](StageDelete.md)
- [`StageExport`](StageExport.md)
- [`StageImport`](StageImport.md)

## Constructors

### Constructor

> **new StageActionDML**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): `StageActionDML`

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

`StageActionDML`

## Methods

### queries()

> **queries**(): [`Query`](Query.md)[]

Defined in: [src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDML.ts#L33)

#### Returns

[`Query`](Query.md)[]

***

### sentence()

> **sentence**(): `Promise`\<`any`\>

Defined in: [src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/stage/application/useCases/base/actionDML.ts#L24)

#### Returns

`Promise`\<`any`\>
