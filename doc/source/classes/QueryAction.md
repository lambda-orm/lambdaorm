[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / QueryAction

# Class: QueryAction

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:4

## Extended by

- [`PageClauses`](PageClauses.md)
- [`Map2Clauses`](Map2Clauses.md)
- [`FilterAction`](FilterAction.md)
- [`IncludeAction`](IncludeAction.md)
- [`ModificableClauses`](ModificableClauses.md)

## Constructors

### Constructor

> **new QueryAction**(`actions`, `query`): `QueryAction`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

#### Parameters

##### actions

[`QueryActions`](../interfaces/QueryActions.md)

##### query

`string`

#### Returns

`QueryAction`

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

***

### execute()

> **execute**(`data`): `Promise`\<`any`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

#### Parameters

##### data

`any`

#### Returns

`Promise`\<`any`\>

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

***

### normalize()

> **normalize**(): `string`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

#### Returns

`string`

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>
