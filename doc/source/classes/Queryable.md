[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / Queryable

# Class: Queryable\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:68

## Extends

- [`HavingClauses`](HavingClauses.md)\<`T`\>

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Queryable**\<`T`\>(`actions`, `query`): `Queryable`\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

#### Parameters

##### actions

[`QueryActions`](../interfaces/QueryActions.md)

##### query

`string`

#### Returns

`Queryable`\<`T`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`constructor`](HavingClauses.md#constructor)

## Methods

### bulkDelete()

> **bulkDelete**(`value?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:88

#### Parameters

##### value?

`T`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

***

### bulkInsert()

> **bulkInsert**(`value?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:79

#### Parameters

##### value?

`T`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

***

### bulkMerge()

> **bulkMerge**(`value?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:86

#### Parameters

##### value?

`T`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

***

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`constraints`](HavingClauses.md#constraints)

***

### delete()

> **delete**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:90

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

***

### deleteAll()

> **deleteAll**(): [`IncludeAction`](IncludeAction.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:92

#### Returns

[`IncludeAction`](IncludeAction.md)\<`T`\>

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

### filter()

> **filter**(`predicate`): [`FilterClauses`](FilterClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:70

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`FilterClauses`](FilterClauses.md)\<`T`\>

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

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:74

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`HavingClauses`](HavingClauses.md)\<`T`\>

***

### include()

> **include**(`predicate`): [`IncludeClauses`](IncludeClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:72

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`IncludeClauses`](IncludeClauses.md)\<`T`\>

***

### insert()

> **insert**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:76

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

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

### merge()

> **merge**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:84

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

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

***

### update()

> **update**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:81

#### Parameters

##### predicate?

(`value`, `index`, `array`) => `unknown`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

***

### updateAll()

> **updateAll**(`predicate`): [`IncludeAction`](IncludeAction.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:83

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`IncludeAction`](IncludeAction.md)\<`T`\>

***

### upsert()

> **upsert**(`predicate?`): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:77

#### Parameters

##### predicate?

(`value`) => `unknown`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>
