[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / Queryable

# Class: Queryable\<T\>

## Extends

- [`HavingClauses`](HavingClauses.md)\<`T`\>

## Type parameters

• **T**

## Constructors

### new Queryable()

> **new Queryable**\<`T`\>(`actions`, `expression`): [`Queryable`](Queryable.md)\<`T`\>

#### Parameters

• **actions**: [`ExpressionActions`](../interfaces/ExpressionActions.md)

• **expression**: `string`

#### Returns

[`Queryable`](Queryable.md)\<`T`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`constructor`](HavingClauses.md#constructors)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### bulkDelete()

> **bulkDelete**(`value`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **value?**: `T`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:88

***

### bulkInsert()

> **bulkInsert**(`value`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **value?**: `T`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:79

***

### bulkMerge()

> **bulkMerge**(`value`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **value?**: `T`

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:86

***

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`constraints`](HavingClauses.md#constraints)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

***

### delete()

> **delete**(`predicate`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **predicate?**

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:90

***

### deleteAll()

> **deleteAll**(): [`IncludeAction`](IncludeAction.md)\<`T`\>

#### Returns

[`IncludeAction`](IncludeAction.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:92

***

### distinct()

> **distinct**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`distinct`](HavingClauses.md#distinct)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:36

***

### execute()

> **execute**(`data`): `Promise`\<`any`\>

#### Parameters

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`execute`](HavingClauses.md#execute)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

***

### filter()

> **filter**(`predicate`): [`FilterClauses`](FilterClauses.md)\<`T`\>

#### Parameters

• **predicate**

#### Returns

[`FilterClauses`](FilterClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:70

***

### first()

> **first**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`first`](HavingClauses.md#first)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:32

***

### having()

> **having**(`predicate`): [`HavingClauses`](HavingClauses.md)\<`T`\>

#### Parameters

• **predicate**

#### Returns

[`HavingClauses`](HavingClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:74

***

### include()

> **include**(`predicate`): [`IncludeClauses`](IncludeClauses.md)\<`T`\>

#### Parameters

• **predicate**

#### Returns

[`IncludeClauses`](IncludeClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:72

***

### insert()

> **insert**(`predicate`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **predicate?**

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:76

***

### last()

> **last**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`last`](HavingClauses.md#last)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:34

***

### map()

> **map**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`map`](HavingClauses.md#map)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:30

***

### merge()

> **merge**(`predicate`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **predicate?**

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:84

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`metadata`](HavingClauses.md#metadata)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`model`](HavingClauses.md#model)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

***

### normalize()

> **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`normalize`](HavingClauses.md#normalize)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

***

### page()

> **page**(`page`, `records`): [`QueryAction`](QueryAction.md)

#### Parameters

• **page**: `number`

• **records**: `number`

#### Returns

[`QueryAction`](QueryAction.md)

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`page`](HavingClauses.md#page)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`parameters`](HavingClauses.md#parameters)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`sentence`](HavingClauses.md#sentence)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

***

### sort()

> **sort**(`predicate`): [`PageClauses`](PageClauses.md)

#### Parameters

• **predicate**

#### Returns

[`PageClauses`](PageClauses.md)

#### Inherited from

[`HavingClauses`](HavingClauses.md).[`sort`](HavingClauses.md#sort)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:22

***

### update()

> **update**(`predicate`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **predicate?**

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:81

***

### updateAll()

> **updateAll**(`predicate`): [`IncludeAction`](IncludeAction.md)\<`T`\>

#### Parameters

• **predicate**

#### Returns

[`IncludeAction`](IncludeAction.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:83

***

### upsert()

> **upsert**(`predicate`?): [`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Parameters

• **predicate?**

#### Returns

[`ModificableClauses`](ModificableClauses.md)\<`T`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:77
