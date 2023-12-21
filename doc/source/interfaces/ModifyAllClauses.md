[Lambda ORM](../README.md) / ModifyAllClauses

# Interface: ModifyAllClauses\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [include](ModifyAllClauses.md#include)

## Methods

### include

▸ **include**(`predicate`, `thisArg?`): [`ModifyIncludeClauses`](ModifyIncludeClauses.md)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `unknown` |
| `thisArg?` | `any` |

#### Returns

[`ModifyIncludeClauses`](ModifyIncludeClauses.md)\<`T`\>

#### Defined in

node_modules/lambdaorm-base/repository/domain/queryable.d.ts:104
