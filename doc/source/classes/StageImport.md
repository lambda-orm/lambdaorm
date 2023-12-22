[Lambda ORM](../README.md) / StageImport

# Class: StageImport

## Hierarchy

- [`StageActionDML`](StageActionDML.md)

  ↳ **`StageImport`**

## Table of contents

### Constructors

- [constructor](StageImport.md#constructor)

### Methods

- [execute](StageImport.md#execute)
- [queries](StageImport.md#queries)
- [sentence](StageImport.md#sentence)

## Constructors

### constructor

• **new StageImport**(`stageMappingService`, `domain`, `expressionFacade`, `executor`, `options`): [`StageImport`](StageImport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stageMappingService` | [`StageMappingService`](StageMappingService.md) |
| `domain` | [`DomainConfigService`](DomainConfigService.md) |
| `expressionFacade` | [`ExpressionFacade`](ExpressionFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |

#### Returns

[`StageImport`](StageImport.md)

#### Inherited from

[StageActionDML](StageActionDML.md).[constructor](StageActionDML.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:15](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/stage/application/useCases/base/actionDML.ts#L15)

## Methods

### execute

▸ **execute**(`data`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SchemaConfig`](../interfaces/SchemaConfig.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/stage/application/useCases/import.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/stage/application/useCases/import.ts#L7)

___

### queries

▸ **queries**(): [`Query`](Query.md)[]

#### Returns

[`Query`](Query.md)[]

#### Inherited from

[StageActionDML](StageActionDML.md).[queries](StageActionDML.md#queries)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/stage/application/useCases/base/actionDML.ts#L33)

___

### sentence

▸ **sentence**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

[StageActionDML](StageActionDML.md).[sentence](StageActionDML.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDML.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/b5326020/src/lib/stage/application/useCases/base/actionDML.ts#L24)
