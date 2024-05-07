[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / MapClauses

# Class: MapClauses\<T\>

## Extends

- [`PageClauses`](PageClauses.md)

## Type parameters

• **T**

## Constructors

### new MapClauses()

> **new MapClauses**\<`T`\>(`actions`, `query`): [`MapClauses`](MapClauses.md)\<`T`\>

#### Parameters

• **actions**: [`QueryActions`](../interfaces/QueryActions.md)

• **query**: `string`

#### Returns

[`MapClauses`](MapClauses.md)\<`T`\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`constructor`](PageClauses.md#constructors)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`constraints`](PageClauses.md#constraints)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

***

### execute()

> **execute**(`data`): `Promise`\<`any`\>

#### Parameters

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`execute`](PageClauses.md#execute)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`metadata`](PageClauses.md#metadata)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`model`](PageClauses.md#model)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

***

### normalize()

> **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[`PageClauses`](PageClauses.md).[`normalize`](PageClauses.md#normalize)

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

[`PageClauses`](PageClauses.md).[`page`](PageClauses.md#page)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:18

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`parameters`](PageClauses.md#parameters)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`PageClauses`](PageClauses.md).[`sentence`](PageClauses.md#sentence)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

***

### sort()

> **sort**(`predicate`): [`PageClauses`](PageClauses.md)

#### Parameters

• **predicate**

#### Returns

[`PageClauses`](PageClauses.md)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:22
