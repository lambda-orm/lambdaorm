[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / QueryActionsImpl

# Class: QueryActionsImpl

Defined in: [src/lib/repository/domain/actions.ts:3](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L3)

## Implements

- [`QueryActions`](../interfaces/QueryActions.md)

## Constructors

### Constructor

> **new QueryActionsImpl**(`name`, `orm`, `stage?`): `QueryActionsImpl`

Defined in: [src/lib/repository/domain/actions.ts:7](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L7)

#### Parameters

##### name

`string`

##### orm

[`IOrm`](../interfaces/IOrm.md)

##### stage?

`string`

#### Returns

`QueryActionsImpl`

## Methods

### constraints()

> **constraints**(`query`): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: [src/lib/repository/domain/actions.ts:29](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L29)

#### Parameters

##### query

`string`

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`constraints`](../interfaces/QueryActions.md#constraints)

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

Defined in: [src/lib/repository/domain/actions.ts:13](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L13)

#### Parameters

##### query

`string`

##### data

`any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`execute`](../interfaces/QueryActions.md#execute)

***

### metadata()

> **metadata**(`query`): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

Defined in: [src/lib/repository/domain/actions.ts:33](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L33)

#### Parameters

##### query

`string`

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`metadata`](../interfaces/QueryActions.md#metadata)

***

### model()

> **model**(`query`): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

Defined in: [src/lib/repository/domain/actions.ts:21](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L21)

#### Parameters

##### query

`string`

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`model`](../interfaces/QueryActions.md#model)

***

### normalize()

> **normalize**(`query`): `string`

Defined in: [src/lib/repository/domain/actions.ts:17](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L17)

#### Parameters

##### query

`string`

#### Returns

`string`

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`normalize`](../interfaces/QueryActions.md#normalize)

***

### parameters()

> **parameters**(`query`): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

Defined in: [src/lib/repository/domain/actions.ts:25](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L25)

#### Parameters

##### query

`string`

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`parameters`](../interfaces/QueryActions.md#parameters)

***

### plan()

> **plan**(`query`): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

Defined in: [src/lib/repository/domain/actions.ts:37](https://github.com/lambda-orm/lambdaorm/blob/d7eed5bd6f40e7e5946b35121d5564379ef251ff/src/lib/repository/domain/actions.ts#L37)

#### Parameters

##### query

`string`

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`plan`](../interfaces/QueryActions.md#plan)
