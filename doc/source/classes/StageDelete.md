[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / StageDelete

# Class: StageDelete

## Extends

- [`StageActionDML`](StageActionDML.md)

## Constructors

### new StageDelete()

> **new StageDelete**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageDelete`](StageDelete.md)

#### Parameters

• **stageMappingService**: [`StageMappingService`](StageMappingService.md)

• **domain**: [`DomainConfigService`](DomainConfigService.md)

• **expressionFacade**: [`ExpressionFacade`](ExpressionFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **options**: [`QueryOptions`](../interfaces/QueryOptions.md)

#### Returns

[`StageDelete`](StageDelete.md)

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`constructor`](StageActionDML.md#constructors)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### execute()

> **execute**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[src/lib/stage/application/useCases/delete.ts:6](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/stage/application/useCases/delete.ts#L6)

***

### queries()

> **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`queries`](StageActionDML.md#queries)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/stage/application/useCases/base/actionDML.ts#L33)

***

### sentence()

> **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`StageActionDML`](StageActionDML.md).[`sentence`](StageActionDML.md#sentence)

#### Source

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/ab10fb384c2d6085dd4fd7c03b28ba24f70cde83/src/lib/stage/application/useCases/base/actionDML.ts#L24)
