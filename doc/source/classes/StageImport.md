[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageImport

# Class: StageImport

## Extends

- [`StageActionDML`](StageActionDML.md)

## Constructors

### new StageImport()

> **new StageImport**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageImport`](StageImport.md)

#### Parameters

• **stageMappingService**: [`StageMappingService`](StageMappingService.md)

• **domain**: [`DomainConfigService`](DomainConfigService.md)

• **expressionFacade**: [`ExpressionFacade`](ExpressionFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`StageImport`](StageImport.md)

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`constructor`](StageActionDML.md#constructors)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### execute()

> **execute**(`data`): `Promise`\<`void`\>

#### Parameters

• **data**: [`SchemaData`](../interfaces/SchemaData.md)

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/stage/application/useCases/import.ts:7](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/stage/application/useCases/import.ts#L7)

***

### queries()

> **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`queries`](StageActionDML.md#queries)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/stage/application/useCases/base/actionDML.ts#L33)

***

### sentence()

> **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`sentence`](StageActionDML.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/46e86d864b5f4223fb0b1052cc3ab701d4af5a21/src/lib/stage/application/useCases/base/actionDML.ts#L24)
