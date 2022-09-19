[Lambda ORM](../README.md) / [repository](../modules/repository.md) / Map2Clauses

# Class: Map2Clauses<T\>

[repository](../modules/repository.md).Map2Clauses

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QueryAction`](repository.QueryAction.md)

  ↳ **`Map2Clauses`**

## Table of contents

### Constructors

- [constructor](repository.Map2Clauses.md#constructor)

### Methods

- [constraints](repository.Map2Clauses.md#constraints)
- [execute](repository.Map2Clauses.md#execute)
- [metadata](repository.Map2Clauses.md#metadata)
- [model](repository.Map2Clauses.md#model)
- [normalize](repository.Map2Clauses.md#normalize)
- [parameters](repository.Map2Clauses.md#parameters)
- [sentence](repository.Map2Clauses.md#sentence)
- [sort](repository.Map2Clauses.md#sort)

## Constructors

### constructor

• **new Map2Clauses**<`T`\>(`actions`, `expression`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](repository.ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

[QueryAction](repository.QueryAction.md).[constructor](repository.QueryAction.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L7)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[constraints](repository.QueryAction.md#constraints)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L24)

___

### execute

▸ **execute**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[execute](repository.QueryAction.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[metadata](repository.QueryAction.md#metadata)

#### Defined in

[src/lib/repository/query.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L36)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[model](repository.QueryAction.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L20)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](repository.QueryAction.md).[normalize](repository.QueryAction.md#normalize)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L16)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[parameters](repository.QueryAction.md#parameters)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L28)

___

### sentence

▸ **sentence**(): `Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Returns

`Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[sentence](repository.QueryAction.md#sentence)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L32)

___

### sort

▸ **sort**(`predicate`): [`PageClauses`](repository.PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`PageClauses`](repository.PageClauses.md)

#### Defined in

[src/lib/repository/query.ts:55](https://github.com/FlavioLionelRita/lambdaorm/blob/0fd718a/src/lib/repository/query.ts#L55)
