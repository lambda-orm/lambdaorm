[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / HavingClauses

# Class: HavingClauses\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:28

## Extends

- [`MapClauses`](MapClauses.md)\<`T`\>

## Extended by

- [`FilterIncludeClauses`](FilterIncludeClauses.md)
- [`IncludeClauses`](IncludeClauses.md)
- [`FilterClauses`](FilterClauses.md)
- [`Queryable`](Queryable.md)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new HavingClauses**\<`T`\>(`actions`, `query`): `HavingClauses`\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

#### Parameters

##### actions

[`QueryActions`](../interfaces/QueryActions.md)

##### query

`string`

#### Returns

`HavingClauses`\<`T`\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`constructor`](MapClauses.md#constructor)

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`constraints`](MapClauses.md#constraints)

***

### distinct()

> **distinct**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:36

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

***

### execute()

> **execute**(`data`): `Promise`\<`any`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

#### Parameters

##### data

`any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`execute`](MapClauses.md#execute)

***

### first()

> **first**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:32

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

***

### last()

> **last**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:34

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

***

### map()

> **map**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:30

#### Type Parameters

##### U

`U`

#### Parameters

##### predicate

(`value`, `index`, `array`) => `U`

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`metadata`](MapClauses.md#metadata)

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`model`](MapClauses.md#model)

***

### normalize()

> **normalize**(): `string`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

#### Returns

`string`

#### Inherited from

[`MapClauses`](MapClauses.md).[`normalize`](MapClauses.md#normalize)

***

### page()

> **page**(`page`, `records`): [`QueryAction`](QueryAction.md)

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

#### Parameters

##### page

`number`

##### records

`number`

#### Returns

[`QueryAction`](QueryAction.md)

#### Inherited from

[`MapClauses`](MapClauses.md).[`page`](MapClauses.md#page)

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`parameters`](MapClauses.md#parameters)

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`sentence`](MapClauses.md#sentence)

***

### sort()

> **sort**(`predicate`): [`PageClauses`](PageClauses.md)

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:22

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`PageClauses`](PageClauses.md)

#### Inherited from

[`MapClauses`](MapClauses.md).[`sort`](MapClauses.md#sort)
