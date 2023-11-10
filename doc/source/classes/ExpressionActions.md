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

• **new ExpressionActions**(`name`, `orm`, `stage?`): [`ExpressionActions`](ExpressionActions.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `orm` | [`IOrm`](../interfaces/IOrm.md) |
| `stage?` | `string` |

#### Returns

[`ExpressionActions`](ExpressionActions.md)

#### Defined in

[src/lib/repository/domain/actions.ts:8](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L8)

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Defined in

[src/lib/repository/domain/actions.ts:30](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L30)

___

### execute

▸ **execute**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/repository/domain/actions.ts:14](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L14)

___

### getInfo

▸ **getInfo**(`expression`): `Promise`\<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`QueryInfo`](../interfaces/QueryInfo.md)\>

#### Defined in

[src/lib/repository/domain/actions.ts:38](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L38)

___

### metadata

▸ **metadata**(`expression`): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Defined in

[src/lib/repository/domain/actions.ts:34](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L34)

___

### model

▸ **model**(`expression`): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Defined in

[src/lib/repository/domain/actions.ts:22](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L22)

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

[src/lib/repository/domain/actions.ts:18](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L18)

___

### parameters

▸ **parameters**(`expression`): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Defined in

[src/lib/repository/domain/actions.ts:26](https://github.com/FlavioLionelRita/lambdaorm/blob/f496198b/src/lib/repository/domain/actions.ts#L26)
