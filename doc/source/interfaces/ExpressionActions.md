[Lambda ORM](../README.md) / ExpressionActions

# Interface: ExpressionActions

## Implemented by

- [`ExpressionActionsImpl`](../classes/ExpressionActionsImpl.md)

## Table of contents

### Methods

- [constraints](ExpressionActions.md#constraints)
- [execute](ExpressionActions.md#execute)
- [metadata](ExpressionActions.md#metadata)
- [model](ExpressionActions.md#model)
- [normalize](ExpressionActions.md#normalize)
- [parameters](ExpressionActions.md#parameters)
- [plan](ExpressionActions.md#plan)

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`\<[`MetadataConstraint`](MetadataConstraint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataConstraint`](MetadataConstraint.md)\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:8

___

### execute

▸ **execute**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:4

___

### metadata

▸ **metadata**(`expression`): `Promise`\<[`Metadata`](Metadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`Metadata`](Metadata.md)\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:9

___

### model

▸ **model**(`expression`): `Promise`\<[`MetadataModel`](MetadataModel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataModel`](MetadataModel.md)[]\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:6

___

### normalize

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:5

___

### parameters

▸ **parameters**(`expression`): `Promise`\<[`MetadataParameter`](MetadataParameter.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataParameter`](MetadataParameter.md)[]\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:7

___

### plan

▸ **plan**(`expression`): `Promise`\<[`QueryPlan`](QueryPlan.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`QueryPlan`](QueryPlan.md)\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/actions.d.ts:10
