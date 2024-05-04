[Lambda ORM](../README.md) / StageActionDML

# Class: StageActionDML

## Hierarchy

- **`StageActionDML`**

  ↳ [`StageDelete`](StageDelete.md)

  ↳ [`StageExport`](StageExport.md)

  ↳ [`StageImport`](StageImport.md)

## Table of contents

### Constructors

- [constructor](StageActionDML.md#constructor)

### Methods

- [queries](StageActionDML.md#queries)
- [sentence](StageActionDML.md#sentence)

## Constructors

### constructor

• **new StageActionDML**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageActionDML`](StageActionDML.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageMappingService` | [`StageMappingService`](StageMappingService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `expressionFacade` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageActionDML`](StageActionDML.md)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### queries

▸ **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/base/actionDML.ts#L33)

___

### sentence

▸ **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/ad1fa3d559707b5bcfa3c09434382228cb95f3a8/src/lib/stage/application/useCases/base/actionDML.ts#L24)
