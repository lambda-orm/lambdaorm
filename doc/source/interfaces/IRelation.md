[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / IRelation

# Interface: IRelation\<T\>

## Type parameters

• **T**

## Methods

### distinct()

> **distinct**\<`U`\>(`predicate`, `thisArg`?): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:138

***

### filter()

> **filter**(`predicate`, `thisArg`?): [`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:147

***

### first()

> **first**\<`U`\>(`predicate`, `thisArg`?): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:134

***

### include()

> **include**(`predicate`, `thisArg`?): [`RelationIncludeClauses`](RelationIncludeClauses.md)\<`T`\>

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`RelationIncludeClauses`](RelationIncludeClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:140

***

### insert()

> **insert**(`predicate`?): `void`

#### Parameters

• **predicate?**

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:144

***

### last()

> **last**\<`U`\>(`predicate`, `thisArg`?): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:136

***

### map()

> **map**\<`U`\>(`predicate`, `thisArg`?): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

• **thisArg?**: `any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:132

***

### update()

> **update**(`predicate`?): `void`

#### Parameters

• **predicate?**

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:142

***

### upsert()

> **upsert**(`predicate`?): `void`

#### Parameters

• **predicate?**

#### Returns

`void`

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:146
