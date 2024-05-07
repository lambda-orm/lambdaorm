[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / RelationMapClauses

# Interface: RelationMapClauses\<T\>

## Type parameters

• **T**

## Methods

### filter()

> **filter**(`predicate`, `thisArg`?): [`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:116

***

### include()

> **include**(`predicate`, `thisArg`?): [`IncludeClauses`](../classes/IncludeClauses.md)\<`T`\>

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`IncludeClauses`](../classes/IncludeClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:118

***

### sort()

> **sort**(`predicate`, ...`args`): `void`

#### Parameters

• **predicate**

• ...**args**: `any`

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:114
