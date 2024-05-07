[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageActionDML

# Class: `abstract` StageActionDML

## Extended by

- [`StageDelete`](StageDelete.md)
- [`StageExport`](StageExport.md)
- [`StageImport`](StageImport.md)

## Constructors

### new StageActionDML()

> **new StageActionDML**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageActionDML`](StageActionDML.md)

#### Parameters

• **stageMappingService**: [`StageMappingService`](StageMappingService.md)

• **domain**: [`DomainConfigService`](DomainConfigService.md)

• **expressionFacade**: [`ExpressionFacade`](ExpressionFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`StageActionDML`](StageActionDML.md)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### queries()

> **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/useCases/base/actionDML.ts#L33)

***

### sentence()

> **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/b5545097c371addc7799ba0f29b9e8204e97d347/src/lib/stage/application/useCases/base/actionDML.ts#L24)
