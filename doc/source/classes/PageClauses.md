[Lambda ORM](../README.md) / PageClauses

# Class: PageClauses

## Hierarchy

- [`QueryAction`](QueryAction.md)

  ↳ **`PageClauses`**

  ↳↳ [`MapClauses`](MapClauses.md)

## Table of contents

### Constructors

- [constructor](PageClauses.md#constructor)

### Methods

- [constraints](PageClauses.md#constraints)
- [execute](PageClauses.md#execute)
- [metadata](PageClauses.md#metadata)
- [model](PageClauses.md#model)
- [normalize](PageClauses.md#normalize)
- [page](PageClauses.md#page)
- [parameters](PageClauses.md#parameters)
- [sentence](PageClauses.md#sentence)

## Constructors

### constructor

• **new PageClauses**(`actions`, `expression`): [`PageClauses`](PageClauses.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](../interfaces/ExpressionActions.md) |
| `expression` | `string` |

#### Returns

[`PageClauses`](PageClauses.md)

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

### page

▸ **page**(`page`, `records`): [`QueryAction`](QueryAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |
| `records` | `number` |

#### Returns

[`QueryAction`](QueryAction.md)

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

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
