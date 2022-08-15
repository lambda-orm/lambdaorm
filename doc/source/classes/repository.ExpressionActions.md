[Lambda ORM](../README.md) / [repository](../modules/repository.md) / ExpressionActions

# Class: ExpressionActions

[repository](../modules/repository.md).ExpressionActions

## Table of contents

### Constructors

- [constructor](repository.ExpressionActions.md#constructor)

### Methods

- [constraints](repository.ExpressionActions.md#constraints)
- [execute](repository.ExpressionActions.md#execute)
- [metadata](repository.ExpressionActions.md#metadata)
- [model](repository.ExpressionActions.md#model)
- [normalize](repository.ExpressionActions.md#normalize)
- [parameters](repository.ExpressionActions.md#parameters)
- [sentence](repository.ExpressionActions.md#sentence)

## Constructors

### constructor

• **new ExpressionActions**(`name`, `orm`, `stage?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `orm` | [`IOrm`](../interfaces/model.IOrm.md) |
| `stage?` | `string` |

#### Defined in

[src/lib/repository/expressionActions.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L7)

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<[`MetadataConstraint`](../interfaces/model.MetadataConstraint.md)\>

#### Defined in

[src/lib/repository/expressionActions.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L29)

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

[src/lib/repository/expressionActions.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L13)

___

### metadata

▸ **metadata**(`expression`): `Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<[`Metadata`](../interfaces/model.Metadata.md)\>

#### Defined in

[src/lib/repository/expressionActions.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L33)

___

### model

▸ **model**(`expression`): `Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<[`MetadataModel`](../interfaces/model.MetadataModel.md)[]\>

#### Defined in

[src/lib/repository/expressionActions.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L21)

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

[src/lib/repository/expressionActions.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L17)

___

### parameters

▸ **parameters**(`expression`): `Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<[`MetadataParameter`](../interfaces/model.MetadataParameter.md)[]\>

#### Defined in

[src/lib/repository/expressionActions.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L25)

___

### sentence

▸ **sentence**(`expression`): `Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`<[`MetadataSentence`](../interfaces/model.MetadataSentence.md)\>

#### Defined in

[src/lib/repository/expressionActions.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/7350fa3/src/lib/repository/expressionActions.ts#L37)
