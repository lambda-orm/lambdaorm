[Lambda ORM](../README.md) / ModificableClauses

# Class: ModificableClauses<T\>

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

• **new ModificableClauses**<`T`\>(`actions`, `expression`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

[QueryAction](QueryAction.md).[constructor](QueryAction.md#constructor)

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L8)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[constraints](QueryAction.md#constraints)

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L25)

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

[QueryAction](QueryAction.md).[execute](QueryAction.md#execute)

#### Defined in

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L13)

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

[src/lib/repository/domain/queryable.ts:123](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L123)

___

### include

▸ **include**(`predicate`): [`FilterAction`](FilterAction.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |

#### Returns

[`FilterAction`](FilterAction.md)<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:128](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L128)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[metadata](QueryAction.md#metadata)

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[QueryAction](QueryAction.md).[model](QueryAction.md#model)

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](QueryAction.md).[normalize](QueryAction.md#normalize)

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L17)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[QueryAction](QueryAction.md).[parameters](QueryAction.md#parameters)

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Returns

`Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Inherited from

[QueryAction](QueryAction.md).[sentence](QueryAction.md#sentence)

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/0b03cab0/src/lib/repository/domain/queryable.ts#L33)
