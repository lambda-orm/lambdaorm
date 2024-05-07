[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryActions

# Interface: QueryActions

## Methods

### constraints()

> **constraints**(`query`): `Promise`\<[`MetadataConstraint`](MetadataConstraint.md)\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`MetadataConstraint`](MetadataConstraint.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:8

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: `string`

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:4

***

### metadata()

> **metadata**(`query`): `Promise`\<[`Metadata`](Metadata.md)\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`Metadata`](Metadata.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:9

***

### model()

> **model**(`query`): `Promise`\<[`MetadataModel`](MetadataModel.md)[]\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`MetadataModel`](MetadataModel.md)[]\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:6

***

### normalize()

> **normalize**(`query`): `string`

#### Parameters

• **query**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:5

***

### parameters()

> **parameters**(`query`): `Promise`\<[`MetadataParameter`](MetadataParameter.md)[]\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`MetadataParameter`](MetadataParameter.md)[]\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:7

***

### plan()

> **plan**(`query`): `Promise`\<[`QueryPlan`](QueryPlan.md)\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`QueryPlan`](QueryPlan.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:10
