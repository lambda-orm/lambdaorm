[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageExport

# Class: StageExport

## Extends

- [`StageActionDML`](StageActionDML.md)

## Constructors

### new StageExport()

> **new StageExport**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageExport`](StageExport.md)

#### Parameters

• **stageMappingService**: [`StageMappingService`](StageMappingService.md)

• **domain**: [`DomainConfigService`](DomainConfigService.md)

• **expressionFacade**: [`ExpressionFacade`](ExpressionFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`StageExport`](StageExport.md)

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`constructor`](StageActionDML.md#constructors)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### execute()

> **execute**(): `Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Returns

`Promise`\<[`SchemaData`](../interfaces/SchemaData.md)\>

#### Source

[src/lib/stage/application/useCases/export.ts:6](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/useCases/export.ts#L6)

***

### queries()

> **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`queries`](StageActionDML.md#queries)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/useCases/base/actionDML.ts#L33)

***

### sentence()

> **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`sentence`](StageActionDML.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/cfdea01485e47d6bfb9f5073528259581c5e1563/src/lib/stage/application/useCases/base/actionDML.ts#L24)
