[Lambda ORM](../README.md) / StageDrop

# Class: StageDrop

## Hierarchy

- [`StageActionDDL`](StageActionDDL.md)

  ↳ **`StageDrop`**

## Table of contents

### Constructors

- [constructor](StageDrop.md#constructor)

### Methods

- [execute](StageDrop.md#execute)
- [queries](StageDrop.md#queries)
- [sentence](StageDrop.md#sentence)

## Constructors

### constructor

• **new StageDrop**(`executor`, `stateService`, `mappingService`, `schemaFacade`, `languages`, `options`, `helper`): [`StageDrop`](StageDrop.md)

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

#### Returns

[`StageDrop`](StageDrop.md)

#### Overrides

[StageActionDDL](StageActionDDL.md).[constructor](StageActionDDL.md#constructor)

#### Defined in

[src/lib/stage/application/useCases/drop.ts:11](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/drop.ts#L11)

## Methods

### execute

▸ **execute**(): `Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Returns

`Promise`\<[`ExecuteResult`](../interfaces/ExecuteResult.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[execute](StageActionDDL.md#execute)

#### Defined in

[src/lib/stage/application/useCases/drop.ts:24](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/drop.ts#L24)

___

### queries

▸ **queries**(): `Promise`\<[`Query`](Query.md)[]\>

#### Returns

`Promise`\<[`Query`](Query.md)[]\>

#### Overrides

[StageActionDDL](StageActionDDL.md).[queries](StageActionDDL.md#queries)

#### Defined in

[src/lib/stage/application/useCases/drop.ts:16](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/drop.ts#L16)

___

### sentence

▸ **sentence**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[StageActionDDL](StageActionDDL.md).[sentence](StageActionDDL.md#sentence)

#### Defined in

[src/lib/stage/application/useCases/base/actionDDL.ts:19](https://github.com/lambda-orm/lambdaorm/blob/2f28c8f6/src/lib/stage/application/useCases/base/actionDDL.ts#L19)
