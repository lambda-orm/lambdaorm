[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / FilterAction

# Class: FilterAction\<T\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:54

## Extends

- [`QueryAction`](QueryAction.md)

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new FilterAction**\<`T`\>(`actions`, `query`): `FilterAction`\<`T`\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:7

#### Parameters

##### actions

[`QueryActions`](../interfaces/QueryActions.md)

##### query

`string`

#### Returns

`FilterAction`\<`T`\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`constructor`](QueryAction.md#constructor)

## Methods

### constraints()

> **constraints**(): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:11

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`constraints`](QueryAction.md#constraints)

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

[`QueryAction`](QueryAction.md).[`execute`](QueryAction.md#execute)

***

### filter()

> **filter**(`predicate`): [`QueryAction`](QueryAction.md)

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:56

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

#### Returns

[`QueryAction`](QueryAction.md)

***

### metadata()

> **metadata**(): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:14

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`metadata`](QueryAction.md#metadata)

***

### model()

> **model**(): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:10

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`model`](QueryAction.md#model)

***

### normalize()

> **normalize**(): `string`

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:9

#### Returns

`string`

#### Inherited from

[`QueryAction`](QueryAction.md).[`normalize`](QueryAction.md#normalize)

***

### parameters()

> **parameters**(): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:12

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`parameters`](QueryAction.md#parameters)

***

### sentence()

> **sentence**(): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

Defined in: node\_modules/lambdaorm-base/repository/domain/queryable.d.ts:13

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Inherited from

[`QueryAction`](QueryAction.md).[`sentence`](QueryAction.md#sentence)
