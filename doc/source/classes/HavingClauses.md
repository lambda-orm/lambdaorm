[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / HavingClauses

# Class: HavingClauses\<T\>

## Extends

- [`MapClauses`](MapClauses.md)\<`T`\>

## Type parameters

• **T**

## Constructors

### new HavingClauses()

> **new HavingClauses**\<`T`\>(`actions`, `expression`): [`HavingClauses`](HavingClauses.md)\<`T`\>

#### Parameters

• **actions**: [`ExpressionActions`](../interfaces/ExpressionActions.md)

• **expression**: `string`

#### Returns

[`HavingClauses`](HavingClauses.md)\<`T`\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`constructor`](MapClauses.md#constructors)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`constraints`](MapClauses.md#constraints)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

***

### distinct()

> **distinct**\<`U`\>(`predicate`): [`MapClauses`](MapClauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`MapClauses`](MapClauses.md)\<`U`\>

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

[`MapClauses`](MapClauses.md).[`execute`](MapClauses.md#execute)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

***

### first()

> **first**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:32

***

### last()

> **last**\<`U`\>(`predicate`): [`Map2Clauses`](Map2Clauses.md)\<`U`\>

#### Type parameters

• **U**

#### Parameters

• **predicate**

#### Returns

[`Map2Clauses`](Map2Clauses.md)\<`U`\>

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

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:30

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`metadata`](MapClauses.md#metadata)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`model`](MapClauses.md#model)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

***

### normalize()

> **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[`MapClauses`](MapClauses.md).[`normalize`](MapClauses.md#normalize)

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

[`MapClauses`](MapClauses.md).[`page`](MapClauses.md#page)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`parameters`](MapClauses.md#parameters)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`MapClauses`](MapClauses.md).[`sentence`](MapClauses.md#sentence)

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

[`MapClauses`](MapClauses.md).[`sort`](MapClauses.md#sort)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:22
