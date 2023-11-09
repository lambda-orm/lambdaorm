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

• **new StageActionDML**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageMappingService` | [`StageMappingService`](StageMappingService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `expressionFacade` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/84e5f96e/src/lib/stage/application/useCases/base/actionDML.ts#L16)

## Methods

### queries

▸ **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/84e5f96e/src/lib/stage/application/useCases/base/actionDML.ts#L34)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/84e5f96e/src/lib/stage/application/useCases/base/actionDML.ts#L25)
