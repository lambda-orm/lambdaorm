[Lambda ORM](../README.md) / RelationMapClauses

# Interface: RelationMapClauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [filter](RelationMapClauses.md#filter)
- [include](RelationMapClauses.md#include)
- [sort](RelationMapClauses.md#sort)

## Methods

### filter

▸ **filter**(`predicate`, `thisArg?`): [`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

[`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:289](https://github.com/FlavioLionelRita/lambdaorm/blob/e5a87832/src/lib/repository/domain/queryable.ts#L289)

___

### include

▸ **include**(`predicate`, `thisArg?`): [`IncludeClauses`](../classes/IncludeClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

[`IncludeClauses`](../classes/IncludeClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:291](https://github.com/FlavioLionelRita/lambdaorm/blob/e5a87832/src/lib/repository/domain/queryable.ts#L291)

___

### sort

▸ **sort**(`predicate`, `...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |
| `...args` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/repository/domain/queryable.ts:287](https://github.com/FlavioLionelRita/lambdaorm/blob/e5a87832/src/lib/repository/domain/queryable.ts#L287)
