[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / RelationMapClauses

# Interface: RelationMapClauses\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:112

## Type Parameters

### T

`T`

## Methods

### filter()

> **filter**(`predicate`, `thisArg?`): [`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:116

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

##### thisArg?

`any`

#### Returns

[`FilterClauses`](../classes/FilterClauses.md)\<`T`\>

***

### include()

> **include**(`predicate`, `thisArg?`): [`IncludeClauses`](../classes/IncludeClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:118

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

##### thisArg?

`any`

#### Returns

[`IncludeClauses`](../classes/IncludeClauses.md)\<`T`\>

***

### sort()

> **sort**(`predicate`, ...`args`): `void`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:114

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

##### args

...`any`

#### Returns

`void`
