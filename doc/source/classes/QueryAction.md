[Lambda ORM](../README.md) / QueryAction

# Class: QueryAction

## Hierarchy

- **`QueryAction`**

  ↳ [`PageClauses`](PageClauses.md)

  ↳ [`Map2Clauses`](Map2Clauses.md)

  ↳ [`FilterAction`](FilterAction.md)

  ↳ [`IncludeAction`](IncludeAction.md)

  ↳ [`ModificableClauses`](ModificableClauses.md)

## Table of contents

### Constructors

- [constructor](QueryAction.md#constructor)

### Methods

- [constraints](QueryAction.md#constraints)
- [execute](QueryAction.md#execute)
- [metadata](QueryAction.md#metadata)
- [model](QueryAction.md#model)
- [normalize](QueryAction.md#normalize)
- [parameters](QueryAction.md#parameters)
- [sentence](QueryAction.md#sentence)

## Constructors

### constructor

• **new QueryAction**(`actions`, `expression`): [`QueryAction`](QueryAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](../interfaces/ExpressionActions.md) |
| `expression` | `string` |

#### Returns

[`QueryAction`](QueryAction.md)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints

▸ **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

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

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

___

### metadata

▸ **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

___

### model

▸ **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

___

### parameters

▸ **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

___

### sentence

▸ **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:13
