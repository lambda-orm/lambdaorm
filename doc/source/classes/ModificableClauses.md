[Lambda ORM](../README.md) / ModificableClauses

# Class: ModificableClauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QueryAction`](QueryAction.md)

  ↳ **`ModificableClauses`**

## Table of contents

### Constructors

- [constructor](ModificableClauses.md#constructor)

### Methods

- [constraints](ModificableClauses.md#constraints)
- [execute](ModificableClauses.md#execute)
- [filter](ModificableClauses.md#filter)
- [include](ModificableClauses.md#include)
- [metadata](ModificableClauses.md#metadata)
- [model](ModificableClauses.md#model)
- [normalize](ModificableClauses.md#normalize)
- [parameters](ModificableClauses.md#parameters)
- [sentence](ModificableClauses.md#sentence)

## Constructors

### constructor

• **new ModificableClauses**\<`T`\>(`actions`, `expression`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

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

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

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

### filter

▸ **filter**(`predicate`): [`FilterClauses`](FilterClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`FilterClauses`](FilterClauses.md)\<`T`\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:64

___

### include

▸ **include**(`predicate`): [`FilterAction`](FilterAction.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`FilterAction`](FilterAction.md)\<`T`\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:66

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
