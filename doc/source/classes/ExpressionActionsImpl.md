[Lambda ORM](../README.md) / ExpressionActionsImpl

# Class: ExpressionActionsImpl

## Implements

- `ExpressionActions`

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

[src/lib/repository/domain/actions.ts:7](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L7)

## Methods

### constraints

▸ **constraints**(`expression`): `Promise`\<`MetadataConstraint`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<`MetadataConstraint`\>

#### Implementation of

ExpressionActions.constraints

#### Defined in

[src/lib/repository/domain/actions.ts:29](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L29)

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

ExpressionActions.execute

#### Defined in

[src/lib/repository/domain/actions.ts:13](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L13)

___

### metadata

▸ **metadata**(`expression`): `Promise`\<`Metadata`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<`Metadata`\>

#### Implementation of

ExpressionActions.metadata

#### Defined in

[src/lib/repository/domain/actions.ts:33](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L33)

___

### model

▸ **model**(`expression`): `Promise`\<`MetadataModel`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<`MetadataModel`[]\>

#### Implementation of

ExpressionActions.model

#### Defined in

[src/lib/repository/domain/actions.ts:21](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L21)

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

ExpressionActions.normalize

#### Defined in

[src/lib/repository/domain/actions.ts:17](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L17)

___

### parameters

▸ **parameters**(`expression`): `Promise`\<`MetadataParameter`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<`MetadataParameter`[]\>

#### Implementation of

ExpressionActions.parameters

#### Defined in

[src/lib/repository/domain/actions.ts:25](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L25)

___

### plan

▸ **plan**(`expression`): `Promise`\<`QueryPlan`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`Promise`\<`QueryPlan`\>

#### Implementation of

ExpressionActions.plan

#### Defined in

[src/lib/repository/domain/actions.ts:37](https://github.com/FlavioLionelRita/lambdaorm/blob/e6abcc99/src/lib/repository/domain/actions.ts#L37)
