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

• **new StageDelete**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageMappingService` | [`StageMappingService`](StageMappingService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `expressionFacade` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Inherited from

[StageActionDML](StageActionDML.md).[constructor](StageActionDML.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/stage/application/useCases/base/actionDML.ts#L16)

## Methods

### execute

▸ **execute**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/stage/application/useCases/delete.ts:6](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/stage/application/useCases/delete.ts#L6)

___

### queries

▸ **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[StageActionDML](StageActionDML.md).[queries](StageActionDML.md#queries)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/stage/application/useCases/base/actionDML.ts#L34)

___

### sentence

▸ **sentence**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Inherited from

[StageActionDML](StageActionDML.md).[sentence](StageActionDML.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/e52e7e4d/src/lib/stage/application/useCases/base/actionDML.ts#L25)
