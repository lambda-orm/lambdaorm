[Lambda ORM](../README.md) / StageDelete

# Class: StageDelete

## Hierarchy

- [`StageActionDML`](StageActionDML.md)

  ↳ **`StageDelete`**

## Table of contents

### Constructors

- [constructor](StageDelete.md#constructor)

### Methods

- [execute](StageDelete.md#execute)
- [queries](StageDelete.md#queries)
- [sentence](StageDelete.md#sentence)

## Constructors

### constructor

• **new StageDelete**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageDelete`](StageDelete.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageMappingService` | [`StageMappingService`](StageMappingService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `expressionFacade` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageDelete`](StageDelete.md)

#### Inherited from

[StageActionDML](StageActionDML.md).[constructor](StageActionDML.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### execute

▸ **execute**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/stage/application/useCases/delete.ts:6](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/delete.ts#L6)

___

### queries

▸ **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[StageActionDML](StageActionDML.md).[queries](StageActionDML.md#queries)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDML.ts#L33)

___

### sentence

▸ **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[StageActionDML](StageActionDML.md).[sentence](StageActionDML.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/lambda-orm/lambdaorm/blob/de3ec086/src/lib/stage/application/useCases/base/actionDML.ts#L24)
