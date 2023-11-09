[Lambda ORM](../README.md) / StageClean

# Class: StageClean

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StageClean`**

## Table of contents

### Constructors

- [constructor](StageClean.md#constructor)

### Methods

- [execute](StageClean.md#execute)
- [queries](StageClean.md#queries)
- [sentence](StageClean.md#sentence)

## Constructors

### constructor

• **new StageClean**(`executor`, `stateService`, `mappingService`, `schemaFacade`, `languages`, `options`, `helper`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `stateService` | [`StageModelService`](StageModelService.md) |
| `mappingService` | [`StageMappingService`](StageMappingService.md) |
| `schemaFacade` | [`SchemaFacade`](SchemaFacade.md) |
| `languages` | [`LanguagesService`](LanguagesService.md) |
| `options` | [`QueryOptions`](../interfaces/QueryOptions.md) |
| `helper` | [`Helper`](Helper.md) |

#### Overrides

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/clean.ts:11](https://github.com/FlavioLionelRita/lambdaorm/blob/2b71fadd/src/lib/stage/application/useCases/clean.ts#L11)

## Methods

### execute

▸ **execute**(): `Promise`<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

[src/lib/stage/application/useCases/clean.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/2b71fadd/src/lib/stage/application/useCases/clean.ts#L24)

___

### queries

▸ **queries**(): `Promise`<[`Query`](Query.md)[]\>

#### Returns

`Promise`<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

[src/lib/stage/application/useCases/clean.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/2b71fadd/src/lib/stage/application/useCases/clean.ts#L16)

___

### sentence

▸ **sentence**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/FlavioLionelRita/lambdaorm/blob/2b71fadd/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
