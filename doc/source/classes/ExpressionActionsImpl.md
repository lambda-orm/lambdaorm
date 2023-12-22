[Lambda ORM](../README.md) / ExpressionActionsImpl

# Class: ExpressionActionsImpl

## Implements

- [`ExpressionActions`](../interfaces/ExpressionActions.md)

## Table of contents

### Constructors

- [constructor](ExpressionActionsImpl.md#constructor)

### Methods

- [constraints](ExpressionActionsImpl.md#constraints)
- [execute](ExpressionActionsImpl.md#execute)
- [metadata](ExpressionActionsImpl.md#metadata)
- [model](ExpressionActionsImpl.md#model)
- [normalize](ExpressionActionsImpl.md#normalize)
- [parameters](ExpressionActionsImpl.md#parameters)
- [plan](ExpressionActionsImpl.md#plan)

## Constructors

### constructor

• **new ExpressionActionsImpl**(`name`, `orm`, `stage?`): [`ExpressionActionsImpl`](ExpressionActionsImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `orm` | [`IOrm`](../interfaces/IOrm.md) |
| `stage?` | `string` |

#### Returns

[`ExpressionActionsImpl`](ExpressionActionsImpl.md)

#### Defined in

[src/lib/repository/domain/actions.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L7)

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataConstraint`](../interfaces/MetadataConstraint.md)\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[constraints](../interfaces/ExpressionActions.md#constraints)

#### Defined in

[src/lib/repository/domain/actions.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L29)

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

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[execute](../interfaces/ExpressionActions.md#execute)

#### Defined in

[src/lib/repository/domain/actions.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L13)

___

### metadata

▸ **metadata**(`expression`): `Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`Metadata`](../interfaces/Metadata.md)\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[metadata](../interfaces/ExpressionActions.md#metadata)

#### Defined in

[src/lib/repository/domain/actions.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L33)

___

### model

▸ **model**(`expression`): `Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataModel`](../interfaces/MetadataModel.md)[]\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[model](../interfaces/ExpressionActions.md#model)

#### Defined in

[src/lib/repository/domain/actions.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L21)

___

### normalize

▸ **normalize**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[normalize](../interfaces/ExpressionActions.md#normalize)

#### Defined in

[src/lib/repository/domain/actions.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L17)

___

### parameters

▸ **parameters**(`expression`): `Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`MetadataParameter`](../interfaces/MetadataParameter.md)[]\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[parameters](../interfaces/ExpressionActions.md#parameters)

#### Defined in

[src/lib/repository/domain/actions.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L25)

___

### plan

▸ **plan**(`expression`): `Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<[`QueryPlan`](../interfaces/QueryPlan.md)\>

#### Implementation of

[ExpressionActions](../interfaces/ExpressionActions.md).[plan](../interfaces/ExpressionActions.md#plan)

#### Defined in

[src/lib/repository/domain/actions.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/930a03b3/src/lib/repository/domain/actions.ts#L37)
