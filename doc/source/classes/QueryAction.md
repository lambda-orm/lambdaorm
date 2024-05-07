[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryAction

# Class: QueryAction

## Extended by

- [`PageClauses`](PageClauses.md)
- [`Map2Clauses`](Map2Clauses.md)
- [`FilterAction`](FilterAction.md)
- [`IncludeAction`](IncludeAction.md)
- [`ModificableClauses`](ModificableClauses.md)

## Constructors

### new QueryAction()

> **new QueryAction**(`actions`, `expression`): [`QueryAction`](QueryAction.md)

#### Parameters

• **actions**: [`ExpressionActions`](../interfaces/ExpressionActions.md)

• **expression**: `string`

#### Returns

[`QueryAction`](QueryAction.md)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

***

### execute()

> **execute**(`data`): `Promise`\<`any`\>

#### Parameters

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

***

### normalize()

> **normalize**(): `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13
