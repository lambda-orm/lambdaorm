[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / FilterAction

# Class: FilterAction\<T\>

## Extends

- [`QueryAction`](QueryAction.md)

## Type parameters

• **T**

## Constructors

### new FilterAction()

> **new FilterAction**\<`T`\>(`actions`, `query`): [`FilterAction`](FilterAction.md)\<`T`\>

#### Parameters

• **actions**: [`QueryActions`](../interfaces/QueryActions.md)

• **query**: `string`

#### Returns

[`FilterAction`](FilterAction.md)\<`T`\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`constructor`](QueryAction.md#constructors)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`constraints`](QueryAction.md#constraints)

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

[`QueryAction`](QueryAction.md).[`execute`](QueryAction.md#execute)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:8

***

### filter()

> **filter**(`predicate`): [`QueryAction`](QueryAction.md)

#### Parameters

• **predicate**

#### Returns

[`QueryAction`](QueryAction.md)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:56

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`metadata`](QueryAction.md#metadata)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`model`](QueryAction.md#model)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

***

### normalize()

> **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[`QueryAction`](QueryAction.md).[`normalize`](QueryAction.md#normalize)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`parameters`](QueryAction.md#parameters)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`sentence`](QueryAction.md#sentence)

#### Source

node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13
