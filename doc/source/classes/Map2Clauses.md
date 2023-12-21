[Lambda ORM](../README.md) / Map2Clauses

# Class: Map2Clauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QueryAction`](QueryAction.md)

  ↳ **`Map2Clauses`**

## Table of contents

### Constructors

- [constructor](Map2Clauses.md#constructor)

### Methods

- [constraints](Map2Clauses.md#constraints)
- [execute](Map2Clauses.md#execute)
- [metadata](Map2Clauses.md#metadata)
- [model](Map2Clauses.md#model)
- [normalize](Map2Clauses.md#normalize)
- [parameters](Map2Clauses.md#parameters)
- [sentence](Map2Clauses.md#sentence)
- [sort](Map2Clauses.md#sort)

## Constructors

### constructor

• **new Map2Clauses**\<`T`\>(`actions`, `expression`): [`Map2Clauses`](Map2Clauses.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](../interfaces/ExpressionActions.md) |
| `expression` | `string` |

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`T`\>

#### Inherited from

[QueryAction](QueryAction.md).[constructor](QueryAction.md#constructor)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints

▸ **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[constraints](QueryAction.md#constraints)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

___

### execute

▸ **execute**(`data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[QueryAction](QueryAction.md).[execute](QueryAction.md#execute)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

___

### metadata

▸ **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[metadata](QueryAction.md#metadata)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

___

### model

▸ **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[QueryAction](QueryAction.md).[model](QueryAction.md#model)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](QueryAction.md).[normalize](QueryAction.md#normalize)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

___

### parameters

▸ **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[QueryAction](QueryAction.md).[parameters](QueryAction.md#parameters)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

___

### sentence

▸ **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[sentence](QueryAction.md#sentence)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

___

### sort

▸ **sort**(`predicate`): [`PageClauses`](PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`PageClauses`](PageClauses.md)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:26
