[Lambda ORM](../README.md) / ExpressionActions

# Class: ExpressionActions

## Table of contents

### Constructors

- [constructor](ExpressionActions.md#constructor)

### Methods

- [constraints](ExpressionActions.md#constraints)
- [execute](ExpressionActions.md#execute)
- [getInfo](ExpressionActions.md#getinfo)
- [metadata](ExpressionActions.md#metadata)
- [model](ExpressionActions.md#model)
- [normalize](ExpressionActions.md#normalize)
- [parameters](ExpressionActions.md#parameters)

## Constructors

### constructor

• **new ExpressionActions**(`name`, `orm`, `stage?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `orm` | [`IOrm`](../interfaces/IOrm.md) |
| `stage?` | `string` |

#### Defined in

[src/lib/repository/domain/actions.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L8)

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`<`MetadataConstraint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`MetadataConstraint`\>

#### Defined in

[src/lib/repository/domain/actions.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L30)

___

### execute

▸ **execute**(`expression`, `data`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/repository/domain/actions.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L14)

___

### getInfo

▸ **getInfo**(`expression`): `Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Defined in

[src/lib/repository/domain/actions.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L38)

___

### metadata

▸ **metadata**(`expression`): `Promise`<`Metadata`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`Metadata`\>

#### Defined in

[src/lib/repository/domain/actions.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L34)

___

### model

▸ **model**(`expression`): `Promise`<`MetadataModel`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`MetadataModel`[]\>

#### Defined in

[src/lib/repository/domain/actions.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L22)

___

### normalize

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/repository/domain/actions.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L18)

___

### parameters

▸ **parameters**(`expression`): `Promise`<`MetadataParameter`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<`MetadataParameter`[]\>

#### Defined in

[src/lib/repository/domain/actions.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/6e8b2fff/src/lib/repository/domain/actions.ts#L26)
