[Lambda ORM](../README.md) / RelationIncludeClauses

# Interface: RelationIncludeClauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [distinct](RelationIncludeClauses.md#distinct)
- [first](RelationIncludeClauses.md#first)
- [last](RelationIncludeClauses.md#last)
- [map](RelationIncludeClauses.md#map)

## Methods

### distinct

▸ **distinct**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |
| `thisArg?` | `any` |

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:301](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L301)

___

### first

▸ **first**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |
| `thisArg?` | `any` |

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:297](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L297)

___

### last

▸ **last**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |
| `thisArg?` | `any` |

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:299](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L299)

___

### map

▸ **map**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `U` |
| `thisArg?` | `any` |

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:295](https://github.com/FlavioLionelRita/lambdaorm/blob/95087682/src/lib/repository/domain/queryable.ts#L295)
