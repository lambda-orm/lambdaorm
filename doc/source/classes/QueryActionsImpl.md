[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / QueryActionsImpl

# Class: QueryActionsImpl

## Implements

- [`QueryActions`](../interfaces/QueryActions.md)

## Constructors

### new QueryActionsImpl()

> **new QueryActionsImpl**(`name`, `orm`, `stage`?): [`QueryActionsImpl`](QueryActionsImpl.md)

#### Parameters

• **name**: `string`

• **orm**: [`IOrm`](../interfaces/IOrm.md)

• **stage?**: `string`

#### Returns

[`QueryActionsImpl`](QueryActionsImpl.md)

#### Source

[src/lib/repository/domain/actions.ts:7](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L7)

## Methods

### constraints()

> **constraints**(`query`): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`constraints`](../interfaces/QueryActions.md#constraints)

#### Source

[src/lib/repository/domain/actions.ts:29](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L29)

***

### execute()

> **execute**(`query`, `data`): `Promise`\<`any`\>

#### Parameters

• **query**: `string`

• **data**: `any`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`execute`](../interfaces/QueryActions.md#execute)

#### Source

[src/lib/repository/domain/actions.ts:13](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L13)

***

### metadata()

> **metadata**(`query`): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`metadata`](../interfaces/QueryActions.md#metadata)

#### Source

[src/lib/repository/domain/actions.ts:33](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L33)

***

### model()

> **model**(`query`): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`model`](../interfaces/QueryActions.md#model)

#### Source

[src/lib/repository/domain/actions.ts:21](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L21)

***

### normalize()

> **normalize**(`query`): `string`

#### Parameters

• **query**: `string`

#### Returns

`string`

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`normalize`](../interfaces/QueryActions.md#normalize)

#### Source

[src/lib/repository/domain/actions.ts:17](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L17)

***

### parameters()

> **parameters**(`query`): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`parameters`](../interfaces/QueryActions.md#parameters)

#### Source

[src/lib/repository/domain/actions.ts:25](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L25)

***

### plan()

> **plan**(`query`): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Parameters

• **query**: `string`

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Implementation of

[`QueryActions`](../interfaces/QueryActions.md).[`plan`](../interfaces/QueryActions.md#plan)

#### Source

[src/lib/repository/domain/actions.ts:37](https://github.com/lambda-orm/lambdaorm/blob/1ee61a49337aee336b72a3ede70316cdada260eb/src/lib/repository/domain/actions.ts#L37)
