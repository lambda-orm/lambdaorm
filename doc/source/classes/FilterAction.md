[Lambda ORM](../README.md) / FilterAction

# Class: FilterAction\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QueryAction`](QueryAction.md)

  ↳ **`FilterAction`**

## Table of contents

### Constructors

- [constructor](FilterAction.md#constructor)

### Methods

- [constraints](FilterAction.md#constraints)
- [execute](FilterAction.md#execute)
- [filter](FilterAction.md#filter)
- [metadata](FilterAction.md#metadata)
- [model](FilterAction.md#model)
- [normalize](FilterAction.md#normalize)
- [parameters](FilterAction.md#parameters)
- [sentence](FilterAction.md#sentence)

## Constructors

### constructor

• **new FilterAction**\<`T`\>(`actions`, `expression`): [`FilterAction`](FilterAction.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](ExpressionActions.md) |
| `expression` | `string` |

#### Returns

[`FilterAction`](FilterAction.md)\<`T`\>

#### Inherited from

[QueryAction](QueryAction.md).[constructor](QueryAction.md#constructor)

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L8)

## Methods

### constraints

▸ **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[constraints](QueryAction.md#constraints)

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L25)

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

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L13)

___

### filter

▸ **filter**(`predicate`): [`QueryAction`](QueryAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`QueryAction`](QueryAction.md)

#### Defined in

[src/lib/repository/domain/queryable.ts:111](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L111)

___

### metadata

▸ **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[metadata](QueryAction.md#metadata)

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[QueryAction](QueryAction.md).[model](QueryAction.md#model)

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](QueryAction.md).[normalize](QueryAction.md#normalize)

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L17)

___

### parameters

▸ **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[QueryAction](QueryAction.md).[parameters](QueryAction.md#parameters)

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[sentence](QueryAction.md#sentence)

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/ade761b9/src/lib/repository/domain/queryable.ts#L33)
