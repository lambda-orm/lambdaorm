[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / MapClauses

# Class: MapClauses\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:20

## Extends

- [`PageClauses`](PageClauses.md)

## Extended by

- [`HavingClauses`](HavingClauses.md)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new MapClauses**\<`T`\>(`actions`, `query`): `MapClauses`\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

#### Parameters

##### actions

[`QueryActions`](../interfaces/QueryActions.md)

##### query

`string`

#### Returns

`MapClauses`\<`T`\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`constructor`](PageClauses.md#constructor)

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`constraints`](PageClauses.md#constraints)

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

[`PageClauses`](PageClauses.md).[`execute`](PageClauses.md#execute)

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`metadata`](PageClauses.md#metadata)

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`model`](PageClauses.md#model)

***

### normalize()

> **normalize**(): `string`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

#### Returns

`string`

#### Inherited from

[`PageClauses`](PageClauses.md).[`normalize`](PageClauses.md#normalize)

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

[`PageClauses`](PageClauses.md).[`page`](PageClauses.md#page)

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`parameters`](PageClauses.md#parameters)

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`sentence`](PageClauses.md#sentence)

***

### sort()

> **sort**(`predicate`): [`PageClauses`](PageClauses.md)

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:22

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`PageClauses`](PageClauses.md)
