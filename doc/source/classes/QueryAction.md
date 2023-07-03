[Lambda ORM](../README.md) / QueryAction

# Class: QueryAction

## Table of contents

### Constructors

- [constructor](QueryAction.md#constructor)

### Methods

- [constraints](QueryAction.md#constraints)
- [execute](QueryAction.md#execute)
- [metadata](QueryAction.md#metadata)
- [model](QueryAction.md#model)
- [normalize](QueryAction.md#normalize)
- [parameters](QueryAction.md#parameters)
- [sentence](QueryAction.md#sentence)

## Constructors

### constructor

• **new QueryAction**(`actions`, `expression`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | [`ExpressionActions`](ExpressionActions.md) |
| `expression` | `string` |

#### Defined in

[src/lib/repository/domain/queryable.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L8)

## Methods

### constraints

▸ **constraints**(): `Promise`<`MetadataConstraint`\>

#### Returns

`Promise`<`MetadataConstraint`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L25)

___

### execute

▸ **execute**(`data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L13)

___

### metadata

▸ **metadata**(): `Promise`<`Metadata`\>

#### Returns

`Promise`<`Metadata`\>

#### Defined in

[src/lib/repository/domain/queryable.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L37)

___

### model

▸ **model**(): `Promise`<`MetadataModel`[]\>

#### Returns

`Promise`<`MetadataModel`[]\>

#### Defined in

[src/lib/repository/domain/queryable.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L21)

___

### normalize

▸ **normalize**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/repository/domain/queryable.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L17)

___

### parameters

▸ **parameters**(): `Promise`<`MetadataParameter`[]\>

#### Returns

`Promise`<`MetadataParameter`[]\>

#### Defined in

[src/lib/repository/domain/queryable.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L29)

___

### sentence

▸ **sentence**(): `Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Returns

`Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Defined in

[src/lib/repository/domain/queryable.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/queryable.ts#L33)
