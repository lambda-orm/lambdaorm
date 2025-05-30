[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / FilterIncludeClauses

# Class: FilterIncludeClauses\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:38

## Extends

- [`HavingClauses`](HavingClauses.md)\<`T`\>

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new FilterIncludeClauses**\<`T`\>(`actions`, `query`): `FilterIncludeClauses`\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

#### Parameters

##### actions

[`QueryActions`](../interfaces/QueryActions.md)

##### query

`string`

#### Returns

`FilterIncludeClauses`\<`T`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`constructor`](HavingClauses.md#constructor)

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`constraints`](HavingClauses.md#constraints)

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

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`distinct`](HavingClauses.md#distinct)

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

[`HavingClauses`](HavingClauses.md).[`execute`](HavingClauses.md#execute)

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

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`first`](HavingClauses.md#first)

***

### having()

> **having**(`predicate`): [`HavingClauses`](HavingClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:40

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`HavingClauses`](HavingClauses.md)\<`T`\>

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

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`last`](HavingClauses.md#last)

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

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`map`](HavingClauses.md#map)

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`metadata`](HavingClauses.md#metadata)

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`model`](HavingClauses.md#model)

***

### normalize()

> **normalize**(): `string`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

#### Returns

`string`

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`normalize`](HavingClauses.md#normalize)

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

[`HavingClauses`](HavingClauses.md).[`page`](HavingClauses.md#page)

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`parameters`](HavingClauses.md#parameters)

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`sentence`](HavingClauses.md#sentence)

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

[`HavingClauses`](HavingClauses.md).[`sort`](HavingClauses.md#sort)
