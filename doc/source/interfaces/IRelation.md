[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / IRelation

# Interface: IRelation\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:130

## Type Parameters

### T

`T`

## Methods

### distinct()

> **distinct**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:138

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

##### thisArg?

`any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

***

### filter()

> **filter**(`predicate`, `thisArg?`): [`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:147

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

##### thisArg?

`any`

#### Returns

[`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

***

### first()

> **first**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:134

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

##### thisArg?

`any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

***

### include()

> **include**(`predicate`, `thisArg?`): [`RelationIncludeClauses`](RelationIncludeClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:140

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

##### thisArg?

`any`

#### Returns

[`RelationIncludeClauses`](RelationIncludeClauses.md)\<`T`\>

***

### insert()

> **insert**(`predicate?`): `void`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:144

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

`void`

***

### last()

> **last**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:136

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

##### thisArg?

`any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

***

### map()

> **map**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:132

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

##### thisArg?

`any`

#### Returns

[`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

***

### update()

> **update**(`predicate?`): `void`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:142

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

`void`

***

### upsert()

> **upsert**(`predicate?`): `void`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:146

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

`void`
