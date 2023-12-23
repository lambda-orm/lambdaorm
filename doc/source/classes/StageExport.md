[Lambda ORM](../README.md) / StageExport

# Class: StageExport

## Hierarchy

- [`StageActionDML`](StageActionDML.md)

  ↳ **`StageExport`**

## Table of contents

### Constructors

- [constructor](StageExport.md#constructor)

### Methods

- [execute](StageExport.md#execute)
- [queries](StageExport.md#queries)
- [sentence](StageExport.md#sentence)

## Constructors

### constructor

• **new StageExport**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageExport`](StageExport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageMappingService` | [`StageMappingService`](StageMappingService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `expressionFacade` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageExport`](StageExport.md)

#### Inherited from

[StageActionDML](StageActionDML.md).[constructor](StageActionDML.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/a7df49bc/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### execute

▸ **execute**(): `Promise`\<[`SchemaConfig`](../interfaces/SchemaConfig.md)\>

#### Returns

`Promise`\<[`SchemaConfig`](../interfaces/SchemaConfig.md)\>

#### Defined in

[src/lib/stage/application/useCases/export.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/a7df49bc/src/lib/stage/application/useCases/export.ts#L6)

___

### queries

▸ **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[StageActionDML](StageActionDML.md).[queries](StageActionDML.md#queries)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/a7df49bc/src/lib/stage/application/useCases/base/actionDML.ts#L33)

___

### sentence

▸ **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[StageActionDML](StageActionDML.md).[sentence](StageActionDML.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/a7df49bc/src/lib/stage/application/useCases/base/actionDML.ts#L24)
