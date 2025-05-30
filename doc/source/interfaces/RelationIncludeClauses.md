[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / RelationIncludeClauses

# Interface: RelationIncludeClauses\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:120

## Type Parameters

### T

`T`

## Methods

### distinct()

> **distinct**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:128

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

### first()

> **first**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:124

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

### last()

> **last**\<`U`\>(`predicate`, `thisArg?`): [`RelationMapClauses`](RelationMapClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:126

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

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:122

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
