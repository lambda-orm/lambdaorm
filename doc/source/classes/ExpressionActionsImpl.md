[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ExpressionActionsImpl

# Class: ExpressionActionsImpl

## Implements

- [`ExpressionActions`](../interfaces/ExpressionActions.md)

## Constructors

### new ExpressionActionsImpl()

> **new ExpressionActionsImpl**(`name`, `orm`, `stage`?): [`ExpressionActionsImpl`](ExpressionActionsImpl.md)

#### Parameters

• **name**: `string`

• **orm**: [`IOrm`](../interfaces/IOrm.md)

• **stage?**: `string`

#### Returns

[`ExpressionActionsImpl`](ExpressionActionsImpl.md)

#### Source

[src/lib/repository/domain/actions.ts:7](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L7)

## Methods

### constraints()

> **constraints**(`expression`): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`constraints`](../interfaces/ExpressionActions.md#constraints)

#### Source

[src/lib/repository/domain/actions.ts:29](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L29)

***

### execute()

> **execute**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`execute`](../interfaces/ExpressionActions.md#execute)

#### Source

[src/lib/repository/domain/actions.ts:13](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L13)

***

### metadata()

> **metadata**(`expression`): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`metadata`](../interfaces/ExpressionActions.md#metadata)

#### Source

[src/lib/repository/domain/actions.ts:33](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L33)

***

### model()

> **model**(`expression`): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`model`](../interfaces/ExpressionActions.md#model)

#### Source

[src/lib/repository/domain/actions.ts:21](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L21)

***

### normalize()

> **normalize**(`expression`): `string`

#### Parameters

• **expression**: `string`

#### Returns

`string`

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`normalize`](../interfaces/ExpressionActions.md#normalize)

#### Source

[src/lib/repository/domain/actions.ts:17](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L17)

***

### parameters()

> **parameters**(`expression`): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`parameters`](../interfaces/ExpressionActions.md#parameters)

#### Source

[src/lib/repository/domain/actions.ts:25](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L25)

***

### plan()

> **plan**(`expression`): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Parameters

• **expression**: `string`

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Implementation of

[`ExpressionActions`](../interfaces/ExpressionActions.md).[`plan`](../interfaces/ExpressionActions.md#plan)

#### Source

[src/lib/repository/domain/actions.ts:37](https://github.com/lambda-orm/lambdaorm/blob/5e6305f9bd553e15fed66cee099164eb31ee9842/src/lib/repository/domain/actions.ts#L37)
