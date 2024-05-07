[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ExpressionActions

# Interface: ExpressionActions

## Methods

### constraints()

> **constraints**(`expression`): `Promise`\<[`MetadataConstraint`](MetadataConstraint.md)\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`MetadataConstraint`](MetadataConstraint.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:8

***

### execute()

> **execute**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:4

***

### metadata()

> **metadata**(`expression`): `Promise`\<[`Metadata`](Metadata.md)\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`Metadata`](Metadata.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:9

***

### model()

> **model**(`expression`): `Promise`\<[`MetadataModel`](MetadataModel.md)[]\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`MetadataModel`](MetadataModel.md)[]\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:6

***

### normalize()

> **normalize**(`expression`): `string`

#### Parameters

• **expression**: `string`

#### Returns

`string`

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:5

***

### parameters()

> **parameters**(`expression`): `Promise`\<[`MetadataParameter`](MetadataParameter.md)[]\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`MetadataParameter`](MetadataParameter.md)[]\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:7

***

### plan()

> **plan**(`expression`): `Promise`\<[`QueryPlan`](QueryPlan.md)\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`QueryPlan`](QueryPlan.md)\>

#### Source

node\_modules/lambdaorm-base/repository/domain/actions.d.ts:10
