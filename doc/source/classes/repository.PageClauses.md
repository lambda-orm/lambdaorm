[Lambda ORM](../README.md) / [repository](../modules/repository.md) / PageClauses

# Class: PageClauses

[repository](../modules/repository.md).PageClauses

## Hierarchy

- [`QueryAction`](repository.QueryAction.md)

  ↳ **`PageClauses`**

  ↳↳ [`MapClauses`](repository.MapClauses.md)

## Table of contents

### Constructors

- [constructor](repository.PageClauses.md#constructor)

### Methods

- [constraints](repository.PageClauses.md#constraints)
- [execute](repository.PageClauses.md#execute)
- [metadata](repository.PageClauses.md#metadata)
- [model](repository.PageClauses.md#model)
- [normalize](repository.PageClauses.md#normalize)
- [page](repository.PageClauses.md#page)
- [parameters](repository.PageClauses.md#parameters)
- [sentence](repository.PageClauses.md#sentence)

## Constructors

### constructor

• **new PageClauses**(`actions`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](repository.ExpressionActions.md) |
| `expression` | `string` |

#### Inherited from

[QueryAction](repository.QueryAction.md).[constructor](repository.QueryAction.md#constructor)

#### Defined in

[src/lib/repository/query.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L7)

## Methods

### constraints

▸ **constraints**(): `Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[constraints](repository.QueryAction.md#constraints)

#### Defined in

[src/lib/repository/query.ts:24](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L24)

___

### execute

▸ **execute**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[execute](repository.QueryAction.md#execute)

#### Defined in

[src/lib/repository/query.ts:12](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L12)

___

### metadata

▸ **metadata**(): `Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Returns

`Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[metadata](repository.QueryAction.md#metadata)

#### Defined in

[src/lib/repository/query.ts:36](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L36)

___

### model

▸ **model**(): `Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Returns

`Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[model](repository.QueryAction.md#model)

#### Defined in

[src/lib/repository/query.ts:20](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L20)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Inherited from

[QueryAction](repository.QueryAction.md).[normalize](repository.QueryAction.md#normalize)

#### Defined in

[src/lib/repository/query.ts:16](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L16)

___

### page

▸ **page**(`page`, `records`): [`QueryAction`](repository.QueryAction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |
| `records` | `number` |

#### Returns

[`QueryAction`](repository.QueryAction.md)

#### Defined in

[src/lib/repository/query.ts:43](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L43)

___

### parameters

▸ **parameters**(): `Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[parameters](repository.QueryAction.md#parameters)

#### Defined in

[src/lib/repository/query.ts:28](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L28)

___

### sentence

▸ **sentence**(): `Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Returns

`Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Inherited from

[QueryAction](repository.QueryAction.md).[sentence](repository.QueryAction.md#sentence)

#### Defined in

[src/lib/repository/query.ts:32](https://github.com/FlavioLionelRita/lambdaorm/blob/baac5cd/src/lib/repository/query.ts#L32)
